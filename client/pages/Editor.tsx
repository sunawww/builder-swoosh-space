import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Play, 
  Pause,
  Save,
  Download,
  Settings,
  Plus,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Layers,
  User,
  MessageSquare,
  Clock,
  Upload,
  Wand2,
  RefreshCw
} from "lucide-react";

interface Scene {
  id: string;
  type: 'template' | 'avatar';
  title: string;
  duration: number;
  status: 'ready' | 'generating' | 'error';
  thumbnail?: string;
  config?: any;
}

interface Layer {
  id: string;
  type: 'video' | 'text' | 'image' | 'audio';
  name: string;
  visible: boolean;
  locked: boolean;
  startTime: number;
  duration: number;
}

export default function Editor() {
  const { projectId } = useParams();
  const [scenes, setScenes] = useState<Scene[]>([
    {
      id: '1',
      type: 'template',
      title: '片头模板',
      duration: 50,
      status: 'ready',
      thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=150&h=100&fit=crop'
    }
  ]);
  
  const [selectedScene, setSelectedScene] = useState<string>('1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(50);
  const [showSceneForm, setShowSceneForm] = useState(false);
  
  const [layers] = useState<Layer[]>([
    { id: '1', type: 'video', name: '主视频', visible: true, locked: false, startTime: 0, duration: 50 },
    { id: '2', type: 'text', name: '标题文字', visible: true, locked: false, startTime: 5, duration: 40 },
    { id: '3', type: 'audio', name: '背景音乐', visible: true, locked: false, startTime: 0, duration: 50 }
  ]);

  const [avatarForm, setAvatarForm] = useState({
    avatar: '',
    script: '',
    language: 'zh-CN',
    voice: 'female'
  });

  const addScene = (type: 'template' | 'avatar') => {
    if (type === 'avatar') {
      setShowSceneForm(true);
    } else {
      // Add template scene logic
      const newScene: Scene = {
        id: Date.now().toString(),
        type: 'template',
        title: '新模板场景',
        duration: 30,
        status: 'ready'
      };
      setScenes([...scenes, newScene]);
    }
  };

  const submitAvatarScene = async () => {
    const newScene: Scene = {
      id: Date.now().toString(),
      type: 'avatar',
      title: `虚拟人场景 ${scenes.length}`,
      duration: 30,
      status: 'generating',
      config: avatarForm
    };
    
    setScenes([...scenes, newScene]);
    setShowSceneForm(false);
    setAvatarForm({ avatar: '', script: '', language: 'zh-CN', voice: 'female' });
    
    // Simulate HeyGen API call
    setTimeout(() => {
      setScenes(prev => prev.map(scene => 
        scene.id === newScene.id 
          ? { ...scene, status: 'ready', thumbnail: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=150&h=100&fit=crop' }
          : scene
      ));
    }, 5000);
  };

  const deleteScene = (sceneId: string) => {
    setScenes(scenes.filter(scene => scene.id !== sceneId));
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    setTotalDuration(scenes.reduce((sum, scene) => sum + scene.duration, 0));
  }, [scenes]);

  return (
    <div className="h-full flex bg-editor-bg text-white">
      {/* Left Panel - Scene List */}
      <div className="w-80 bg-editor-surface border-r border-editor-border flex flex-col">
        <div className="p-4 border-b border-editor-border">
          <h2 className="text-lg font-semibold mb-3">场景列表</h2>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 gap-2 border-editor-border"
              onClick={() => addScene('template')}
            >
              <Plus className="h-4 w-4" />
              模板
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 gap-2 border-editor-border"
              onClick={() => addScene('avatar')}
            >
              <User className="h-4 w-4" />
              虚拟人
            </Button>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {scenes.map((scene, index) => (
              <Card 
                key={scene.id}
                className={`cursor-pointer transition-colors border-editor-border bg-editor-bg hover:bg-editor-surface/50 ${
                  selectedScene === scene.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedScene(scene.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-10 bg-muted/20 rounded overflow-hidden flex-shrink-0">
                      {scene.thumbnail ? (
                        <img src={scene.thumbnail} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium truncate">{scene.title}</h4>
                        <Badge 
                          variant={scene.status === 'ready' ? 'default' : 
                                  scene.status === 'generating' ? 'secondary' : 'destructive'}
                          className="text-xs"
                        >
                          {scene.status === 'ready' && '就绪'}
                          {scene.status === 'generating' && (
                            <>
                              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                              生成中
                            </>
                          )}
                          {scene.status === 'error' && '错误'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{scene.duration}s</span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteScene(scene.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {/* Avatar Scene Form */}
        {showSceneForm && (
          <div className="p-4 border-t border-editor-border bg-editor-surface">
            <h3 className="text-sm font-semibold mb-3">添加虚拟人场景</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="avatar" className="text-xs">头像</Label>
                <Input
                  id="avatar"
                  placeholder="上传头像或选择预设"
                  value={avatarForm.avatar}
                  onChange={(e) => setAvatarForm({...avatarForm, avatar: e.target.value})}
                  className="mt-1 bg-editor-bg border-editor-border"
                />
              </div>
              
              <div>
                <Label htmlFor="script" className="text-xs">台词</Label>
                <Textarea
                  id="script"
                  placeholder="输入要说的内容..."
                  value={avatarForm.script}
                  onChange={(e) => setAvatarForm({...avatarForm, script: e.target.value})}
                  className="mt-1 bg-editor-bg border-editor-border"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="language" className="text-xs">语言</Label>
                  <Select value={avatarForm.language} onValueChange={(value) => setAvatarForm({...avatarForm, language: value})}>
                    <SelectTrigger className="mt-1 bg-editor-bg border-editor-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh-CN">中文</SelectItem>
                      <SelectItem value="en-US">English</SelectItem>
                      <SelectItem value="ja-JP">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="voice" className="text-xs">音色</Label>
                  <Select value={avatarForm.voice} onValueChange={(value) => setAvatarForm({...avatarForm, voice: value})}>
                    <SelectTrigger className="mt-1 bg-editor-bg border-editor-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">女声</SelectItem>
                      <SelectItem value="male">男声</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={submitAvatarScene}
                  disabled={!avatarForm.script}
                  className="flex-1"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  生成
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setShowSceneForm(false)}
                  className="border-editor-border"
                >
                  取消
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-14 bg-editor-surface border-b border-editor-border px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">项目 #{projectId}</h1>
            <Badge variant="outline" className="border-editor-border">
              {scenes.length} 场景 • {totalDuration}s
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 border-editor-border">
              <Save className="h-4 w-4" />
              保存
            </Button>
            <Button variant="outline" size="sm" className="gap-2 border-editor-border">
              <Eye className="h-4 w-4" />
              预览
            </Button>
            <Button size="sm" className="gap-2">
              <Wand2 className="h-4 w-4" />
              合成视频
            </Button>
          </div>
        </div>

        {/* Canvas and Layers */}
        <div className="flex-1 flex">
          {/* Canvas */}
          <div className="flex-1 p-6 bg-canvas-bg">
            <div className="h-full flex items-center justify-center">
              <div className="w-full max-w-4xl aspect-video bg-black rounded-lg border border-editor-border overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>预览画布</p>
                    <p className="text-sm mt-1">选择场景开始编辑</p>
                  </div>
                </div>
                
                {/* Playback Controls Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={togglePlayback}
                    className="rounded-full h-10 w-10 p-0"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Layers */}
          <div className="w-80 bg-editor-surface border-l border-editor-border">
            <div className="p-4 border-b border-editor-border">
              <h3 className="text-lg font-semibold">图层</h3>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-2">
                {layers.map((layer) => (
                  <Card key={layer.id} className="border-editor-border bg-editor-bg">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="p-1 bg-primary/20 text-primary rounded">
                          {layer.type === 'video' && <Video className="h-4 w-4" />}
                          {layer.type === 'text' && <MessageSquare className="h-4 w-4" />}
                          {layer.type === 'audio' && <Volume2 className="h-4 w-4" />}
                          {layer.type === 'image' && <Upload className="h-4 w-4" />}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">{layer.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {layer.startTime}s - {layer.startTime + layer.duration}s
                          </p>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            // onClick={() => toggleLayerVisibility(layer.id)}
                          >
                            {layer.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Bottom Timeline */}
        <div className="h-32 bg-timeline-bg border-t border-editor-border">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">时间轴</h3>
              <div className="flex items-center gap-4 text-sm">
                <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                <span className="text-muted-foreground">/</span>
                <span>{Math.floor(totalDuration / 60)}:{(totalDuration % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>
            
            {/* Timeline Track */}
            <div className="relative">
              <div className="h-16 bg-timeline-track rounded border border-editor-border overflow-hidden">
                {/* Scene Blocks */}
                {scenes.map((scene, index) => {
                  const startTime = scenes.slice(0, index).reduce((sum, s) => sum + s.duration, 0);
                  const width = (scene.duration / totalDuration) * 100;
                  const left = (startTime / totalDuration) * 100;
                  
                  return (
                    <div
                      key={scene.id}
                      className={`absolute top-0 h-full border-r border-editor-border flex items-center px-2 text-xs font-medium cursor-pointer transition-colors ${
                        selectedScene === scene.id ? 'bg-primary/80' : 'bg-muted/40 hover:bg-muted/60'
                      }`}
                      style={{ left: `${left}%`, width: `${width}%` }}
                      onClick={() => setSelectedScene(scene.id)}
                    >
                      <span className="truncate">{scene.title}</span>
                    </div>
                  );
                })}
                
                {/* Playhead */}
                <div 
                  className="absolute top-0 w-0.5 h-full bg-red-500 z-10"
                  style={{ left: `${(currentTime / totalDuration) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
