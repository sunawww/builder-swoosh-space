import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Layers, ArrowRight } from "lucide-react";

const templates = [
  { id: 'head-50s', type: 'head' as const, title: '片头模板（50s）', duration: 50, tags: ['品牌片头','默认'] },
  { id: 'transition-a', type: 'transition' as const, title: '转场 A', duration: 5, tags: ['转场'] },
  { id: 'ending-basic', type: 'ending' as const, title: '片尾基础', duration: 8, tags: ['片尾'] },
];

export default function Templates() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Templates</h1>
          <p className="text-muted-foreground mt-1">从模板库选择片头/转场/片尾，或告诉我你的Figma链接我来匹配像素级样式。</p>
        </div>
        <Button variant="outline" className="gap-2" asChild>
          <Link to="/editor/new">
            以“片头模板（50s）”开始 <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(t => (
          <Card key={t.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" /> {t.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Badge variant="secondary">{t.type}</Badge>
                <span>{t.duration}s</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="gap-2" asChild>
                <Link to="/editor/new">
                  <Sparkles className="h-4 w-4" /> 使用此模板
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
