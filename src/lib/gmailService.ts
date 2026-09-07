import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import app, { auth } from './firebase';

// Gmail OAuth Scopes
export const GMAIL_SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.labels'
];

// Configure GoogleAuthProvider with Workspace Gmail Scopes
const provider = new GoogleAuthProvider();
GMAIL_SCOPES.forEach(scope => provider.addScope(scope));
provider.setCustomParameters({
  prompt: 'consent',
  access_type: 'offline'
});

// In-Memory Token Cache (MANDATORY: Never store access token in localStorage or sessionStorage)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  isUnread: boolean;
  isStarred: boolean;
  labelIds: string[];
  bodyHtml?: string;
  bodyText?: string;
}

export interface GmailUserProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
  historyId: string;
}

// Subscribe to Firebase Auth state
export const initGmailAuth = (
  onSuccess?: (user: User, token: string) => void,
  onSignedOut?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onSuccess) onSuccess(user, cachedAccessToken);
    } else if (!isSigningIn) {
      cachedAccessToken = null;
      if (onSignedOut) onSignedOut();
    }
  });
};

// Sign in with Google to get Gmail OAuth Access Token
export const signInWithGmail = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential?.accessToken) {
      throw new Error('Google did not return an OAuth access token. Please ensure Gmail permissions are accepted.');
    }
    
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (err: any) {
    console.error('Gmail Sign-in error:', err);
    throw err;
  } finally {
    isSigningIn = false;
  }
};

// Retrieve currently cached in-memory access token
export const getGmailAccessToken = (): string | null => {
  return cachedAccessToken;
};

// Sign out from Google & clear in-memory token
export const signOutGmail = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.warn('Error during signOut:', err);
  } finally {
    cachedAccessToken = null;
  }
};

// Fetch user profile from Gmail API
export const fetchGmailProfile = async (token: string): Promise<GmailUserProfile> => {
  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch Gmail profile: ${res.statusText}`);
  }
  return res.json();
};

// Fetch messages list
export const fetchGmailMessages = async (
  token: string, 
  query: string = '', 
  labelIds: string[] = ['INBOX'], 
  maxResults = 20
): Promise<GmailMessageSummary[]> => {
  const url = new URL('https://gmail.googleapis.com/gmail/v1/users/me/messages');
  url.searchParams.set('maxResults', maxResults.toString());
  if (query) url.searchParams.set('q', query);
  if (labelIds && labelIds.length > 0) {
    labelIds.forEach(id => url.searchParams.append('labelIds', id));
  }

  const listRes = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!listRes.ok) {
    throw new Error(`Failed to list Gmail messages: ${listRes.statusText}`);
  }

  const listData = await listRes.json();
  const messages = listData.messages || [];

  if (messages.length === 0) return [];

  // Fetch full details for first 15 messages in parallel
  const detailsPromises = messages.slice(0, 15).map(async (msg: { id: string; threadId: string }) => {
    try {
      const msgRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!msgRes.ok) return null;
      const data = await msgRes.json();
      return parseGmailMessage(data);
    } catch (err) {
      return null;
    }
  });

  const results = await Promise.all(detailsPromises);
  return results.filter((m): m is GmailMessageSummary => m !== null);
};

// Parse raw Gmail message format
export const parseGmailMessage = (data: any): GmailMessageSummary => {
  const headers = data.payload?.headers || [];
  const getHeader = (name: string) => {
    const h = headers.find((header: any) => header.name.toLowerCase() === name.toLowerCase());
    return h ? h.value : '';
  };

  const subject = getHeader('Subject') || '(No Subject)';
  const from = getHeader('From') || 'Unknown Sender';
  const to = getHeader('To') || '';
  const date = getHeader('Date') || '';
  const isUnread = (data.labelIds || []).includes('UNREAD');
  const isStarred = (data.labelIds || []).includes('STARRED');

  // Extract body
  let bodyHtml = '';
  let bodyText = data.snippet || '';

  const extractPart = (part: any) => {
    if (part.mimeType === 'text/html' && part.body?.data) {
      try {
        bodyHtml = decodeBase64Url(part.body.data);
      } catch (e) {}
    } else if (part.mimeType === 'text/plain' && part.body?.data && !bodyText) {
      try {
        bodyText = decodeBase64Url(part.body.data);
      } catch (e) {}
    }
    if (part.parts && Array.isArray(part.parts)) {
      part.parts.forEach(extractPart);
    }
  };

  if (data.payload) {
    extractPart(data.payload);
  }

  return {
    id: data.id,
    threadId: data.threadId,
    snippet: data.snippet || '',
    subject,
    from,
    to,
    date,
    isUnread,
    isStarred,
    labelIds: data.labelIds || [],
    bodyHtml: bodyHtml || bodyText,
    bodyText: bodyText || data.snippet || ''
  };
};

// Send an email through the Gmail API
export const sendGmailMessage = async (
  token: string,
  to: string,
  subject: string,
  bodyHtml: string
): Promise<any> => {
  const emailLines = [
    `To: ${to}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    '',
    bodyHtml
  ].join('\r\n');

  // URL-safe Base64 encoding
  const base64Encoded = btoa(unescape(encodeURIComponent(emailLines)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ raw: base64Encoded })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to send email: ${res.statusText}`);
  }

  return res.json();
};

// Delete an email permanently
export const deleteGmailMessage = async (token: string, messageId: string) => {
  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error(`Failed to delete message: ${res.statusText}`);
  }
  return true;
};

// Move an email to trash
export const trashGmailMessage = async (token: string, messageId: string) => {
  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/trash`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error(`Failed to move message to trash: ${res.statusText}`);
  }
  return res.json();
};

// Mark an email as read
export const markGmailMessageRead = async (token: string, messageId: string) => {
  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/modify`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      removeLabelIds: ['UNREAD']
    })
  });
  if (!res.ok) return null;
  return res.json();
};

function decodeBase64Url(base64Url: string): string {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
}

// Realistic Educational & Gurukul Demo emails when user is exploring before Google Sign-In
export const DEMO_GURUKUL_EMAILS: GmailMessageSummary[] = [
  {
    id: 'demo-1',
    threadId: 't-1',
    snippet: 'Dear Parent & Student, CBSE Class 8 Mathematics Chapter 9 Algebraic Expressions homework solutions are uploaded...',
    subject: '📚 CBSE Math Chapter 9 Homework & Practice Test Sheet',
    from: 'Sri Ramakrishna Gurukul School <principal@gurukul-vidya.org>',
    to: 'parent@superparent.in',
    date: 'Today, 10:45 AM',
    isUnread: true,
    isStarred: true,
    labelIds: ['INBOX', 'UNREAD', 'SCHOOL'],
    bodyText: 'Dear Parent & Student,\n\nWe have scheduled the Class 8 Mathematics Chapter 9 practice test for this Friday. Please review the 6 practice problems on algebraic factorizations using Super Parent AI Homework solver.\n\nWarm regards,\nMathematics Faculty\nSri Ramakrishna Gurukul',
    bodyHtml: `<div style="font-family: sans-serif; line-height: 1.6;">
      <h3 style="color: #E50914;">📚 Sri Ramakrishna Gurukul — Class 8 Academic Notice</h3>
      <p>Dear Parent & Student,</p>
      <p>We have scheduled the <strong>Class 8 Mathematics Chapter 9</strong> practice test for this Friday. Please review the 6 practice problems on algebraic factorizations using your Super Parent AI Homework solver & Google Lens.</p>
      <div style="background: #F3F4F6; padding: 12px; border-left: 4px solid #E50914; border-radius: 6px; margin: 12px 0;">
        <strong>Key Topics to Prepare:</strong>
        <ul>
          <li>Binomial and Trinomial Multiplications</li>
          <li>Standard Algebraic Identities $(a+b)^2, (a-b)^2, (a+b)(a-b)$</li>
          <li>Telugu translations and step-by-step proofs</li>
        </ul>
      </div>
      <p>Warm regards,<br><strong>Mathematics Department</strong><br>Sri Ramakrishna Gurukul Vidyalaya</p>
    </div>`
  },
  {
    id: 'demo-2',
    threadId: 't-2',
    snippet: 'Gurukul Sanskrit & Telugu Slokas Competition - State Level Registrations Open for LKG to 10th Class Students...',
    subject: '🕉️ Bhagavad Gita Sloka Chanting Competition - State Level',
    from: 'Sanatana Samskruthi Foundation <events@samskruthi.in>',
    to: 'parent@superparent.in',
    date: 'Yesterday, 4:20 PM',
    isUnread: true,
    isStarred: false,
    labelIds: ['INBOX', 'UNREAD', 'CULTURE'],
    bodyText: 'Namaskaram!\n\nRegistrations are now open for the Annual Bhagavad Gita Chanting Competition for Chapter 2 (Sankhya Yoga). Cash awards and Certificate of Excellence will be awarded.\n\nRegister before 15th of this month.',
    bodyHtml: `<div style="font-family: sans-serif; line-height: 1.6;">
      <h3 style="color: #0A84FF;">🕉️ Sanatana Samskruthi Gurukul Trust</h3>
      <p>Namaskaram Parents & Young Achievers,</p>
      <p>Registrations are now officially open for the <strong>Annual Inter-School Bhagavad Gita Chanting & Meaning Recitation</strong>. Chapter 2 (Sankhya Yoga, Slokas 1-20) will be the focus area for Classes 5 to 10.</p>
      <p>Practice audio recitations are available in the <em>Values & Sanskar Hub</em> on your Super Parent app.</p>
      <p>Yours in Seva,<br>Sri Vidyaranya Swami<br>Convener</p>
    </div>`
  },
  {
    id: 'demo-3',
    threadId: 't-3',
    snippet: 'Free Pediatric & Eye Checkup Camp confirmation for Student Chaitanya Reddy with Doctor consultation ID #DR-8891...',
    subject: '🩺 eSanjeevani Online Doctor Consultation Receipt & Schedule',
    from: 'National Tele-Consultation Service <noreply@esanjeevani.gov.in>',
    to: 'parent@superparent.in',
    date: 'Sep 04, 2026',
    isUnread: false,
    isStarred: true,
    labelIds: ['INBOX', 'HEALTH'],
    bodyText: 'Your free telemedicine appointment with Dr. S. Rao (Pediatric General OPD) has been verified. Recommended tests and screen-time exercises are attached.',
    bodyHtml: `<div style="font-family: sans-serif; line-height: 1.6;">
      <h3 style="color: #10B981;">🩺 eSanjeevani Telemedicine OPD Slip</h3>
      <p>Dear Parent,</p>
      <p>Your online telemedicine session with <strong>Dr. S. Rao, MBBS, DCH (Pediatrics)</strong> has been logged.</p>
      <p><strong>Doctor Recommendations:</strong></p>
      <ul>
        <li>Practice 20-20-20 rule during screen study</li>
        <li>15 minutes daily Surya Namaskar in morning sunlight</li>
        <li>Hydration: 2.5 Liters water daily</li>
      </ul>
      <p>National Health Portal, Govt. of India</p>
    </div>`
  }
];
