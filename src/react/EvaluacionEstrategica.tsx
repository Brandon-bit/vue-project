import { useState } from "react";
import { FileText, Award, TrendingUp, AlertCircle, CheckCircle2, Download } from "lucide-react";
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

interface LeccionAprendida {
  id: string;
  objetivo: string;
  leccion: string;
  tipo: 'exito' | 'mejora' | 'problema';
  impacto: string;
  acciones: string;
}

export default function EvaluacionEstrategica() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cierreDialogOpen, setCierreDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [lecciones, setLecciones] = useState<LeccionAprendida[]>([
    {
      id: '1',
      objetivo: 'Incrementar la rentabilidad',
      leccion: 'La implementación temprana de automatización generó ahorros significativos',
      tipo: 'exito',
      impacto: 'Reducción de costos operativos en 12%',
      acciones: 'Expandir programa de automatización a otras áreas'
    },
    {
      id: '2',
      objetivo: 'Aumentar satisfacción del cliente',
      leccion: 'El tiempo de respuesta en canales digitales excedió expectativas iniciales',
      tipo: 'problema',
      impacto: 'NPS por debajo de la meta en Q1',
      acciones: 'Implementar chatbot IA y reforzar equipo de soporte'
    }
  ]);

  const [newLeccion, setNewLeccion] = useState({
    objetivo: '',
    leccion: '',
    tipo: 'exito' as LeccionAprendida['tipo'],
    impacto: '',
    acciones: ''
  });

  const [cierreData, setCierreData] = useState({
    periodo: '',
    cumplimientoGeneral: 0,
    logrosDestacados: '',
    areasOportunidad: '',
    recomendaciones: ''
  });

  const resultadosPeriodo = {
    objetivosEvaluados: 4,
    objetivosCumplidos: 3,
    cumplimientoPromedio: 76,
    iniciativasCompletadas: 1,
    iniciativasEnCurso: 2,
    kpisVerde: 5,
    kpisAmarillo: 3,
    kpisRojo: 1
  };

  const handleAddLeccion = () => {
    if (newLeccion.objetivo && newLeccion.leccion) {
      setLecciones([...lecciones, { id: Date.now().toString(), ...newLeccion }]);
      setNewLeccion({
        objetivo: '',
        leccion: '',
        tipo: 'exito',
        impacto: '',
        acciones: ''
      });
      setDialogOpen(false);
      toast({ title: "Lección registrada", description: "La lección aprendida se ha agregado correctamente" });
    }
  };

  const handleGenerateReport = () => {
    toast({ 
      title: "Reporte generado", 
      description: "El reporte de cierre de periodo se ha generado en formato PDF" 
    });
    setCierreDialogOpen(false);
    setCurrentStep(1);
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'exito': return 'bg-green-500';
      case 'mejora': return 'bg-blue-500';
      case 'problema': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'exito': return 'Éxito';
      case 'mejora': return 'Mejora';
      case 'problema': return 'Problema';
      default: return tipo;
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'exito': return <Award className="h-4 w-4" />;
      case 'mejora': return <TrendingUp className="h-4 w-4" />;
      case 'problema': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Evaluación y Retroalimentación Estratégica</h1>
            <p className="text-muted-foreground mt-1">
              Cierre de ciclo estratégico y captura de conocimiento
            </p>
          </div>
          <div className="flex gap-3">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Registrar Lección
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Nueva Lección Aprendida</DialogTitle>
                  <DialogDescription>
                    Documenta aprendizajes clave del periodo estratégico
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Objetivo Relacionado</Label>
                    <Input
                      value={newLeccion.objetivo}
                      onChange={(e) => setNewLeccion({ ...newLeccion, objetivo: e.target.value })}
                      placeholder="ej. Incrementar la rentabilidad"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de Lección</Label>
                    <Select 
                      value={newLeccion.tipo} 
                      onValueChange={(value) => setNewLeccion({ ...newLeccion, tipo: value as LeccionAprendida['tipo'] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exito">Éxito / Buena práctica</SelectItem>
                        <SelectItem value="mejora">Oportunidad de mejora</SelectItem>
                        <SelectItem value="problema">Problema / Obstáculo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Descripción de la Lección</Label>
                    <Textarea
                      value={newLeccion.leccion}
                      onChange={(e) => setNewLeccion({ ...newLeccion, leccion: e.target.value })}
                      placeholder="Describe qué aprendimos..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Impacto Observado</Label>
                    <Textarea
                      value={newLeccion.impacto}
                      onChange={(e) => setNewLeccion({ ...newLeccion, impacto: e.target.value })}
                      placeholder="¿Qué efecto tuvo en los resultados?"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Acciones Recomendadas</Label>
                    <Textarea
                      value={newLeccion.acciones}
                      onChange={(e) => setNewLeccion({ ...newLeccion, acciones: e.target.value })}
                      placeholder="¿Qué debemos hacer para el próximo periodo?"
                      rows={2}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={handleAddLeccion}>Guardar Lección</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={cierreDialogOpen} onOpenChange={setCierreDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Cerrar Periodo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Wizard de Cierre de Periodo Estratégico</DialogTitle>
                  <DialogDescription>
                    Paso {currentStep} de 3 - Completa la evaluación del periodo
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Resumen de Resultados</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardDescription>Objetivos Cumplidos</CardDescription>
                            <CardTitle className="text-2xl">
                              {resultadosPeriodo.objetivosCumplidos}/{resultadosPeriodo.objetivosEvaluados}
                            </CardTitle>
                          </CardHeader>
                        </Card>
                        <Card>
                          <CardHeader className="pb-3">
                            <CardDescription>Cumplimiento Promedio</CardDescription>
                            <CardTitle className="text-2xl">{resultadosPeriodo.cumplimientoPromedio}%</CardTitle>
                          </CardHeader>
                        </Card>
                        <Card>
                          <CardHeader className="pb-3">
                            <CardDescription>Iniciativas Completadas</CardDescription>
                            <CardTitle className="text-2xl">{resultadosPeriodo.iniciativasCompletadas}</CardTitle>
                          </CardHeader>
                        </Card>
                        <Card>
                          <CardHeader className="pb-3">
                            <CardDescription>KPIs en Meta</CardDescription>
                            <CardTitle className="text-2xl text-green-600">{resultadosPeriodo.kpisVerde}</CardTitle>
                          </CardHeader>
                        </Card>
                      </div>
                      <div className="space-y-2">
                        <Label>Periodo Evaluado</Label>
                        <Input
                          value={cierreData.periodo}
                          onChange={(e) => setCierreData({ ...cierreData, periodo: e.target.value })}
                          placeholder="ej. Q1 2025"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Análisis Cualitativo</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Logros Destacados</Label>
                          <Textarea
                            value={cierreData.logrosDestacados}
                            onChange={(e) => setCierreData({ ...cierreData, logrosDestacados: e.target.value })}
                            placeholder="Describe los principales logros del periodo..."
                            rows={4}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Áreas de Oportunidad</Label>
                          <Textarea
                            value={cierreData.areasOportunidad}
                            onChange={(e) => setCierreData({ ...cierreData, areasOportunidad: e.target.value })}
                            placeholder="Identifica áreas que requieren atención..."
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Lecciones Aprendidas y Recomendaciones</h3>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Lecciones Registradas</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{lecciones.length}</p>
                          <p className="text-xs text-muted-foreground">
                            {lecciones.filter(l => l.tipo === 'exito').length} éxitos, {' '}
                            {lecciones.filter(l => l.tipo === 'problema').length} problemas
                          </p>
                        </CardContent>
                      </Card>
                      <div className="space-y-2">
                        <Label>Recomendaciones para el Próximo Periodo</Label>
                        <Textarea
                          value={cierreData.recomendaciones}
                          onChange={(e) => setCierreData({ ...cierreData, recomendaciones: e.target.value })}
                          placeholder="¿Qué ajustes debemos hacer en la estrategia?..."
                          rows={5}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  {currentStep > 1 && (
                    <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                      Anterior
                    </Button>
                  )}
                  {currentStep < 3 ? (
                    <Button onClick={() => setCurrentStep(currentStep + 1)}>
                      Siguiente
                    </Button>
                  ) : (
                    <Button onClick={handleGenerateReport}>
                      <Download className="mr-2 h-4 w-4" />
                      Generar Reporte Final
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardDescription>Lecciones de Éxito</CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {lecciones.filter(l => l.tipo === 'exito').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardDescription>Oportunidades de Mejora</CardDescription>
              <CardTitle className="text-3xl text-blue-600">
                {lecciones.filter(l => l.tipo === 'mejora').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-3">
              <CardDescription>Problemas Identificados</CardDescription>
              <CardTitle className="text-3xl text-red-600">
                {lecciones.filter(l => l.tipo === 'problema').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-3">
              <CardDescription>Total Lecciones</CardDescription>
              <CardTitle className="text-3xl">{lecciones.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resultados del Periodo Actual</CardTitle>
            <CardDescription>Vista consolidada del desempeño estratégico</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Cumplimiento de Objetivos</span>
                  <span className="text-lg font-bold">{resultadosPeriodo.cumplimientoPromedio}%</span>
                </div>
                <Progress value={resultadosPeriodo.cumplimientoPromedio} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  {resultadosPeriodo.objetivosCumplidos} de {resultadosPeriodo.objetivosEvaluados} objetivos cumplidos
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-sm font-medium">Estado de KPIs</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-600">En meta</span>
                      <span className="font-medium">{resultadosPeriodo.kpisVerde}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-yellow-600">Atención</span>
                      <span className="font-medium">{resultadosPeriodo.kpisAmarillo}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-red-600">Crítico</span>
                      <span className="font-medium">{resultadosPeriodo.kpisRojo}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-sm font-medium">Iniciativas Estratégicas</span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Completadas</span>
                    <span className="font-medium">{resultadosPeriodo.iniciativasCompletadas}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">En curso</span>
                    <span className="font-medium">{resultadosPeriodo.iniciativasEnCurso}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Lecciones Aprendidas</h2>
          <div className="grid gap-4">
            {lecciones.map((leccion) => (
              <Card key={leccion.id} className="border-l-4" style={{ borderLeftColor: getTipoColor(leccion.tipo).replace('bg-', '#') }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getTipoIcon(leccion.tipo)}
                        <CardTitle className="text-base">{leccion.objetivo}</CardTitle>
                      </div>
                      <Badge className={getTipoColor(leccion.tipo)}>
                        {getTipoLabel(leccion.tipo)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-1">Lección:</p>
                    <p className="text-sm text-muted-foreground">{leccion.leccion}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 pt-3 border-t">
                    <div>
                      <p className="text-xs font-medium mb-1">Impacto Observado:</p>
                      <p className="text-xs text-muted-foreground">{leccion.impacto}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-1">Acciones Recomendadas:</p>
                      <p className="text-xs text-muted-foreground">{leccion.acciones}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}