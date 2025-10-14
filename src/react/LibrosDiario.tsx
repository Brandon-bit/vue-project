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
import { Calendar, FileText, Download, Printer, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EntradaDiario {
  fecha: string;
  folio: string;
  tipo: string;
  concepto: string;
  cuenta: string;
  debe: number;
  haber: number;
}

const LibrosDiario = () => {
  const [mesSeleccionado, setMesSeleccionado] = useState("03");
  const [anoSeleccionado, setAnoSeleccionado] = useState("2024");
  const [libroGenerado, setLibroGenerado] = useState(false);

  // Sample data
  const entradasDiario: EntradaDiario[] = [
    {
      fecha: "2024-03-15",
      folio: "D-001",
      tipo: "Diario",
      concepto: "Ajuste de depreciación mensual",
      cuenta: "5201-001 Depreciación",
      debe: 15000,
      haber: 0,
    },
    {
      fecha: "2024-03-15",
      folio: "D-001",
      tipo: "Diario",
      concepto: "Ajuste de depreciación mensual",
      cuenta: "1201-002 Depreciación Acumulada",
      debe: 0,
      haber: 15000,
    },
    {
      fecha: "2024-03-16",
      folio: "I-045",
      tipo: "Ingreso",
      concepto: "Cobro de factura ABC-123",
      cuenta: "1105-001 Bancos BBVA",
      debe: 50000,
      haber: 0,
    },
    {
      fecha: "2024-03-16",
      folio: "I-045",
      tipo: "Ingreso",
      concepto: "Cobro de factura ABC-123",
      cuenta: "1103-001 Clientes",
      debe: 0,
      haber: 50000,
    },
    {
      fecha: "2024-03-17",
      folio: "E-089",
      tipo: "Egreso",
      concepto: "Pago de nómina quincenal",
      cuenta: "5102-001 Sueldos y salarios",
      debe: 85000,
      haber: 0,
    },
    {
      fecha: "2024-03-17",
      folio: "E-089",
      tipo: "Egreso",
      concepto: "Pago de nómina quincenal",
      cuenta: "1105-001 Bancos BBVA",
      debe: 0,
      haber: 85000,
    },
  ];

  const generarLibro = () => {
    setLibroGenerado(true);
  };

  const totalDebe = entradasDiario.reduce((sum, e) => sum + e.debe, 0);
  const totalHaber = entradasDiario.reduce((sum, e) => sum + e.haber, 0);

  const getTipoBadgeVariant = (tipo: string) => {
    switch (tipo) {
      case "Ingreso":
        return "default";
      case "Egreso":
        return "destructive";
      case "Diario":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Libros de Diario</h1>
          <p className="text-muted-foreground mt-2">
            Generación del libro diario oficial con respaldo normativo
          </p>
        </div>

        {/* Parámetros de generación */}
        <Card>
          <CardHeader>
            <CardTitle>Parámetros de Generación</CardTitle>
            <CardDescription>
              Seleccione el periodo para generar el libro diario oficial
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Mes</Label>
                <Select value={mesSeleccionado} onValueChange={setMesSeleccionado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar mes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="01">Enero</SelectItem>
                    <SelectItem value="02">Febrero</SelectItem>
                    <SelectItem value="03">Marzo</SelectItem>
                    <SelectItem value="04">Abril</SelectItem>
                    <SelectItem value="05">Mayo</SelectItem>
                    <SelectItem value="06">Junio</SelectItem>
                    <SelectItem value="07">Julio</SelectItem>
                    <SelectItem value="08">Agosto</SelectItem>
                    <SelectItem value="09">Septiembre</SelectItem>
                    <SelectItem value="10">Octubre</SelectItem>
                    <SelectItem value="11">Noviembre</SelectItem>
                    <SelectItem value="12">Diciembre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Año</Label>
                <Select value={anoSeleccionado} onValueChange={setAnoSeleccionado}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar año" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tipo de póliza (opcional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="diario">Diario</SelectItem>
                    <SelectItem value="ingreso">Ingresos</SelectItem>
                    <SelectItem value="egreso">Egresos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button size="lg" onClick={generarLibro}>
                <Calendar className="mr-2 h-4 w-4" />
                Generar libro diario del periodo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Vista previa del libro */}
        {libroGenerado && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Libro Diario General - Marzo 2024</CardTitle>
                  <CardDescription>
                    Vista previa del libro contable oficial
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
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimir
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-semibold">
                    Libro generado correctamente - Cumple con requisitos fiscales
                  </span>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Folio</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Concepto</TableHead>
                    <TableHead>Cuenta</TableHead>
                    <TableHead className="text-right">Debe</TableHead>
                    <TableHead className="text-right">Haber</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entradasDiario.map((entrada, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(entrada.fecha).toLocaleDateString("es-MX")}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{entrada.folio}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getTipoBadgeVariant(entrada.tipo)}>
                          {entrada.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell>{entrada.concepto}</TableCell>
                      <TableCell className="font-medium">{entrada.cuenta}</TableCell>
                      <TableCell className="text-right">
                        {entrada.debe > 0
                          ? `$${entrada.debe.toLocaleString("es-MX", {
                              minimumFractionDigits: 2,
                            })}`
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        {entrada.haber > 0
                          ? `$${entrada.haber.toLocaleString("es-MX", {
                              minimumFractionDigits: 2,
                            })}`
                          : "-"}
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
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Diferencia</div>
                    <div className="text-lg font-bold text-green-600">
                      $0.00
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

export default LibrosDiario;
