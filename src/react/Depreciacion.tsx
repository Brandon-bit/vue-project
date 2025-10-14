import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
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
import { Settings, Receipt, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ActivoDepreciacion {
  id: string;
  descripcion: string;
  valorOriginal: number;
  depreciacionAcumulada: number;
  vidaUtil: number;
  mesesDepreciados: number;
  depreciacionMensual: number;
}

const Depreciacion = () => {
  const [mesSeleccionado, setMesSeleccionado] = useState("03");
  const [anoSeleccionado, setAnoSeleccionado] = useState("2024");
  const [metodoDepreciacion, setMetodoDepreciacion] = useState("linea-recta");
  const [calculoRealizado, setCalculoRealizado] = useState(false);
  const [polizaGenerada, setPolizaGenerada] = useState(false);

  // Sample data
  const activosDepreciar: ActivoDepreciacion[] = [
    {
      id: "AF-001",
      descripcion: "Servidor Dell PowerEdge R740",
      valorOriginal: 85000,
      depreciacionAcumulada: 12750,
      vidaUtil: 60,
      mesesDepreciados: 9,
      depreciacionMensual: 1416.67,
    },
    {
      id: "AF-002",
      descripcion: "Vehículo Toyota Hilux 2023",
      valorOriginal: 450000,
      depreciacionAcumulada: 45000,
      vidaUtil: 60,
      mesesDepreciados: 6,
      depreciacionMensual: 7500,
    },
    {
      id: "AF-003",
      descripcion: "Equipo de aire acondicionado industrial",
      valorOriginal: 125000,
      depreciacionAcumulada: 20833.33,
      vidaUtil: 72,
      mesesDepreciados: 12,
      depreciacionMensual: 1736.11,
    },
  ];

  const calcularDepreciacion = () => {
    setCalculoRealizado(true);
    setPolizaGenerada(false);
  };

  const generarPoliza = () => {
    setPolizaGenerada(true);
  };

  const totalDepreciacionMensual = activosDepreciar.reduce(
    (sum, a) => sum + a.depreciacionMensual,
    0
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Depreciación de Activos</h1>
          <p className="text-muted-foreground mt-2">
            Cálculo automático de depreciación y generación de pólizas contables
          </p>
        </div>

        {/* Motor de cálculo */}
        <Card>
          <CardHeader>
            <CardTitle>Motor de Cálculo de Depreciación</CardTitle>
            <CardDescription>
              Configure los parámetros para calcular la depreciación del periodo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Mes a depreciar</Label>
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
                <Label>Método de depreciación</Label>
                <Select
                  value={metodoDepreciacion}
                  onValueChange={setMetodoDepreciacion}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linea-recta">Línea Recta</SelectItem>
                    <SelectItem value="saldos-decrecientes">
                      Saldos Decrecientes
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button size="lg" onClick={calcularDepreciacion}>
                <Settings className="mr-2 h-4 w-4" />
                Calcular depreciación del periodo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Vista previa del cálculo */}
        {calculoRealizado && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Vista Previa del Cálculo - Marzo 2024</CardTitle>
                  <CardDescription>
                    Revise los activos que serán depreciados y sus montos
                  </CardDescription>
                </div>
                {!polizaGenerada && (
                  <Button size="lg" onClick={generarPoliza}>
                    <Receipt className="mr-2 h-4 w-4" />
                    Generar póliza automática
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!polizaGenerada ? (
                <div className="mb-4 p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold">
                      Cálculo completado - Revisar antes de generar póliza
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mb-4 p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">
                      Póliza de depreciación D-DEP-202403 generada exitosamente
                    </span>
                  </div>
                </div>
              )}

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Activo</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right">Valor Original</TableHead>
                    <TableHead className="text-right">Deprec. Acumulada</TableHead>
                    <TableHead className="text-center">Vida Útil</TableHead>
                    <TableHead className="text-center">Meses Deprec.</TableHead>
                    <TableHead className="text-right">Deprec. Mensual</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activosDepreciar.map((activo) => (
                    <TableRow key={activo.id}>
                      <TableCell>
                        <Badge variant="outline">{activo.id}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{activo.descripcion}</TableCell>
                      <TableCell className="text-right">
                        ${activo.valorOriginal.toLocaleString("es-MX", {
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        ${activo.depreciacionAcumulada.toLocaleString("es-MX", {
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell className="text-center">
                        {activo.vidaUtil} meses
                      </TableCell>
                      <TableCell className="text-center">
                        {activo.mesesDepreciados} meses
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ${activo.depreciacionMensual.toLocaleString("es-MX", {
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Totales */}
              <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Total de activos a depreciar
                    </div>
                    <div className="text-lg font-bold">{activosDepreciar.length}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      Depreciación total del mes
                    </div>
                    <div className="text-2xl font-bold">
                      ${totalDepreciacionMensual.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detalle de la póliza generada */}
              {polizaGenerada && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Detalle de Póliza Generada</CardTitle>
                    <CardDescription>
                      Asientos contables de la depreciación automática
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Cuenta</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead className="text-right">Debe</TableHead>
                          <TableHead className="text-right">Haber</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            5201-001 Depreciación
                          </TableCell>
                          <TableCell>
                            Depreciación de activos fijos - Marzo 2024
                          </TableCell>
                          <TableCell className="text-right">
                            ${totalDepreciacionMensual.toLocaleString("es-MX", {
                              minimumFractionDigits: 2,
                            })}
                          </TableCell>
                          <TableCell className="text-right">-</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            1201-002 Depreciación Acumulada
                          </TableCell>
                          <TableCell>
                            Depreciación acumulada - Marzo 2024
                          </TableCell>
                          <TableCell className="text-right">-</TableCell>
                          <TableCell className="text-right">
                            ${totalDepreciacionMensual.toLocaleString("es-MX", {
                              minimumFractionDigits: 2,
                            })}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <div className="flex gap-3 mt-6">
                      <Button variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        Ver póliza completa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        )}

        {/* Reportes */}
        <Card>
          <CardHeader>
            <CardTitle>Reportes de Depreciación</CardTitle>
            <CardDescription>
              Genere reportes detallados para conciliación contable-fiscal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Reporte anual de depreciación
              </Button>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Conciliación contable-fiscal
              </Button>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Historial de depreciaciones
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Depreciacion;
