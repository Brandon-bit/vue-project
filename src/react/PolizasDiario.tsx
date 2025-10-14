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
import { Plus, Search, FileText, Trash2, CheckCircle, AlertCircle } from "lucide-react";
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
  concepto: string;
  total: number;
  usuario: string;
}

const PolizasDiario = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const polizas: Poliza[] = [
    {
      folio: "D-001",
      fecha: "2024-03-15",
      concepto: "Ajuste de depreciación mensual",
      total: 15000,
      usuario: "Admin",
    },
    {
      folio: "D-002",
      fecha: "2024-03-16",
      concepto: "Reclasificación de gastos",
      total: 8500,
      usuario: "Contador",
    },
  ];

  const agregarPartida = () => {
    const nuevaPartida: Partida = {
      id: `P-${partidas.length + 1}`,
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
            <h1 className="text-3xl font-bold tracking-tight">Pólizas de Diario</h1>
            <p className="text-muted-foreground mt-2">
              Registro de operaciones generales, ajustes y reclasificaciones contables
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Crear póliza de diario
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Nueva Póliza de Diario</DialogTitle>
                <DialogDescription>
                  Complete los campos para registrar una nueva póliza de diario general
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
                      <Input value="Diario" disabled className="bg-muted" />
                    </div>
                    <div>
                      <Label>Fecha</Label>
                      <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div className="col-span-2">
                      <Label>Concepto</Label>
                      <Textarea placeholder="Describa el motivo de la póliza..." rows={3} />
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
                          Agregue las cuentas afectadas por esta operación
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
                              No hay partidas agregadas. Haga clic en "Agregar partida" para comenzar.
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
                    placeholder="Buscar por folio, concepto o cuenta..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label>Fecha inicio</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Fecha fin</Label>
                <Input type="date" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de pólizas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pólizas Registradas</CardTitle>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Reporte de diario general
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Folio</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {polizas.map((poliza) => (
                  <TableRow key={poliza.folio}>
                    <TableCell className="font-medium">{poliza.folio}</TableCell>
                    <TableCell>{new Date(poliza.fecha).toLocaleDateString("es-MX")}</TableCell>
                    <TableCell>{poliza.concepto}</TableCell>
                    <TableCell className="text-right">
                      ${poliza.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{poliza.usuario}</Badge>
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

export default PolizasDiario;
