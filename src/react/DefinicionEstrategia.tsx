import { useState } from "react";
import { Plus, Target, Eye, Heart, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Objetivo {
  id: string;
  nombre: string;
  descripcion: string;
  especifico: boolean;
  medible: boolean;
  alcanzable: boolean;
  relevante: boolean;
  temporal: boolean;
  perspectiva: string;
  kpi: string;
  meta: string;
  plazo: string;
}

export default function DefinicionEstrategia() {
  const [identidad, setIdentidad] = useState({
    mision: "Proporcionar soluciones innovadoras que transformen la manera en que las empresas operan, impulsando su crecimiento sostenible.",
    vision: "Ser líderes globales en transformación digital empresarial para 2030, reconocidos por nuestra excelencia e innovación.",
    valores: "Integridad, Innovación, Excelencia, Colaboración, Sostenibilidad"
  });

  const [objetivos, setObjetivos] = useState<Objetivo[]>([
    {
      id: '1',
      nombre: 'Incrementar la rentabilidad',
      descripcion: 'Aumentar el margen EBITDA en 5 puntos porcentuales',
      especifico: true,
      medible: true,
      alcanzable: true,
      relevante: true,
      temporal: true,
      perspectiva: 'Financiera',
      kpi: 'Margen EBITDA',
      meta: '25%',
      plazo: 'Diciembre 2025'
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [identidadEditing, setIdentidadEditing] = useState(false);
  
  const [newObjetivo, setNewObjetivo] = useState<Partial<Objetivo>>({
    nombre: '',
    descripcion: '',
    especifico: false,
    medible: false,
    alcanzable: false,
    relevante: false,
    temporal: false,
    perspectiva: 'Financiera',
    kpi: '',
    meta: '',
    plazo: ''
  });

  const handleSaveIdentidad = () => {
    setIdentidadEditing(false);
    toast({ title: "Identidad actualizada", description: "Los cambios se han guardado correctamente" });
  };

  const handleAddObjetivo = () => {
    const smartScore = [
      newObjetivo.especifico,
      newObjetivo.medible,
      newObjetivo.alcanzable,
      newObjetivo.relevante,
      newObjetivo.temporal
    ].filter(Boolean).length;

    if (newObjetivo.nombre && smartScore === 5) {
      setObjetivos([...objetivos, { id: Date.now().toString(), ...newObjetivo } as Objetivo]);
      setNewObjetivo({
        nombre: '',
        descripcion: '',
        especifico: false,
        medible: false,
        alcanzable: false,
        relevante: false,
        temporal: false,
        perspectiva: 'Financiera',
        kpi: '',
        meta: '',
        plazo: ''
      });
      setDialogOpen(false);
      toast({ title: "Objetivo creado", description: "El objetivo estratégico se ha agregado correctamente" });
    } else {
      toast({ 
        title: "Objetivo incompleto", 
        description: "Asegúrate de que el objetivo cumpla con todos los criterios SMART",
        variant: "destructive"
      });
    }
  };

  const getSMARTScore = (obj: Objetivo) => {
    return [obj.especifico, obj.medible, obj.alcanzable, obj.relevante, obj.temporal].filter(Boolean).length;
  };

  const getPerspectiveColor = (perspectiva: string) => {
    const colors: Record<string, string> = {
      'Financiera': 'bg-green-500',
      'Clientes': 'bg-blue-500',
      'Procesos': 'bg-yellow-500',
      'Aprendizaje': 'bg-purple-500'
    };
    return colors[perspectiva] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Definición de Estrategia</h1>
            <p className="text-muted-foreground mt-1">
              Identidad corporativa y objetivos estratégicos
            </p>
          </div>
        </div>

        <Tabs defaultValue="identidad" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="identidad">Identidad Corporativa</TabsTrigger>
            <TabsTrigger value="objetivos">Objetivos Estratégicos</TabsTrigger>
          </TabsList>

          <TabsContent value="identidad" className="space-y-6">
            <div className="flex justify-end">
              {identidadEditing ? (
                <Button onClick={handleSaveIdentidad}>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setIdentidadEditing(true)}>
                  Editar
                </Button>
              )}
            </div>

            <div className="grid gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    <CardTitle>Misión</CardTitle>
                  </div>
                  <CardDescription>¿Cuál es nuestro propósito?</CardDescription>
                </CardHeader>
                <CardContent>
                  {identidadEditing ? (
                    <Textarea
                      value={identidad.mision}
                      onChange={(e) => setIdentidad({ ...identidad, mision: e.target.value })}
                      rows={4}
                      className="resize-none"
                    />
                  ) : (
                    <p className="text-sm leading-relaxed">{identidad.mision}</p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-purple-500" />
                    <CardTitle>Visión</CardTitle>
                  </div>
                  <CardDescription>¿Hacia dónde vamos?</CardDescription>
                </CardHeader>
                <CardContent>
                  {identidadEditing ? (
                    <Textarea
                      value={identidad.vision}
                      onChange={(e) => setIdentidad({ ...identidad, vision: e.target.value })}
                      rows={4}
                      className="resize-none"
                    />
                  ) : (
                    <p className="text-sm leading-relaxed">{identidad.vision}</p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-green-500" />
                    <CardTitle>Valores</CardTitle>
                  </div>
                  <CardDescription>¿Qué nos define?</CardDescription>
                </CardHeader>
                <CardContent>
                  {identidadEditing ? (
                    <Textarea
                      value={identidad.valores}
                      onChange={(e) => setIdentidad({ ...identidad, valores: e.target.value })}
                      rows={3}
                      className="resize-none"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {identidad.valores.split(',').map((valor, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {valor.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="objetivos" className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Constructor de objetivos SMART</p>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Objetivo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Constructor de Objetivo SMART</DialogTitle>
                    <DialogDescription>
                      Crea un objetivo estratégico siguiendo la metodología SMART
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-2">
                      <Label>Nombre del Objetivo</Label>
                      <Input
                        value={newObjetivo.nombre}
                        onChange={(e) => setNewObjetivo({ ...newObjetivo, nombre: e.target.value })}
                        placeholder="ej. Incrementar la rentabilidad"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Descripción</Label>
                      <Textarea
                        value={newObjetivo.descripcion}
                        onChange={(e) => setNewObjetivo({ ...newObjetivo, descripcion: e.target.value })}
                        placeholder="Describe el objetivo en detalle..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Perspectiva BSC</Label>
                      <Select 
                        value={newObjetivo.perspectiva} 
                        onValueChange={(value) => setNewObjetivo({ ...newObjetivo, perspectiva: value })}
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

                    <div className="space-y-3 rounded-lg border p-4 bg-muted/50">
                      <Label className="text-base font-semibold">Criterios SMART</Label>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="especifico"
                          checked={newObjetivo.especifico}
                          onChange={(e) => setNewObjetivo({ ...newObjetivo, especifico: e.target.checked })}
                          className="h-4 w-4"
                        />
                        <label htmlFor="especifico" className="text-sm">
                          <span className="font-medium">Específico:</span> El objetivo es claro y concreto
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="medible"
                          checked={newObjetivo.medible}
                          onChange={(e) => setNewObjetivo({ ...newObjetivo, medible: e.target.checked })}
                          className="h-4 w-4"
                        />
                        <label htmlFor="medible" className="text-sm">
                          <span className="font-medium">Medible:</span> Se puede cuantificar el progreso
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="alcanzable"
                          checked={newObjetivo.alcanzable}
                          onChange={(e) => setNewObjetivo({ ...newObjetivo, alcanzable: e.target.checked })}
                          className="h-4 w-4"
                        />
                        <label htmlFor="alcanzable" className="text-sm">
                          <span className="font-medium">Alcanzable:</span> Es realista y factible
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="relevante"
                          checked={newObjetivo.relevante}
                          onChange={(e) => setNewObjetivo({ ...newObjetivo, relevante: e.target.checked })}
                          className="h-4 w-4"
                        />
                        <label htmlFor="relevante" className="text-sm">
                          <span className="font-medium">Relevante:</span> Está alineado con la estrategia
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="temporal"
                          checked={newObjetivo.temporal}
                          onChange={(e) => setNewObjetivo({ ...newObjetivo, temporal: e.target.checked })}
                          className="h-4 w-4"
                        />
                        <label htmlFor="temporal" className="text-sm">
                          <span className="font-medium">Temporal:</span> Tiene un plazo definido
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>KPI Asociado</Label>
                        <Input
                          value={newObjetivo.kpi}
                          onChange={(e) => setNewObjetivo({ ...newObjetivo, kpi: e.target.value })}
                          placeholder="ej. Margen EBITDA"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Meta</Label>
                        <Input
                          value={newObjetivo.meta}
                          onChange={(e) => setNewObjetivo({ ...newObjetivo, meta: e.target.value })}
                          placeholder="ej. 25%"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Plazo</Label>
                      <Input
                        value={newObjetivo.plazo}
                        onChange={(e) => setNewObjetivo({ ...newObjetivo, plazo: e.target.value })}
                        placeholder="ej. Diciembre 2025"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={handleAddObjetivo}>Crear Objetivo</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {objetivos.map((objetivo) => (
                <Card key={objetivo.id} className="border-l-4" style={{ borderLeftColor: getPerspectiveColor(objetivo.perspectiva).replace('bg-', '#') }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{objetivo.nombre}</CardTitle>
                        <CardDescription>{objetivo.descripcion}</CardDescription>
                      </div>
                      <Badge variant="outline">{objetivo.perspectiva}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">KPI</p>
                        <p className="font-medium">{objetivo.kpi}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Meta</p>
                        <p className="font-medium">{objetivo.meta}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Plazo</p>
                        <p className="font-medium">{objetivo.plazo}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">SMART Score:</span>
                      <div className="flex gap-1">
                        {[objetivo.especifico, objetivo.medible, objetivo.alcanzable, objetivo.relevante, objetivo.temporal].map((criteria, index) => (
                          <div 
                            key={index} 
                            className={`h-2 w-8 rounded ${criteria ? 'bg-green-500' : 'bg-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium">{getSMARTScore(objetivo)}/5</span>
                    </div>
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