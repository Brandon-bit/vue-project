import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Car, Laptop, DoorOpen, Plane, Plus, CheckCircle, Clock, XCircle, Calendar as CalendarIcon, AlertCircle, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const PermisosLicencias = () => {
  const [solicitudDialogOpen, setSolicitudDialogOpen] = useState(false);
  const [selectedTipo, setSelectedTipo] = useState("");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [aprobacionDialogOpen, setAprobacionDialogOpen] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState<any>(null);

  const tiposPermiso = [
    { id: "vehiculo", nombre: "Uso de Vehículo", icon: Car, color: "text-blue-500", descripcion: "Solicitar vehículo de la empresa" },
    { id: "equipo", nombre: "Equipo de Cómputo", icon: Laptop, color: "text-purple-500", descripcion: "Solicitar laptop, proyector u otro equipo" },
    { id: "sala", nombre: "Sala de Juntas", icon: DoorOpen, color: "text-green-500", descripcion: "Reservar sala de reuniones" },
    { id: "ausencia", nombre: "Licencia de Ausencia", icon: Plane, color: "text-orange-500", descripcion: "Solicitar día(s) de ausencia justificada" },
  ];

  const solicitudes = [
    { id: 1, tipo: "Uso de Vehículo", recurso: "Vehículo #3 - Toyota Corolla", solicitante: "Carlos López", fechaInicio: "2025-01-15", fechaFin: "2025-01-15", status: "Pendiente", motivo: "Visita a cliente en Guadalajara" },
    { id: 2, tipo: "Sala de Juntas", recurso: "Sala A - Planta Baja", solicitante: "María García", fechaInicio: "2025-01-12", fechaFin: "2025-01-12", status: "Aprobado", motivo: "Presentación a inversionistas" },
    { id: 3, tipo: "Equipo de Cómputo", recurso: "Proyector HD", solicitante: "Ana Martínez", fechaInicio: "2025-01-14", fechaFin: "2025-01-16", status: "Pendiente", motivo: "Capacitación interna" },
    { id: 4, tipo: "Licencia de Ausencia", recurso: "N/A", solicitante: "Juan Pérez", fechaInicio: "2025-01-20", fechaFin: "2025-01-22", status: "Aprobado", motivo: "Asunto personal" },
    { id: 5, tipo: "Uso de Vehículo", recurso: "Vehículo #1 - Honda Civic", solicitante: "Pedro Ramírez", fechaInicio: "2025-01-10", fechaFin: "2025-01-10", status: "Rechazado", motivo: "Entrega de documentos" },
  ];

  const recursosDisponibles = {
    vehiculo: ["Vehículo #1 - Honda Civic", "Vehículo #2 - Nissan Versa", "Vehículo #3 - Toyota Corolla"],
    equipo: ["Laptop Dell XPS", "Proyector HD", "Pantalla Portátil", "Cámara Web 4K"],
    sala: ["Sala A - Planta Baja (Cap. 10)", "Sala B - Primer Piso (Cap. 6)", "Sala Ejecutiva (Cap. 15)"],
    ausencia: ["N/A"],
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: { variant: any; icon: any } } = {
      "Pendiente": { variant: "outline", icon: Clock },
      "Aprobado": { variant: "default", icon: CheckCircle },
      "Rechazado": { variant: "destructive", icon: XCircle },
    };
    const config = variants[status] || variants["Pendiente"];
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const handleSolicitar = () => {
    toast.success("Solicitud enviada correctamente");
    setSolicitudDialogOpen(false);
    setSelectedTipo("");
  };

  const handleAprobar = () => {
    toast.success("Solicitud aprobada correctamente");
    setAprobacionDialogOpen(false);
  };

  const handleRechazar = () => {
    toast.error("Solicitud rechazada");
    setAprobacionDialogOpen(false);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Permisos y Licencias</h1>
            <p className="text-muted-foreground">Portal de autoservicio para solicitudes de recursos y ausencias</p>
          </div>
          <Dialog open={solicitudDialogOpen} onOpenChange={setSolicitudDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nueva Solicitud
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nueva Solicitud de Permiso</DialogTitle>
                <DialogDescription>Seleccione el tipo de permiso y complete la información</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {!selectedTipo ? (
                  <div className="grid grid-cols-2 gap-4">
                    {tiposPermiso.map(tipo => {
                      const Icon = tipo.icon;
                      return (
                        <Card 
                          key={tipo.id}
                          className="cursor-pointer hover:shadow-lg hover:border-primary transition-all"
                          onClick={() => setSelectedTipo(tipo.id)}
                        >
                          <CardHeader className="text-center">
                            <Icon className={`h-12 w-12 mx-auto mb-2 ${tipo.color}`} />
                            <CardTitle className="text-lg">{tipo.nombre}</CardTitle>
                            <CardDescription className="text-xs">{tipo.descripcion}</CardDescription>
                          </CardHeader>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      {(() => {
                        const tipo = tiposPermiso.find(t => t.id === selectedTipo);
                        if (!tipo) return null;
                        const Icon = tipo.icon;
                        return (
                          <>
                            <Icon className={`h-6 w-6 ${tipo.color}`} />
                            <div>
                              <p className="font-semibold">{tipo.nombre}</p>
                              <p className="text-xs text-muted-foreground">{tipo.descripcion}</p>
                            </div>
                          </>
                        );
                      })()}
                      <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setSelectedTipo("")}>
                        Cambiar
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Recurso / Tipo</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione el recurso" />
                        </SelectTrigger>
                        <SelectContent>
                          {recursosDisponibles[selectedTipo as keyof typeof recursosDisponibles]?.map(recurso => (
                            <SelectItem key={recurso} value={recurso}>{recurso}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Fecha Inicio</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateRange.from ? format(dateRange.from, "PPP", { locale: es }) : "Seleccionar"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={dateRange.from}
                              onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label>Fecha Fin</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateRange.to ? format(dateRange.to, "PPP", { locale: es }) : "Seleccionar"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={dateRange.to}
                              onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Motivo / Justificación</Label>
                      <Textarea placeholder="Describa el motivo de su solicitud..." rows={4} />
                    </div>

                    <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <div className="flex gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Disponibilidad</p>
                          <p className="text-xs text-blue-700 dark:text-blue-300">
                            El recurso está disponible en las fechas seleccionadas
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {selectedTipo && (
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedTipo("")}>Atrás</Button>
                  <Button onClick={handleSolicitar}>Enviar Solicitud</Button>
                </DialogFooter>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Solicitudes Activas", value: "12", icon: FileText, color: "text-blue-500" },
            { label: "Pendientes", value: "5", icon: Clock, color: "text-yellow-500" },
            { label: "Aprobadas Hoy", value: "8", icon: CheckCircle, color: "text-green-500" },
            { label: "Recursos Disponibles", value: "15", icon: DoorOpen, color: "text-purple-500" },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardDescription>{stat.label}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="solicitudes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="solicitudes">Mis Solicitudes</TabsTrigger>
            <TabsTrigger value="aprobaciones">Pendientes de Aprobación</TabsTrigger>
            <TabsTrigger value="calendario">Calendario de Recursos</TabsTrigger>
          </TabsList>

          <TabsContent value="solicitudes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Solicitudes</CardTitle>
                <CardDescription>Todas tus solicitudes de permisos y licencias</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Recurso</TableHead>
                      <TableHead>Fecha Inicio</TableHead>
                      <TableHead>Fecha Fin</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {solicitudes.map(solicitud => (
                      <TableRow key={solicitud.id}>
                        <TableCell className="font-medium">{solicitud.tipo}</TableCell>
                        <TableCell>{solicitud.recurso}</TableCell>
                        <TableCell>{solicitud.fechaInicio}</TableCell>
                        <TableCell>{solicitud.fechaFin}</TableCell>
                        <TableCell>{getStatusBadge(solicitud.status)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Ver Detalles</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aprobaciones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Solicitudes Pendientes de Aprobación</CardTitle>
                <CardDescription>Revise y apruebe las solicitudes de su equipo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {solicitudes.filter(s => s.status === "Pendiente").map(solicitud => (
                  <div key={solicitud.id} className="border rounded-lg p-4 space-y-3 hover:bg-accent transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{solicitud.tipo}</h4>
                          {getStatusBadge(solicitud.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{solicitud.solicitante}</p>
                        <p className="text-sm">
                          <span className="font-medium">Recurso:</span> {solicitud.recurso}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Período:</span> {solicitud.fechaInicio} al {solicitud.fechaFin}
                        </p>
                        <p className="text-sm text-muted-foreground">{solicitud.motivo}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Dialog open={aprobacionDialogOpen && selectedSolicitud?.id === solicitud.id} onOpenChange={(open) => {
                        setAprobacionDialogOpen(open);
                        if (open) setSelectedSolicitud(solicitud);
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">Ver Detalles</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Revisión de Solicitud</DialogTitle>
                            <DialogDescription>Verifique la información antes de aprobar o rechazar</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-muted-foreground">Tipo</Label>
                                <p className="font-medium">{solicitud.tipo}</p>
                              </div>
                              <div>
                                <Label className="text-muted-foreground">Recurso</Label>
                                <p className="font-medium">{solicitud.recurso}</p>
                              </div>
                              <div>
                                <Label className="text-muted-foreground">Solicitante</Label>
                                <p className="font-medium">{solicitud.solicitante}</p>
                              </div>
                              <div>
                                <Label className="text-muted-foreground">Período</Label>
                                <p className="font-medium">{solicitud.fechaInicio} - {solicitud.fechaFin}</p>
                              </div>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">Motivo</Label>
                              <p className="mt-1">{solicitud.motivo}</p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="destructive" onClick={handleRechazar}>
                              <XCircle className="h-4 w-4 mr-2" />
                              Rechazar
                            </Button>
                            <Button onClick={handleAprobar}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Aprobar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendario" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Calendario de Recursos</CardTitle>
                <CardDescription>Vista consolidada de todos los recursos y sus reservas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-8 text-center">
                  <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Vista de calendario interactivo próximamente</p>
                  <p className="text-sm text-muted-foreground mt-2">Aquí podrá ver la disponibilidad de todos los recursos en tiempo real</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PermisosLicencias;
