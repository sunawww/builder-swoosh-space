import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Video, 
  Users, 
  Wand2, 
  Clock, 
  Download, 
  Layers,
  Mic,
  Globe,
  Sparkles,
  ArrowRight,
  Plus,
  Palette,
  Bot
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  status: 'draft' | 'generating' | 'completed';
  scenes: number;
  duration: string;
  thumbnail: string;
  updatedAt: string;
}

const recentProjects: Project[] = [
  {
    id: "1",
    title: "产品介绍视频",
    status: "completed",
    scenes: 3,
    duration: "2:30",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
    updatedAt: "2小时前"
  },
  {
    id: "2", 
    title: "客户推荐视频",
    status: "generating",
    scenes: 4,
    duration: "1:45",
    thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=300&h=200&fit=crop",
    updatedAt: "5分钟前"
  },
  {
    id: "3",
    title: "培训教程",
    status: "draft",
    scenes: 2,
    duration: "3:15",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    updatedAt: "1天前"
  }
];

export default function Index() {
  const [activeDemo, setActiveDemo] = useState(0);

  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI虚拟人生成",
      description: "集成HeyGen API，快速生成专业虚拟人说话视频"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "模板库",
      description: "丰富的片头模板，支持自定义品牌元素"
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "图层管理",
      description: "专业的图层系统，支持文字、图片、音频叠加"
    },
    {
      icon: <Wand2 className="h-6 w-6" />,
      title: "智能合成",
      description: "云端FFmpeg自动拼接，一键生成成片"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "批量处理",
      description: "同一模板批量生成，适合团队协作"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "多语言支持",
      description: "支持多种语言和音色选择"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="mb-4 gap-2">
            <Sparkles className="h-3 w-3" />
            AI驱动的视频创作平台
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            VideoForge
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            专业的AI视频编辑器，集成虚拟人技术，让每个人都能创作出色的营销视频
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/editor/new">
                <Plus className="h-5 w-5" />
                创建新项目
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Play className="h-5 w-5" />
              观看演示
            </Button>
          </div>

          {/* Demo Video Placeholder */}
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-editor-surface rounded-lg border border-editor-border overflow-hidden relative">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F1c4fb4c0cf824c99863069840cae302f%2F70f799cd748b48718adc417ce3f98b84?format=webp&width=800"
                alt="Editor Demo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Button size="lg" className="rounded-full h-16 w-16 p-0">
                  <Play className="h-8 w-8" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">强大的功能特性</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">最近项目</h2>
            <Button variant="outline" className="gap-2">
              查看全部 <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img 
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge 
                      variant={project.status === 'completed' ? 'default' : 
                               project.status === 'generating' ? 'secondary' : 'outline'}
                      className="gap-1"
                    >
                      {project.status === 'completed' && <Download className="h-3 w-3" />}
                      {project.status === 'generating' && <Clock className="h-3 w-3" />}
                      {project.status === 'draft' && <Video className="h-3 w-3" />}
                      {project.status === 'completed' ? '已完成' : 
                       project.status === 'generating' ? '生成中' : '草稿'}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary">{project.duration}</Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Layers className="h-3 w-3" />
                      {project.scenes} 场景
                    </span>
                    <span>更新于 {project.updatedAt}</span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Button 
                    size="sm" 
                    className="w-full gap-2" 
                    variant={project.status === 'draft' ? 'default' : 'secondary'}
                    asChild
                  >
                    <Link to={`/editor/${project.id}`}>
                      {project.status === 'draft' ? (
                        <>
                          <Play className="h-4 w-4" />
                          继续编辑
                        </>
                      ) : (
                        <>
                          <Video className="h-4 w-4" />
                          查看项目
                        </>
                      )}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">开始创作你的第一个视频</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            从选择模板开始，添加虚拟人镜头，几分钟内即可生成专业质量的营销视频
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link to="/editor/new">
              <Plus className="h-5 w-5" />
              立即开始
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
