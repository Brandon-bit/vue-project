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
import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardCheck, Plus, FileText, AlertTriangle, CheckCircle, Clock, PlayCircle, PauseCircle, Camera, Users, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Auditorias = () => {
  const [nuevaAuditoriaOpen, setNuevaAuditoriaOpen] = useState(false);
  const [ejecucionOpen, setEjecucionOpen] = useState(false);
  const [hallazgoOpen, setHallazgoOpen] = useState(false);
  const [selectedAuditoria, setSelectedAuditoria] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const auditorias = [
    { id: 1, nombre: "Auditoría Fiscal Q4 2024", tipo: "Fiscal", area: "Contabilidad", auditor: "Despacho Externo ABC", fechaInicio: "2025-01-15", fechaFin: "2025-01-30", status: "Planificada", hallazgos: 0, progreso: 0 },
    { id: 2, nombre: "Revisión de Procesos RH", tipo: "Operativa", area: "Recursos Humanos", auditor: "Equipo Interno", fechaInicio: "2025-01-08", fechaFin: "2025-01-20", status: "En Ejecución", hallazgos: 3, progreso: 45 },
    { id: 3, nombre: "Control de Inventarios", tipo: "Operativa", area: "Almacén", auditor: "María García", fechaInicio: "2024-12-10", fechaFin: "2024-12-28", status: "En Revisión", hallazgos: 7, progreso: 100 },
    { id: 4, nombre: "Cumplimiento CFDI 2024", tipo: "Fiscal", area: "Facturación", auditor: "Despacho Externo XYZ", fechaInicio: "2024-11-15", fechaFin: "2024-12-05", status: "Cerrada", hallazgos: 2, progreso: 100 },
  ];

  const checklistItems = [
    { id: 1, categoria: "Documentación", item: "Todos los CFDI emitidos tienen XML válido", cumple: true },
    { id: 2, categoria: "Documentación", item: "Las facturas tienen cancelación oportuna", cumple: true },
    { id: 3, categoria: "Procesos", item: "Existe procedimiento documentado de facturación", cumple: false },
    { id: 4, categoria: "Procesos", item: "Se realiza conciliación mensual con SAT", cumple: true },
    { id: 5, categoria: "Controles", item: "Segregación de funciones en autorización", cumple: false },
    { id: 6, categoria: "Controles", item: "Bitácora de accesos al sistema", cumple: true },
  ];

  const hallazgos = [
    { id: 1, auditoria: "Revisión de Procesos RH", severidad: "Alta", descripcion: "No existe manual de políticas de vacaciones actualizado", responsable: "Director RH", fechaLimite: "2025-02-15", status: "Pendiente" },
    { id: 2, auditoria: "Control de Inventarios", severidad: "Media", descripcion: "Diferencias en conteo físico vs sistema (3%)", responsable: "Jefe Almacén", fechaLimite: "2025-01-30", status: "En Proceso" },
    { id: 3, auditoria: "Control de Inventarios", severidad: "Baja", descripcion: "Falta etiquetado en 5% de productos", responsable: "Supervisor Almacén", fechaLimite: "2025-01-20", status: "Completado" },
  ];

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: { variant: any; icon: any } } = {
      "Planificada": { variant: "outline", icon: Calendar },
      "En Ejecución": { variant: "default", icon: PlayCircle },
      "En Revisión": { variant: "secondary", icon: FileText },
      "Cerrada": { variant: "default", icon: CheckCircle },
    };
    const config = variants[status] || variants["Planificada"];
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const getSeveridadBadge = (severidad: string) => {
    const colors: { [key: string]: string } = {
      "Alta": "destructive",
      "Media": "secondary",
      "Baja": "outline",
    };
    return <Badge variant={colors[severidad] as any}>{severidad}</Badge>;
  };

  const getHallazgoStatusBadge = (status: string) => {
    const variants: { [key: string]: { variant: any; icon: any } } = {
      "Pendiente": { variant: "outline", icon: Clock },
      "En Proceso": { variant: "secondary", icon: PlayCircle },
      "Completado": { variant: "default", icon: CheckCircle },
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

  const handleCrearAuditoria = () => {
    toast.success("Auditoría creada correctamente");
    setNuevaAuditoriaOpen(false);
  };

  const handleRegistrarHallazgo = () => {
    toast.warning("Hallazgo registrado - Se ha creado tarea correctiva");
    setHallazgoOpen(false);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Auditorías Administrativas</h1>
            <p className="text-muted-foreground">Sistema de gestión de auditorías y mejora continua</p>
          </div>
          <Dialog open={nuevaAuditoriaOpen} onOpenChange={setNuevaAuditoriaOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nueva Auditoría
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Planificar Nueva Auditoría</DialogTitle>
                <DialogDescription>Configure los parámetros de la auditoría</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Nombre de la Auditoría</Label>
                  <Input placeholder="Ej. Auditoría de Procesos Financieros Q1 2025" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fiscal">Fiscal</SelectItem>
                        <SelectItem value="operativa">Operativa</SelectItem>
                        <SelectItem value="cumplimiento">Cumplimiento</SelectItem>
                        <SelectItem value="calidad">Calidad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Área Auditada</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione área" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contabilidad">Contabilidad</SelectItem>
                        <SelectItem value="rh">Recursos Humanos</SelectItem>
                        <SelectItem value="compras">Compras</SelectItem>
                        <SelectItem value="almacen">Almacén</SelectItem>
                        <SelectItem value="ventas">Ventas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fecha Inicio</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha Fin Estimada</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Auditor Asignado</Label>
                  <Input placeholder="Nombre del auditor o despacho externo" />
                </div>
                <div className="space-y-2">
                  <Label>Objetivo de la Auditoría</Label>
                  <Textarea placeholder="Describa los objetivos y alcance..." rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNuevaAuditoriaOpen(false)}>Cancelar</Button>
                <Button onClick={handleCrearAuditoria}>Crear Auditoría</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Auditorías Activas", value: "3", icon: PlayCircle, color: "text-blue-500" },
            { label: "Hallazgos Abiertos", value: "12", icon: AlertTriangle, color: "text-orange-500" },
            { label: "Tareas Correctivas", value: "8", icon: ClipboardCheck, color: "text-purple-500" },
            { label: "Completadas Este Año", value: "15", icon: CheckCircle, color: "text-green-500" },
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
        <Tabs defaultValue="auditorias" className="space-y-4">
          <TabsList>
            <TabsTrigger value="auditorias">Auditorías</TabsTrigger>
            <TabsTrigger value="ejecucion">Ejecución</TabsTrigger>
            <TabsTrigger value="hallazgos">Hallazgos y Planes de Acción</TabsTrigger>
          </TabsList>

          <TabsContent value="auditorias" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Registro de Auditorías</CardTitle>
                <CardDescription>Gestión y seguimiento de todas las auditorías</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Auditoría</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Área</TableHead>
                      <TableHead>Auditor</TableHead>
                      <TableHead>Período</TableHead>
                      <TableHead>Progreso</TableHead>
                      <TableHead>Hallazgos</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditorias.map(auditoria => (
                      <TableRow key={auditoria.id} className="cursor-pointer hover:bg-accent" onClick={() => {
                        setSelectedAuditoria(auditoria);
                        setEjecucionOpen(true);
                      }}>
                        <TableCell className="font-medium">{auditoria.nombre}</TableCell>
                        <TableCell>{auditoria.tipo}</TableCell>
                        <TableCell>{auditoria.area}</TableCell>
                        <TableCell>{auditoria.auditor}</TableCell>
                        <TableCell className="text-sm">{auditoria.fechaInicio} - {auditoria.fechaFin}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: `${auditoria.progreso}%` }} />
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{auditoria.progreso}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {auditoria.hallazgos > 0 && (
                            <Badge variant="destructive">{auditoria.hallazgos}</Badge>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(auditoria.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ejecucion" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Checklist de Auditoría</CardTitle>
                    <CardDescription>Marque los items verificados durante la ejecución</CardDescription>
                  </div>
                  <Select defaultValue="2">
                    <SelectTrigger className="w-[300px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {auditorias.map(aud => (
                        <SelectItem key={aud.id} value={aud.id.toString()}>{aud.nombre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Documentación", "Procesos", "Controles"].map(categoria => (
                  <div key={categoria} className="space-y-3">
                    <h3 className="font-semibold text-lg border-b pb-2">{categoria}</h3>
                    {checklistItems.filter(item => item.categoria === categoria).map(item => (
                      <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent transition-colors">
                        <Checkbox 
                          id={`item-${item.id}`} 
                          checked={item.cumple}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label 
                            htmlFor={`item-${item.id}`}
                            className="text-sm cursor-pointer"
                          >
                            {item.item}
                          </Label>
                        </div>
                        <div className="flex gap-2">
                          {item.cumple ? (
                            <Badge variant="default" className="gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Cumple
                            </Badge>
                          ) : (
                            <>
                              <Badge variant="destructive" className="gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                No Cumple
                              </Badge>
                              <Dialog open={hallazgoOpen && selectedItem?.id === item.id} onOpenChange={(open) => {
                                setHallazgoOpen(open);
                                if (open) setSelectedItem(item);
                              }}>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">Registrar Hallazgo</Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Registrar Hallazgo de Auditoría</DialogTitle>
                                    <DialogDescription>Documente la desviación encontrada</DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="p-3 bg-muted rounded-lg">
                                      <p className="text-sm font-medium">Item No Conforme</p>
                                      <p className="text-sm text-muted-foreground">{item.item}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Severidad</Label>
                                      <Select>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Seleccione severidad" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="alta">Alta - Impacto significativo</SelectItem>
                                          <SelectItem value="media">Media - Requiere atención</SelectItem>
                                          <SelectItem value="baja">Baja - Mejora menor</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Descripción del Hallazgo</Label>
                                      <Textarea placeholder="Describa la desviación encontrada, causas y contexto..." rows={4} />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Responsable de Corrección</Label>
                                      <Input placeholder="Nombre del responsable" />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Fecha Límite de Corrección</Label>
                                      <Input type="date" />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Evidencia Fotográfica (Opcional)</Label>
                                      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                                        <Camera className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">Adjuntar fotos o documentos</p>
                                      </div>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setHallazgoOpen(false)}>Cancelar</Button>
                                    <Button onClick={handleRegistrarHallazgo}>Registrar y Crear Tarea</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hallazgos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tablero Kanban de Planes de Acción</CardTitle>
                <CardDescription>Seguimiento de tareas correctivas generadas por hallazgos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Pendiente", "En Proceso", "Completado"].map(status => (
                    <div key={status} className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <h3 className="font-semibold">{status}</h3>
                        <Badge variant="outline">
                          {hallazgos.filter(h => h.status === status).length}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {hallazgos.filter(h => h.status === status).map(hallazgo => (
                          <Card key={hallazgo.id} className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start gap-2">
                                <CardTitle className="text-sm">{hallazgo.descripcion}</CardTitle>
                                {getSeveridadBadge(hallazgo.severidad)}
                              </div>
                              <CardDescription className="text-xs">{hallazgo.auditoria}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Users className="h-3 w-3" />
                                {hallazgo.responsable}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                Límite: {hallazgo.fechaLimite}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Auditorias;
