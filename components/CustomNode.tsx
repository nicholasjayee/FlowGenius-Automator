import React, { memo } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from 'reactflow';
import * as LucideIcons from 'lucide-react';
import { NODE_DEFINITIONS } from '../constants';
import { NodeType } from '../types';

const CustomNode = ({ id, data, type, selected }: NodeProps) => {
  const definition = NODE_DEFINITIONS.find(def => def.type === type);
  const { setNodes } = useReactFlow();
  
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

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setNodes((nds) => nds.map((node) => {
          if (node.id === id) {
              return {
                  ...node,
                  data: {
                      ...node.data,
                      config: {
                          ...node.data.config,
                          text: newValue
                      }
                  }
              };
          }
          return node;
      }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNodes((nds) => nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              config: {
                ...node.data.config,
                fileName: file.name,
                fileSize: file.size
              }
            }
          };
        }
        return node;
      }));
    }
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      setNodes((nds) => nds.map((node) => {
          if (node.id === id) {
              return {
                  ...node,
                  data: {
                      ...node.data,
                      config: { ...node.data.config, method: newValue }
                  }
              };
          }
          return node;
      }));
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setNodes((nds) => nds.map((node) => {
          if (node.id === id) {
              return {
                  ...node,
                  data: {
                      ...node.data,
                      config: { ...node.data.config, url: newValue }
                  }
              };
          }
          return node;
      }));
  };

  return (
    <div 
      title={definition?.description}
      className={`
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

        {/* Special Input: Text Area for User Input */}
        {type === NodeType.UTILITY_TEXT_INPUT && (
            <textarea
                className="nodrag w-full h-20 bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 resize-none mb-2"
                placeholder="Type here..."
                value={data.config?.text || ''}
                onChange={handleTextChange}
            />
        )}

        {/* Special Input: File Upload */}
        {type === NodeType.UTILITY_FILE_UPLOAD && (
          <div className="mb-2">
             <label className="block w-full text-xs text-slate-400 bg-slate-900 border border-slate-700 border-dashed rounded p-3 text-center cursor-pointer hover:border-blue-500 hover:text-blue-400 transition-all">
                <input 
                  type="file" 
                  className="hidden nodrag" 
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center gap-1">
                   <LucideIcons.UploadCloud size={20} />
                   <span>{data.config?.fileName || "Choose File"}</span>
                </div>
             </label>
             {data.config?.fileName && (
                 <div className="mt-1 text-[10px] text-emerald-500 text-center">
                    {(data.config.fileSize / 1024).toFixed(1)} KB selected
                 </div>
             )}
          </div>
        )}

        {/* Special Input: HTTP Request */}
        {type === NodeType.ACTION_HTTP_REQUEST && (
            <div className="space-y-2 mb-2">
                <select
                    className="nodrag w-full bg-slate-900 border border-slate-700 rounded p-1 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
                    value={data.config?.method || 'GET'}
                    onChange={handleMethodChange}
                >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
                <input
                    className="nodrag w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 placeholder-slate-500"
                    placeholder="https://api.example.com"
                    value={data.config?.url || ''}
                    onChange={handleUrlChange}
                />
            </div>
        )}
        
        {/* Mock Visualization of Internal Data */}
        {data.result && (
            <div className="mt-2 p-2 bg-slate-900 rounded text-[10px] font-mono text-emerald-400 overflow-hidden text-ellipsis whitespace-nowrap">
                Last Out: {data.result.substring(0, 20)}...
            </div>
        )}
      </div>

      {/* Default Outputs */}
      {definition && definition.outputs > 0 && type !== NodeType.LOGIC_SWITCH && (
         <Handle 
           type="source" 
           position={Position.Bottom} 
           className="!bg-slate-400 !w-3 !h-3 !border-2 !border-slate-800" 
         />
      )}
      
      {/* Special Logic: If */}
      {type === NodeType.LOGIC_IF && (
          <Handle
            id="false"
            type="source"
            position={Position.Right}
            className="!bg-red-400 !w-3 !h-3 !border-2 !border-slate-800 top-[70%]"
            title="False Path"
          />
      )}

      {/* Special Logic: Switch */}
      {type === NodeType.LOGIC_SWITCH && (
        <>
           {/* Default Path */}
           <Handle 
             id="default"
             type="source" 
             position={Position.Bottom} 
             className="!bg-slate-400 !w-3 !h-3 !border-2 !border-slate-800"
             title="Default" 
           />
           {/* Case 1 */}
           <Handle
            id="case1"
            type="source"
            position={Position.Right}
            className="!bg-blue-400 !w-3 !h-3 !border-2 !border-slate-800 top-[40%]"
            title="Case 1"
          />
          {/* Case 2 */}
          <Handle
            id="case2"
            type="source"
            position={Position.Right}
            className="!bg-purple-400 !w-3 !h-3 !border-2 !border-slate-800 top-[70%]"
            title="Case 2"
          />
        </>
      )}
    </div>
  );
};

export default memo(CustomNode);