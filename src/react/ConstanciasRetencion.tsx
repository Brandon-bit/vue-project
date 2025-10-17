import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Plus, Trash2, Search, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Retencion {
  id: string;
  concepto: string;
  baseCalculo: number;
  tasaISR: number;
  montoISR: number;
  tasaIVA: number;
  montoIVA: number;
  total: number;
}

const ConstanciasRetencion = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<"receptor" | "retenciones" | "preview">("receptor");
  const [retenciones, setRetenciones] = useState<Retencion[]>([]);
  const [nuevaRetencion, setNuevaRetencion] = useState({
    concepto: "",
    baseCalculo: 0,
  });

  const conceptosRetenciones = [
    {
      value: "servicios_profesionales",
      label: "Servicios Profesionales",
      tasaISR: 0.1,
      tasaIVA: 0.106667,
    },
    { value: "arrendamiento", label: "Arrendamiento", tasaISR: 0.1, tasaIVA: 0.106667 },
    { value: "honorarios", label: "Honorarios", tasaISR: 0.1, tasaIVA: 0.106667 },
    { value: "intereses", label: "Intereses", tasaISR: 0.1, tasaIVA: 0.0 },
    { value: "dividendos", label: "Dividendos", tasaISR: 0.1, tasaIVA: 0.0 },
  ];

  const agregarRetencion = () => {
    if (!nuevaRetencion.concepto || nuevaRetencion.baseCalculo <= 0) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    const conceptoSeleccionado = conceptosRetenciones.find((c) => c.value === nuevaRetencion.concepto);
    if (!conceptoSeleccionado) return;

    const montoISR = nuevaRetencion.baseCalculo * conceptoSeleccionado.tasaISR;
    const montoIVA = nuevaRetencion.baseCalculo * conceptoSeleccionado.tasaIVA;
    const total = montoISR + montoIVA;

    const retencion: Retencion = {
      id: Date.now().toString(),
      concepto: conceptoSeleccionado.label,
      baseCalculo: nuevaRetencion.baseCalculo,
      tasaISR: conceptoSeleccionado.tasaISR,
      montoISR,
      tasaIVA: conceptoSeleccionado.tasaIVA,
      montoIVA,
      total,
    };

    setRetenciones([...retenciones, retencion]);
    setNuevaRetencion({ concepto: "", baseCalculo: 0 });
    toast({
      title: "Retención agregada",
      description: "La retención se agregó correctamente",
    });
  };

  const eliminarRetencion = (id: string) => {
    setRetenciones(retenciones.filter((r) => r.id !== id));
  };

  const calcularTotales = () => {
    const totalISR = retenciones.reduce((sum, r) => sum + r.montoISR, 0);
    const totalIVA = retenciones.reduce((sum, r) => sum + r.montoIVA, 0);
    const total = retenciones.reduce((sum, r) => sum + r.total, 0);
    return { totalISR, totalIVA, total };
  };

  const generarConstancia = () => {
    toast({
      title: "Generando Constancia...",
      description: "Se está procesando el timbrado",
    });
    setTimeout(() => {
      toast({
        title: "✅ Constancia Generada",
        description: "La constancia se ha generado exitosamente",
      });
    }, 2000);
  };

  const totales = calcularTotales();

  return (
    <Layout>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Constancias de Retención</h1>
            <p className="text-muted-foreground mt-1">
              Genera constancias de retenciones e información de pagos
            </p>
          </div>
        </div>

        <Tabs value={step} onValueChange={(v) => setStep(v as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="receptor">1. Receptor y Periodo</TabsTrigger>
            <TabsTrigger value="retenciones" disabled={step === "receptor"}>
              2. Detalle de Retenciones
            </TabsTrigger>
            <TabsTrigger value="preview" disabled={step !== "preview"}>
              3. Vista Previa
            </TabsTrigger>
          </TabsList>

          <TabsContent value="receptor" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Receptor de la Constancia</CardTitle>
                <CardDescription>Busca o da de alta el proveedor/receptor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1 space-y-2">
                    <Label>Buscar Proveedor</Label>
                    <div className="flex gap-2">
                      <Input placeholder="RFC o Razón Social" />
                      <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline">+ Nuevo Proveedor</Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>RFC *</Label>
                    <Input placeholder="XAXX010101000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Razón Social *</Label>
                    <Input placeholder="Nombre o Razón Social" />
                  </div>
                  <div className="space-y-2">
                    <Label>Régimen Fiscal *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="612">
                          612 - Personas Físicas con Actividades Empresariales
                        </SelectItem>
                        <SelectItem value="605">605 - Sueldos y Salarios</SelectItem>
                        <SelectItem value="606">606 - Arrendamiento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Código Postal *</Label>
                    <Input placeholder="00000" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Periodo de la Constancia</CardTitle>
                <CardDescription>Define el periodo que cubre la constancia</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Mes *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona..." />
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
                <div className="space-y-2">
                  <Label>Año *</Label>
                  <Select defaultValue="2024">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => setStep("retenciones")} size="lg">
                Continuar a Retenciones →
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="retenciones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Agregar Retención</CardTitle>
                <CardDescription>
                  Selecciona el concepto y el sistema calculará automáticamente las retenciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Concepto de Retención *</Label>
                    <Select
                      value={nuevaRetencion.concepto}
                      onValueChange={(value) => setNuevaRetencion({ ...nuevaRetencion, concepto: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona..." />
                      </SelectTrigger>
                      <SelectContent>
                        {conceptosRetenciones.map((concepto) => (
                          <SelectItem key={concepto.value} value={concepto.value}>
                            {concepto.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Base de Cálculo (Monto) *</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={nuevaRetencion.baseCalculo || ""}
                      onChange={(e) =>
                        setNuevaRetencion({
                          ...nuevaRetencion,
                          baseCalculo: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>

                {nuevaRetencion.concepto && nuevaRetencion.baseCalculo > 0 && (
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p className="text-sm font-semibold">Cálculo Automático:</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Retención ISR:</p>
                        <p className="font-semibold">
                          $
                          {(
                            nuevaRetencion.baseCalculo *
                            (conceptosRetenciones.find((c) => c.value === nuevaRetencion.concepto)?.tasaISR ||
                              0)
                          ).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Retención IVA:</p>
                        <p className="font-semibold">
                          $
                          {(
                            nuevaRetencion.baseCalculo *
                            (conceptosRetenciones.find((c) => c.value === nuevaRetencion.concepto)?.tasaIVA ||
                              0)
                          ).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Retenido:</p>
                        <p className="font-semibold">
                          $
                          {(
                            nuevaRetencion.baseCalculo *
                            ((conceptosRetenciones.find((c) => c.value === nuevaRetencion.concepto)?.tasaISR ||
                              0) +
                              (conceptosRetenciones.find((c) => c.value === nuevaRetencion.concepto)
                                ?.tasaIVA || 0))
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Button onClick={agregarRetencion} className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  Agregar Retención
                </Button>
              </CardContent>
            </Card>

            {retenciones.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Retenciones Agregadas ({retenciones.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Concepto</TableHead>
                        <TableHead className="text-right">Base de Cálculo</TableHead>
                        <TableHead className="text-right">ISR (10%)</TableHead>
                        <TableHead className="text-right">IVA Ret.</TableHead>
                        <TableHead className="text-right">Total Retenido</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {retenciones.map((retencion) => (
                        <TableRow key={retencion.id}>
                          <TableCell className="font-medium">{retencion.concepto}</TableCell>
                          <TableCell className="text-right">${retencion.baseCalculo.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${retencion.montoISR.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${retencion.montoIVA.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-semibold">
                            ${retencion.total.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => eliminarRetencion(retencion.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <Separator className="my-4" />

                  <div className="flex justify-end">
                    <div className="space-y-2 w-64">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total ISR:</span>
                        <span className="font-medium">${totales.totalISR.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total IVA Ret.:</span>
                        <span className="font-medium">${totales.totalIVA.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Total Retenido:</span>
                        <span className="font-bold">${totales.total.toFixed(2)} MXN</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("receptor")}>
                ← Volver a Receptor
              </Button>
              <Button onClick={() => setStep("preview")} size="lg" disabled={retenciones.length === 0}>
                Continuar a Vista Previa →
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa de la Constancia</CardTitle>
                <CardDescription>Revisa los datos antes de generar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Receptor</h3>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p>RFC: [RFC del proveedor]</p>
                    <p>[Razón Social del proveedor]</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Periodo</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>Enero 2024</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Retenciones ({retenciones.length})</h3>
                  <div className="space-y-2 text-sm">
                    {retenciones.map((r) => (
                      <div key={r.id} className="flex justify-between">
                        <span>
                          {r.concepto} - ${r.baseCalculo.toFixed(2)}
                        </span>
                        <span className="font-medium">${r.total.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <div className="space-y-2 w-64 text-right">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total ISR Retenido:</span>
                      <span className="font-medium">${totales.totalISR.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total IVA Retenido:</span>
                      <span className="font-medium">${totales.totalIVA.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl">
                      <span className="font-bold">Total Retenido:</span>
                      <span className="font-bold">${totales.total.toFixed(2)} MXN</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between gap-4">
              <Button variant="outline" onClick={() => setStep("retenciones")}>
                ← Volver a Retenciones
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Guardar Borrador
                </Button>
                <Button onClick={generarConstancia} size="lg" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Generar y Timbrar Constancia
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ConstanciasRetencion;
