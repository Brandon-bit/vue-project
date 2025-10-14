import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, FileText, Upload, CheckCircle2, AlertCircle, Paperclip, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface Partida {
  id: string;
  cuenta: string;
  descripcion: string;
  debe: number;
  haber: number;
  referencia: string;
}

interface Poliza {
  id: string;
  folio: string;
  fecha: string;
  tipo: "Diario" | "Ingreso" | "Egreso";
  concepto: string;
  total: number;
  estatus: "Cuadrada" | "Descuadrada";
  partidas: Partida[];
}

const polizasEjemplo: Poliza[] = [
  {
    id: "1",
    folio: "D-001",
    fecha: "2025-01-15",
    tipo: "Diario",
    concepto: "Compra de mobiliario y equipo",
    total: 50000,
    estatus: "Cuadrada",
    partidas: [
      {
        id: "1-1",
        cuenta: "1202 - Mobiliario y Equipo",
        descripcion: "Compra de escritorios",
        debe: 50000,
        haber: 0,
        referencia: "FAC-001",
      },
      {
        id: "1-2",
        cuenta: "1102 - Bancos",
        descripcion: "Pago con transferencia",
        debe: 0,
        haber: 50000,
        referencia: "TRANSF-001",
      },
    ],
  },
  {
    id: "2",
    folio: "I-001",
    fecha: "2025-01-14",
    tipo: "Ingreso",
    concepto: "Venta de servicios",
    total: 100000,
    estatus: "Cuadrada",
    partidas: [
      {
        id: "2-1",
        cuenta: "1102 - Bancos",
        descripcion: "Cobro de servicios",
        debe: 100000,
        haber: 0,
        referencia: "DEP-001",
      },
      {
        id: "2-2",
        cuenta: "4000 - Ingresos",
        descripcion: "Ingresos por servicios",
        debe: 0,
        haber: 100000,
        referencia: "FAC-002",
      },
    ],
  },
];

const PolizasContables = () => {
  const [polizas] = useState<Poliza[]>(polizasEjemplo);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState<string>("all");
  const [partidas, setPartidas] = useState<Partida[]>([
    {
      id: "1",
      cuenta: "",
      descripcion: "",
      debe: 0,
      haber: 0,
      referencia: "",
    },
  ]);

  const totalDebe = partidas.reduce((sum, p) => sum + p.debe, 0);
  const totalHaber = partidas.reduce((sum, p) => sum + p.haber, 0);
  const estaCuadrada = totalDebe === totalHaber && totalDebe > 0;

  const addPartida = () => {
    setPartidas([
      ...partidas,
      {
        id: Date.now().toString(),
        cuenta: "",
        descripcion: "",
        debe: 0,
        haber: 0,
        referencia: "",
      },
    ]);
  };

  const removePartida = (id: string) => {
    if (partidas.length > 1) {
      setPartidas(partidas.filter((p) => p.id !== id));
    }
  };

  const updatePartida = (id: string, field: keyof Partida, value: any) => {
    setPartidas(
      partidas.map((p) =>
        p.id === id ? { ...p, [field]: field === "debe" || field === "haber" ? parseFloat(value) || 0 : value } : p
      )
    );
  };

  const handleGuardarPoliza = () => {
    if (!estaCuadrada) {
      toast.error("La póliza no está cuadrada. Debe = Haber");
      return;
    }
    toast.success("Póliza guardada correctamente");
    setIsDialogOpen(false);
    setPartidas([
      {
        id: "1",
        cuenta: "",
        descripcion: "",
        debe: 0,
        haber: 0,
        referencia: "",
      },
    ]);
  };

  const filteredPolizas = polizas.filter((poliza) => {
    const matchesSearch =
      searchTerm === "" ||
      poliza.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poliza.concepto.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = filterTipo === "all" || poliza.tipo === filterTipo;
    return matchesSearch && matchesTipo;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pólizas Contables</h1>
            <p className="text-muted-foreground">
              Registro y gestión de movimientos contables
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nueva Póliza
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Nueva Póliza Contable</DialogTitle>
                <DialogDescription>
                  Complete los datos de la póliza y agregue las partidas correspondientes
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                {/* Encabezado */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Encabezado</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tipo-poliza">Tipo de Póliza</Label>
                        <Select defaultValue="Diario">
                          <SelectTrigger id="tipo-poliza">
                            <SelectValue placeholder="Seleccione tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Diario">Diario</SelectItem>
                            <SelectItem value="Ingreso">Ingreso</SelectItem>
                            <SelectItem value="Egreso">Egreso</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fecha-poliza">Fecha</Label>
                        <Input id="fecha-poliza" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="folio">Folio</Label>
                        <Input id="folio" placeholder="D-001" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="concepto">Concepto General</Label>
                      <Textarea 
                        id="concepto" 
                        placeholder="Descripción general de la operación..."
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Partidas */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Partidas</CardTitle>
                        <CardDescription>Agregue los movimientos de la póliza</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={addPartida}>
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar Partida
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[250px]">Cuenta</TableHead>
                              <TableHead>Descripción</TableHead>
                              <TableHead className="w-[120px]">Debe</TableHead>
                              <TableHead className="w-[120px]">Haber</TableHead>
                              <TableHead className="w-[120px]">Referencia</TableHead>
                              <TableHead className="w-[60px]"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {partidas.map((partida) => (
                              <TableRow key={partida.id}>
                                <TableCell>
                                  <Select
                                    value={partida.cuenta}
                                    onValueChange={(value) => updatePartida(partida.id, "cuenta", value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Seleccione cuenta" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1101 - Caja">1101 - Caja</SelectItem>
                                      <SelectItem value="1102 - Bancos">1102 - Bancos</SelectItem>
                                      <SelectItem value="1201 - Equipo de Cómputo">1201 - Equipo de Cómputo</SelectItem>
                                      <SelectItem value="1202 - Mobiliario y Equipo">1202 - Mobiliario y Equipo</SelectItem>
                                      <SelectItem value="2101 - Proveedores">2101 - Proveedores</SelectItem>
                                      <SelectItem value="4000 - Ingresos">4000 - Ingresos</SelectItem>
                                      <SelectItem value="5000 - Gastos">5000 - Gastos</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell>
                                  <Input
                                    placeholder="Descripción..."
                                    value={partida.descripcion}
                                    onChange={(e) => updatePartida(partida.id, "descripcion", e.target.value)}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={partida.debe || ""}
                                    onChange={(e) => updatePartida(partida.id, "debe", e.target.value)}
                                    className="text-right font-mono"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={partida.haber || ""}
                                    onChange={(e) => updatePartida(partida.id, "haber", e.target.value)}
                                    className="text-right font-mono"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    placeholder="REF-001"
                                    value={partida.referencia}
                                    onChange={(e) => updatePartida(partida.id, "referencia", e.target.value)}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removePartida(partida.id)}
                                    disabled={partidas.length === 1}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Validación en tiempo real */}
                      <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
                        <div className="flex items-center gap-6">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Debe</p>
                            <p className="text-2xl font-bold font-mono">
                              ${totalDebe.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Haber</p>
                            <p className="text-2xl font-bold font-mono">
                              ${totalHaber.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Diferencia</p>
                            <p className={`text-2xl font-bold font-mono ${Math.abs(totalDebe - totalHaber) === 0 ? "text-green-600" : "text-red-600"}`}>
                              ${Math.abs(totalDebe - totalHaber).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {estaCuadrada ? (
                            <>
                              <CheckCircle2 className="h-6 w-6 text-green-600" />
                              <span className="font-medium text-green-600">Póliza Cuadrada</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-6 w-6 text-red-600" />
                              <span className="font-medium text-red-600">Póliza Descuadrada</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline">
                          <Paperclip className="mr-2 h-4 w-4" />
                          Adjuntar Documentos
                        </Button>
                        <Button variant="outline" disabled={!estaCuadrada} onClick={handleGuardarPoliza}>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Validar y Guardar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Registro de Pólizas</CardTitle>
                <CardDescription>
                  Historial de todas las pólizas contables registradas
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Select value={filterTipo} onValueChange={setFilterTipo}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo de póliza" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Diario">Diario</SelectItem>
                    <SelectItem value="Ingreso">Ingreso</SelectItem>
                    <SelectItem value="Egreso">Egreso</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por folio o concepto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Folio</TableHead>
                    <TableHead className="w-[120px]">Fecha</TableHead>
                    <TableHead className="w-[120px]">Tipo</TableHead>
                    <TableHead>Concepto</TableHead>
                    <TableHead className="text-right w-[150px]">Total</TableHead>
                    <TableHead className="w-[120px]">Estatus</TableHead>
                    <TableHead className="w-[100px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPolizas.map((poliza) => (
                    <TableRow key={poliza.id}>
                      <TableCell className="font-medium">{poliza.folio}</TableCell>
                      <TableCell>{new Date(poliza.fecha).toLocaleDateString("es-MX")}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            poliza.tipo === "Ingreso"
                              ? "default"
                              : poliza.tipo === "Egreso"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {poliza.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-md truncate">{poliza.concepto}</TableCell>
                      <TableCell className="text-right font-mono">
                        ${poliza.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={poliza.estatus === "Cuadrada" ? "default" : "destructive"}
                          className="gap-1"
                        >
                          {poliza.estatus === "Cuadrada" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <AlertCircle className="h-3 w-3" />
                          )}
                          {poliza.estatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PolizasContables;
