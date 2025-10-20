import { useState } from "react";
import { Plus, Calendar, User, Flag, CheckCircle2, Circle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  iniciativa: string;
  responsable: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'pendiente' | 'en-progreso' | 'revision' | 'completada';
  prioridad: 'alta' | 'media' | 'baja';
}

export default function PlanAccion() {
  const [tareas, setTareas] = useState<Tarea[]>([
    {
      id: '1',
      titulo: 'Evaluación de plataformas cloud',
      descripcion: 'Análisis comparativo de AWS, Azure y GCP',
      iniciativa: 'Transformación Digital',
      responsable: 'Juan Pérez',
      fechaInicio: '2025-01-15',
      fechaFin: '2025-02-15',
      estado: 'completada',
      prioridad: 'alta'
    },
    {
      id: '2',
      titulo: 'Diseño de arquitectura de migración',
      descripcion: 'Documentar arquitectura target y plan de migración',
      iniciativa: 'Transformación Digital',
      responsable: 'Ana García',
      fechaInicio: '2025-02-16',
      fechaFin: '2025-03-30',
      estado: 'en-progreso',
      prioridad: 'alta'
    },
    {
      id: '3',
      titulo: 'Capacitación equipo de soporte',
      descripcion: 'Programa de training en nuevas herramientas',
      iniciativa: 'Excelencia en Servicio',
      responsable: 'Carlos Mendoza',
      fechaInicio: '2025-02-01',
      fechaFin: '2025-03-15',
      estado: 'en-progreso',
      prioridad: 'media'
    },
    {
      id: '4',
      titulo: 'Implementación sistema de tickets',
      descripcion: 'Deploy de plataforma de gestión de tickets',
      iniciativa: 'Excelencia en Servicio',
      responsable: 'María López',
      fechaInicio: '2025-03-01',
      fechaFin: '2025-04-15',
      estado: 'pendiente',
      prioridad: 'media'
    },
    {
      id: '5',
      titulo: 'Análisis de estructura de costos',
      descripcion: 'Revisión detallada de gastos operativos por categoría',
      iniciativa: 'Optimización de Costos',
      responsable: 'Roberto Silva',
      fechaInicio: '2025-01-01',
      fechaFin: '2025-02-28',
      estado: 'revision',
      prioridad: 'alta'
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTarea, setNewTarea] = useState({
    titulo: '',
    descripcion: '',
    iniciativa: '',
    responsable: '',
    fechaInicio: '',
    fechaFin: '',
    estado: 'pendiente' as Tarea['estado'],
    prioridad: 'media' as Tarea['prioridad']
  });

  const handleAddTarea = () => {
    if (newTarea.titulo && newTarea.responsable) {
      setTareas([...tareas, { id: Date.now().toString(), ...newTarea }]);
      setNewTarea({
        titulo: '',
        descripcion: '',
        iniciativa: '',
        responsable: '',
        fechaInicio: '',
        fechaFin: '',
        estado: 'pendiente',
        prioridad: 'media'
      });
      setDialogOpen(false);
      toast({ title: "Tarea creada", description: "La nueva tarea se ha agregado al plan de acción" });
    }
  };

  const handleMoveTask = (taskId: string, newEstado: Tarea['estado']) => {
    setTareas(tareas.map(t => t.id === taskId ? { ...t, estado: newEstado } : t));
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'bg-gray-500';
      case 'en-progreso': return 'bg-blue-500';
      case 'revision': return 'bg-yellow-500';
      case 'completada': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getEstadoLabel = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'Pendiente';
      case 'en-progreso': return 'En Progreso';
      case 'revision': return 'En Revisión';
      case 'completada': return 'Completada';
      default: return estado;
    }
  };

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta': return 'destructive';
      case 'media': return 'default';
      case 'baja': return 'secondary';
      default: return 'default';
    }
  };

  const getPrioridadLabel = (prioridad: string) => {
    switch (prioridad) {
      case 'alta': return 'Alta';
      case 'media': return 'Media';
      case 'baja': return 'Baja';
      default: return prioridad;
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'completada': return <CheckCircle2 className="h-4 w-4" />;
      case 'en-progreso': return <Clock className="h-4 w-4" />;
      case 'revision': return <Flag className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const tareasByEstado = {
    'pendiente': tareas.filter(t => t.estado === 'pendiente'),
    'en-progreso': tareas.filter(t => t.estado === 'en-progreso'),
    'revision': tareas.filter(t => t.estado === 'revision'),
    'completada': tareas.filter(t => t.estado === 'completada'),
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Plan de Acción Operativo</h1>
            <p className="text-muted-foreground mt-1">
              Gestión de tareas vinculadas a iniciativas estratégicas
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Tarea
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nueva Tarea</DialogTitle>
                <DialogDescription>
                  Agrega una nueva tarea al plan de acción operativo
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Título de la Tarea</Label>
                  <Input
                    value={newTarea.titulo}
                    onChange={(e) => setNewTarea({ ...newTarea, titulo: e.target.value })}
                    placeholder="ej. Evaluación de plataformas cloud"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <Textarea
                    value={newTarea.descripcion}
                    onChange={(e) => setNewTarea({ ...newTarea, descripcion: e.target.value })}
                    placeholder="Describe la tarea en detalle..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Iniciativa Asociada</Label>
                  <Input
                    value={newTarea.iniciativa}
                    onChange={(e) => setNewTarea({ ...newTarea, iniciativa: e.target.value })}
                    placeholder="ej. Transformación Digital"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Responsable</Label>
                    <Input
                      value={newTarea.responsable}
                      onChange={(e) => setNewTarea({ ...newTarea, responsable: e.target.value })}
                      placeholder="Nombre del responsable"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Prioridad</Label>
                    <Select 
                      value={newTarea.prioridad} 
                      onValueChange={(value) => setNewTarea({ ...newTarea, prioridad: value as Tarea['prioridad'] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                        <SelectItem value="baja">Baja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fecha de Inicio</Label>
                    <Input
                      type="date"
                      value={newTarea.fechaInicio}
                      onChange={(e) => setNewTarea({ ...newTarea, fechaInicio: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de Fin</Label>
                    <Input
                      type="date"
                      value={newTarea.fechaFin}
                      onChange={(e) => setNewTarea({ ...newTarea, fechaFin: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleAddTarea}>Crear Tarea</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Tareas</CardDescription>
              <CardTitle className="text-3xl">{tareas.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>En Progreso</CardDescription>
              <CardTitle className="text-3xl text-blue-600">
                {tareasByEstado['en-progreso'].length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>En Revisión</CardDescription>
              <CardTitle className="text-3xl text-yellow-600">
                {tareasByEstado['revision'].length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Completadas</CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {tareasByEstado['completada'].length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {Object.entries(tareasByEstado).map(([estado, tareasEstado]) => (
            <div key={estado} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm uppercase tracking-wider">
                  {getEstadoLabel(estado)}
                </h3>
                <Badge variant="secondary">{tareasEstado.length}</Badge>
              </div>

              <div className="space-y-3">
                {tareasEstado.map((tarea) => (
                  <Card key={tarea.id} className="border-l-4" style={{ borderLeftColor: getEstadoColor(tarea.estado).replace('bg-', '#') }}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-1">
                          <CardTitle className="text-sm leading-tight">{tarea.titulo}</CardTitle>
                          <CardDescription className="text-xs line-clamp-2">
                            {tarea.descripcion}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={getPrioridadColor(tarea.prioridad)} className="text-xs">
                          {getPrioridadLabel(tarea.prioridad)}
                        </Badge>
                      </div>

                      {tarea.iniciativa && (
                        <div className="text-xs">
                          <p className="text-muted-foreground">Iniciativa:</p>
                          <p className="font-medium">{tarea.iniciativa}</p>
                        </div>
                      )}

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span>{tarea.responsable}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(tarea.fechaInicio).toLocaleDateString()} - {new Date(tarea.fechaFin).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <Select 
                          value={tarea.estado} 
                          onValueChange={(value) => handleMoveTask(tarea.id, value as Tarea['estado'])}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pendiente">Pendiente</SelectItem>
                            <SelectItem value="en-progreso">En Progreso</SelectItem>
                            <SelectItem value="revision">En Revisión</SelectItem>
                            <SelectItem value="completada">Completada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}