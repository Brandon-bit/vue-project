import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Search, FileText, Download, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Movimiento {
  fecha: string;
  poliza: string;
  cuenta: string;
  descripcion: string;
  debe: number;
  haber: number;
  saldo: number;
  documento?: string;
}

const MovimientosContables = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [resultados, setResultados] = useState<Movimiento[]>([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Sample data
  const movimientos: Movimiento[] = [
    {
      fecha: "2024-03-15",
      poliza: "D-001",
      cuenta: "1105-001 Bancos BBVA",
      descripcion: "Depósito de cliente ABC",
      debe: 50000,
      haber: 0,
      saldo: 50000,
      documento: "FAC-1234",
    },
    {
      fecha: "2024-03-15",
      poliza: "I-045",
      cuenta: "4101-001 Ventas",
      descripcion: "Venta de servicios",
      debe: 0,
      haber: 43103.45,
      saldo: 43103.45,
    },
    {
      fecha: "2024-03-16",
      poliza: "E-089",
      cuenta: "5101-001 Gastos de operación",
      descripcion: "Pago de servicios",
      debe: 15000,
      haber: 0,
      saldo: 15000,
    },
    {
      fecha: "2024-03-16",
      poliza: "E-089",
      cuenta: "1105-001 Bancos BBVA",
      descripcion: "Pago de servicios",
      debe: 0,
      haber: 15000,
      saldo: 35000,
    },
  ];

  const ejecutarBusqueda = () => {
    setResultados(movimientos);
    setMostrarResultados(true);
  };

  const totalDebe = resultados.reduce((sum, m) => sum + m.debe, 0);
  const totalHaber = resultados.reduce((sum, m) => sum + m.haber, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Movimientos Contables</h1>
          <p className="text-muted-foreground mt-2">
            Consulta detallada de cada asiento contable y su impacto en los saldos
          </p>
        </div>

        {/* Filtros de búsqueda */}
        <Card>
          <CardHeader>
            <CardTitle>Motor de Búsqueda y Filtrado</CardTitle>
            <CardDescription>
              Localice movimientos específicos usando los filtros disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label>Fecha inicio</Label>
                <Input type="date" defaultValue="2024-03-01" />
              </div>
              <div>
                <Label>Fecha fin</Label>
                <Input type="date" defaultValue="2024-03-31" />
              </div>
              <div>
                <Label>Cuenta contable</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar cuenta..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label>Folio de póliza</Label>
                <Input placeholder="Ej: D-001, I-045..." />
              </div>
              <div>
                <Label>Centro de costo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administración</SelectItem>
                    <SelectItem value="ventas">Ventas</SelectItem>
                    <SelectItem value="produccion">Producción</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Documento origen</Label>
                <Input placeholder="Ej: FAC-1234..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button size="lg" onClick={ejecutarBusqueda}>
                <Search className="mr-2 h-4 w-4" />
                Buscar movimientos
              </Button>
              <Button variant="outline" size="lg">
                <TrendingUp className="mr-2 h-4 w-4" />
                Ver auxiliares por cuenta
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        {mostrarResultados && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Resultados de Búsqueda</CardTitle>
                  <CardDescription>
                    {resultados.length} movimientos encontrados
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Exportar Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Póliza</TableHead>
                    <TableHead>Cuenta</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right">Debe</TableHead>
                    <TableHead className="text-right">Haber</TableHead>
                    <TableHead className="text-right">Saldo</TableHead>
                    <TableHead>Documento</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resultados.map((movimiento, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(movimiento.fecha).toLocaleDateString("es-MX")}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{movimiento.poliza}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{movimiento.cuenta}</TableCell>
                      <TableCell>{movimiento.descripcion}</TableCell>
                      <TableCell className="text-right">
                        {movimiento.debe > 0
                          ? `$${movimiento.debe.toLocaleString("es-MX", {
                              minimumFractionDigits: 2,
                            })}`
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        {movimiento.haber > 0
                          ? `$${movimiento.haber.toLocaleString("es-MX", {
                              minimumFractionDigits: 2,
                            })}`
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ${movimiento.saldo.toLocaleString("es-MX", {
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell>
                        {movimiento.documento && (
                          <Badge variant="secondary">{movimiento.documento}</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Totales */}
              <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                <div className="flex justify-end gap-8">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Total Debe</div>
                    <div className="text-lg font-bold">
                      ${totalDebe.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Total Haber</div>
                    <div className="text-lg font-bold">
                      ${totalHaber.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default MovimientosContables;
