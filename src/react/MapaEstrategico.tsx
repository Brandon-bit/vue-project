import { useState } from "react";
import { Target, TrendingUp, Users, Cog, GraduationCap, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface Objetivo {
  id: string;
  nombre: string;
  perspectiva: 'Financiera' | 'Clientes' | 'Procesos' | 'Aprendizaje';
  kpis: KPI[];
  iniciativas: string[];
  proyectos: string[];
  desempeño: 'alto' | 'medio' | 'bajo';
  avance: number;
}

interface KPI {
  nombre: string;
  actual: number;
  meta: number;
  unidad: string;
}

export default function MapaEstrategico() {
  const [selectedObjetivo, setSelectedObjetivo] = useState<Objetivo | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const objetivos: Objetivo[] = [
    {
      id: '1',
      nombre: 'Incrementar la rentabilidad',
      perspectiva: 'Financiera',
      kpis: [
        { nombre: 'Margen EBITDA', actual: 22, meta: 25, unidad: '%' },
        { nombre: 'ROI', actual: 18, meta: 20, unidad: '%' }
      ],
      iniciativas: ['Optimización de costos', 'Expansión de líneas rentables'],
      proyectos: ['Automatización de procesos', 'Lanzamiento producto premium'],
      desempeño: 'medio',
      avance: 75
    },
    {
      id: '2',
      nombre: 'Aumentar satisfacción del cliente',
      perspectiva: 'Clientes',
      kpis: [
        { nombre: 'NPS', actual: 65, meta: 75, unidad: 'pts' },
        { nombre: 'CSAT', actual: 82, meta: 90, unidad: '%' }
      ],
      iniciativas: ['Programa de excelencia en servicio', 'Sistema CRM 360°'],
      proyectos: ['Implementación chatbot IA', 'Rediseño experiencia digital'],
      desempeño: 'medio',
      avance: 68
    },
    {
      id: '3',
      nombre: 'Mejorar eficiencia operativa',
      perspectiva: 'Procesos',
      kpis: [
        { nombre: 'Tiempo de ciclo', actual: 8, meta: 5, unidad: 'días' },
        { nombre: 'Tasa de error', actual: 3.2, meta: 2, unidad: '%' }
      ],
      iniciativas: ['Lean Six Sigma', 'Digitalización de procesos'],
      proyectos: ['ERP Integrado', 'Automatización RPA'],
      desempeño: 'alto',
      avance: 88
    },
    {
      id: '4',
      nombre: 'Desarrollar talento clave',
      perspectiva: 'Aprendizaje',
      kpis: [
        { nombre: 'Horas de capacitación', actual: 32, meta: 40, unidad: 'hrs/año' },
        { nombre: 'Retención de talento', actual: 85, meta: 90, unidad: '%' }
      ],
      iniciativas: ['Academia corporativa', 'Plan de sucesión'],
      proyectos: ['Plataforma e-learning', 'Programa mentoring'],
      desempeño: 'medio',
      avance: 72
    },
    {
      id: '5',
      nombre: 'Reducir costos operativos',
      perspectiva: 'Financiera',
      kpis: [
        { nombre: 'Costos/Ingresos', actual: 68, meta: 60, unidad: '%' }
      ],
      iniciativas: ['Eficiencia energética', 'Renegociación proveedores'],
      proyectos: ['Sistema gestión energética', 'Consolidación proveedores'],
      desempeño: 'medio',
      avance: 65
    },
    {
      id: '6',
      nombre: 'Expandir base de clientes',
      perspectiva: 'Clientes',
      kpis: [
        { nombre: 'Nuevos clientes', actual: 142, meta: 200, unidad: 'clientes' },
        { nombre: 'Market share', actual: 12, meta: 15, unidad: '%' }
      ],
      iniciativas: ['Estrategia go-to-market', 'Alianzas estratégicas'],
      proyectos: ['Campaña digital', 'Expansión regional'],
      desempeño: 'bajo',
      avance: 52
    },
  ];

  const getPerspectiveIcon = (perspectiva: string) => {
    switch (perspectiva) {
      case 'Financiera': return TrendingUp;
      case 'Clientes': return Users;
      case 'Procesos': return Cog;
      case 'Aprendizaje': return GraduationCap;
      default: return Target;
    }
  };

  const getPerspectiveColor = (perspectiva: string) => {
    switch (perspectiva) {
      case 'Financiera': return 'bg-green-500';
      case 'Clientes': return 'bg-blue-500';
      case 'Procesos': return 'bg-yellow-500';
      case 'Aprendizaje': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getDesempeñoColor = (desempeño: string) => {
    switch (desempeño) {
      case 'alto': return 'bg-green-500';
      case 'medio': return 'bg-yellow-500';
      case 'bajo': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleObjetivoClick = (objetivo: Objetivo) => {
    setSelectedObjetivo(objetivo);
    setSheetOpen(true);
  };

  const groupedByPerspective = objetivos.reduce((acc, obj) => {
    if (!acc[obj.perspectiva]) {
      acc[obj.perspectiva] = [];
    }
    acc[obj.perspectiva].push(obj);
    return acc;
  }, {} as Record<string, Objetivo[]>);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mapa Estratégico</h1>
            <p className="text-muted-foreground mt-1">
              Balanced Scorecard - Perspectivas y objetivos interconectados
            </p>
          </div>
        </div>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-sm">Leyenda de Desempeño</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span>Alto (≥85%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <span>Medio (60-84%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span>Bajo (&lt;60%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {(['Financiera', 'Clientes', 'Procesos', 'Aprendizaje'] as const).map((perspectiva) => {
            const Icon = getPerspectiveIcon(perspectiva);
            const color = getPerspectiveColor(perspectiva);
            const objetivosPerspectiva = groupedByPerspective[perspectiva] || [];

            return (
              <div key={perspectiva} className="space-y-4">
                <div className={`flex items-center gap-3 pb-2 border-b-2 ${color.replace('bg-', 'border-')}`}>
                  <div className={`p-2 rounded-lg ${color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold">{perspectiva}</h2>
                  <Badge variant="outline" className="ml-auto">
                    {objetivosPerspectiva.length} objetivos
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {objetivosPerspectiva.map((objetivo) => (
                    <Card 
                      key={objetivo.id} 
                      className="cursor-pointer hover:shadow-lg transition-shadow border-l-4"
                      style={{ borderLeftColor: color.replace('bg-', '#') }}
                      onClick={() => handleObjetivoClick(objetivo)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base leading-tight">{objetivo.nombre}</CardTitle>
                          <div className={`h-3 w-3 rounded-full ${getDesempeñoColor(objetivo.desempeño)} animate-pulse`} />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Avance general</span>
                            <span className="font-medium">{objetivo.avance}%</span>
                          </div>
                          <Progress value={objetivo.avance} className="h-2" />
                        </div>

                        <div className="pt-2 border-t">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{objetivo.kpis.length} KPIs</span>
                            <span className="text-muted-foreground">{objetivo.proyectos.length} proyectos</span>
                          </div>
                        </div>

                        <Button variant="ghost" size="sm" className="w-full">
                          Ver detalles
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
            {selectedObjetivo && (
              <>
                <SheetHeader>
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${getDesempeñoColor(selectedObjetivo.desempeño)} animate-pulse`} />
                    <SheetTitle>{selectedObjetivo.nombre}</SheetTitle>
                  </div>
                  <SheetDescription>
                    Perspectiva: {selectedObjetivo.perspectiva}
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Indicadores Clave (KPIs)</h3>
                    <div className="space-y-3">
                      {selectedObjetivo.kpis.map((kpi, index) => (
                        <Card key={index}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">{kpi.nombre}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-muted-foreground">Actual</span>
                              <span className="text-lg font-bold">{kpi.actual}{kpi.unidad}</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-muted-foreground">Meta</span>
                              <span className="text-sm font-medium">{kpi.meta}{kpi.unidad}</span>
                            </div>
                            <Progress value={(kpi.actual / kpi.meta) * 100} className="h-2" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Iniciativas Estratégicas</h3>
                    <div className="space-y-2">
                      {selectedObjetivo.iniciativas.map((iniciativa, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{iniciativa}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Proyectos Asociados</h3>
                    <div className="space-y-2">
                      {selectedObjetivo.proyectos.map((proyecto, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                          <span className="text-sm">{proyecto}</span>
                          <Badge variant="secondary">En curso</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Avance General</span>
                          <span className="text-2xl font-bold">{selectedObjetivo.avance}%</span>
                        </div>
                        <Progress value={selectedObjetivo.avance} className="h-3" />
                        <p className="text-xs text-muted-foreground">
                          Actualizado en tiempo real desde los proyectos asociados
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}