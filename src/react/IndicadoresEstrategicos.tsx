import { useState } from "react";
import { Plus, TrendingUp, TrendingDown, Target, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface KPI {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: 'KPI' | 'OKR';
  perspectiva: string;
  objetivo: string;
  valorActual: number;
  meta: number;
  unidad: string;
  frecuencia: string;
  tendencia: 'ascendente' | 'descendente' | 'estable';
  estado: 'cumpliendo' | 'atencion' | 'critico';
  fuenteDatos: string;
}

export default function IndicadoresEstrategicos() {
  const [kpis, setKpis] = useState<KPI[]>([
    {
      id: '1',
      nombre: 'Margen EBITDA',
      descripcion: 'Rentabilidad operativa antes de intereses, impuestos, depreciación y amortización',
      tipo: 'KPI',
      perspectiva: 'Financiera',
      objetivo: 'Incrementar la rentabilidad',
      valorActual: 22,
      meta: 25,
      unidad: '%',
      frecuencia: 'Mensual',
      tendencia: 'ascendente',
      estado: 'atencion',
      fuenteDatos: 'ERP Financiero'
    },
    {
      id: '2',
      nombre: 'Net Promoter Score (NPS)',
      descripcion: 'Indicador de lealtad y satisfacción del cliente',
      tipo: 'KPI',
      perspectiva: 'Clientes',
      objetivo: 'Aumentar satisfacción del cliente',
      valorActual: 65,
      meta: 75,
      unidad: 'pts',
      frecuencia: 'Trimestral',
      tendencia: 'ascendente',
      estado: 'atencion',
      fuenteDatos: 'Encuestas CRM'
    },
    {
      id: '3',
      nombre: 'Tiempo de Ciclo de Proceso',
      descripcion: 'Días promedio para completar el proceso end-to-end',
      tipo: 'KPI',
      perspectiva: 'Procesos',
      objetivo: 'Mejorar eficiencia operativa',
      valorActual: 8,
      meta: 5,
      unidad: 'días',
      frecuencia: 'Semanal',
      tendencia: 'descendente',
      estado: 'atencion',
      fuenteDatos: 'Sistema de Gestión'
    },
    {
      id: '4',
      nombre: 'ROI',
      descripcion: 'Retorno sobre inversión',
      tipo: 'KPI',
      perspectiva: 'Financiera',
      objetivo: 'Incrementar la rentabilidad',
      valorActual: 18,
      meta: 20,
      unidad: '%',
      frecuencia: 'Mensual',
      tendencia: 'ascendente',
      estado: 'cumpliendo',
      fuenteDatos: 'ERP Financiero'
    },
    {
      id: '5',
      nombre: 'Retención de Talento',
      descripcion: 'Porcentaje de empleados clave que permanecen en la organización',
      tipo: 'OKR',
      perspectiva: 'Aprendizaje',
      objetivo: 'Desarrollar talento clave',
      valorActual: 85,
      meta: 90,
      unidad: '%',
      frecuencia: 'Trimestral',
      tendencia: 'estable',
      estado: 'atencion',
      fuenteDatos: 'Sistema de RH'
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newKPI, setNewKPI] = useState({
    nombre: '',
    descripcion: '',
    tipo: 'KPI' as 'KPI' | 'OKR',
    perspectiva: 'Financiera',
    objetivo: '',
    meta: 0,
    unidad: '%',
    frecuencia: 'Mensual',
    fuenteDatos: 'Manual'
  });

  const handleAddKPI = () => {
    if (newKPI.nombre && newKPI.meta > 0) {
      const nuevo: KPI = {
        id: Date.now().toString(),
        ...newKPI,
        valorActual: 0,
        tendencia: 'estable',
        estado: 'cumpliendo'
      };
      setKpis([...kpis, nuevo]);
      setNewKPI({
        nombre: '',
        descripcion: '',
        tipo: 'KPI',
        perspectiva: 'Financiera',
        objetivo: '',
        meta: 0,
        unidad: '%',
        frecuencia: 'Mensual',
        fuenteDatos: 'Manual'
      });
      setDialogOpen(false);
      toast({ title: "KPI creado", description: "El nuevo indicador se ha agregado correctamente" });
    }
  };

  const getAvance = (kpi: KPI) => {
    return Math.min((kpi.valorActual / kpi.meta) * 100, 100);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'cumpliendo': return 'bg-green-500';
      case 'atencion': return 'bg-yellow-500';
      case 'critico': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'ascendente': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'descendente': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Target className="h-4 w-4 text-gray-600" />;
    }
  };

  const kpisByPerspective = kpis.reduce((acc, kpi) => {
    if (!acc[kpi.perspectiva]) {
      acc[kpi.perspectiva] = [];
    }
    acc[kpi.perspectiva].push(kpi);
    return acc;
  }, {} as Record<string, KPI[]>);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Indicadores Estratégicos</h1>
            <p className="text-muted-foreground mt-1">
              KPIs y OKRs que miden el avance de los objetivos estratégicos
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Indicador
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nuevo Indicador Estratégico</DialogTitle>
                <DialogDescription>
                  Configura un nuevo KPI u OKR para medir el desempeño
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tipo de Indicador</Label>
                    <Select 
                      value={newKPI.tipo} 
                      onValueChange={(value) => setNewKPI({ ...newKPI, tipo: value as 'KPI' | 'OKR' })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KPI">KPI</SelectItem>
                        <SelectItem value="OKR">OKR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Perspectiva BSC</Label>
                    <Select 
                      value={newKPI.perspectiva} 
                      onValueChange={(value) => setNewKPI({ ...newKPI, perspectiva: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Financiera">Financiera</SelectItem>
                        <SelectItem value="Clientes">Clientes</SelectItem>
                        <SelectItem value="Procesos">Procesos Internos</SelectItem>
                        <SelectItem value="Aprendizaje">Aprendizaje y Crecimiento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Nombre del Indicador</Label>
                  <Input
                    value={newKPI.nombre}
                    onChange={(e) => setNewKPI({ ...newKPI, nombre: e.target.value })}
                    placeholder="ej. Margen EBITDA"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <Textarea
                    value={newKPI.descripcion}
                    onChange={(e) => setNewKPI({ ...newKPI, descripcion: e.target.value })}
                    placeholder="Define qué mide este indicador..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Objetivo Estratégico Asociado</Label>
                  <Input
                    value={newKPI.objetivo}
                    onChange={(e) => setNewKPI({ ...newKPI, objetivo: e.target.value })}
                    placeholder="ej. Incrementar la rentabilidad"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Meta</Label>
                    <Input
                      type="number"
                      value={newKPI.meta}
                      onChange={(e) => setNewKPI({ ...newKPI, meta: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Unidad</Label>
                    <Input
                      value={newKPI.unidad}
                      onChange={(e) => setNewKPI({ ...newKPI, unidad: e.target.value })}
                      placeholder="%, $, días"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Frecuencia</Label>
                    <Select 
                      value={newKPI.frecuencia} 
                      onValueChange={(value) => setNewKPI({ ...newKPI, frecuencia: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Diaria">Diaria</SelectItem>
                        <SelectItem value="Semanal">Semanal</SelectItem>
                        <SelectItem value="Mensual">Mensual</SelectItem>
                        <SelectItem value="Trimestral">Trimestral</SelectItem>
                        <SelectItem value="Anual">Anual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Fuente de Datos</Label>
                  <Input
                    value={newKPI.fuenteDatos}
                    onChange={(e) => setNewKPI({ ...newKPI, fuenteDatos: e.target.value })}
                    placeholder="ej. ERP Financiero, Manual, CRM"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleAddKPI}>Crear Indicador</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Indicadores</CardDescription>
              <CardTitle className="text-3xl">{kpis.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Cumpliendo Meta</CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {kpis.filter(k => k.estado === 'cumpliendo').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Requieren Atención</CardDescription>
              <CardTitle className="text-3xl text-yellow-600">
                {kpis.filter(k => k.estado === 'atencion').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Críticos</CardDescription>
              <CardTitle className="text-3xl text-red-600">
                {kpis.filter(k => k.estado === 'critico').length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="todos" className="space-y-6">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="kpi">KPIs</TabsTrigger>
            <TabsTrigger value="okr">OKRs</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="space-y-6">
            {Object.entries(kpisByPerspective).map(([perspectiva, kpisData]) => (
              <div key={perspectiva} className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">{perspectiva}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {kpisData.map((kpi) => (
                    <Card key={kpi.id} className="border-l-4" style={{ borderLeftColor: getEstadoColor(kpi.estado).replace('bg-', '#') }}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-base">{kpi.nombre}</CardTitle>
                              <Badge variant="secondary" className="text-xs">{kpi.tipo}</Badge>
                            </div>
                            <CardDescription className="text-xs">{kpi.descripcion}</CardDescription>
                          </div>
                          {getTendenciaIcon(kpi.tendencia)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">Actual</p>
                            <p className="text-2xl font-bold">{kpi.valorActual}{kpi.unidad}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Meta</p>
                            <p className="text-lg font-medium">{kpi.meta}{kpi.unidad}</p>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Avance</span>
                            <span className="font-medium">{Math.round(getAvance(kpi))}%</span>
                          </div>
                          <Progress value={getAvance(kpi)} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t">
                          <div>
                            <p className="text-muted-foreground">Frecuencia</p>
                            <p className="font-medium">{kpi.frecuencia}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Fuente</p>
                            <p className="font-medium">{kpi.fuenteDatos}</p>
                          </div>
                        </div>

                        {kpi.objetivo && (
                          <div className="text-xs pt-2 border-t">
                            <p className="text-muted-foreground">Objetivo asociado:</p>
                            <p className="font-medium">{kpi.objetivo}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="kpi" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {kpis.filter(k => k.tipo === 'KPI').map((kpi) => (
                <Card key={kpi.id} className="border-l-4" style={{ borderLeftColor: getEstadoColor(kpi.estado).replace('bg-', '#') }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{kpi.nombre}</CardTitle>
                        <CardDescription className="text-xs">{kpi.perspectiva}</CardDescription>
                      </div>
                      {getTendenciaIcon(kpi.tendencia)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Actual</p>
                        <p className="text-2xl font-bold">{kpi.valorActual}{kpi.unidad}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Meta</p>
                        <p className="text-lg font-medium">{kpi.meta}{kpi.unidad}</p>
                      </div>
                    </div>
                    <Progress value={getAvance(kpi)} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="okr" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {kpis.filter(k => k.tipo === 'OKR').map((kpi) => (
                <Card key={kpi.id} className="border-l-4" style={{ borderLeftColor: getEstadoColor(kpi.estado).replace('bg-', '#') }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{kpi.nombre}</CardTitle>
                        <CardDescription className="text-xs">{kpi.perspectiva}</CardDescription>
                      </div>
                      {getTendenciaIcon(kpi.tendencia)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Actual</p>
                        <p className="text-2xl font-bold">{kpi.valorActual}{kpi.unidad}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Meta</p>
                        <p className="text-lg font-medium">{kpi.meta}{kpi.unidad}</p>
                      </div>
                    </div>
                    <Progress value={getAvance(kpi)} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}