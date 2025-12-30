export enum NodeType {
  TRIGGER_MANUAL = 'trigger_manual',
  TRIGGER_SCHEDULE = 'trigger_schedule',
  TRIGGER_WEBHOOK = 'trigger_webhook',
  ACTION_G_DOCS = 'action_g_docs',
  ACTION_G_SHEETS = 'action_g_sheets',
  ACTION_G_SHEETS_CREATE = 'action_g_sheets_create',
  ACTION_G_CALENDAR_EVENT = 'action_g_calendar_event',
  ACTION_G_FORMS_RESPONSE = 'action_g_forms_response',
  ACTION_EMAIL = 'action_email',
  ACTION_SLACK = 'action_slack',
  ACTION_WHATSAPP = 'action_whatsapp',
  ACTION_WHATSAPP_TEMPLATE = 'action_whatsapp_template',
  ACTION_GITHUB_ISSUE = 'action_github_issue',
  ACTION_GITHUB_ACTION = 'action_github_action',
  ACTION_SCRAPE = 'action_scrape',
  ACTION_HTTP_REQUEST = 'action_http_request',
  LOGIC_IF = 'logic_if',
  LOGIC_SWITCH = 'logic_switch',
  LOGIC_DELAY = 'logic_delay',
  LOGIC_ERROR_HANDLER = 'logic_error_handler',
  MATH_ADD = 'math_add',
  AI_GEMINI = 'ai_gemini',
  UTILITY_TEXT_INPUT = 'utility_text_input',
  UTILITY_FILE_UPLOAD = 'utility_file_upload',
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