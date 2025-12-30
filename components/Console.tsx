import React, { useRef, useEffect } from 'react';
import { LogEntry } from '../types';
import { Terminal, XCircle, CheckCircle, Info, AlertTriangle, Trash2 } from 'lucide-react';

interface ConsoleProps {
  logs: LogEntry[];
  onClear: () => void;
}

const Console: React.FC<ConsoleProps> = ({ logs, onClear }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getIcon = (type: string) => {
    switch(type) {
      case 'error': return <XCircle size={14} className="text-red-500" />;
      case 'success': return <CheckCircle size={14} className="text-emerald-500" />;
      case 'warning': return <AlertTriangle size={14} className="text-yellow-500" />;
      default: return <Info size={14} className="text-blue-500" />;
    }
  };

  return (
    <div className="h-64 bg-slate-950 border-t border-slate-700 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900">
        <div className="flex items-center gap-2 text-slate-300">
          <Terminal size={16} />
          <span className="text-sm font-semibold">Execution Console</span>
          <span className="text-xs text-slate-500 ml-2">({logs.length} events)</span>
        </div>
        <button 
          onClick={onClear}
          className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-red-400 transition-colors"
          title="Clear Logs"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-sm">
        {logs.length === 0 && (
          <div className="text-slate-600 italic text-center py-4">Waiting for execution...</div>
        )}
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 text-xs animate-in fade-in slide-in-from-bottom-1 duration-200">
            <span className="text-slate-600 shrink-0">
              {log.timestamp.toLocaleTimeString()}
            </span>
            <span className="shrink-0 mt-0.5">{getIcon(log.type)}</span>
            <div className="flex-1">
              <span className="font-bold text-slate-400 mr-2">[{log.nodeLabel}]</span>
              <span className={`
                ${log.type === 'error' ? 'text-red-400' : ''}
                ${log.type === 'success' ? 'text-emerald-400' : ''}
                ${log.type === 'warning' ? 'text-yellow-400' : 'text-slate-300'}
              `}>
                {log.message}
              </span>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default Console;