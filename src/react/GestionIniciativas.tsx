import { useState } from "react";
import { Plus, Rocket, Target, Users, Calendar, TrendingUp } from "lucide-react";
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

interface Iniciativa {
  id: string;
  nombre: string;
  descripcion: string;
  objetivo: string;
  lider: string;
  fechaInicio: string;
  fechaFin: string;
  progreso: number;
  estado: 'planeacion' | 'en-curso' | 'pausada' | 'completada';
  presupuesto: string;
  convertida: boolean;
}

export default function GestionIniciativas() {
  const [iniciativas, setIniciativas] = useState<Iniciativa[]>([
    {
      id: '1',
      nombre: 'Transformación Digital',
      descripcion: 'Modernización de sistemas y procesos mediante adopción de tecnologías cloud y automatización',
      objetivo: 'Mejorar eficiencia operativa',
      lider: 'Ana García',
      fechaInicio: '2025-01-15',
      fechaFin: '2025-12-31',
      progreso: 35,
      estado: 'en-curso',
      presupuesto: '$2,500,000',
      convertida: false
    },
    {
      id: '2',
      nombre: 'Excelencia en Servicio al Cliente',
      descripcion: 'Programa integral para elevar la experiencia del cliente en todos los puntos de contacto',
      objetivo: 'Aumentar satisfacción del cliente',
      lider: 'Carlos Mendoza',
      fechaInicio: '2025-02-01',
      fechaFin: '2025-11-30',
      progreso: 48,
      estado: 'en-curso',
      presupuesto: '$1,200,000',
      convertida: false
    },
    {
      id: '3',
      nombre: 'Optimización de Costos',
      descripcion: 'Revisión y eficiencia de estructura de costos operativos',
      objetivo: 'Reducir costos operativos',
      lider: 'María López',
      fechaInicio: '2025-01-01',
      fechaFin: '2025-06-30',
      progreso: 72,
      estado: 'en-curso',
      presupuesto: '$500,000',
      convertida: true
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [convertDialogOpen, setConvertDialogOpen] = useState(false);
  const [selectedIniciativa, setSelectedIniciativa] = useState<Iniciativa | null>(null);
  
  const [newIniciativa, setNewIniciativa] = useState({
    nombre: '',
    descripcion: '',
    objetivo: '',
    lider: '',
    fechaInicio: '',
    fechaFin: '',
    presupuesto: '',
    estado: 'planeacion' as Iniciativa['estado']
  });

  const [proyectoData, setProyectoData] = useState({
    nombre: '',
    descripcion: '',
    objetivo: '',
    lider: '',
    fechaInicio: '',
    fechaFin: '',
    presupuesto: ''
  });

  const handleAddIniciativa = () => {
    if (newIniciativa.nombre && newIniciativa.lider) {
      const nueva: Iniciativa = {
        id: Date.now().toString(),
        ...newIniciativa,
        progreso: 0,
        convertida: false
      };
      setIniciativas([...iniciativas, nueva]);
      setNewIniciativa({
        nombre: '',
        descripcion: '',
        objetivo: '',
        lider: '',
        fechaInicio: '',
        fechaFin: '',
        presupuesto: '',
        estado: 'planeacion'
      });
      setDialogOpen(false);
      toast({ title: "Iniciativa creada", description: "La nueva iniciativa estratégica se ha agregado correctamente" });
    }
  };

  const handleConvertToProject = (iniciativa: Iniciativa) => {
    setSelectedIniciativa(iniciativa);
    setProyectoData({
      nombre: iniciativa.nombre,
      descripcion: iniciativa.descripcion,
      objetivo: iniciativa.objetivo,
      lider: iniciativa.lider,
      fechaInicio: iniciativa.fechaInicio,
      fechaFin: iniciativa.fechaFin,
      presupuesto: iniciativa.presupuesto
    });
    setConvertDialogOpen(true);
  };

  const handleCreateProject = () => {
    if (selectedIniciativa) {
      setIniciativas(iniciativas.map(i => 
        i.id === selectedIniciativa.id ? { ...i, convertida: true } : i
      ));
      setConvertDialogOpen(false);
      toast({ 
        title: "Proyecto creado", 
        description: `El proyecto "${proyectoData.nombre}" se ha creado exitosamente a partir de la iniciativa estratégica.`
      });
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'planeacion': return 'bg-blue-500';
      case 'en-curso': return 'bg-green-500';
      case 'pausada': return 'bg-yellow-500';
      case 'completada': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getEstadoLabel = (estado: string) => {
    switch (estado) {
      case 'planeacion': return 'Planeación';
      case 'en-curso': return 'En Curso';
      case 'pausada': return 'Pausada';
      case 'completada': return 'Completada';
      default: return estado;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Iniciativas Estratégicas</h1>
            <p className="text-muted-foreground mt-1">
              Programas estratégicos que impulsan los objetivos corporativos
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Iniciativa
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nueva Iniciativa Estratégica</DialogTitle>
                <DialogDescription>
                  Crea una nueva iniciativa para impulsar tus objetivos estratégicos
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Nombre de la Iniciativa</Label>
                  <Input
                    value={newIniciativa.nombre}
                    onChange={(e) => setNewIniciativa({ ...newIniciativa, nombre: e.target.value })}
                    placeholder="ej. Transformación Digital"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <Textarea
                    value={newIniciativa.descripcion}
                    onChange={(e) => setNewIniciativa({ ...newIniciativa, descripcion: e.target.value })}
                    placeholder="Describe el alcance y propósito de la iniciativa..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Objetivo Estratégico Asociado</Label>
                  <Input
                    value={newIniciativa.objetivo}
                    onChange={(e) => setNewIniciativa({ ...newIniciativa, objetivo: e.target.value })}
                    placeholder="ej. Mejorar eficiencia operativa"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Líder de la Iniciativa</Label>
                    <Input
                      value={newIniciativa.lider}
                      onChange={(e) => setNewIniciativa({ ...newIniciativa, lider: e.target.value })}
                      placeholder="Nombre del responsable"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Estado</Label>
                    <Select 
                      value={newIniciativa.estado} 
                      onValueChange={(value) => setNewIniciativa({ ...newIniciativa, estado: value as Iniciativa['estado'] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planeacion">Planeación</SelectItem>
                        <SelectItem value="en-curso">En Curso</SelectItem>
                        <SelectItem value="pausada">Pausada</SelectItem>
                        <SelectItem value="completada">Completada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Fecha de Inicio</Label>
                    <Input
                      type="date"
                      value={newIniciativa.fechaInicio}
                      onChange={(e) => setNewIniciativa({ ...newIniciativa, fechaInicio: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de Fin</Label>
                    <Input
                      type="date"
                      value={newIniciativa.fechaFin}
                      onChange={(e) => setNewIniciativa({ ...newIniciativa, fechaFin: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Presupuesto</Label>
                    <Input
                      value={newIniciativa.presupuesto}
                      onChange={(e) => setNewIniciativa({ ...newIniciativa, presupuesto: e.target.value })}
                      placeholder="$0.00"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleAddIniciativa}>Crear Iniciativa</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Iniciativas</CardDescription>
              <CardTitle className="text-3xl">{iniciativas.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>En Curso</CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {iniciativas.filter(i => i.estado === 'en-curso').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Convertidas a Proyectos</CardDescription>
              <CardTitle className="text-3xl text-blue-600">
                {iniciativas.filter(i => i.convertida).length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Avance Promedio</CardDescription>
              <CardTitle className="text-3xl text-purple-600">
                {Math.round(iniciativas.reduce((sum, i) => sum + i.progreso, 0) / iniciativas.length)}%
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="grid gap-6">
          {iniciativas.map((iniciativa) => (
            <Card key={iniciativa.id} className="border-l-4" style={{ borderLeftColor: getEstadoColor(iniciativa.estado).replace('bg-', '#') }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl">{iniciativa.nombre}</CardTitle>
                      <Badge className={getEstadoColor(iniciativa.estado)}>
                        {getEstadoLabel(iniciativa.estado)}
                      </Badge>
                      {iniciativa.convertida && (
                        <Badge variant="outline" className="border-green-500 text-green-600">
                          ✓ Convertida a Proyecto
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm">{iniciativa.descripcion}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-4 gap-6 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Target className="h-4 w-4" />
                      <span>Objetivo</span>
                    </div>
                    <p className="font-medium">{iniciativa.objetivo}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Líder</span>
                    </div>
                    <p className="font-medium">{iniciativa.lider}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Período</span>
                    </div>
                    <p className="font-medium text-xs">
                      {new Date(iniciativa.fechaInicio).toLocaleDateString()} - {new Date(iniciativa.fechaFin).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span>Presupuesto</span>
                    </div>
                    <p className="font-medium">{iniciativa.presupuesto}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className="font-medium">{iniciativa.progreso}%</span>
                  </div>
                  <Progress value={iniciativa.progreso} className="h-2" />
                </div>

                {!iniciativa.convertida && (
                  <div className="pt-4 border-t">
                    <Button
                      onClick={() => handleConvertToProject(iniciativa)}
                      className="w-full"
                      size="lg"
                    >
                      <Rocket className="mr-2 h-4 w-4" />
                      🚀 Convertir en Proyecto
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={convertDialogOpen} onOpenChange={setConvertDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>🚀 Convertir Iniciativa en Proyecto</DialogTitle>
              <DialogDescription>
                Completa los detalles para crear un nuevo proyecto basado en esta iniciativa estratégica
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nombre del Proyecto</Label>
                <Input
                  value={proyectoData.nombre}
                  onChange={(e) => setProyectoData({ ...proyectoData, nombre: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Descripción del Proyecto</Label>
                <Textarea
                  value={proyectoData.descripcion}
                  onChange={(e) => setProyectoData({ ...proyectoData, descripcion: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Objetivo Estratégico</Label>
                <Input
                  value={proyectoData.objetivo}
                  onChange={(e) => setProyectoData({ ...proyectoData, objetivo: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Manager</Label>
                  <Input
                    value={proyectoData.lider}
                    onChange={(e) => setProyectoData({ ...proyectoData, lider: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Presupuesto</Label>
                  <Input
                    value={proyectoData.presupuesto}
                    onChange={(e) => setProyectoData({ ...proyectoData, presupuesto: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fecha de Inicio</Label>
                  <Input
                    type="date"
                    value={proyectoData.fechaInicio}
                    onChange={(e) => setProyectoData({ ...proyectoData, fechaInicio: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fecha de Cierre</Label>
                  <Input
                    type="date"
                    value={proyectoData.fechaFin}
                    onChange={(e) => setProyectoData({ ...proyectoData, fechaFin: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConvertDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleCreateProject}>
                <Rocket className="mr-2 h-4 w-4" />
                Crear Proyecto
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}