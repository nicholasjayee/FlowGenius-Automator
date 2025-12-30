import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  Connection,
  Edge,
  Node,
  BackgroundVariant
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './components/Sidebar';
import CustomNode from './components/CustomNode';
import Console from './components/Console';
import { NODE_DEFINITIONS, INITIAL_NODES, INITIAL_EDGES } from './constants';
import { NodeType, LogEntry, WorkflowNodeData } from './types';
import { generateContent } from './services/geminiService';
import { Play, Loader2 } from 'lucide-react';

const nodeTypes = NODE_DEFINITIONS.reduce((acc, def) => {
  acc[def.type] = CustomNode;
  return acc;
}, {} as Record<string, any>);

// Helper for unique IDs
let id = 0;
const getId = () => `node_${id++}_${Date.now()}`;

const Flow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (nodeId: string, nodeLabel: string, message: string, type: LogEntry['type']) => {
    setLogs(prev => [...prev, {
      id: Math.random().toString(36),
      timestamp: new Date(),
      nodeId,
      nodeLabel,
      message,
      type
    }]);
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#64748b', strokeWidth: 2 } }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow/type');
      const label = event.dataTransfer.getData('application/reactflow/label');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label, status: 'idle' },
      };

      setNodes((nds) => nds.concat(newNode));
      addLog(newNode.id, label, 'Node added to canvas', 'info');
    },
    [reactFlowInstance, setNodes]
  );

  // --- EXECUTION ENGINE ---
  const executeWorkflow = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]); // Clear previous logs
    
    // Reset statuses
    setNodes((nds) => nds.map((node) => ({ ...node, data: { ...node.data, status: 'idle' } })));

    addLog('system', 'System', 'Starting workflow execution...', 'info');

    // Simple BFS/Topological execution for demo
    // Find starting nodes (no input edges)
    const targets = new Set(edges.map(e => e.target));
    const startNodes = nodes.filter(n => !targets.has(n.id));

    if (startNodes.length === 0 && nodes.length > 0) {
        addLog('system', 'System', 'No starting trigger found (or cycle detected). Starting from top-most node.', 'warning');
        // Fallback: Just pick the first node
        if(nodes.length > 0) await processNode(nodes[0]);
    } else {
        for (const node of startNodes) {
            await processNode(node);
        }
    }

    setIsRunning(false);
    addLog('system', 'System', 'Workflow execution finished.', 'success');
  };

  const processNode = async (node: Node) => {
    // Update status to running
    updateNodeStatus(node.id, 'running');

    try {
        let outputData = "Success";
        
        // --- SIMULATED LOGIC PER TYPE ---
        switch (node.type) {
            case NodeType.TRIGGER_MANUAL:
                await delay(500);
                addLog(node.id, node.data.label, 'Manual trigger activated.', 'success');
                break;

            case NodeType.TRIGGER_WEBHOOK:
                await delay(200);
                outputData = '{ "event": "user_signup", "id": 123 }';
                addLog(node.id, node.data.label, `Webhook received payload: ${outputData}`, 'success');
                break;
            
            case NodeType.AI_GEMINI:
                addLog(node.id, node.data.label, 'Processing with Gemini...', 'info');
                // We use a mock prompt because we don't have a real input UI for this demo
                // In a real app, we would read `node.data.prompt`
                const prompt = "Analyze the previous step and suggest an improvement."; 
                const result = await generateContent(prompt);
                outputData = result;
                addLog(node.id, node.data.label, 'Gemini generated content.', 'success');
                break;

            case NodeType.ACTION_G_DOCS:
                await delay(1000);
                outputData = "https://docs.google.com/document/d/mock-id";
                addLog(node.id, node.data.label, `Document created: ${outputData}`, 'success');
                break;

            case NodeType.ACTION_G_SHEETS_CREATE:
                await delay(1000);
                outputData = "https://docs.google.com/spreadsheets/d/mock-sheet-id";
                addLog(node.id, node.data.label, `Spreadsheet created: ${outputData}`, 'success');
                break;
            
            case NodeType.ACTION_G_SHEETS:
                await delay(800);
                addLog(node.id, node.data.label, 'Row appended to sheet.', 'success');
                break;

            case NodeType.ACTION_G_CALENDAR_EVENT:
                await delay(1000);
                outputData = "https://calendar.google.com/event?id=mock-event-id";
                addLog(node.id, node.data.label, `Event created: 'Sync Meeting' ${outputData}`, 'success');
                break;
            
            case NodeType.ACTION_WHATSAPP:
                await delay(800);
                addLog(node.id, node.data.label, 'Message sent to +123456789', 'success');
                break;

            case NodeType.ACTION_WHATSAPP_TEMPLATE:
                await delay(800);
                outputData = "Template: 'order_update' sent to +123456789";
                addLog(node.id, node.data.label, outputData, 'success');
                break;

            case NodeType.ACTION_GITHUB_ISSUE:
                await delay(1000);
                outputData = "Issue #101";
                addLog(node.id, node.data.label, 'GitHub Issue #101 created successfully.', 'success');
                break;

            case NodeType.ACTION_GITHUB_ACTION:
                await delay(1200);
                addLog(node.id, node.data.label, 'GitHub Action workflow dispatched successfully.', 'success');
                break;

            case NodeType.ACTION_SCRAPE:
                await delay(1500);
                outputData = "<html><body>Mock Scraped Data</body></html>";
                addLog(node.id, node.data.label, 'Scraped 45kb from URL', 'success');
                break;

            case NodeType.MATH_ADD:
                await delay(300);
                outputData = "42"; // Mock math
                addLog(node.id, node.data.label, 'Calculated result: 42', 'success');
                break;

            case NodeType.LOGIC_DELAY:
                addLog(node.id, node.data.label, 'Waiting 2 seconds...', 'warning');
                await delay(2000);
                break;

            default:
                await delay(500);
                addLog(node.id, node.data.label, 'Step completed successfully.', 'success');
        }

        // Update status to success and store result
        updateNodeData(node.id, { status: 'success', result: outputData });

        // Find next nodes
        const outgoingEdges = edges.filter(e => e.source === node.id);
        for (const edge of outgoingEdges) {
            const nextNode = nodes.find(n => n.id === edge.target);
            if (nextNode) {
                // Pass data conceptually (not fully implemented in state for this demo)
                await processNode(nextNode);
            }
        }

    } catch (err) {
        updateNodeStatus(node.id, 'error');
        addLog(node.id, node.data.label, `Error: ${(err as Error).message}`, 'error');
    }
  };

  const updateNodeStatus = (id: string, status: WorkflowNodeData['status']) => {
    setNodes((nds) => nds.map((n) => {
        if (n.id === id) {
            return { ...n, data: { ...n.data, status } };
        }
        return n;
    }));
  };

  const updateNodeData = (id: string, newData: Partial<WorkflowNodeData>) => {
    setNodes((nds) => nds.map((n) => {
        if (n.id === id) {
            return { ...n, data: { ...n.data, ...newData } };
        }
        return n;
    }));
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950">
      
      {/* Top Bar */}
      <header className="h-14 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-6 shrink-0">
        <div className="text-white font-medium">Untitled Workflow</div>
        <button
            onClick={executeWorkflow}
            disabled={isRunning}
            className={`
                flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all
                ${isRunning 
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'}
            `}
        >
            {isRunning ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} fill="currentColor" />}
            {isRunning ? 'Running...' : 'Run Workflow'}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 flex flex-col h-full relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            snapToGrid
            className="bg-slate-950"
          >
            <Background color="#334155" variant={BackgroundVariant.Dots} gap={20} size={1} />
            <Controls className="bg-slate-800 border-slate-700 text-white fill-white" />
            <MiniMap 
                className="bg-slate-900 border border-slate-700" 
                nodeColor={(n) => {
                    switch(n.data.status) {
                        case 'success': return '#34d399';
                        case 'error': return '#f87171';
                        case 'running': return '#facc15';
                        default: return '#64748b';
                    }
                }}
            />
          </ReactFlow>

          {/* Bottom Console */}
          <Console logs={logs} onClear={() => setLogs([])} />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}