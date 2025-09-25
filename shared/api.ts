// Shared API types for Firebase integration and video editor

export interface DemoResponse {
  message: string;
}

// Project Management API
export interface CreateProjectRequest {
  title: string;
  description?: string;
  templateId?: string;
}

export interface CreateProjectResponse {
  projectId: string;
  message: string;
}

export interface GetProjectResponse {
  id: string;
  title: string;
  description?: string;
  status: 'draft' | 'composing' | 'completed' | 'error';
  scenes: SceneInfo[];
  totalDuration: number;
  createdAt: string;
  updatedAt: string;
}

export interface SceneInfo {
  id: string;
  type: 'template' | 'avatar';
  title: string;
  duration: number;
  order: number;
  status: 'draft' | 'generating' | 'ready' | 'error';
  thumbnail?: string;
}

// Scene Management API
export interface CreateSceneRequest {
  projectId: string;
  type: 'template' | 'avatar';
  title: string;
  config: {
    // Template scene config
    templateId?: string;
    customizations?: Record<string, any>;
    
    // Avatar scene config
    avatar?: string;
    script?: string;
    language?: string;
    voice?: string;
  };
}

export interface CreateSceneResponse {
  sceneId: string;
  taskId?: string; // For avatar scenes that need processing
  message: string;
}

export interface UpdateSceneRequest {
  sceneId: string;
  config: Record<string, any>;
}

export interface UpdateSceneResponse {
  success: boolean;
  message: string;
}

// HeyGen Integration API
export interface HeygenSubmitRequest {
  sceneId: string;
  avatar: string;
  script: string;
  language: string;
  voice: string;
}

export interface HeygenSubmitResponse {
  taskId: string;
  estimatedDuration: number;
  message: string;
}

export interface HeygenStatusResponse {
  taskId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: {
    videoUrl: string;
    duration: number;
    thumbnail: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

// Video Composition API
export interface ComposeProjectRequest {
  projectId: string;
  options?: {
    resolution?: '720p' | '1080p' | '4K';
    frameRate?: 24 | 30 | 60;
    format?: 'mp4' | 'mov';
  };
}

export interface ComposeProjectResponse {
  taskId: string;
  estimatedDuration: number;
  message: string;
}

export interface CompositionStatusResponse {
  taskId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: {
    videoUrl: string;
    downloadUrl: string;
    duration: number;
    fileSize: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

// Template Management API
export interface GetTemplatesResponse {
  templates: {
    id: string;
    type: 'head' | 'transition' | 'ending';
    title: string;
    description: string;
    duration: number;
    thumbnail: string;
    tags: string[];
  }[];
}

export interface GetTemplateResponse {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnail: string;
  videoUrl: string;
  customizable: {
    text: boolean;
    colors: boolean;
    logo: boolean;
  };
  defaultConfig: Record<string, any>;
}

// Asset Management API
export interface UploadAssetRequest {
  projectId: string;
  kind: 'avatar' | 'logo' | 'background' | 'audio';
  fileName: string;
}

export interface UploadAssetResponse {
  assetId: string;
  uploadUrl: string;
  message: string;
}

export interface GetAssetsResponse {
  assets: {
    id: string;
    fileName: string;
    kind: string;
    downloadUrl: string;
    createdAt: string;
  }[];
}

// Webhook Types
export interface HeygenWebhookPayload {
  taskId: string;
  status: 'completed' | 'failed';
  result?: {
    videoUrl: string;
    duration: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

// WebSocket Types for real-time updates
export interface WebSocketMessage {
  type: 'task_update' | 'scene_ready' | 'project_status';
  payload: {
    taskId?: string;
    sceneId?: string;
    projectId?: string;
    status?: string;
    progress?: number;
    result?: any;
  };
}

// Authentication Types
export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  organizationId: string;
  role: 'admin' | 'member' | 'viewer';
  permissions: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
  refreshToken: string;
}
