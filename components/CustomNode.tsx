import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import * as LucideIcons from 'lucide-react';
import { NODE_DEFINITIONS } from '../constants';
import { NodeType } from '../types';

const CustomNode = ({ data, type, selected }: NodeProps) => {
  const definition = NODE_DEFINITIONS.find(def => def.type === type);
  
  // Dynamic Icon rendering
  const IconComponent = definition ? (LucideIcons as any)[definition.iconName] : LucideIcons.Box;
  const borderColor = definition?.color || 'border-gray-500';

  // Status indicator
  const getStatusColor = () => {
    switch (data.status) {
      case 'running': return 'bg-yellow-400 animate-pulse';
      case 'success': return 'bg-emerald-400';
      case 'error': return 'bg-red-500';
      default: return 'bg-slate-600';
    }
  };

  return (
    <div className={`
      relative min-w-[200px] bg-slate-800 rounded-lg border-2 
      ${selected ? 'border-blue-400 ring-2 ring-blue-400/30' : borderColor} 
      ${data.status === 'running' ? 'ring-2 ring-yellow-400/50' : ''}
      transition-all duration-200 shadow-xl
    `}>
      {/* Inputs */}
      {definition && definition.inputs > 0 && (
         <Handle 
           type="target" 
           position={Position.Top} 
           className="!bg-slate-400 !w-3 !h-3 !border-2 !border-slate-800" 
         />
      )}

      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b border-slate-700/50 bg-slate-900/30 rounded-t-md">
        <div className={`p-2 rounded-md bg-slate-700/50 text-white`}>
          {IconComponent && <IconComponent size={16} />}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white">{data.label}</h3>
          <p className="text-[10px] text-slate-400">{definition?.category}</p>
        </div>
        <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
      </div>

      {/* Body */}
      <div className="p-3">
        <p className="text-xs text-slate-400 leading-relaxed mb-2">
            {definition?.description}
        </p>
        
        {/* Mock Visualization of Internal Data */}
        {data.result && (
            <div className="mt-2 p-2 bg-slate-900 rounded text-[10px] font-mono text-emerald-400 overflow-hidden text-ellipsis whitespace-nowrap">
                Last Out: {data.result.substring(0, 20)}...
            </div>
        )}
      </div>

      {/* Outputs */}
      {definition && definition.outputs > 0 && (
         <Handle 
           type="source" 
           position={Position.Bottom} 
           className="!bg-slate-400 !w-3 !h-3 !border-2 !border-slate-800" 
         />
      )}
      
      {/* Special Logic Handle for Conditionals */}
      {type === NodeType.LOGIC_IF && (
          <Handle
            id="false"
            type="source"
            position={Position.Right}
            className="!bg-red-400 !w-3 !h-3 !border-2 !border-slate-800 top-[70%]"
            title="False Path"
          />
      )}
    </div>
  );
};

export default memo(CustomNode);