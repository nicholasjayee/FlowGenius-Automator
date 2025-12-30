import { NodeType, Category, NodeDefinition } from './types';

export const NODE_DEFINITIONS: NodeDefinition[] = [
  // Triggers
  {
    type: NodeType.TRIGGER_MANUAL,
    label: 'Manual Start',
    category: Category.TRIGGER,
    description: 'Triggers the flow on button click',
    iconName: 'Play',
    inputs: 0,
    outputs: 1,
    color: 'border-emerald-500 shadow-emerald-500/20'
  },
  {
    type: NodeType.TRIGGER_SCHEDULE,
    label: 'Schedule',
    category: Category.TRIGGER,
    description: 'Runs at a specific time (CRON)',
    iconName: 'Clock',
    inputs: 0,
    outputs: 1,
    color: 'border-emerald-500 shadow-emerald-500/20'
  },
  {
    type: NodeType.TRIGGER_WEBHOOK,
    label: 'Webhook',
    category: Category.TRIGGER,
    description: 'Start flow via HTTP request',
    iconName: 'Bell',
    inputs: 0,
    outputs: 1,
    color: 'border-emerald-500 shadow-emerald-500/20'
  },
  
  // Google
  {
    type: NodeType.ACTION_G_DOCS,
    label: 'Create Doc',
    category: Category.GOOGLE,
    description: 'Create a new Google Doc',
    iconName: 'FileText',
    inputs: 1,
    outputs: 1,
    color: 'border-blue-500 shadow-blue-500/20'
  },
  {
    type: NodeType.ACTION_G_SHEETS_CREATE,
    label: 'Create Sheet',
    category: Category.GOOGLE,
    description: 'Create a new Google Sheet',
    iconName: 'Table',
    inputs: 1,
    outputs: 1,
    color: 'border-green-500 shadow-green-500/20'
  },
  {
    type: NodeType.ACTION_G_SHEETS,
    label: 'Update Sheet',
    category: Category.GOOGLE,
    description: 'Append row to Google Sheet',
    iconName: 'Table',
    inputs: 1,
    outputs: 1,
    color: 'border-green-500 shadow-green-500/20'
  },
  {
    type: NodeType.ACTION_G_CALENDAR_EVENT,
    label: 'Create Event',
    category: Category.GOOGLE,
    description: 'Schedule a Google Calendar event',
    iconName: 'CalendarCheck',
    inputs: 1,
    outputs: 1,
    color: 'border-sky-500 shadow-sky-500/20'
  },
  {
    type: NodeType.ACTION_G_FORMS_RESPONSE,
    label: 'Get Form Responses',
    category: Category.GOOGLE,
    description: 'Retrieve latest responses from a Form',
    iconName: 'ClipboardList',
    inputs: 1,
    outputs: 1,
    color: 'border-violet-500 shadow-violet-500/20'
  },

  // Integrations
  {
    type: NodeType.ACTION_EMAIL,
    label: 'Send Email',
    category: Category.INTEGRATION,
    description: 'Send an email to a recipient',
    iconName: 'Mail',
    inputs: 1,
    outputs: 1,
    color: 'border-cyan-500 shadow-cyan-500/20'
  },
  {
    type: NodeType.ACTION_SLACK,
    label: 'Send Slack',
    category: Category.INTEGRATION,
    description: 'Send a message to a Slack channel',
    iconName: 'Slack',
    inputs: 1,
    outputs: 1,
    color: 'border-fuchsia-500 shadow-fuchsia-500/20'
  },
  {
    type: NodeType.ACTION_WHATSAPP,
    label: 'Send WhatsApp',
    category: Category.INTEGRATION,
    description: 'Send a message via WhatsApp API',
    iconName: 'MessageCircle',
    inputs: 1,
    outputs: 1,
    color: 'border-teal-500 shadow-teal-500/20'
  },
  {
    type: NodeType.ACTION_WHATSAPP_TEMPLATE,
    label: 'WA Template',
    category: Category.INTEGRATION,
    description: 'Send pre-approved template',
    iconName: 'LayoutTemplate',
    inputs: 1,
    outputs: 1,
    color: 'border-teal-500 shadow-teal-500/20'
  },
  {
    type: NodeType.ACTION_GITHUB_ISSUE,
    label: 'Create Issue',
    category: Category.INTEGRATION,
    description: 'Create a GitHub Issue',
    iconName: 'Github',
    inputs: 1,
    outputs: 1,
    color: 'border-neutral-500 shadow-neutral-500/20'
  },
  {
    type: NodeType.ACTION_GITHUB_ACTION,
    label: 'Trigger Workflow',
    category: Category.INTEGRATION,
    description: 'Dispatch a GitHub Action',
    iconName: 'Zap',
    inputs: 1,
    outputs: 1,
    color: 'border-neutral-500 shadow-neutral-500/20'
  },
  {
    type: NodeType.ACTION_SCRAPE,
    label: 'Web Scraper',
    category: Category.INTEGRATION,
    description: 'Extract content from URL',
    iconName: 'Globe',
    inputs: 1,
    outputs: 1,
    color: 'border-pink-500 shadow-pink-500/20'
  },
  {
    type: NodeType.ACTION_HTTP_REQUEST,
    label: 'HTTP Request',
    category: Category.INTEGRATION,
    description: 'Make a generic HTTP request',
    iconName: 'Network',
    inputs: 1,
    outputs: 1,
    color: 'border-indigo-500 shadow-indigo-500/20'
  },

  // AI
  {
    type: NodeType.AI_GEMINI,
    label: 'Gemini AI',
    category: Category.AI,
    description: 'Generate text or analyze data',
    iconName: 'Sparkles',
    inputs: 1,
    outputs: 1,
    color: 'border-purple-500 shadow-purple-500/20'
  },

  // Logic
  {
    type: NodeType.LOGIC_IF,
    label: 'Condition (If/Else)',
    category: Category.LOGIC,
    description: 'Branch flow based on data',
    iconName: 'GitFork',
    inputs: 1,
    outputs: 2,
    color: 'border-orange-500 shadow-orange-500/20'
  },
  {
    type: NodeType.LOGIC_SWITCH,
    label: 'Switch/Case',
    category: Category.LOGIC,
    description: 'Route flow based on value',
    iconName: 'GitBranch', // Using GitBranch as 'Switch' isn't in Lucide standard set, fits logic
    inputs: 1,
    outputs: 3, // Default, Case 1, Case 2
    color: 'border-orange-500 shadow-orange-500/20'
  },
  {
    type: NodeType.LOGIC_DELAY,
    label: 'Delay',
    category: Category.LOGIC,
    description: 'Pause execution for a duration',
    iconName: 'Hourglass',
    inputs: 1,
    outputs: 1,
    color: 'border-amber-500 shadow-amber-500/20'
  },
  {
    type: NodeType.LOGIC_ERROR_HANDLER,
    label: 'Error Handler',
    category: Category.LOGIC,
    description: 'Catch errors from previous nodes',
    iconName: 'ShieldBan',
    inputs: 1,
    outputs: 1,
    color: 'border-rose-500 shadow-rose-500/20'
  },
  {
    type: NodeType.MATH_ADD,
    label: 'Arithmetic',
    category: Category.LOGIC,
    description: 'Perform math operations',
    iconName: 'Calculator',
    inputs: 2,
    outputs: 1,
    color: 'border-indigo-500 shadow-indigo-500/20'
  },

  // Utility
  {
    type: NodeType.UTILITY_TEXT_INPUT,
    label: 'Text Input',
    category: Category.UTILITY,
    description: 'Provide text input to the workflow',
    iconName: 'Keyboard',
    inputs: 0,
    outputs: 1,
    color: 'border-slate-400 shadow-slate-400/20'
  },
  {
    type: NodeType.UTILITY_FILE_UPLOAD,
    label: 'File Upload',
    category: Category.UTILITY,
    description: 'Upload a file to the workflow',
    iconName: 'UploadCloud',
    inputs: 0,
    outputs: 1,
    color: 'border-slate-400 shadow-slate-400/20'
  },
  {
    type: NodeType.UTILITY_FOLDER,
    label: 'Folder',
    category: Category.UTILITY,
    description: 'Group nodes visually',
    iconName: 'Folder',
    inputs: 0,
    outputs: 0,
    color: 'border-slate-500 shadow-slate-500/20'
  },
  {
    type: NodeType.TERMINATOR,
    label: 'End Workflow',
    category: Category.UTILITY,
    description: 'Stop execution',
    iconName: 'StopCircle',
    inputs: 1,
    outputs: 0,
    color: 'border-red-500 shadow-red-500/20'
  }
];

export const INITIAL_NODES = [
  {
    id: '1',
    type: NodeType.TRIGGER_MANUAL,
    position: { x: 250, y: 50 },
    data: { label: 'Manual Start', description: 'Click run to start' },
  },
  {
    id: '2',
    type: NodeType.AI_GEMINI,
    position: { x: 250, y: 200 },
    data: { label: 'Gemini AI', description: 'Generate a creative story idea' },
  },
  {
    id: '3',
    type: NodeType.ACTION_G_DOCS,
    position: { x: 250, y: 350 },
    data: { label: 'Create Doc', description: 'Save idea to Docs' },
  }
];

export const INITIAL_EDGES = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];