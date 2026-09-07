import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Send, 
  Inbox, 
  Star, 
  Trash2, 
  RefreshCw, 
  Search, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft, 
  User as UserIcon, 
  LogOut, 
  Paperclip, 
  Sparkles, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  Tag,
  Share2,
  Printer
} from 'lucide-react';
import { 
  signInWithGmail, 
  signOutGmail, 
  getGmailAccessToken, 
  fetchGmailProfile, 
  fetchGmailMessages, 
  sendGmailMessage, 
  deleteGmailMessage, 
  trashGmailMessage,
  markGmailMessageRead,
  GmailMessageSummary, 
  GmailUserProfile, 
  DEMO_GURUKUL_EMAILS 
} from '../lib/gmailService';
import { User } from 'firebase/auth';

interface GmailPortalProps {
  onBackToHome?: () => void;
}

export const GmailPortal: React.FC<GmailPortalProps> = ({ onBackToHome }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<GmailUserProfile | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Email State
  const [messages, setMessages] = useState<GmailMessageSummary[]>(DEMO_GURUKUL_EMAILS);
  const [selectedMessage, setSelectedMessage] = useState<GmailMessageSummary | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<'INBOX' | 'STARRED' | 'SENT' | 'DRAFT' | 'TRASH'>('INBOX');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');

  // Compose Modal State
  const [isComposeOpen, setIsComposeOpen] = useState<boolean>(false);
  const [composeTo, setComposeTo] = useState<string>('');
  const [composeSubject, setComposeSubject] = useState<string>('');
  const [composeBody, setComposeBody] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);

  // Mandatory Confirmation Dialog State (as per Workspace integration skill)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    actionLabel: string;
    isDestructive: boolean;
    onConfirm: () => Promise<void> | void;
  }>({
    isOpen: false,
    title: '',
    description: '',
    actionLabel: '',
    isDestructive: false,
    onConfirm: () => {}
  });

  // Check existing token on mount
  useEffect(() => {
    const existingToken = getGmailAccessToken();
    if (existingToken) {
      setAccessToken(existingToken);
      loadRealGmailData(existingToken);
    }
  }, []);

  const handleSignIn = async () => {
    setIsLoadingAuth(true);
    setErrorMessage(null);
    try {
      const res = await signInWithGmail();
      setCurrentUser(res.user);
      setAccessToken(res.accessToken);
      setSuccessMessage('Successfully connected to Google Gmail!');
      await loadRealGmailData(res.accessToken);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error('Sign-in failed:', err);
      setErrorMessage(err.message || 'Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutGmail();
      setCurrentUser(null);
      setProfile(null);
      setAccessToken(null);
      setMessages(DEMO_GURUKUL_EMAILS);
      setSelectedMessage(null);
      setSuccessMessage('Signed out of Gmail.');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const loadRealGmailData = async (token: string) => {
    setIsLoadingMessages(true);
    setErrorMessage(null);
    try {
      // 1. Fetch Profile
      try {
        const prof = await fetchGmailProfile(token);
        setProfile(prof);
      } catch (e) {
        console.warn('Could not fetch profile:', e);
      }

      // 2. Fetch Messages
      const msgs = await fetchGmailMessages(token, searchQuery, [selectedFolder]);
      if (msgs.length > 0) {
        setMessages(msgs);
        setSelectedMessage(msgs[0]);
      } else {
        setMessages([]);
        setSelectedMessage(null);
      }
    } catch (err: any) {
      console.error('Error fetching Gmail messages:', err);
      setErrorMessage('Could not retrieve live emails. Showing offline/Gurukul inbox instead.');
      setMessages(DEMO_GURUKUL_EMAILS);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleRefresh = () => {
    if (accessToken) {
      loadRealGmailData(accessToken);
    } else {
      setMessages(DEMO_GURUKUL_EMAILS);
      setSuccessMessage('Refreshed Gurukul Inbox.');
      setTimeout(() => setSuccessMessage(null), 2500);
    }
  };

  // Filter messages by search query and category
  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.snippet.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeCategoryFilter === 'ALL') return true;
    if (activeCategoryFilter === 'SCHOOL') {
      return msg.subject.toLowerCase().includes('school') || 
             msg.subject.toLowerCase().includes('math') || 
             msg.subject.toLowerCase().includes('cbse') ||
             msg.from.toLowerCase().includes('gurukul');
    }
    if (activeCategoryFilter === 'HOMEWORK') {
      return msg.subject.toLowerCase().includes('homework') || 
             msg.subject.toLowerCase().includes('assignment') || 
             msg.subject.toLowerCase().includes('chapter');
    }
    if (activeCategoryFilter === 'HEALTH') {
      return msg.subject.toLowerCase().includes('doctor') || 
             msg.subject.toLowerCase().includes('health') || 
             msg.from.toLowerCase().includes('esanjeevani');
    }
    return true;
  });

  // Prompt User Confirmation BEFORE Sending Email (MANDATORY per Workspace guidelines)
  const handleRequestSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo.trim()) {
      setErrorMessage('Please provide a recipient email address.');
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: 'Confirm Email Transmission',
      description: `Send this email to "${composeTo}" with subject: "${composeSubject || '(No Subject)'}"? This will deliver the message directly to their inbox.`,
      actionLabel: 'Confirm & Send',
      isDestructive: false,
      onConfirm: async () => {
        setIsSending(true);
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        try {
          if (accessToken) {
            await sendGmailMessage(accessToken, composeTo, composeSubject, composeBody);
            setSuccessMessage(`Email sent successfully to ${composeTo}!`);
            loadRealGmailData(accessToken);
          } else {
            // Simulated send in demo mode
            const newMsg: GmailMessageSummary = {
              id: 'sent-' + Date.now(),
              threadId: 't-' + Date.now(),
              snippet: composeBody.substring(0, 80),
              subject: composeSubject || '(No Subject)',
              from: 'You <parent@superparent.in>',
              to: composeTo,
              date: 'Just now',
              isUnread: false,
              isStarred: false,
              labelIds: ['SENT'],
              bodyText: composeBody,
              bodyHtml: `<p>${composeBody.replace(/\n/g, '<br/>')}</p>`
            };
            setMessages(prev => [newMsg, ...prev]);
            setSuccessMessage(`Email sent to ${composeTo} (Gurukul Dispatch)!`);
          }
          setIsComposeOpen(false);
          setComposeTo('');
          setComposeSubject('');
          setComposeBody('');
        } catch (err: any) {
          setErrorMessage(err.message || 'Failed to send email.');
        } finally {
          setIsSending(false);
          setTimeout(() => setSuccessMessage(null), 4000);
        }
      }
    });
  };

  // Prompt User Confirmation BEFORE Deleting/Trashing Email (MANDATORY per Workspace guidelines)
  const handleRequestTrash = (msg: GmailMessageSummary) => {
    setConfirmModal({
      isOpen: true,
      title: 'Move Email to Trash?',
      description: `Are you sure you want to move "${msg.subject}" to Trash?`,
      actionLabel: 'Move to Trash',
      isDestructive: true,
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        try {
          if (accessToken) {
            await trashGmailMessage(accessToken, msg.id);
            setMessages(prev => prev.filter(m => m.id !== msg.id));
            if (selectedMessage?.id === msg.id) {
              setSelectedMessage(null);
            }
            setSuccessMessage('Email moved to trash.');
          } else {
            setMessages(prev => prev.filter(m => m.id !== msg.id));
            if (selectedMessage?.id === msg.id) {
              setSelectedMessage(null);
            }
            setSuccessMessage('Email moved to trash.');
          }
        } catch (err: any) {
          setErrorMessage(err.message || 'Failed to trash email.');
        } finally {
          setTimeout(() => setSuccessMessage(null), 3000);
        }
      }
    });
  };

  // AI Assistant Templates
  const handleApplyTemplate = (type: 'leave' | 'homework' | 'doctor') => {
    if (type === 'leave') {
      setComposeSubject('Leave Application for Student - Sri Ramakrishna Gurukul');
      setComposeBody(
        `Respected Class Teacher,\n\nPlease grant 2 days of medical/family leave for my ward Chaitanya Reddy (Class 8, Roll #14) starting tomorrow due to unavoidable family functions.\n\nHe will complete all pending homework assignments using Super Parent AI.\n\nThanking you,\nSincerely,\nRajesh Reddy (Father)\n+91 7981967919`
      );
    } else if (type === 'homework') {
      setComposeSubject('Submission of Completed Mathematics Assignment & OCR Solution');
      setComposeBody(
        `Dear Mathematics Faculty,\n\nI have completed the Chapter 9 Algebraic Expressions practice sheet with step-by-step verified solutions and Telugu annotations.\n\nKindly review and guide.\n\nWarm regards,\nChaitanya Reddy\nClass 8 - Gurukul Vidyalaya`
      );
    } else if (type === 'doctor') {
      setComposeSubject('Query regarding follow-up checkup - eSanjeevani Consultation #8891');
      setComposeBody(
        `Respected Doctor,\n\nFollowing our online consultation regarding junior exam strain, the student has been doing daily 15-minute Surya Namaskar and 20-20-20 eye rests. Kindly confirm if the follow-up review next week is required.\n\nRegards,\nLakshmi Reddy (Parent)`
      );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      {/* Top OTT Banner */}
      <div className="bg-gradient-to-r from-red-950 via-[#181818] to-slate-900 rounded-3xl p-6 sm:p-8 border border-red-600/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-red-600/20 px-3 py-1 rounded-full text-xs font-black text-red-400 border border-red-500/40">
              <Mail className="w-3.5 h-3.5 text-red-400" />
              <span>OFFICIAL GOOGLE GMAIL WORKSPACE INTEGRATION</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Super Parent Gmail Hub</span>
              <span className="text-xs bg-red-600 text-white font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                Live Mail
              </span>
            </h1>
            <p className="text-sm text-slate-300">
              Read, compose, organize, and reply to school communications, teacher notices, homework reports, and medical consultations directly from your Google Account.
            </p>
          </div>

          {/* Account & Sign-in Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-black/40 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
            {accessToken ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center font-black text-white shadow-md">
                  {currentUser?.photoURL ? (
                    <img src={currentUser.photoURL} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    currentUser?.email?.charAt(0).toUpperCase() || 'G'
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{currentUser?.displayName || 'Google Account'}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {profile?.emailAddress || currentUser?.email}
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  title="Sign out of Gmail"
                  className="ml-2 p-2 bg-slate-800 hover:bg-red-900/60 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-xs text-amber-300 font-medium">
                  Connect your real Gmail inbox:
                </div>
                {/* Official Sign in with Google Button Styling */}
                <button
                  onClick={handleSignIn}
                  disabled={isLoadingAuth}
                  className="bg-white hover:bg-slate-100 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-3 shadow-lg hover:shadow-xl transition-all border border-slate-300 cursor-pointer disabled:opacity-60"
                >
                  <svg className="w-4 h-4" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  </svg>
                  <span>{isLoadingAuth ? 'Connecting to Google...' : 'Sign in with Google'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Alerts */}
      {errorMessage && (
        <div className="p-4 bg-red-950/80 border border-red-700/60 rounded-2xl flex items-center justify-between text-red-200 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="font-bold underline text-red-300">
            Dismiss
          </button>
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-700/60 rounded-2xl flex items-center gap-2 text-emerald-200 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Mail Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[640px]">
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-4">
          <button
            onClick={() => setIsComposeOpen(true)}
            className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black rounded-2xl shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 text-sm transition-all transform hover:scale-[1.02] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Compose Email</span>
          </button>

          {/* Mail Folders */}
          <div className="bg-[#181818] rounded-2xl p-3 border border-[#2A2A2A] space-y-1">
            <button
              onClick={() => { setSelectedFolder('INBOX'); handleRefresh(); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedFolder === 'INBOX' 
                  ? 'bg-red-600/20 text-red-400 border border-red-500/30' 
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4" />
                <span>Inbox</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-600 text-white font-bold">
                {messages.filter(m => m.isUnread).length}
              </span>
            </button>

            <button
              onClick={() => { setSelectedFolder('STARRED'); handleRefresh(); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedFolder === 'STARRED' 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4 text-amber-400" />
                <span>Starred</span>
              </div>
              <span className="text-[11px] text-slate-500">
                {messages.filter(m => m.isStarred).length}
              </span>
            </button>

            <button
              onClick={() => { setSelectedFolder('SENT'); handleRefresh(); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedFolder === 'SENT' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Send className="w-4 h-4" />
                <span>Sent</span>
              </div>
            </button>

            <button
              onClick={() => { setSelectedFolder('TRASH'); handleRefresh(); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedFolder === 'TRASH' 
                  ? 'bg-slate-700/50 text-slate-200 border border-slate-600' 
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Trash2 className="w-4 h-4" />
                <span>Trash</span>
              </div>
            </button>
          </div>

          {/* Gurukul & Educational Filters */}
          <div className="bg-[#181818] rounded-2xl p-4 border border-[#2A2A2A] space-y-3">
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3 h-3 text-red-500" />
              <span>Quick Categories</span>
            </div>
            <div className="space-y-1.5">
              {[
                { id: 'ALL', label: 'All Messages', icon: '📬' },
                { id: 'SCHOOL', label: 'School & CBSE Notices', icon: '🏫' },
                { id: 'HOMEWORK', label: 'Homework & Solutions', icon: '📝' },
                { id: 'HEALTH', label: 'Doctor & Health Consultations', icon: '🩺' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryFilter(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    activeCategoryFilter === cat.id
                      ? 'bg-red-600 text-white font-bold'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column: Email List */}
        <div className="lg:col-span-4 bg-[#181818] rounded-2xl border border-[#2A2A2A] flex flex-col overflow-hidden">
          {/* List Header & Search */}
          <div className="p-3.5 border-b border-[#2A2A2A] space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-black text-white flex items-center gap-2">
                <span>{selectedFolder}</span>
                <span className="text-slate-500 font-normal">({filteredMessages.length})</span>
              </div>
              <button
                onClick={handleRefresh}
                title="Refresh Mailbox"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMessages ? 'animate-spin text-red-400' : ''}`} />
              </button>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search mail, sender, subject..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#101010] border border-[#2F2F2F] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Messages List Body */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#222222] max-h-[580px]">
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs space-y-2">
                <Mail className="w-8 h-8 mx-auto text-slate-600" />
                <div>No messages found</div>
              </div>
            ) : (
              filteredMessages.map(msg => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-3.5 cursor-pointer transition-all ${
                    selectedMessage?.id === msg.id 
                      ? 'bg-red-950/30 border-l-4 border-red-600' 
                      : msg.isUnread 
                      ? 'bg-[#1F1F1F]/60 hover:bg-[#252525]' 
                      : 'hover:bg-white/5 opacity-85'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`text-xs truncate ${msg.isUnread ? 'font-black text-white' : 'font-medium text-slate-300'}`}>
                      {msg.from.split('<')[0]}
                    </span>
                    <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                      {msg.date.split(',')[0]}
                    </span>
                  </div>

                  <div className={`text-xs mb-1 line-clamp-1 ${msg.isUnread ? 'font-bold text-red-200' : 'text-slate-300'}`}>
                    {msg.subject}
                  </div>

                  <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {msg.snippet}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1">
                      {msg.isUnread && (
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      )}
                      {msg.labelIds?.includes('SCHOOL') && (
                        <span className="bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded text-[9px] font-bold">
                          School
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestTrash(msg);
                      }}
                      title="Move to trash"
                      className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Email Detail Viewer */}
        <div className="lg:col-span-5 bg-[#181818] rounded-2xl border border-[#2A2A2A] flex flex-col overflow-hidden">
          {selectedMessage ? (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-[#2A2A2A] space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base sm:text-lg font-black text-white leading-snug">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleRequestTrash(selectedMessage)}
                      title="Delete email"
                      className="p-1.5 bg-slate-800 hover:bg-red-900/60 text-slate-300 hover:text-white rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                      {selectedMessage.from.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">{selectedMessage.from}</div>
                      <div className="text-[10px] text-slate-400 font-mono">To: {selectedMessage.to || 'Me'}</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {selectedMessage.date}
                  </div>
                </div>
              </div>

              {/* Message Body Content */}
              <div className="p-5 flex-1 overflow-y-auto text-xs text-slate-200 leading-relaxed bg-[#141414]">
                {selectedMessage.bodyHtml ? (
                  <div 
                    dangerouslySetInnerHTML={{ __html: selectedMessage.bodyHtml }} 
                    className="prose prose-invert max-w-none text-slate-200"
                  />
                ) : (
                  <div className="whitespace-pre-wrap font-sans text-slate-200">
                    {selectedMessage.bodyText}
                  </div>
                )}
              </div>

              {/* Quick Reply Footer Bar */}
              <div className="p-3.5 bg-[#181818] border-t border-[#2A2A2A] flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setComposeTo(selectedMessage.from.match(/<([^>]+)>/)?.[1] || selectedMessage.from);
                    setComposeSubject(`Re: ${selectedMessage.subject}`);
                    setComposeBody(`\n\n--- On ${selectedMessage.date}, wrote ---\n${selectedMessage.snippet}`);
                    setIsComposeOpen(true);
                  }}
                  className="bg-red-600 hover:bg-red-500 text-white font-black px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>

                <div className="text-[11px] text-slate-500">
                  Google Workspace Gmail API
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500 space-y-3">
              <Mail className="w-12 h-12 text-slate-700" />
              <div className="text-sm font-bold text-slate-400">Select an email to view details</div>
              <div className="text-xs text-slate-600 max-w-xs">
                Review CBSE homework updates, teacher notes, or click Compose to write a message.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose Email Modal */}
      {isComposeOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#333333] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-0 animate-fade-in">
            <div className="p-4 bg-gradient-to-r from-red-700 to-red-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2 font-black text-sm">
                <Send className="w-4 h-4" />
                <span>New Email Message</span>
              </div>
              <button
                onClick={() => setIsComposeOpen(false)}
                className="w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* AI Template Suggestions */}
            <div className="p-3 bg-[#1F1F1F] border-b border-[#2A2A2A] flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>AI Templates:</span>
              </span>
              <button
                type="button"
                onClick={() => handleApplyTemplate('leave')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-red-600/30 text-[11px] text-slate-300 hover:text-white border border-white/10 transition-colors"
              >
                📝 School Leave Letter
              </button>
              <button
                type="button"
                onClick={() => handleApplyTemplate('homework')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-red-600/30 text-[11px] text-slate-300 hover:text-white border border-white/10 transition-colors"
              >
                📚 Homework Submission
              </button>
              <button
                type="button"
                onClick={() => handleApplyTemplate('doctor')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-red-600/30 text-[11px] text-slate-300 hover:text-white border border-white/10 transition-colors"
              >
                🩺 Doctor Query
              </button>
            </div>

            <form onSubmit={handleRequestSend} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">To (Recipient):</label>
                <input
                  type="email"
                  required
                  placeholder="teacher@gurukul-vidya.org or doctor@esanjeevani.in"
                  value={composeTo}
                  onChange={e => setComposeTo(e.target.value)}
                  className="w-full bg-[#101010] border border-[#2F2F2F] rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Subject:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mathematics Chapter 9 Factorization Homework"
                  value={composeSubject}
                  onChange={e => setComposeSubject(e.target.value)}
                  className="w-full bg-[#101010] border border-[#2F2F2F] rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Message Body:</label>
                <textarea
                  rows={8}
                  required
                  placeholder="Write your email here..."
                  value={composeBody}
                  onChange={e => setComposeBody(e.target.value)}
                  className="w-full bg-[#101010] border border-[#2F2F2F] rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 leading-relaxed resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#2A2A2A]">
                <div className="text-[11px] text-slate-500">
                  {accessToken ? 'Sending via official Google Gmail API' : 'Demo sandbox email preview'}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsComposeOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSending ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANDATORY USER CONFIRMATION MODAL (Workspace Integration Requirement) */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#3A3A3A] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-fade-in text-slate-100">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${confirmModal.isDestructive ? 'bg-red-600/20 text-red-500 border border-red-500/30' : 'bg-blue-600/20 text-blue-400 border border-blue-500/30'}`}>
                {confirmModal.isDestructive ? <Trash2 className="w-5 h-5" /> : <Send className="w-5 h-5" />}
              </div>
              <h3 className="text-base font-black text-white">{confirmModal.title}</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {confirmModal.description}
            </p>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#2A2A2A]">
              <button
                type="button"
                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => confirmModal.onConfirm()}
                className={`px-5 py-2 rounded-xl font-black text-xs text-white shadow-lg cursor-pointer ${
                  confirmModal.isDestructive 
                    ? 'bg-red-600 hover:bg-red-500' 
                    : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
              >
                {confirmModal.actionLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
