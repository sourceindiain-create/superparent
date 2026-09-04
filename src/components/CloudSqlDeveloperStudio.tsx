import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Terminal, 
  Play, 
  RotateCcw, 
  Server, 
  Cloud, 
  HardDrive, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Download, 
  Code, 
  Zap, 
  Sparkles, 
  ExternalLink,
  Table,
  Cpu,
  Globe,
  Flame,
  ShieldAlert
} from 'lucide-react';

export const CloudSqlDeveloperStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sql-runner' | 'tables-schema' | 'cloud-overview' | 'api-tester' | 'cloud-storage'>('sql-runner');
  const [sqlQuery, setSqlQuery] = useState<string>('SELECT * FROM users LIMIT 10;');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Database Tables State
  const [tables, setTables] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('users');
  const [tableData, setTableData] = useState<any>(null);
  const [loadingTables, setLoadingTables] = useState(false);

  // Cloud & Backend Overview
  const [backendOverview, setBackendOverview] = useState<any>(null);
  const [loadingOverview, setLoadingOverview] = useState(false);

  // Cloud Storage
  const [storageObjects, setStorageObjects] = useState<any[]>([]);
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadBucket, setUploadBucket] = useState('superparent-certificates');
  const [uploadMime, setUploadMime] = useState('application/pdf');

  // API Tester State
  const [apiEndpoint, setApiEndpoint] = useState<string>('/api/backend/overview');
  const [apiMethod, setApiMethod] = useState<'GET' | 'POST'>('GET');
  const [apiPayload, setApiPayload] = useState<string>('{}');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState(false);

  // Preset SQL Queries
  const PRESET_QUERIES = [
    {
      title: '👥 All Users & Roles',
      sql: 'SELECT id, email, name, role, grade, xp_points, streak_days, created_at FROM users;'
    },
    {
      title: '💳 Verified Payments & Revenue',
      sql: 'SELECT order_id, user_name, plan_id, amount_inr, status, payment_method, created_at FROM orders_payments ORDER BY created_at DESC;'
    },
    {
      title: '🎓 Student Course Progress & Scores',
      sql: 'SELECT student_name, course_title, category, completion_pct, score, updated_at FROM student_progress WHERE completion_pct > 50;'
    },
    {
      title: '🛍️ Marketplace Inventory',
      sql: 'SELECT id, title, category, price_inr, creator_name, rating, stock FROM marketplace_inventory ORDER BY rating DESC;'
    },
    {
      title: '☁️ Cloud Storage Objects',
      sql: 'SELECT id, bucket_name, file_name, content_type, size_bytes, public_url FROM cloud_storage_objects;'
    },
    {
      title: '🛡️ System Audit Logs',
      sql: 'SELECT id, actor, action, category, details, timestamp FROM system_audit_logs ORDER BY timestamp DESC LIMIT 10;'
    },
    {
      title: '📊 Revenue by Plan (Aggregated)',
      sql: 'SELECT plan_id, COUNT(*) AS orders_count, SUM(amount_inr) AS total_revenue_inr FROM orders_payments GROUP BY plan_id;'
    }
  ];

  // Fetch Tables on mount
  const fetchTables = async () => {
    setLoadingTables(true);
    try {
      const res = await fetch('/api/sql/tables');
      const data = await res.json();
      if (data.tables) {
        setTables(data.tables);
      }
    } catch (err) {
      console.error('Failed to fetch tables:', err);
    } finally {
      setLoadingTables(false);
    }
  };

  const fetchOverview = async () => {
    setLoadingOverview(true);
    try {
      const res = await fetch('/api/backend/overview');
      const data = await res.json();
      setBackendOverview(data);
    } catch (err) {
      console.error('Failed to fetch backend overview:', err);
    } finally {
      setLoadingOverview(false);
    }
  };

  const fetchStorage = async () => {
    try {
      const res = await fetch('/api/cloud/storage');
      const data = await res.json();
      if (data.objects) setStorageObjects(data.objects);
    } catch (err) {
      console.error('Failed to fetch storage:', err);
    }
  };

  useEffect(() => {
    fetchTables();
    fetchOverview();
    fetchStorage();
    // Run initial default query
    handleExecuteQuery('SELECT * FROM users LIMIT 10;');
  }, []);

  const handleExecuteQuery = async (queryToRun?: string) => {
    const q = queryToRun || sqlQuery;
    if (!q.trim()) return;

    setIsExecuting(true);
    setQueryError(null);
    setQueryResult(null);

    try {
      const res = await fetch('/api/sql/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql: q })
      });
      const data = await res.json();

      if (!res.ok || data.success === false) {
        setQueryError(data.error || 'SQL execution failed');
      } else {
        setQueryResult(data);
        // Refresh tables list if DDL/DML was executed
        if (!/^SELECT|^PRAGMA/i.test(q.trim())) {
          fetchTables();
        }
      }
    } catch (err: any) {
      setQueryError(err.message || 'Network error executing SQL query');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleInspectTable = async (tableName: string) => {
    setSelectedTable(tableName);
    const query = `SELECT * FROM ${tableName} LIMIT 25;`;
    setSqlQuery(query);
    handleExecuteQuery(query);
  };

  const handleResetDb = async () => {
    if (!window.confirm('Reset database with initial seed schemas and records?')) return;
    try {
      const res = await fetch('/api/sql/reset', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        alert('Database reset successfully!');
        fetchTables();
        handleExecuteQuery('SELECT * FROM users LIMIT 10;');
      }
    } catch (err: any) {
      alert('Reset failed: ' + err.message);
    }
  };

  const handleTestApi = async () => {
    setApiLoading(true);
    setApiResponse(null);
    try {
      const options: RequestInit = {
        method: apiMethod,
        headers: { 'Content-Type': 'application/json' }
      };
      if (apiMethod === 'POST') {
        try {
          options.body = JSON.stringify(JSON.parse(apiPayload));
        } catch {
          options.body = apiPayload;
        }
      }
      const res = await fetch(apiEndpoint, options);
      const data = await res.json();
      setApiResponse({
        status: res.status,
        ok: res.ok,
        statusText: res.statusText,
        data
      });
    } catch (err: any) {
      setApiResponse({
        status: 500,
        ok: false,
        error: err.message || 'API request failed'
      });
    } finally {
      setApiLoading(false);
    }
  };

  const handleSimulateStorageUpload = async () => {
    if (!uploadFileName.trim()) return;
    try {
      const res = await fetch('/api/cloud/storage/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: uploadFileName,
          bucketName: uploadBucket,
          contentType: uploadMime,
          sizeBytes: Math.floor(50000 + Math.random() * 500000)
        })
      });
      const data = await res.json();
      if (data.success) {
        setUploadFileName('');
        fetchStorage();
        fetchTables();
      }
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportResultAsJson = () => {
    if (!queryResult || !queryResult.rows) return;
    const blob = new Blob([JSON.stringify(queryResult.rows, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `superparent_sql_export_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white shrink-0">
              <Database className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-black tracking-tight">Cloud & Relational SQL Developer Studio</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  SQLite 3 & Firebase Engine
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  superparent.dev
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Full-Stack Backend Toolchain: In-Memory Relational SQL Engine, Firebase Firestore synchronization, REST API testing, and Cloud Storage asset registry.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleResetDb}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition-all"
              title="Reset DB schema and seed records"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset & Seed DB</span>
            </button>
            <button
              onClick={() => { fetchTables(); fetchOverview(); fetchStorage(); }}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-2 transition-all"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Refresh Stack</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'sql-runner', label: '⚡ Interactive SQL Terminal', icon: Terminal },
          { id: 'tables-schema', label: `🗄️ Relational Tables & Schemas (${tables.length})`, icon: Table },
          { id: 'cloud-overview', label: '☁️ Full-Stack & Cloud Architecture', icon: Cloud },
          { id: 'cloud-storage', label: `📦 Cloud Storage Bucket (${storageObjects.length})`, icon: HardDrive },
          { id: 'api-tester', label: '🔌 REST API Interactive Tester', icon: Code }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-2xs'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: INTERACTIVE SQL TERMINAL */}
      {activeTab === 'sql-runner' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Preset Queries Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Pre-Built SQL Queries</span>
              </h3>
              <div className="space-y-2">
                {PRESET_QUERIES.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSqlQuery(preset.sql);
                      handleExecuteQuery(preset.sql);
                    }}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 text-xs font-bold text-slate-700 hover:text-blue-700 transition-all flex flex-col gap-1"
                  >
                    <span>{preset.title}</span>
                    <span className="text-[10px] font-mono text-slate-400 truncate w-full">{preset.sql}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-5 text-white shadow-sm space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>Engine Specification</span>
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="text-[10px] text-slate-400 block">Dialect</span>
                  <span className="font-bold text-blue-300">SQLite 3 / SQL-92</span>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="text-[10px] text-slate-400 block">ACID Compliant</span>
                  <span className="font-bold text-emerald-300">Yes (Full)</span>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="text-[10px] text-slate-400 block">Persistence</span>
                  <span className="font-bold text-amber-300">In-Memory + API</span>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="text-[10px] text-slate-400 block">Active Tables</span>
                  <span className="font-bold text-white">{tables.length} Relational</span>
                </div>
              </div>
            </div>
          </div>

          {/* SQL Editor & Table Results */}
          <div className="lg:col-span-8 space-y-4">
            {/* Editor Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 shadow-md">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">sql_runner@superparent.dev</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(sqlQuery)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-all"
                    title="Copy Query"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => handleExecuteQuery()}
                    disabled={isExecuting}
                    className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isExecuting ? 'Executing...' : 'Run Query'}</span>
                  </button>
                </div>
              </div>

              <textarea
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                rows={4}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3.5 text-blue-200 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-y"
                placeholder="Enter SQL statement (e.g. SELECT * FROM users;)"
              />
            </div>

            {/* Error Display */}
            {queryError && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-800 text-xs flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">SQL Execution Error:</span>
                  <p className="font-mono mt-0.5">{queryError}</p>
                </div>
              </div>
            )}

            {/* Results Table */}
            {queryResult && (
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-800">
                      {queryResult.message || `Query returned ${queryResult.rowCount} row(s)`}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 text-slate-600">
                      {queryResult.executionTimeMs} ms
                    </span>
                  </div>

                  {queryResult.rows && queryResult.rows.length > 0 && (
                    <button
                      onClick={exportResultAsJson}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export JSON</span>
                    </button>
                  )}
                </div>

                {queryResult.columns && queryResult.columns.length > 0 ? (
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900 text-slate-200 font-bold">
                        <tr>
                          {queryResult.columns.map((col: string, idx: number) => (
                            <th key={idx} className="p-3 border-r border-slate-800 last:border-r-0 whitespace-nowrap">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {queryResult.values && queryResult.values.map((row: any[], rIdx: number) => (
                          <tr key={rIdx} className="hover:bg-blue-50/50 font-mono text-[11px] text-slate-700">
                            {row.map((val: any, cIdx: number) => (
                              <td key={cIdx} className="p-3 border-r border-slate-100 last:border-r-0 whitespace-nowrap">
                                {val === null ? (
                                  <span className="text-slate-300 italic">NULL</span>
                                ) : typeof val === 'boolean' ? (
                                  <span className={val ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                                    {val ? 'TRUE' : 'FALSE'}
                                  </span>
                                ) : (
                                  String(val)
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400 text-xs italic">
                    Query completed with no tabular results returned.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: RELATIONAL TABLES & SCHEMAS */}
      {activeTab === 'tables-schema' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tables.map((tbl) => (
              <div
                key={tbl.name}
                className={`bg-white border rounded-3xl p-5 shadow-sm transition-all cursor-pointer ${
                  selectedTable === tbl.name ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => handleInspectTable(tbl.name)}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <Table className="w-4 h-4 text-blue-600" />
                    {tbl.name}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                    {tbl.rowCount} rows
                  </span>
                </div>
                <div className="space-y-1 mt-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Columns ({tbl.columns.length})</span>
                  <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                    {tbl.columns.map((c: any) => (
                      <span
                        key={c.name}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono ${
                          c.pk ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300' : 'bg-slate-50 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {c.name} <span className="text-[9px] text-slate-400">({c.type || 'TEXT'})</span>
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInspectTable(tbl.name);
                    setActiveTab('sql-runner');
                  }}
                  className="mt-4 w-full py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold border border-slate-200 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Query in SQL Console</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FULL-STACK & CLOUD ARCHITECTURE */}
      {activeTab === 'cloud-overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-600" />
              <span>Full-Stack Architecture Matrix</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-700">Domain & Public Ingress</span>
                <span className="font-mono text-blue-600 font-bold">https://superparent.dev</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-700">Container Port</span>
                <span className="font-mono text-slate-900 font-bold">0.0.0.0:3000 (Nginx Proxy)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-700">Relational SQL Engine</span>
                <span className="font-mono text-emerald-600 font-bold">SQLite 3 (sql.js ACID)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-700">Firebase Firestore</span>
                <span className="font-mono text-orange-600 font-bold">studio-6989353372-64cd3</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-700">AI Intelligence Core</span>
                <span className="font-mono text-purple-600 font-bold">Google GenAI 3.7 Flash</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-700">Cryptographic Security</span>
                <span className="font-mono text-slate-900 font-bold">SHA-256 HMAC Verification</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-sm space-y-4">
            <h3 className="text-base font-black flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" />
              <span>Live Health Status</span>
            </h3>

            {backendOverview ? (
              <div className="space-y-3 font-mono text-xs">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-emerald-300">
                  <p className="text-slate-400">// Service Health Check</p>
                  <p>Service: {backendOverview.serviceName}</p>
                  <p>Node Runtime: {backendOverview.nodeVersion}</p>
                  <p>Server Uptime: {backendOverview.uptimeSeconds}s</p>
                  <p>Database Status: {backendOverview.database?.status} ({backendOverview.database?.tableCount} tables)</p>
                  <p>Gemini AI: {backendOverview.cloud?.geminiGenAI}</p>
                  <p>Cloud Storage: {backendOverview.cloud?.storageBucket}</p>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-slate-400 text-xs">Loading health metrics...</div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: CLOUD STORAGE */}
      {activeTab === 'cloud-storage' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-blue-600" />
                <span>Cloud Storage Bucket Registry</span>
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                studio-6989353372-64cd3.firebasestorage.app
              </span>
            </div>

            {/* Quick Upload Simulator */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="File Name (e.g. project_schematic.pdf)"
                value={uploadFileName}
                onChange={(e) => setUploadFileName(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <select
                value={uploadBucket}
                onChange={(e) => setUploadBucket(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="superparent-certificates">superparent-certificates</option>
                <option value="superparent-media">superparent-media</option>
                <option value="superparent-artwork">superparent-artwork</option>
                <option value="superparent-backups">superparent-backups</option>
              </select>
              <select
                value={uploadMime}
                onChange={(e) => setUploadMime(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="application/pdf">application/pdf</option>
                <option value="image/png">image/png</option>
                <option value="image/jpeg">image/jpeg</option>
                <option value="model/stl">model/stl (3D File)</option>
              </select>
              <button
                onClick={handleSimulateStorageUpload}
                disabled={!uploadFileName.trim()}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-sm"
              >
                + Register Cloud Object
              </button>
            </div>

            {/* Objects Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-200 font-bold">
                  <tr>
                    <th className="p-3">Object ID</th>
                    <th className="p-3">File Name</th>
                    <th className="p-3">Bucket</th>
                    <th className="p-3">Content Type</th>
                    <th className="p-3">Size</th>
                    <th className="p-3">Public Cloud URL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {storageObjects.map((obj) => (
                    <tr key={obj.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-blue-600">{obj.id}</td>
                      <td className="p-3 text-slate-900 font-medium">{obj.file_name}</td>
                      <td className="p-3 text-slate-600">{obj.bucket_name}</td>
                      <td className="p-3 text-slate-500">{obj.content_type}</td>
                      <td className="p-3 text-slate-600">{((obj.size_bytes || 0) / 1024).toFixed(1)} KB</td>
                      <td className="p-3 text-emerald-600 truncate max-w-xs">{obj.public_url}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: REST API TESTER */}
      {activeTab === 'api-tester' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-600" />
            <span>Interactive Backend REST API Console</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <select
              value={apiMethod}
              onChange={(e) => setApiMethod(e.target.value as any)}
              className="md:col-span-2 bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
            <input
              type="text"
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              className="md:col-span-8 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono"
              placeholder="/api/health"
            />
            <button
              onClick={handleTestApi}
              disabled={apiLoading}
              className="md:col-span-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-sm"
            >
              {apiLoading ? 'Sending...' : 'Send Request'}
            </button>
          </div>

          {apiMethod === 'POST' && (
            <div>
              <label className="text-[11px] font-bold text-slate-500 mb-1 block">Request Body (JSON):</label>
              <textarea
                value={apiPayload}
                onChange={(e) => setApiPayload(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 text-emerald-300 font-mono text-xs p-3 rounded-xl border border-slate-800 focus:outline-none"
              />
            </div>
          )}

          {apiResponse && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-mono text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Response Status:</span>
                <span className={`font-bold ${apiResponse.ok ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {apiResponse.status} {apiResponse.statusText}
                </span>
              </div>
              <pre className="text-emerald-300 overflow-x-auto max-h-80 p-2">
                {JSON.stringify(apiResponse.data || apiResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
