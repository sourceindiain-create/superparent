import React, { useState } from 'react';
import { UserRole, UserAccount, NavTab, AppThemeId } from '../types';
import { 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  KeyRound, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Unlock, 
  Bot, 
  Award,
  Zap,
  ArrowLeft,
  Home,
  Check
} from 'lucide-react';
import { APP_THEMES } from '../data/themes';

interface LoginPageProps {
  currentUser: UserAccount;
  onLogin: (user: UserAccount) => void;
  setActiveTab: (tab: NavTab) => void;
  currentTheme: AppThemeId;
  masterAccessGranted: boolean;
  onToggleMasterAccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  currentUser,
  onLogin,
  setActiveTab,
  currentTheme,
  masterAccessGranted,
  onToggleMasterAccess
}) => {
  const theme = APP_THEMES[currentTheme] || APP_THEMES['gurukul-amber'];

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [emailInput, setEmailInput] = useState('student@superparent.in');
  const [passwordInput, setPasswordInput] = useState('student123');
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState<string | null>(null);

  // Preset Fast-Demo Accounts
  const demoAccounts: {
    role: UserRole;
    label: string;
    email: string;
    name: string;
    icon: any;
    desc: string;
    accessBadge: string;
    gradeText: string;
  }[] = [
    {
      role: 'student',
      label: 'Student Account',
      email: 'student@superparent.in',
      name: 'Chaitanya Reddy',
      icon: GraduationCap,
      desc: 'Access 11 AI courses, $200k+ developer tool packs, quizzes, science models, and earn certificates.',
      accessBadge: '100% Free Student Learning Access',
      gradeText: 'Class 8 • CBSE Curriculum'
    },
    {
      role: 'parent',
      label: 'Parent Account',
      email: 'parent@superparent.in',
      name: 'Rajesh & Lakshmi Reddy',
      icon: Users,
      desc: 'Monitor child growth map, approve marketplace creations, view psychology guides, and manage subscription.',
      accessBadge: 'Full Parental Supervision Access',
      gradeText: 'Class 8 Student Guardian'
    },
    {
      role: 'admin',
      label: 'Super Admin Portal',
      email: 'admin@superparent.in',
      name: 'Super Admin (EMFI Lead)',
      icon: ShieldCheck,
      desc: 'Master 100% permission control, feature testing suite, approve student inventions, user audit logs.',
      accessBadge: '100% Master Key Superuser',
      gradeText: 'System Administrator'
    }
  ];

  const handleSelectDemoAccount = (acc: typeof demoAccounts[0]) => {
    setSelectedRole(acc.role);
    setEmailInput(acc.email);
    setPasswordInput(acc.role === 'admin' ? 'admin123' : `${acc.role}123`);
  };

  const handleExecuteLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      let loggedUser: UserAccount;
      if (selectedRole === 'admin') {
        loggedUser = {
          id: 'user-admin-1',
          email: emailInput,
          name: 'Super Admin (EMFI Lead)',
          role: 'admin',
          avatar: '🛡️',
          grade: 'Class 10',
          phone: '+91 7981967919',
          enrollmentStatus: 'Admin Superuser',
          hasFullAccess: true,
          xpPoints: 99999,
          streakDays: 100,
          permissions: {
            canAccessAllCourses: true,
            canAccessAllPerks: true,
            canApproveMarketplace: true,
            canManageUsers: true,
            canGenerateCertificates: true,
            canAccessAdminPortal: true,
            canRunDiagnostics: true
          }
        };
      } else if (selectedRole === 'parent') {
        loggedUser = {
          id: 'user-parent-1',
          email: emailInput,
          name: 'Rajesh & Lakshmi Reddy',
          role: 'parent',
          avatar: '👨‍👩‍👧',
          grade: 'Class 8',
          phone: '+91 7989997015',
          enrollmentStatus: 'Premium Gurukul Family',
          hasFullAccess: masterAccessGranted,
          xpPoints: 4800,
          streakDays: 21,
          permissions: {
            canAccessAllCourses: true,
            canAccessAllPerks: true,
            canApproveMarketplace: true,
            canManageUsers: false,
            canGenerateCertificates: true,
            canAccessAdminPortal: false,
            canRunDiagnostics: true
          }
        };
      } else {
        loggedUser = {
          id: 'user-student-1',
          email: emailInput,
          name: 'Chaitanya Reddy',
          role: 'student',
          avatar: '👦',
          grade: 'Class 8',
          phone: '+91 7981967919',
          enrollmentStatus: 'Premium Gurukul',
          hasFullAccess: masterAccessGranted,
          xpPoints: 3450,
          streakDays: 14,
          permissions: {
            canAccessAllCourses: true,
            canAccessAllPerks: true,
            canApproveMarketplace: false,
            canManageUsers: false,
            canGenerateCertificates: true,
            canAccessAdminPortal: false,
            canRunDiagnostics: true
          }
        };
      }

      onLogin(loggedUser);
      setIsLoading(false);
      setLoginSuccessMessage(`Successfully logged in as ${loggedUser.name} (${loggedUser.role.toUpperCase()})`);

      setTimeout(() => {
        if (loggedUser.role === 'admin') {
          setActiveTab('admin');
        } else {
          setActiveTab('home');
        }
      }, 800);
    }, 400);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Return & Back Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-300 shadow-xs transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-orange-600" />
            <span>Return to Home</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Current Session:</span>
          <span className="bg-slate-100 text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full border border-slate-300">
            {currentUser.name} ({currentUser.role.toUpperCase()})
          </span>
        </div>
      </div>

      {/* Main Login Header Hero */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-clean-md relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 text-xs font-extrabold px-4 py-1.5 rounded-full border border-orange-200">
            <KeyRound className="w-4 h-4 text-orange-600" />
            <span>GURUKUL SECURE AUTHENTICATION & ACCESS PORTAL</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Log in to SUPER PARENT Gurukul
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Choose your role to enter as <strong className="text-slate-900">Student</strong>, <strong className="text-slate-900">Parent</strong>, or <strong className="text-slate-900">Super Admin</strong> with full 100% access across all hubs, AI mentors, courses, and management tools.
          </p>
        </div>
      </div>

      {/* Fast 1-Click Role Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {demoAccounts.map((acc) => {
          const Icon = acc.icon;
          const isSelected = selectedRole === acc.role;
          return (
            <div
              key={acc.role}
              onClick={() => handleSelectDemoAccount(acc)}
              className={`cursor-pointer rounded-2xl p-6 border-2 transition-all relative ${
                isSelected
                  ? 'bg-orange-50/50 border-orange-500 shadow-orange-glow ring-2 ring-orange-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-clean'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}

              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-orange-600" />
              </div>

              <span className="text-[11px] font-bold text-orange-700 uppercase tracking-wider block mb-1">
                {acc.accessBadge}
              </span>

              <h3 className="text-lg font-black text-slate-900 mb-1">
                {acc.label}
              </h3>

              <div className="text-xs font-semibold text-slate-500 mb-3">
                {acc.gradeText}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {acc.desc}
              </p>

              <div className="bg-slate-100 p-2 rounded-lg text-[11px] font-mono text-slate-700 flex items-center justify-between">
                <span>{acc.email}</span>
                <span className="text-slate-400 font-bold">1-Click Pick</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Login Form Container */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-clean-md max-w-xl mx-auto">
        <form onSubmit={handleExecuteLogin} className="space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Credentials Authentication
              </h2>
              <p className="text-xs text-slate-500">
                Selected Role: <strong className="text-orange-600 uppercase">{selectedRole}</strong>
              </p>
            </div>

            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Access Ready</span>
            </span>
          </div>

          {/* Email field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-orange-500 focus:bg-white rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none transition-colors"
              placeholder="e.g. student@superparent.in"
            />
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-orange-500 focus:bg-white rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none transition-colors"
              placeholder="Enter password"
            />
          </div>

          {/* Master 100% Access Checkbox */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Unlock className="w-4 h-4 text-amber-600" />
              <div>
                <div className="text-xs font-bold text-amber-900">Grant 100% Full Access Master Key</div>
                <div className="text-[11px] text-amber-700">Unlocks all 11 AI courses, $200k+ perks & admin tools</div>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleMasterAccess}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                masterAccessGranted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {masterAccessGranted ? 'ENABLED (100%)' : 'DISABLED'}
            </button>
          </div>

          {loginSuccessMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{loginSuccessMessage}</span>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-xl shadow-orange-glow hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? (
              <span>Authenticating Credentials...</span>
            ) : (
              <>
                <span>Sign In as {selectedRole.toUpperCase()}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Role Feature Comparison Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-clean-md">
        <h3 className="text-lg font-black text-slate-900 mb-4">
          🔐 Gurukul Access Level Permissions Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-extrabold border-b border-slate-200">
                <th className="p-3 rounded-l-lg">Feature / Module</th>
                <th className="p-3">👦 Student Role</th>
                <th className="p-3">👨‍👩‍👧 Parent Role</th>
                <th className="p-3 rounded-r-lg">🛡️ Super Admin Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
              <tr>
                <td className="p-3 font-bold text-slate-900">11 AI & Prompt Engineering Masterclass</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Full Access (100%)</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Full Access (100%)</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Full Access (100%)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">$200k+ Free Student Developer Packs</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Eligible (GitHub/Notion/Canva)</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Savings Guide & Setup</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Manage & Add Packs</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Ask SUPER AI (10 Multi-Experts)</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Voice, Vision & Code</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Psychology & Health Mentors</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Prompt Tuning & Testing</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Marketplace Creation & Buying</td>
                <td className="p-3 text-slate-700">Submit Creation (Needs Parent OK)</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Approve & Buy</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Global Master Approval</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Admin Control Center & Audit Logs</td>
                <td className="p-3 text-slate-400">❌ Restricted</td>
                <td className="p-3 text-slate-400">❌ Restricted</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Full Superuser Admin</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">100% Comprehensive Website Test Suite</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Available</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Available</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Live Diagnostic Runner</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
