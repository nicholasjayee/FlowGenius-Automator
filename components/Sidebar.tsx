import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { NODE_DEFINITIONS } from '../constants';
import { Category } from '../types';

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow/type', nodeType);
    event.dataTransfer.setData('application/reactflow/label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  const categories = Object.values(Category);

  // Filter nodes based on search term
  const filteredNodes = NODE_DEFINITIONS.filter(node => 
    node.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
    node.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-700 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-slate-700 shrink-0">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <LucideIcons.Workflow size={24} className="text-blue-500"/>
          FlowGenius
        </h1>
        <p className="text-xs text-slate-400 mt-1">Drag nodes to build workflow</p>
        
        {/* Search Bar */}
        <div className="mt-4 relative group">
          <LucideIcons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={14} />
          <input 
            type="text"
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-md py-2 pl-9 pr-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 placeholder-slate-500 transition-all"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {filteredNodes.length === 0 ? (
          <div className="text-center text-slate-500 text-xs py-8">
            No nodes found matching "{searchTerm}"
          </div>
        ) : (
          categories.map((cat) => {
            const nodesInCategory = filteredNodes.filter(node => node.category === cat);
            
            if (nodesInCategory.length === 0) return null;

            return (
              <div key={cat}>
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">{cat}</h2>
                <div className="grid grid-cols-1 gap-2">
                  {nodesInCategory.map((node) => {
                    const Icon = (LucideIcons as any)[node.iconName] || LucideIcons.Box;
                    return (
                      <div
                        key={node.type}
                        onDragStart={(event) => onDragStart(event, node.type, node.label)}
                        draggable
                        className={`
                          group flex items-center gap-3 p-3 rounded-lg border border-slate-700 bg-slate-800/50 
                          hover:border-blue-500/50 hover:bg-slate-800 cursor-grab active:cursor-grabbing transition-all
                        `}
                      >
                        <div className={`p-1.5 rounded bg-slate-700 group-hover:bg-slate-600 text-slate-300`}>
                          <Icon size={16} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-200">{node.label}</div>
                          <div className="text-[10px] text-slate-500 leading-tight mt-0.5 line-clamp-1">{node.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-4 border-t border-slate-700 bg-slate-900 text-[10px] text-slate-500 text-center shrink-0">
         v1.0.0 &bull; Powered by Gemini
      </div>
    </aside>
  );
};

export default Sidebar;