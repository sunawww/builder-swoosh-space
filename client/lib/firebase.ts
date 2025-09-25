// Firebase configuration and initialization
// Note: This is a placeholder structure for future Firebase integration

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Firebase service interfaces
export interface Project {
  id: string;
  title: string;
  description?: string;
  organizationId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'composing' | 'completed' | 'error';
  settings: {
    resolution: '1080p' | '720p' | '4K';
    frameRate: 24 | 30 | 60;
    aspectRatio: '16:9' | '9:16' | '1:1';
  };
}

export interface Scene {
  id: string;
  projectId: string;
  type: 'template' | 'avatar';
  title: string;
  duration: number;
  order: number;
  status: 'draft' | 'generating' | 'ready' | 'error';
  config: {
    // For template scenes
    templateId?: string;
    customizations?: Record<string, any>;
    
    // For avatar scenes
    avatar?: string;
    script?: string;
    language?: string;
    voice?: string;
    heygenTaskId?: string;
  };
  assets: {
    thumbnail?: string;
    video?: string;
    audio?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  type: 'head' | 'transition' | 'ending';
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
  tags: string[];
  createdAt: Date;
}

export interface Asset {
  id: string;
  projectId: string;
  kind: 'template' | 'avatar' | 'intermediate' | 'final';
  fileName: string;
  fileSize: number;
  mimeType: string;
  storageUrl: string;
  downloadUrl?: string;
  metadata: Record<string, any>;
  createdAt: Date;
}

export interface GenerationTask {
  id: string;
  projectId: string;
  type: 'heygen' | 'compose' | 'template';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  config: Record<string, any>;
  result?: {
    assetId?: string;
    downloadUrl?: string;
    duration?: number;
  };
  error?: {
    code: string;
    message: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  settings: {
    defaultResolution: string;
    allowedFileTypes: string[];
    storageLimit: number;
  };
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  organizationId: string;
  role: 'admin' | 'member' | 'viewer';
  permissions: string[];
  createdAt: Date;
  lastLoginAt: Date;
}

// Firestore collection paths
export const COLLECTIONS = {
  PROJECTS: 'projects',
  SCENES: 'scenes',
  TEMPLATES: 'templates',
  ASSETS: 'assets',
  GENERATION_TASKS: 'generationTasks',
  ORGANIZATIONS: 'organizations',
  USERS: 'users',
} as const;

// Firebase Cloud Functions endpoints
export const CLOUD_FUNCTIONS = {
  SUBMIT_HEYGEN: 'submitHeygen',
  COMPOSE_PROJECT: 'composeProject',
  GENERATE_THUMBNAIL: 'generateThumbnail',
  WEBHOOK_HEYGEN: 'webhookHeygen',
} as const;

// Example Firebase service functions (placeholder)
export class FirebaseService {
  static async getProject(projectId: string): Promise<Project | null> {
    // Implementation would use Firebase SDK
    console.log('Getting project:', projectId);
    return null;
  }

  static async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    // Implementation would use Firebase SDK
    console.log('Creating project:', project);
    return 'new-project-id';
  }

  static async getScenes(projectId: string): Promise<Scene[]> {
    // Implementation would use Firebase SDK
    console.log('Getting scenes for project:', projectId);
    return [];
  }

  static async createScene(scene: Omit<Scene, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    // Implementation would use Firebase SDK
    console.log('Creating scene:', scene);
    return 'new-scene-id';
  }

  static async submitHeygenTask(sceneId: string, config: any): Promise<string> {
    // Implementation would call Cloud Function
    console.log('Submitting HeyGen task for scene:', sceneId, config);
    return 'task-id';
  }

  static async composeProject(projectId: string): Promise<string> {
    // Implementation would call Cloud Function
    console.log('Composing project:', projectId);
    return 'composition-task-id';
  }

  static async uploadAsset(file: File, projectId: string, kind: string): Promise<string> {
    // Implementation would use Firebase Storage
    console.log('Uploading asset:', file.name, 'to project:', projectId);
    return 'asset-url';
  }
}

// Authentication context and hooks would go here
// export const useAuth = () => { ... }
// export const AuthProvider = ({ children }) => { ... }
