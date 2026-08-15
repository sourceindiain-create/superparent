import React, { useState, useEffect, useRef } from 'react';
import { AI_EXPERTS } from '../data/mockData';
import { AIExpertPersona } from '../types';
import { 
  Bot, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Image as ImageIcon, 
  Sparkles, 
  Copy, 
  Check, 
  Loader2, 
  BookOpen, 
  Cpu, 
  HeartPulse, 
  Brain, 
  Palette, 
  Utensils, 
  Users, 
  GraduationCap,
  Home,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  ExternalLink,
  Globe,
  Library,
  Volume2,
  VolumeX,
  Radio,
  Languages,
  CheckCircle2,
  HelpCircle,
  Play,
  Square,
  Pause
} from 'lucide-react';

interface AskSuperAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPersona?: AIExpertPersona;
  defaultPersona?: AIExpertPersona;
  initialQuery?: string;
}

const ICON_MAP: Record<string, any> = {
  Bot,
  GraduationCap,
  Cpu,
  HeartPulse,
  Brain,
  Sparkles,
  Palette,
  Utensils,
  BookOpen,
  Users
};

export const AskSuperAIModal: React.FC<AskSuperAIModalProps> = ({
  isOpen,
  onClose,
  initialPersona,
  defaultPersona = 'general',
  initialQuery = ''
}) => {
  const activeInitialPersona = initialPersona || defaultPersona;
  const [activeTab, setActiveTab] = useState<'expert' | 'master_app' | 'digital_library'>('expert');
  const [selectedPersona, setSelectedPersona] = useState<AIExpertPersona>(activeInitialPersona);
  const [promptInput, setPromptInput] = useState(initialQuery);
  const [selectedImage, setSelectedImage] = useState<{ base64: string; mimeType: string; previewUrl: string } | null>(null);
  
  // Web Speech Recognition (Voice to Text) State
  const [isListening, setIsListening] = useState(false);
  const [speechLanguage, setSpeechLanguage] = useState<'te-IN' | 'en-IN' | 'hi-IN' | 'en-US'>('te-IN');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [autoSubmitAfterVoice, setAutoSubmitAfterVoice] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Web Speech Synthesis (Text to Speech / Read Aloud) State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(0.95);

  // AI Response State
  const [isLoading, setIsLoading] = useState(false);
  const [responseOutput, setResponseOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Embedded Master AI Web App Navigation State
  const MASTER_AI_URL = 'https://studio-6989353372-64cd3.web.app/';
  const [currentAppUrl, setCurrentAppUrl] = useState<string>(MASTER_AI_URL);
  const [historyStack, setHistoryStack] = useState<string[]>([MASTER_AI_URL]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [iframeKey, setIframeKey] = useState<number>(0);

  // Sync props when modal is opened
  useEffect(() => {
    if (isOpen) {
      if (initialPersona) {
        setSelectedPersona(initialPersona);
      }
      if (initialQuery) {
        setPromptInput(initialQuery);
      }
      // Check Speech Recognition support in browser
      if (typeof window !== 'undefined') {
        const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        setSpeechSupported(!!SpeechRec);
      }
    } else {
      // Clean up voice when closed
      stopListening();
      stopSpeechSynthesis();
    }
  }, [isOpen, initialPersona, initialQuery]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopListening();
      stopSpeechSynthesis();
    };
  }, []);

  const activeExpertInfo = AI_EXPERTS.find(e => e.id === selectedPersona) || AI_EXPERTS[0];

  // Stop Speech Recognition
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        // ignore
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
    setInterimTranscript('');
  };

  // Start Speech Recognition with Web Speech API
  const startListening = () => {
    setSpeechError(null);
    stopSpeechSynthesis();

    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      setSpeechError('Web Speech API is not supported in this browser. Please use Chrome, Edge, or Safari.');
      // Simulated fallback for demo / unsupported environments
      setIsListening(true);
      setTimeout(() => {
        const fallbackText = speechLanguage === 'te-IN'
          ? 'ఈ ప్రాజెక్ట్ సర్క్యూట్ ఎలా తయారు చేయాలో వివరించు'
          : speechLanguage === 'hi-IN'
          ? 'कक्षा 6 के लिए भिन्न (Fractions) का उदाहरण समझाइए'
          : 'Explain class 6 fractions with a real-life pizza example';
        setPromptInput(prev => prev ? `${prev} ${fallbackText}` : fallbackText);
        setIsListening(false);
      }, 1500);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = speechLanguage;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setInterimTranscript('');
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        let currentInterim = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptChunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptChunk;
          } else {
            currentInterim += transcriptChunk;
          }
        }

        if (currentInterim) {
          setInterimTranscript(currentInterim);
        }

        if (finalTranscript) {
          setPromptInput(prev => {
            const trimmed = prev.trim();
            return trimmed ? `${trimmed} ${finalTranscript.trim()}` : finalTranscript.trim();
          });
          setInterimTranscript('');

          if (autoSubmitAfterVoice) {
            stopListening();
            setTimeout(() => {
              handleSubmitPrompt();
            }, 300);
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setSpeechError('Microphone permission denied. Please allow microphone access in your browser settings.');
        } else if (event.error === 'no-speech') {
          // Keep listening or gently inform
        } else {
          setSpeechError(`Voice input error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Failed to start speech recognition:', err);
      setSpeechError(err.message || 'Could not start voice recognition');
      setIsListening(false);
    }
  };

  const handleToggleVoiceDictation = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Text-To-Speech (Web Speech Synthesis)
  const stopSpeechSynthesis = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  const handleSpeakResponse = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !responseOutput) return;

    if (isSpeaking) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
      return;
    }

    stopSpeechSynthesis();

    // Clean markdown characters for smoother voice narration
    const cleanText = responseOutput
      .replace(/[*#_`~>[\]]/g, ' ')
      .replace(/https?:\/\/\S+/g, 'link')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = speechRate;
    utterance.pitch = 1.05; // Slightly friendly tone for students

    // Select suitable voice
    const voices = window.speechSynthesis.getVoices();
    const langCode = speechLanguage.substring(0, 2);
    const matchedVoice = voices.find(v => v.lang.startsWith(langCode)) || 
                         voices.find(v => v.lang.includes('IN')) || 
                         voices.find(v => v.lang.startsWith('en')) || 
                         voices[0];

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage({
          base64: base64String,
          mimeType: file.type,
          previewUrl: URL.createObjectURL(file)
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPrompt = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptInput.trim() && !selectedImage) return;

    stopListening();
    stopSpeechSynthesis();
    setIsLoading(true);
    setResponseOutput(null);

    try {
      const res = await fetch('/api/ask-super-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptInput || 'Please analyze this attached project diagram or photo and guide me.',
          persona: selectedPersona,
          imageBase64: selectedImage?.base64,
          mimeType: selectedImage?.mimeType
        })
      });

      const data = await res.json();
      if (data.text) {
        setResponseOutput(data.text);
      } else if (data.error) {
        setResponseOutput(`⚠️ Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setResponseOutput('⚠️ Connection error. Please check your network and try asking again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyResponse = () => {
    if (responseOutput) {
      navigator.clipboard.writeText(responseOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const samplePrompts = [
    { text: 'ఈ circuit ఎలా తయారు చేయాలి?', lang: 'te-IN', label: 'తెలుగు ప్రాజెక్ట్' },
    { text: 'Explain Class 6 Fractions with a pizza slice example', lang: 'en-IN', label: 'Maths Concept' },
    { text: 'రామాయణం నుండి పిల్లలకు 3 మంచి విలువలు చెప్పు', lang: 'te-IN', label: 'సంస్కారం & కథ' },
    { text: 'How does an Arduino obstacle avoidance sensor work?', lang: 'en-IN', label: 'Robotics Lab' },
    { text: 'What is photosynthesis explained for a 8-year-old?', lang: 'en-IN', label: 'Science Fun' }
  ];

  // Master App Toolbar Handlers
  const handleAppNavigate = (newUrl: string) => {
    const updatedHistory = historyStack.slice(0, historyIndex + 1);
    updatedHistory.push(newUrl);
    setHistoryStack(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setCurrentAppUrl(newUrl);
    setIframeKey(prev => prev + 1);
  };

  const handleAppHome = () => handleAppNavigate(MASTER_AI_URL);

  const handleAppBack = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      setCurrentAppUrl(historyStack[prevIdx]);
      setIframeKey(prev => prev + 1);
    }
  };

  const handleAppForward = () => {
    if (historyIndex < historyStack.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setCurrentAppUrl(historyStack[nextIdx]);
      setIframeKey(prev => prev + 1);
    }
  };

  const handleAppRefresh = () => setIframeKey(prev => prev + 1);

  const digitalLibraries = [
    {
      title: 'DIKSHA Portal (PM eVIDYA)',
      teluguTitle: 'దిక్షా డిజిటల్ లెర్నింగ్ వేదిక',
      desc: 'National digital infrastructure for teachers and students with interactive QR code textbooks.',
      url: 'https://diksha.gov.in/',
      category: 'Government Portal',
      badge: 'Govt Official'
    },
    {
      title: 'NCERT E-Pathshala',
      teluguTitle: 'ఈ-పాఠశాల డిజిటల్ పుస్తకాలు',
      desc: 'Free access to NCERT textbooks, audio, videos, and multi-lingual teaching resources for Class 1-12.',
      url: 'https://epathshala.nic.in/',
      category: 'Textbooks & Audio',
      badge: 'Free Textbooks'
    },
    {
      title: 'SWAYAM & SWAYAM PRABHA',
      teluguTitle: 'స్వయం ఉచిత ఆన్‌లైన్ కోర్సులు',
      desc: '24x7 Educational DTH Channels and online courses developed by top Indian professors.',
      url: 'https://swayam.gov.in/',
      category: 'Government Portal',
      badge: 'Higher & School Ed'
    },
    {
      title: 'National Digital Library of India (NDLI)',
      teluguTitle: 'భారత జాతీయ డిజిటల్ లైబ్రరీ',
      desc: 'Single-window repository containing millions of books, articles, videos, and study materials.',
      url: 'https://ndl.iitkgp.ac.in/',
      category: 'Digital Library',
      badge: 'Millions of Books'
    },
    {
      title: 'NPTEL Online Courses',
      teluguTitle: 'ఎన్‌పిటిఈఎల్ ఐఐటి ఉచిత కోర్సులు',
      desc: 'Free engineering, science, and technology video courses from IITs and IISc.',
      url: 'https://nptel.ac.in/',
      category: 'STEM & Robotics',
      badge: 'IIT Quality'
    },
    {
      title: 'Khan Academy India',
      teluguTitle: 'ఖాన్ అకాడమీ ఉచిత గణితం & సైన్స్',
      desc: '100% free personalized math, science, and computing lessons with interactive practice.',
      url: 'https://in.khanacademy.org/',
      category: 'Global Platform',
      badge: 'Free Forever'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-orange-200 flex flex-col h-[94vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shrink-0 shadow-inner">
              <Bot className="w-6 h-6 text-amber-200 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
                🤖 ASK SUPER AI MENTOR
                <span className="bg-white/20 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold">
                  🎙️ Voice Enabled
                </span>
              </h2>
              <p className="text-xs text-orange-100">
                Web Speech Voice Q&A • 10 Specialist Mentors • Visual Diagrams • Digital Libraries
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            {/* Top View Mode Tabs */}
            <div className="bg-white/10 p-1 rounded-xl flex items-center border border-white/20 text-xs font-bold">
              <button
                onClick={() => setActiveTab('expert')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'expert'
                    ? 'bg-white text-orange-900 shadow-xs'
                    : 'text-white hover:text-amber-200'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Voice & Chat</span>
              </button>
              <button
                onClick={() => setActiveTab('master_app')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'master_app'
                    ? 'bg-white text-orange-900 shadow-xs'
                    : 'text-white hover:text-amber-200'
                }`}
              >
                <span>🚀 Master AI App</span>
              </button>
              <button
                onClick={() => setActiveTab('digital_library')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'digital_library'
                    ? 'bg-white text-orange-900 shadow-xs'
                    : 'text-white hover:text-amber-200'
                }`}
              >
                <span>📚 Libraries</span>
              </button>
            </div>

            <button 
              onClick={() => {
                stopListening();
                stopSpeechSynthesis();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors ml-2"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
          {/* TAB 1: MULTI-EXPERT AI CHAT WITH WEB SPEECH API */}
          {activeTab === 'expert' && (
            <div className="space-y-4">
              {/* Persona Selection Tabs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                    <span>Choose Specialist AI Mentor for Student:</span>
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">
                    10 Gurukul Domains
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {AI_EXPERTS.map((expert) => {
                    const IconComponent = ICON_MAP[expert.icon] || Bot;
                    const isSelected = selectedPersona === expert.id;
                    return (
                      <button
                        key={expert.id}
                        onClick={() => setSelectedPersona(expert.id)}
                        className={`flex items-center gap-2 p-2 rounded-xl border text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-orange-500 text-white border-orange-600 shadow-md font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-orange-50/60'
                        }`}
                      >
                        <IconComponent className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-200' : 'text-orange-500'}`} />
                        <div className="truncate">
                          <div className="truncate font-semibold">{expert.name.replace('AI ', '')}</div>
                          <div className={`text-[10px] truncate ${isSelected ? 'text-orange-100' : 'text-slate-400'}`}>
                            {expert.teluguName}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Mentor Details & Voice Bar */}
              <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200/80 rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-start gap-2.5">
                  <div className="p-2 bg-amber-500/10 rounded-xl text-amber-700 border border-amber-500/20 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs text-amber-950">{activeExpertInfo.name}</span>
                      <span className="bg-amber-200/60 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {activeExpertInfo.teluguName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {activeExpertInfo.description}
                    </p>
                  </div>
                </div>

                {/* Voice Language Selector */}
                <div className="flex items-center gap-2 bg-white/90 p-1.5 rounded-xl border border-amber-200 shrink-0 text-xs">
                  <Languages className="w-3.5 h-3.5 text-orange-600" />
                  <span className="text-slate-600 font-bold text-[11px] hidden sm:inline">Voice Lang:</span>
                  <select
                    value={speechLanguage}
                    onChange={(e) => setSpeechLanguage(e.target.value as any)}
                    className="bg-transparent font-bold text-slate-800 text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="te-IN">🇮🇳 తెలుగు (Telugu)</option>
                    <option value="en-IN">🇮🇳 English (India)</option>
                    <option value="hi-IN">🇮🇳 हिन्दी (Hindi)</option>
                    <option value="en-US">🌐 English (US)</option>
                  </select>
                </div>
              </div>

              {/* Voice Listening Banner / Waveform Visualizer */}
              {isListening && (
                <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white p-4 rounded-2xl shadow-lg border border-red-400 animate-pulse flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-white text-red-600 flex items-center justify-center font-bold shadow-md">
                        <Mic className="w-5 h-5 animate-bounce" />
                      </div>
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                      </span>
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-white flex items-center gap-2">
                        <span>🎙️ Listening to Student Voice...</span>
                        <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full font-mono">
                          {speechLanguage === 'te-IN' ? 'తెలుగు' : speechLanguage === 'hi-IN' ? 'हिन्दी' : 'English'}
                        </span>
                      </h4>
                      <p className="text-xs text-orange-100">
                        {interimTranscript 
                          ? `Hearing: "${interimTranscript}"` 
                          : 'Speak clearly into your microphone — your question will appear live!'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        stopListening();
                        if (promptInput.trim()) {
                          handleSubmitPrompt();
                        }
                      }}
                      className="bg-white text-red-700 hover:bg-orange-50 font-black text-xs px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Done & Ask AI</span>
                    </button>
                    <button
                      type="button"
                      onClick={stopListening}
                      className="bg-black/20 hover:bg-black/30 text-white font-bold text-xs px-3 py-2 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Speech Error Banner if any */}
              {speechError && (
                <div className="bg-amber-50 border border-amber-300 text-amber-900 p-3 rounded-2xl text-xs flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-bold">Voice Status: </span>
                    <span>{speechError}</span>
                  </div>
                  <button 
                    onClick={() => setSpeechError(null)}
                    className="text-amber-800 font-bold hover:underline"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Input Area (Textarea + Voice Big Button + Image Upload) */}
              <form onSubmit={handleSubmitPrompt} className="space-y-3">
                <div className="bg-white border-2 border-slate-200 focus-within:border-orange-500 rounded-3xl p-3 shadow-xs transition-all">
                  <textarea
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder={`Ask ${activeExpertInfo.name} anything by voice or typing... e.g. "ఈ circuit ఎలా తయారు చేయాలి?", "Explain Class 6 Maths Fractions", "Bedtime Panchatantra moral story"`}
                    className="w-full bg-transparent p-2 text-sm text-slate-800 focus:outline-none resize-none min-h-[95px] leading-relaxed"
                  />

                  {/* Uploaded Image Preview */}
                  {selectedImage && (
                    <div className="m-2 relative inline-block border-2 border-orange-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                      <img src={selectedImage.previewUrl} alt="Upload preview" className="h-20 w-20 object-cover" />
                      <button
                        type="button"
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 px-1">
                    {/* Left Actions: Web Speech Voice Mic + Diagram Upload */}
                    <div className="flex items-center gap-2">
                      {/* Primary Web Speech API Voice Button */}
                      <button
                        type="button"
                        onClick={handleToggleVoiceDictation}
                        className={`flex items-center gap-2 text-xs px-3.5 py-2 rounded-xl font-bold transition-all shadow-sm ${
                          isListening
                            ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse ring-2 ring-red-300'
                            : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white'
                        }`}
                        title="Click to speak your question using Web Speech API"
                      >
                        {isListening ? (
                          <>
                            <MicOff className="w-4 h-4 animate-spin" />
                            <span>Stop Listening</span>
                          </>
                        ) : (
                          <>
                            <Mic className="w-4 h-4 text-amber-100" />
                            <span>🎙️ Ask by Voice (Web Speech)</span>
                          </>
                        )}
                      </button>

                      {/* Image / Diagram File Upload */}
                      <label className="cursor-pointer flex items-center gap-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl border border-slate-200 font-semibold transition-colors">
                        <ImageIcon className="w-4 h-4 text-orange-600" />
                        <span className="hidden sm:inline">Attach Diagram/Photo</span>
                        <input type="file" accept="image/*,.pdf" onChange={handleImageChange} className="hidden" />
                      </label>
                    </div>

                    {/* Right Actions: Auto-Ask Toggle & Submit Button */}
                    <div className="flex items-center gap-2">
                      {promptInput && (
                        <button
                          type="button"
                          onClick={() => setPromptInput('')}
                          className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1"
                        >
                          Clear
                        </button>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading || (!promptInput.trim() && !selectedImage)}
                        className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-black px-6 py-2.5 rounded-xl text-xs shadow-md transition-all transform hover:-translate-y-0.5"
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        <span>{isLoading ? 'Thinking...' : 'Ask AI Tutor'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Sample Voice Prompts for Younger Learners */}
              <div className="bg-slate-100/80 p-3 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-700">
                  <Radio className="w-3.5 h-3.5 text-orange-500" />
                  <span>Try Sample Voice Questions (Click to Ask):</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {samplePrompts.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setPromptInput(sample.text);
                        setSpeechLanguage(sample.lang as any);
                      }}
                      className="text-xs bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-300 text-slate-700 hover:text-orange-900 px-3 py-1.5 rounded-xl transition-all text-left flex items-center gap-1.5"
                    >
                      <span className="text-[10px] bg-orange-100 text-orange-800 font-bold px-1.5 py-0.5 rounded-md">
                        {sample.label}
                      </span>
                      <span>"{sample.text}"</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Output Box with Text-to-Speech Read Aloud */}
              {responseOutput && (
                <div className="bg-slate-900 text-slate-100 rounded-3xl p-5 space-y-4 shadow-xl border border-slate-700 animate-fade-in">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-black text-sm text-amber-200 block">
                          {activeExpertInfo.name} Guidance
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Personalized response for student
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Web Speech API Read Aloud (TTS) Button */}
                      <button
                        onClick={handleSpeakResponse}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                          isSpeaking
                            ? 'bg-amber-500 text-slate-950 animate-pulse'
                            : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700'
                        }`}
                        title="Listen to the answer aloud with Web Speech Synthesis"
                      >
                        {isSpeaking ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>{isPaused ? 'Resume Voice' : 'Pause Reading'}</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                            <span>🔊 Listen to Answer</span>
                          </>
                        )}
                      </button>

                      {isSpeaking && (
                        <button
                          onClick={stopSpeechSynthesis}
                          className="p-1.5 rounded-xl bg-slate-800 hover:bg-red-900/50 text-red-400 border border-slate-700"
                          title="Stop Voice"
                        >
                          <Square className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Copy Text Button */}
                      <button 
                        onClick={handleCopyResponse} 
                        className="text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Main Response Output */}
                  <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans max-h-[360px] overflow-y-auto pr-2">
                    {responseOutput}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MASTER AI WEB APP (https://studio-6989353372-64cd3.web.app/) */}
          {activeTab === 'master_app' && (
            <div className="h-full flex flex-col space-y-3">
              {/* Browser Navigation Toolbar */}
              <div className="bg-slate-900 text-white p-3 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAppHome}
                    title="Home Page"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors"
                  >
                    <Home className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleAppBack}
                    disabled={historyIndex <= 0}
                    title="Previous Page / Back"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleAppForward}
                    disabled={historyIndex >= historyStack.length - 1}
                    title="Next Page / Forward"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleAppRefresh}
                    title="Refresh Web App"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>

                {/* Address Bar */}
                <div className="flex-1 min-w-[200px] bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2 text-xs text-amber-200 font-mono overflow-hidden">
                  <Globe className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span className="truncate">{currentAppUrl}</span>
                </div>

                {/* Launch External Button */}
                <a
                  href={MASTER_AI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Fullscreen App</span>
                </a>
              </div>

              {/* Web App Embedded View Frame */}
              <div className="flex-1 bg-white rounded-2xl border border-slate-300 shadow-inner overflow-hidden relative min-h-[480px]">
                <iframe
                  key={iframeKey}
                  src={currentAppUrl}
                  title="Master AI Web App Studio"
                  className="w-full h-full border-none"
                  allow="camera; microphone; geolocation; fullscreen"
                />
              </div>
            </div>
          )}

          {/* TAB 3: DIGITAL LIBRARIES & GOVT EDUCATIONAL PORTALS */}
          {activeTab === 'digital_library' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4 rounded-2xl space-y-1">
                <h3 className="font-black text-base text-amber-200 flex items-center gap-2 font-display">
                  <Library className="w-5 h-5 text-amber-400" />
                  <span>National & World Free Digital Libraries & Educational Portals</span>
                </h3>
                <p className="text-xs text-slate-300">
                  Direct links to NCERT, DIKSHA, SWAYAM, NDLI, Open Library, Khan Academy, and free e-books.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {digitalLibraries.map((lib, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="bg-orange-100 text-orange-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {lib.category}
                        </span>
                        <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {lib.badge}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 text-sm leading-snug">
                          {lib.title}
                        </h4>
                        <p className="text-xs text-orange-600 font-bold mt-0.5">
                          {lib.teluguTitle}
                        </p>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {lib.desc}
                        </p>
                      </div>
                    </div>

                    <a
                      href={lib.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                      <span>Open Library Portal</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
