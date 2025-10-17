import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Search, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Complementos = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<"seleccion" | "formulario" | "preview">("seleccion");
  const [tipoComplemento, setTipoComplemento] = useState<"pago" | "cartaporte" | "">("");
  const [cfdiSeleccionado, setCfdiSeleccionado] = useState<any>(null);

  const seleccionarCFDI = (cfdi: any) => {
    setCfdiSeleccionado(cfdi);
    setStep("formulario");
  };

  const generarComplemento = () => {
    toast({
      title: "Generando Complemento...",
      description: "Se está procesando el timbrado",
    });
    setTimeout(() => {
      toast({
        title: "✅ Complemento Generado",
        description: "El complemento se ha generado exitosamente",
      });
    }, 2000);
  };

  // CFDIs de ejemplo
  const cfdisDisponibles = [
    {
      id: "1",
      folio: "A-1001",
      uuid: "A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6",
      receptor: "Cliente Ejemplo S.A. de C.V.",
      fecha: "2024-01-15",
      total: 11600.0,
      metodoPago: "PPD",
    },
    {
      id: "2",
      folio: "A-1002",
      uuid: "Z9Y8X7W6-V5U4-T3S2-R1Q0-P9O8N7M6L5K4",
      receptor: "Otro Cliente S.A. de C.V.",
      fecha: "2024-01-20",
      total: 23200.0,
      metodoPago: "PPD",
    },
  ];

  return (
    <Layout>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Generación de Complementos</h1>
            <p className="text-muted-foreground mt-1">
              Genera complementos de pago, carta porte y más de forma optimizada
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tipo de Complemento</CardTitle>
            <CardDescription>Selecciona el tipo de complemento que deseas generar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant={tipoComplemento === "pago" ? "default" : "outline"}
                onClick={() => setTipoComplemento("pago")}
                className="h-24 flex flex-col gap-2"
              >
                <FileText className="h-6 w-6" />
                <span className="font-semibold">Complemento de Pago</span>
                <span className="text-xs opacity-70">REP - Recepción de Pagos</span>
              </Button>
              <Button
                variant={tipoComplemento === "cartaporte" ? "default" : "outline"}
                onClick={() => setTipoComplemento("cartaporte")}
                className="h-24 flex flex-col gap-2"
              >
                <FileText className="h-6 w-6" />
                <span className="font-semibold">Carta Porte</span>
                <span className="text-xs opacity-70">Transporte de mercancías</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2" disabled>
                <FileText className="h-6 w-6" />
                <span className="font-semibold">Otros</span>
                <span className="text-xs opacity-70">Próximamente</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {tipoComplemento && (
          <Tabs value={step} onValueChange={(v) => setStep(v as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="seleccion">1. Seleccionar CFDI</TabsTrigger>
              <TabsTrigger value="formulario" disabled={!cfdiSeleccionado}>
                2. Datos del Complemento
              </TabsTrigger>
              <TabsTrigger value="preview" disabled={step !== "preview"}>
                3. Vista Previa
              </TabsTrigger>
            </TabsList>

            <TabsContent value="seleccion" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Buscar CFDI Origen</CardTitle>
                  <CardDescription>
                    Selecciona la factura a la que se le aplicará el complemento
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input placeholder="Buscar por Folio Fiscal (UUID), Folio o RFC del Receptor" />
                    <Button variant="outline" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-semibold">CFDIs Pendientes de Complemento</h3>
                    {cfdisDisponibles.map((cfdi) => (
                      <Card
                        key={cfdi.id}
                        className="cursor-pointer hover:border-primary transition-colors"
                        onClick={() => seleccionarCFDI(cfdi)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <p className="font-semibold">Folio: {cfdi.folio}</p>
                              <p className="text-sm text-muted-foreground">UUID: {cfdi.uuid}</p>
                              <p className="text-sm">{cfdi.receptor}</p>
                              <p className="text-xs text-muted-foreground">
                                Fecha: {cfdi.fecha} | Método: {cfdi.metodoPago}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">${cfdi.total.toFixed(2)}</p>
                              <p className="text-xs text-muted-foreground">MXN</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="formulario" className="space-y-4">
              {tipoComplemento === "pago" && cfdiSeleccionado && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>CFDI Origen (Pre-cargado)</CardTitle>
                      <CardDescription>Información del CFDI al que se aplicará el pago</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Folio</Label>
                        <Input value={cfdiSeleccionado.folio} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label>UUID</Label>
                        <Input value={cfdiSeleccionado.uuid} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label>Receptor</Label>
                        <Input value={cfdiSeleccionado.receptor} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label>Total CFDI</Label>
                        <Input value={`$${cfdiSeleccionado.total.toFixed(2)} MXN`} disabled />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Información del Pago</CardTitle>
                      <CardDescription>Completa solo los datos nuevos del pago recibido</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Fecha de Pago *</Label>
                          <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                        </div>
                        <div className="space-y-2">
                          <Label>Forma de Pago *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="01">01 - Efectivo</SelectItem>
                              <SelectItem value="02">02 - Cheque nominativo</SelectItem>
                              <SelectItem value="03">03 - Transferencia electrónica de fondos</SelectItem>
                              <SelectItem value="04">04 - Tarjeta de crédito</SelectItem>
                              <SelectItem value="28">28 - Tarjeta de débito</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Monto del Pago *</Label>
                          <Input type="number" placeholder="0.00" step="0.01" />
                        </div>
                        <div className="space-y-2">
                          <Label>Moneda</Label>
                          <Select defaultValue="MXN">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MXN">MXN - Peso Mexicano</SelectItem>
                              <SelectItem value="USD">USD - Dólar Americano</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-semibold mb-3">Información Bancaria (Opcional)</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Banco Ordenante</Label>
                            <Input placeholder="Nombre del banco" />
                          </div>
                          <div className="space-y-2">
                            <Label>Cuenta Ordenante</Label>
                            <Input placeholder="Últimos 4 dígitos" maxLength={4} />
                          </div>
                          <div className="space-y-2">
                            <Label>Banco Beneficiario</Label>
                            <Input placeholder="Nombre del banco" />
                          </div>
                          <div className="space-y-2">
                            <Label>Cuenta Beneficiaria</Label>
                            <Input placeholder="Últimos 4 dígitos" maxLength={4} />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Número de Operación / Referencia</Label>
                        <Input placeholder="Referencia bancaria o número de transacción" />
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {tipoComplemento === "cartaporte" && cfdiSeleccionado && (
                <Card>
                  <CardHeader>
                    <CardTitle>Datos de Carta Porte</CardTitle>
                    <CardDescription>Información del transporte de mercancías</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Formulario de Carta Porte en desarrollo...
                    </p>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep("seleccion")}>
                  ← Volver a Selección
                </Button>
                <Button onClick={() => setStep("preview")} size="lg">
                  Continuar a Vista Previa →
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vista Previa del Complemento</CardTitle>
                  <CardDescription>Revisa los datos antes de timbrar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">CFDI Relacionado</h3>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p>Folio: {cfdiSeleccionado?.folio}</p>
                      <p>UUID: {cfdiSeleccionado?.uuid}</p>
                      <p>Total Original: ${cfdiSeleccionado?.total.toFixed(2)} MXN</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-2">Información del Pago</h3>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p>Fecha: {new Date().toLocaleDateString("es-MX")}</p>
                      <p>Forma de Pago: 03 - Transferencia electrónica de fondos</p>
                      <p>Monto: $5,000.00 MXN</p>
                      <p>Referencia: REF-123456789</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between gap-4">
                <Button variant="outline" onClick={() => setStep("formulario")}>
                  ← Volver al Formulario
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Guardar Borrador
                  </Button>
                  <Button onClick={generarComplemento} size="lg" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Generar y Timbrar Complemento
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

export default Complementos;
