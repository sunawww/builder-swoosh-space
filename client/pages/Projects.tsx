import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Folder, ArrowRight } from "lucide-react";

export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">组织内的所有项目列表。选择一个继续编辑，或创建新项目。</p>
        </div>
        <Button className="gap-2" asChild>
          <Link to="/editor/new">
            <Plus className="h-4 w-4" />
            新建项目
          </Link>
        </Button>
      </div>

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Folder className="h-5 w-5" /> 即将到来</CardTitle>
          <CardDescription>此页面是占位实现。告诉我需要哪些字段、筛选、视图或排序，我会完善它。</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/editor/new">
              现在开始一个项目 <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
