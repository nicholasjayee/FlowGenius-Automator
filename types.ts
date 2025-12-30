export enum NodeType {
  TRIGGER_MANUAL = 'trigger_manual',
  TRIGGER_SCHEDULE = 'trigger_schedule',
  TRIGGER_WEBHOOK = 'trigger_webhook',
  ACTION_G_DOCS = 'action_g_docs',
  ACTION_G_SHEETS = 'action_g_sheets',
  ACTION_G_SHEETS_CREATE = 'action_g_sheets_create',
  ACTION_G_CALENDAR_EVENT = 'action_g_calendar_event',
  ACTION_WHATSAPP = 'action_whatsapp',
  ACTION_WHATSAPP_TEMPLATE = 'action_whatsapp_template',
  ACTION_GITHUB_ISSUE = 'action_github_issue',
  ACTION_GITHUB_ACTION = 'action_github_action',
  ACTION_SCRAPE = 'action_scrape',
  LOGIC_IF = 'logic_if',
  LOGIC_DELAY = 'logic_delay',
  MATH_ADD = 'math_add',
  AI_GEMINI = 'ai_gemini',
  TERMINATOR = 'terminator'
}

export interface WorkflowNodeData {
  label: string;
  description?: string;
  icon?: string;
  status?: 'idle' | 'running' | 'success' | 'error';
  result?: string;
  // Node specific config (mocked for UI)
  config?: Record<string, any>;
  onRun?: () => void;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  nodeId: string;
  nodeLabel: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

export enum Category {
  TRIGGER = 'Trigger',
  GOOGLE = 'Google Workspace',
  INTEGRATION = 'Integrations',
  LOGIC = 'Logic & Math',
  AI = 'Artificial Intelligence',
  UTILITY = 'Utility'
}

export interface NodeDefinition {
  type: NodeType;
  label: string;
  category: Category;
  description: string;
  iconName: string; // Mapping to Lucide icon name
  inputs: number;
  outputs: number;
  color: string;
}