import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, CheckCircle, Clock, XCircle, DollarSign } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ViaticosReembolsos = () => {
  const misSolicitudes = [
    {
      id: "VT-2024-045",
      concepto: "Viaje a Monterrey - Reunión con Cliente",
      fecha: "2024-10-15",
      monto: 8500,
      estado: "aprobado",
      comprobado: true
    },
    {
      id: "VT-2024-046",
      concepto: "Capacitación en Ciudad de México",
      fecha: "2024-10-20",
      monto: 12000,
      estado: "pendiente",
      comprobado: false
    },
    {
      id: "VT-2024-047",
      concepto: "Material de oficina",
      fecha: "2024-10-08",
      monto: 3200,
      estado: "pagado",
      comprobado: true
    },
  ];

  const solicitudesAprobacion = [
    {
      id: "VT-2024-048",
      empleado: "Juan Pérez",
      concepto: "Viaje a Guadalajara",
      fecha: "2024-10-25",
      monto: 9500,
      estado: "pendiente",
    },
    {
      id: "VT-2024-049",
      empleado: "María González",
      concepto: "Compra de equipo",
      fecha: "2024-10-22",
      monto: 5400,
      estado: "pendiente",
    },
  ];

  const getEstadoBadge = (estado: string) => {
    const badges = {
      aprobado: <Badge className="bg-blue-500 hover:bg-blue-600">Aprobado</Badge>,
      pendiente: <Badge className="bg-yellow-500 hover:bg-yellow-600">Pendiente</Badge>,
      rechazado: <Badge variant="destructive">Rechazado</Badge>,
      pagado: <Badge variant="default">Pagado</Badge>,
    };
    return badges[estado as keyof typeof badges] || <Badge>{estado}</Badge>;
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Viáticos y Reembolsos</h1>
            <p className="text-muted-foreground">Administración de solicitudes y comprobaciones</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Solicitud
          </Button>
        </div>

        {/* Dashboard de Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">En revisión</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aprobadas</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pagadas</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Completadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total del Mes</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,200</div>
              <p className="text-xs text-muted-foreground">Octubre 2024</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs para Mis Solicitudes y Panel de Aprobaciones */}
        <Tabs defaultValue="mis-solicitudes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="mis-solicitudes">Mis Solicitudes</TabsTrigger>
            <TabsTrigger value="aprobaciones">Panel de Aprobaciones</TabsTrigger>
          </TabsList>

          <TabsContent value="mis-solicitudes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mis Solicitudes de Viáticos</CardTitle>
                <CardDescription>
                  Historial de tus solicitudes y su estado actual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Concepto</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Monto</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Comprobado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {misSolicitudes.map((solicitud) => (
                        <TableRow key={solicitud.id}>
                          <TableCell className="font-medium">{solicitud.id}</TableCell>
                          <TableCell>{solicitud.concepto}</TableCell>
                          <TableCell>{solicitud.fecha}</TableCell>
                          <TableCell className="text-right">
                            ${solicitud.monto.toLocaleString()}
                          </TableCell>
                          <TableCell>{getEstadoBadge(solicitud.estado)}</TableCell>
                          <TableCell>
                            {solicitud.comprobado ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-gray-400" />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aprobaciones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Solicitudes Pendientes de Aprobación</CardTitle>
                <CardDescription>
                  Revisa y aprueba las solicitudes de tu equipo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Empleado</TableHead>
                        <TableHead>Concepto</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Monto</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {solicitudesAprobacion.map((solicitud) => (
                        <TableRow key={solicitud.id}>
                          <TableCell className="font-medium">{solicitud.id}</TableCell>
                          <TableCell>{solicitud.empleado}</TableCell>
                          <TableCell>{solicitud.concepto}</TableCell>
                          <TableCell>{solicitud.fecha}</TableCell>
                          <TableCell className="text-right">
                            ${solicitud.monto.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="default">
                                Aprobar
                              </Button>
                              <Button size="sm" variant="destructive">
                                Rechazar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ViaticosReembolsos;
