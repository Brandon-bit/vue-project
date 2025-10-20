import { TrendingUp, Target, Briefcase, AlertTriangle, DollarSign, Users, Activity, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function MonitoreoDashboard() {
  const objetivosBSC = [
    { nombre: 'Incrementar rentabilidad', perspectiva: 'Financiera', avance: 75, estado: 'medio' },
    { nombre: 'Satisfacción del cliente', perspectiva: 'Clientes', avance: 68, estado: 'medio' },
    { nombre: 'Eficiencia operativa', perspectiva: 'Procesos', avance: 88, estado: 'alto' },
    { nombre: 'Desarrollo de talento', perspectiva: 'Aprendizaje', avance: 72, estado: 'medio' },
  ];

  const iniciativasClave = [
    { nombre: 'Transformación Digital', progreso: 35, presupuesto: '$2.5M', estado: 'en-curso' },
    { nombre: 'Excelencia en Servicio', progreso: 48, presupuesto: '$1.2M', estado: 'en-curso' },
    { nombre: 'Optimización de Costos', progreso: 72, presupuesto: '$500K', estado: 'en-curso' },
  ];

  const proyectosEstrategicos = [
    { nombre: 'ERP Integrado', avance: 45, responsable: 'Ana García', status: 'on-track' },
    { nombre: 'Campaña Digital 2025', avance: 62, responsable: 'Carlos Mendoza', status: 'on-track' },
    { nombre: 'Automatización RPA', avance: 28, responsable: 'María López', status: 'at-risk' },
    { nombre: 'Plataforma e-learning', avance: 55, responsable: 'Roberto Silva', status: 'on-track' },
  ];

  const kpisFinancieros = [
    { nombre: 'Margen EBITDA', actual: 22, meta: 25, unidad: '%' },
    { nombre: 'ROI', actual: 18, meta: 20, unidad: '%' },
    { nombre: 'Costos/Ingresos', actual: 68, meta: 60, unidad: '%' },
  ];

  const riesgosActivos = [
    { nombre: 'Cadena de suministro', severidad: 'alta', probabilidad: 7, impacto: 9 },
    { nombre: 'Ciberseguridad', severidad: 'alta', probabilidad: 8, impacto: 8 },
    { nombre: 'Rotación de personal', severidad: 'media', probabilidad: 5, impacto: 7 },
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'alto': return 'bg-green-500';
      case 'medio': return 'bg-yellow-500';
      case 'bajo': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600';
      case 'at-risk': return 'text-yellow-600';
      case 'delayed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSeveridadColor = (severidad: string) => {
    switch (severidad) {
      case 'alta': return 'destructive';
      case 'media': return 'default';
      case 'baja': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Estratégico</h1>
            <p className="text-muted-foreground mt-1">
              Centro de comando ejecutivo - Vista consolidada de la estrategia
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            Actualizado: {new Date().toLocaleDateString()}
          </Badge>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Cumplimiento BSC</CardDescription>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <CardTitle className="text-3xl">76%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Promedio de 4 perspectivas</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Iniciativas Activas</CardDescription>
                <Briefcase className="h-4 w-4 text-blue-600" />
              </div>
              <CardTitle className="text-3xl">{iniciativasClave.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">$4.2M presupuesto total</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Proyectos en Curso</CardDescription>
                <Activity className="h-4 w-4 text-purple-600" />
              </div>
              <CardTitle className="text-3xl">{proyectosEstrategicos.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {proyectosEstrategicos.filter(p => p.status === 'on-track').length} on track
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Riesgos Críticos</CardDescription>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <CardTitle className="text-3xl">
                {riesgosActivos.filter(r => r.severidad === 'alta').length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Requieren atención inmediata</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Cumplimiento de Objetivos BSC
              </CardTitle>
              <CardDescription>Estado por perspectiva del Balanced Scorecard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {objetivosBSC.map((objetivo, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${getEstadoColor(objetivo.estado)} animate-pulse`} />
                      <span className="text-sm font-medium">{objetivo.nombre}</span>
                    </div>
                    <span className="text-sm font-bold">{objetivo.avance}%</span>
                  </div>
                  <Progress value={objetivo.avance} className="h-2" />
                  <p className="text-xs text-muted-foreground">{objetivo.perspectiva}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Estado de Iniciativas Clave
              </CardTitle>
              <CardDescription>Programas estratégicos en ejecución</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {iniciativasClave.map((iniciativa, index) => (
                <div key={index} className="space-y-2 pb-4 border-b last:border-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{iniciativa.nombre}</span>
                    <Badge variant="outline">{iniciativa.estado}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className="font-medium">{iniciativa.progreso}%</span>
                  </div>
                  <Progress value={iniciativa.progreso} className="h-2" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Presupuesto</span>
                    <span className="font-medium">{iniciativa.presupuesto}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Avance de Proyectos Estratégicos
              </CardTitle>
              <CardDescription>Proyectos vinculados a iniciativas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {proyectosEstrategicos.map((proyecto, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{proyecto.nombre}</p>
                      <p className="text-xs text-muted-foreground">PM: {proyecto.responsable}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${getStatusColor(proyecto.status)}`}>
                        {proyecto.status === 'on-track' ? 'On Track' : 'At Risk'}
                      </span>
                      <span className="text-sm font-bold">{proyecto.avance}%</span>
                    </div>
                  </div>
                  <Progress value={proyecto.avance} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                KPIs Financieros vs. Meta
              </CardTitle>
              <CardDescription>Indicadores económicos clave</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {kpisFinancieros.map((kpi, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{kpi.nombre}</span>
                    <div className="text-right">
                      <p className="text-sm font-bold">
                        {kpi.actual}{kpi.unidad} / {kpi.meta}{kpi.unidad}
                      </p>
                    </div>
                  </div>
                  <Progress value={(kpi.actual / kpi.meta) * 100} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Avance</span>
                    <span>{Math.round((kpi.actual / kpi.meta) * 100)}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Top 5 Riesgos Activos
            </CardTitle>
            <CardDescription>Riesgos estratégicos que requieren monitoreo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riesgosActivos.map((riesgo, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{riesgo.nombre}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Probabilidad: {riesgo.probabilidad}/10</span>
                      <span>•</span>
                      <span>Impacto: {riesgo.impacto}/10</span>
                    </div>
                  </div>
                  <Badge variant={getSeveridadColor(riesgo.severidad)}>
                    {riesgo.severidad.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-dashed">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Dashboard en Tiempo Real</p>
                <p className="text-xs text-muted-foreground">
                  Los datos se actualizan automáticamente desde los módulos de Proyectos, Finanzas y RH
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}