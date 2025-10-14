import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, TrendingDown, Link as LinkIcon, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Partida {
  id: string;
  cuenta: string;
  descripcion: string;
  debe: number;
  haber: number;
  referencia: string;
}

interface Poliza {
  folio: string;
  fecha: string;
  proveedor: string;
  concepto: string;
  total: number;
  centroCosto: string;
}

const PolizasGastos = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFacturaDialogOpen, setIsFacturaDialogOpen] = useState(false);
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState("");

  // Sample data
  const polizas: Poliza[] = [
    {
      folio: "G-001",
      fecha: "2024-03-15",
      proveedor: "Proveedor Industrial S.A.",
      concepto: "Compra de materiales",
      total: 35000,
      centroCosto: "Producción",
    },
    {
      folio: "G-002",
      fecha: "2024-03-16",
      proveedor: "Servicios Corporativos",
      concepto: "Pago de servicios",
      total: 12500,
      centroCosto: "Administración",
    },
  ];

  const facturasDisponibles = [
    { id: "F-001", folio: "FAC-456", monto: 35000, fecha: "2024-02-20", concepto: "Materiales" },
    { id: "F-002", folio: "FAC-457", monto: 18000, fecha: "2024-02-25", concepto: "Servicios" },
    { id: "F-003", folio: "FAC-458", monto: 22500, fecha: "2024-03-05", concepto: "Insumos" },
  ];

  const vincularFactura = (facturaId: string) => {
    const factura = facturasDisponibles.find((f) => f.id === facturaId);
    if (factura) {
      // Auto-generar partidas sugeridas
      const partidasSugeridas: Partida[] = [
        {
          id: `P-${Date.now()}-1`,
          cuenta: "601-001 Gastos de Operación",
          descripcion: "Cargo por " + factura.concepto,
          debe: factura.monto * 0.86,
          haber: 0,
          referencia: factura.folio,
        },
        {
          id: `P-${Date.now()}-2`,
          cuenta: "119-001 IVA Acreditable",
          descripcion: "IVA acreditable",
          debe: factura.monto * 0.14,
          haber: 0,
          referencia: factura.folio,
        },
        {
          id: `P-${Date.now()}-3`,
          cuenta: "102-001 Bancos",
          descripcion: "Abono a banco por pago",
          debe: 0,
          haber: factura.monto,
          referencia: factura.folio,
        },
      ];
      setPartidas(partidasSugeridas);
      setIsFacturaDialogOpen(false);
    }
  };

  const agregarPartida = () => {
    const nuevaPartida: Partida = {
      id: `P-${Date.now()}`,
      cuenta: "",
      descripcion: "",
      debe: 0,
      haber: 0,
      referencia: "",
    };
    setPartidas([...partidas, nuevaPartida]);
  };

  const eliminarPartida = (id: string) => {
    setPartidas(partidas.filter((p) => p.id !== id));
  };

  const actualizarPartida = (id: string, campo: keyof Partida, valor: any) => {
    setPartidas(
      partidas.map((p) => (p.id === id ? { ...p, [campo]: valor } : p))
    );
  };

  const totalDebe = partidas.reduce((sum, p) => sum + (p.debe || 0), 0);
  const totalHaber = partidas.reduce((sum, p) => sum + (p.haber || 0), 0);
  const estaBalanceado = totalDebe === totalHaber && totalDebe > 0;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pólizas de Gastos</h1>
            <p className="text-muted-foreground mt-2">
              Control de egresos, pagos a proveedores y gestión de gastos por centro de costo
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Nueva póliza de gasto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Nueva Póliza de Gasto</DialogTitle>
                <DialogDescription>
                  Registre un egreso vinculándolo con facturas de proveedores y centros de costo
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Encabezado */}
                <Card>
                  <CardHeader>
                    <CardTitle>Información General</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Tipo de Póliza</Label>
                      <Input value="Egreso / Gasto" disabled className="bg-muted" />
                    </div>
                    <div>
                      <Label>Fecha</Label>
                      <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div>
                      <Label>Proveedor *</Label>
                      <Select value={proveedorSeleccionado} onValueChange={setProveedorSeleccionado}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un proveedor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prov1">Proveedor Industrial S.A.</SelectItem>
                          <SelectItem value="prov2">Servicios Corporativos</SelectItem>
                          <SelectItem value="prov3">Distribuidora Nacional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Tipo de Gasto</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operacion">Gastos de Operación</SelectItem>
                          <SelectItem value="administrativo">Gastos Administrativos</SelectItem>
                          <SelectItem value="venta">Gastos de Venta</SelectItem>
                          <SelectItem value="financiero">Gastos Financieros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Centro de Costo</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione centro" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="produccion">Producción</SelectItem>
                          <SelectItem value="administracion">Administración</SelectItem>
                          <SelectItem value="ventas">Ventas</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Método de Pago</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione método" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="transferencia">Transferencia</SelectItem>
                          <SelectItem value="cheque">Cheque</SelectItem>
                          <SelectItem value="efectivo">Efectivo / Caja Chica</SelectItem>
                          <SelectItem value="tarjeta">Tarjeta Corporativa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Cuenta Bancaria de Origen</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione cuenta" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="banco1">BBVA - 0123456789</SelectItem>
                          <SelectItem value="banco2">Santander - 9876543210</SelectItem>
                          <SelectItem value="caja">Caja Chica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Referencia / Folio de Pago</Label>
                      <Input placeholder="Número de referencia o cheque" />
                    </div>
                    <div className="col-span-2">
                      <Label>Concepto</Label>
                      <Textarea placeholder="Describa el gasto..." rows={2} />
                    </div>
                    <div className="col-span-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsFacturaDialogOpen(true)}
                        disabled={!proveedorSeleccionado}
                      >
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Asociar factura de proveedor
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Partidas */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Partidas Contables</CardTitle>
                        <CardDescription>
                          Las partidas se generan automáticamente al asociar facturas, o puede agregarlas manualmente
                        </CardDescription>
                      </div>
                      <Button onClick={agregarPartida} variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar partida
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Cuenta</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead className="text-right">Debe</TableHead>
                          <TableHead className="text-right">Haber</TableHead>
                          <TableHead>Referencia</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {partidas.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                              Asocie una factura para generar partidas automáticas o agregue partidas manualmente.
                            </TableCell>
                          </TableRow>
                        ) : (
                          partidas.map((partida) => (
                            <TableRow key={partida.id}>
                              <TableCell>
                                <Input
                                  placeholder="Buscar cuenta..."
                                  value={partida.cuenta}
                                  onChange={(e) =>
                                    actualizarPartida(partida.id, "cuenta", e.target.value)
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  placeholder="Descripción"
                                  value={partida.descripcion}
                                  onChange={(e) =>
                                    actualizarPartida(partida.id, "descripcion", e.target.value)
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  placeholder="0.00"
                                  value={partida.debe || ""}
                                  onChange={(e) =>
                                    actualizarPartida(
                                      partida.id,
                                      "debe",
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                  className="text-right"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  placeholder="0.00"
                                  value={partida.haber || ""}
                                  onChange={(e) =>
                                    actualizarPartida(
                                      partida.id,
                                      "haber",
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                  className="text-right"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  placeholder="Ref."
                                  value={partida.referencia}
                                  onChange={(e) =>
                                    actualizarPartida(partida.id, "referencia", e.target.value)
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => eliminarPartida(partida.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>

                    {/* Totales y Validación */}
                    {partidas.length > 0 && (
                      <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-4">
                              <span className="font-semibold">Total Debe:</span>
                              <span className="text-lg font-bold">
                                ${totalDebe.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-semibold">Total Haber:</span>
                              <span className="text-lg font-bold">
                                ${totalHaber.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {estaBalanceado ? (
                              <>
                                <CheckCircle className="h-6 w-6 text-green-600" />
                                <span className="font-semibold text-green-600">Póliza Cuadrada</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-6 w-6 text-destructive" />
                                <span className="font-semibold text-destructive">
                                  Diferencia: $
                                  {Math.abs(totalDebe - totalHaber).toLocaleString("es-MX", {
                                    minimumFractionDigits: 2,
                                  })}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button disabled={!estaBalanceado} onClick={() => setIsDialogOpen(false)}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Guardar póliza
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Modal de vinculación de facturas */}
        <Dialog open={isFacturaDialogOpen} onOpenChange={setIsFacturaDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Asociar Factura de Proveedor</DialogTitle>
              <DialogDescription>
                Seleccione una factura pendiente para generar las partidas automáticamente
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              {facturasDisponibles.map((factura) => (
                <Card
                  key={factura.id}
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => vincularFactura(factura.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{factura.folio}</p>
                        <p className="text-sm text-muted-foreground">{factura.concepto}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(factura.fecha).toLocaleDateString("es-MX")}
                        </p>
                      </div>
                      <p className="text-lg font-bold">
                        ${factura.monto.toLocaleString("es-MX")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Filtros y búsqueda */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por folio, proveedor o concepto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label>Proveedor</Label>
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="prov1">Proveedor Industrial S.A.</SelectItem>
                    <SelectItem value="prov2">Servicios Corporativos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Centro de Costo</Label>
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="produccion">Producción</SelectItem>
                    <SelectItem value="administracion">Administración</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de pólizas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pólizas de Gastos Registradas</CardTitle>
              <Button variant="outline" size="sm">
                <TrendingDown className="mr-2 h-4 w-4" />
                Reporte de gastos
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Folio</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Proveedor</TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Centro de Costo</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {polizas.map((poliza) => (
                  <TableRow key={poliza.folio}>
                    <TableCell className="font-medium">{poliza.folio}</TableCell>
                    <TableCell>{new Date(poliza.fecha).toLocaleDateString("es-MX")}</TableCell>
                    <TableCell>{poliza.proveedor}</TableCell>
                    <TableCell>{poliza.concepto}</TableCell>
                    <TableCell className="text-right">
                      ${poliza.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{poliza.centroCosto}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PolizasGastos;
