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
import { Wallet, Plus, Camera, CheckCircle, XCircle, Clock, Receipt, TrendingUp, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CajaChica = () => {
  const [registroDialogOpen, setRegistroDialogOpen] = useState(false);
  const [aprobacionDialogOpen, setAprobacionDialogOpen] = useState(false);
  const [selectedGasto, setSelectedGasto] = useState<any>(null);

  const cajas = [
    { id: 1, nombre: "Caja Oficina Central", asignado: 10000, saldo: 4500, responsable: "María García" },
    { id: 2, nombre: "Caja Sucursal Norte", asignado: 5000, saldo: 2300, responsable: "Juan Pérez" },
    { id: 3, nombre: "Caja Eventos", asignado: 15000, saldo: 8200, responsable: "Ana Martínez" },
  ];

  const gastos = [
    { id: 1, caja: "Caja Oficina Central", fecha: "2025-01-08", concepto: "Papelería", monto: 450, responsable: "Carlos López", status: "Pendiente", comprobante: "ticket_001.jpg" },
    { id: 2, caja: "Caja Oficina Central", fecha: "2025-01-07", concepto: "Transporte", monto: 320, responsable: "María García", status: "Aprobado", comprobante: "ticket_002.jpg" },
    { id: 3, caja: "Caja Sucursal Norte", fecha: "2025-01-06", concepto: "Cafetería", monto: 180, responsable: "Juan Pérez", status: "Pendiente", comprobante: "ticket_003.jpg" },
    { id: 4, caja: "Caja Eventos", fecha: "2025-01-05", concepto: "Suministros", monto: 890, responsable: "Ana Martínez", status: "Aprobado", comprobante: "ticket_004.jpg" },
    { id: 5, caja: "Caja Oficina Central", fecha: "2025-01-04", concepto: "Limpieza", monto: 650, responsable: "Carlos López", status: "Rechazado", comprobante: "ticket_005.jpg" },
  ];

  const conceptos = ["Papelería", "Transporte", "Cafetería", "Limpieza", "Suministros", "Mensajería", "Estacionamiento", "Otros"];
  const centrosCosto = ["Administración", "Ventas", "Operaciones", "TI", "RH", "Marketing"];

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

  const handleRegistrarGasto = () => {
    toast.success("Gasto registrado correctamente");
    setRegistroDialogOpen(false);
  };

  const handleAprobar = () => {
    toast.success("Gasto aprobado correctamente");
    setAprobacionDialogOpen(false);
  };

  const handleRechazar = () => {
    toast.error("Gasto rechazado");
    setAprobacionDialogOpen(false);
  };

  const handleGenerarCorte = () => {
    toast.success("Corte de caja generado y enviado a Tesorería");
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Caja Chica</h1>
            <p className="text-muted-foreground">Gestión digital de gastos menores y reposiciones</p>
          </div>
          <Dialog open={registroDialogOpen} onOpenChange={setRegistroDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Registrar Gasto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Registrar Nuevo Gasto</DialogTitle>
                <DialogDescription>Complete los datos del comprobante de gasto</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Caja Chica</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione caja" />
                      </SelectTrigger>
                      <SelectContent>
                        {cajas.map(caja => (
                          <SelectItem key={caja.id} value={caja.id.toString()}>{caja.nombre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha</Label>
                    <Input type="date" defaultValue="2025-01-10" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Concepto</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione concepto" />
                      </SelectTrigger>
                      <SelectContent>
                        {conceptos.map(concepto => (
                          <SelectItem key={concepto} value={concepto}>{concepto}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Monto</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Centro de Costo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione centro de costo" />
                    </SelectTrigger>
                    <SelectContent>
                      {centrosCosto.map(centro => (
                        <SelectItem key={centro} value={centro}>{centro}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <Textarea placeholder="Detalle del gasto..." rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Comprobante</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Camera className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Toque para tomar foto o subir archivo</p>
                    <p className="text-xs text-muted-foreground mt-1">El sistema detectará automáticamente el monto</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setRegistroDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleRegistrarGasto}>Registrar Gasto</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Dashboard de Cajas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cajas.map(caja => {
            const porcentajeUsado = ((caja.asignado - caja.saldo) / caja.asignado) * 100;
            return (
              <Card key={caja.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{caja.nombre}</CardTitle>
                      <CardDescription>{caja.responsable}</CardDescription>
                    </div>
                    <Wallet className="h-8 w-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Saldo Disponible</span>
                      <span className="font-bold text-2xl text-foreground">${caja.saldo.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monto Asignado</span>
                      <span className="text-muted-foreground">${caja.asignado.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${porcentajeUsado > 80 ? 'bg-destructive' : porcentajeUsado > 60 ? 'bg-yellow-500' : 'bg-primary'}`}
                        style={{ width: `${porcentajeUsado}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {porcentajeUsado.toFixed(1)}% utilizado
                    </p>
                  </div>
                  <Button className="w-full" variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Registrar Gasto
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs de Contenido */}
        <Tabs defaultValue="gastos" className="space-y-4">
          <TabsList>
            <TabsTrigger value="gastos">Gastos Registrados</TabsTrigger>
            <TabsTrigger value="aprobaciones">Pendientes de Aprobación</TabsTrigger>
            <TabsTrigger value="reposiciones">Cortes y Reposiciones</TabsTrigger>
          </TabsList>

          <TabsContent value="gastos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Gastos</CardTitle>
                <CardDescription>Todos los gastos registrados en caja chica</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Caja</TableHead>
                      <TableHead>Concepto</TableHead>
                      <TableHead>Responsable</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gastos.map(gasto => (
                      <TableRow key={gasto.id}>
                        <TableCell>{gasto.fecha}</TableCell>
                        <TableCell>{gasto.caja}</TableCell>
                        <TableCell>{gasto.concepto}</TableCell>
                        <TableCell>{gasto.responsable}</TableCell>
                        <TableCell className="text-right font-medium">${gasto.monto.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(gasto.status)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Receipt className="h-4 w-4" />
                          </Button>
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
                <CardTitle>Gastos Pendientes de Aprobación</CardTitle>
                <CardDescription>Revise y apruebe los gastos registrados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {gastos.filter(g => g.status === "Pendiente").map(gasto => (
                  <div key={gasto.id} className="border rounded-lg p-4 space-y-3 hover:bg-accent transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-semibold">{gasto.concepto}</h4>
                        <p className="text-sm text-muted-foreground">{gasto.responsable} • {gasto.fecha}</p>
                        <p className="text-sm text-muted-foreground">{gasto.caja}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">${gasto.monto.toLocaleString()}</p>
                        {getStatusBadge(gasto.status)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Dialog open={aprobacionDialogOpen && selectedGasto?.id === gasto.id} onOpenChange={(open) => {
                        setAprobacionDialogOpen(open);
                        if (open) setSelectedGasto(gasto);
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Receipt className="h-4 w-4 mr-2" />
                            Ver Comprobante
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Revisión de Gasto</DialogTitle>
                            <DialogDescription>Verifique la información y el comprobante</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-muted-foreground">Concepto</Label>
                                <p className="font-medium">{gasto.concepto}</p>
                              </div>
                              <div>
                                <Label className="text-muted-foreground">Monto</Label>
                                <p className="font-medium">${gasto.monto.toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="border rounded-lg p-4 bg-muted/50">
                              <Camera className="h-32 w-full text-muted-foreground" />
                              <p className="text-center text-sm text-muted-foreground mt-2">{gasto.comprobante}</p>
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

          <TabsContent value="reposiciones" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cajas.map(caja => (
                <Card key={caja.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{caja.nombre}</CardTitle>
                    <CardDescription>Generar corte de caja</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Gastos aprobados</span>
                        <span className="font-medium">$5,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Saldo actual</span>
                        <span className="font-medium">${caja.saldo.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-sm font-medium">Reposición sugerida</span>
                        <span className="font-bold text-primary">$5,500</span>
                      </div>
                    </div>
                    <Button className="w-full" onClick={handleGenerarCorte}>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Generar Corte
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CajaChica;
