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
import { Plus, Trash2, Search, FileText, Send, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Concepto {
  id: string;
  claveProdServ: string;
  claveUnidad: string;
  descripcion: string;
  cantidad: number;
  valorUnitario: number;
  importe: number;
  iva: number;
  total: number;
}

const GeneracionCFDI = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<"datos" | "conceptos" | "preview">("datos");
  const [conceptos, setConceptos] = useState<Concepto[]>([]);
  const [newConcepto, setNewConcepto] = useState<Partial<Concepto>>({
    cantidad: 1,
    valorUnitario: 0,
  });

  const agregarConcepto = () => {
    if (!newConcepto.descripcion || !newConcepto.cantidad || !newConcepto.valorUnitario) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos del concepto",
        variant: "destructive",
      });
      return;
    }

    const importe = newConcepto.cantidad! * newConcepto.valorUnitario!;
    const iva = importe * 0.16;
    const total = importe + iva;

    const concepto: Concepto = {
      id: Date.now().toString(),
      claveProdServ: newConcepto.claveProdServ || "",
      claveUnidad: newConcepto.claveUnidad || "E48",
      descripcion: newConcepto.descripcion!,
      cantidad: newConcepto.cantidad!,
      valorUnitario: newConcepto.valorUnitario!,
      importe,
      iva,
      total,
    };

    setConceptos([...conceptos, concepto]);
    setNewConcepto({ cantidad: 1, valorUnitario: 0 });
    toast({
      title: "Concepto agregado",
      description: "El concepto se agregó correctamente",
    });
  };

  const eliminarConcepto = (id: string) => {
    setConceptos(conceptos.filter((c) => c.id !== id));
  };

  const calcularTotales = () => {
    const subtotal = conceptos.reduce((sum, c) => sum + c.importe, 0);
    const totalIVA = conceptos.reduce((sum, c) => sum + c.iva, 0);
    const total = conceptos.reduce((sum, c) => sum + c.total, 0);
    return { subtotal, totalIVA, total };
  };

  const generarYTimbrar = () => {
    toast({
      title: "Generando CFDI...",
      description: "Se está procesando el timbrado con el PAC",
    });
    setTimeout(() => {
      toast({
        title: "✅ CFDI Generado",
        description: "Folio Fiscal: A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6",
      });
    }, 2000);
  };

  const totales = calcularTotales();

  return (
    <Layout>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Generación de CFDI 4.0</h1>
            <p className="text-muted-foreground mt-1">
              Genera facturas electrónicas cumpliendo con la normativa del SAT
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Plantillas
          </Button>
        </div>

        <Tabs value={step} onValueChange={(v) => setStep(v as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="datos">1. Datos del Comprobante</TabsTrigger>
            <TabsTrigger value="conceptos" disabled={step === "datos"}>
              2. Conceptos
            </TabsTrigger>
            <TabsTrigger value="preview" disabled={step !== "preview"}>
              3. Vista Previa
            </TabsTrigger>
          </TabsList>

          <TabsContent value="datos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Emisor</CardTitle>
                <CardDescription>Datos precargados desde la configuración de la empresa</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>RFC</Label>
                  <Input value="ABC123456XYZ" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Razón Social</Label>
                  <Input value="Mi Empresa S.A. de C.V." disabled />
                </div>
                <div className="space-y-2">
                  <Label>Régimen Fiscal</Label>
                  <Input value="601 - General de Ley Personas Morales" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Código Postal</Label>
                  <Input value="06000" disabled />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Receptor</CardTitle>
                <CardDescription>Busca o da de alta un nuevo cliente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1 space-y-2">
                    <Label>Buscar Cliente</Label>
                    <div className="flex gap-2">
                      <Input placeholder="RFC o Razón Social" />
                      <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline">+ Nuevo Cliente</Button>
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
                        <SelectItem value="601">601 - General de Ley Personas Morales</SelectItem>
                        <SelectItem value="603">603 - Personas Morales con Fines no Lucrativos</SelectItem>
                        <SelectItem value="605">605 - Sueldos y Salarios</SelectItem>
                        <SelectItem value="606">606 - Arrendamiento</SelectItem>
                        <SelectItem value="612">612 - Personas Físicas con Actividades Empresariales</SelectItem>
                        <SelectItem value="616">616 - Sin obligaciones fiscales</SelectItem>
                        <SelectItem value="621">621 - Incorporación Fiscal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Código Postal *</Label>
                    <Input placeholder="00000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Uso de CFDI *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="G01">G01 - Adquisición de mercancías</SelectItem>
                        <SelectItem value="G02">G02 - Devoluciones, descuentos o bonificaciones</SelectItem>
                        <SelectItem value="G03">G03 - Gastos en general</SelectItem>
                        <SelectItem value="I01">I01 - Construcciones</SelectItem>
                        <SelectItem value="P01">P01 - Por definir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Datos del Comprobante</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Método de Pago *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PUE">PUE - Pago en una sola exhibición</SelectItem>
                      <SelectItem value="PPD">PPD - Pago en parcialidades o diferido</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="99">99 - Por definir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Moneda *</Label>
                  <Select defaultValue="MXN">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MXN">MXN - Peso Mexicano</SelectItem>
                      <SelectItem value="USD">USD - Dólar Americano</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => setStep("conceptos")} size="lg">
                Continuar a Conceptos →
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="conceptos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Agregar Concepto</CardTitle>
                <CardDescription>
                  Busca productos o servicios guardados o ingresa uno nuevo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Input placeholder="Buscar en catálogo de productos/servicios" className="flex-1" />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Clave Prod/Serv (SAT) *</Label>
                    <Input
                      placeholder="84111506"
                      value={newConcepto.claveProdServ || ""}
                      onChange={(e) => setNewConcepto({ ...newConcepto, claveProdServ: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Clave Unidad *</Label>
                    <Select
                      value={newConcepto.claveUnidad || "E48"}
                      onValueChange={(value) => setNewConcepto({ ...newConcepto, claveUnidad: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="E48">E48 - Unidad de servicio</SelectItem>
                        <SelectItem value="H87">H87 - Pieza</SelectItem>
                        <SelectItem value="KGM">KGM - Kilogramo</SelectItem>
                        <SelectItem value="LTR">LTR - Litro</SelectItem>
                        <SelectItem value="MTR">MTR - Metro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Descripción *</Label>
                  <Input
                    placeholder="Descripción detallada del producto o servicio"
                    value={newConcepto.descripcion || ""}
                    onChange={(e) => setNewConcepto({ ...newConcepto, descripcion: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Cantidad *</Label>
                    <Input
                      type="number"
                      min="1"
                      value={newConcepto.cantidad || 1}
                      onChange={(e) =>
                        setNewConcepto({ ...newConcepto, cantidad: parseFloat(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Valor Unitario *</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newConcepto.valorUnitario || 0}
                      onChange={(e) =>
                        setNewConcepto({ ...newConcepto, valorUnitario: parseFloat(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Importe Calculado</Label>
                    <Input
                      value={`$${((newConcepto.cantidad || 0) * (newConcepto.valorUnitario || 0)).toFixed(2)}`}
                      disabled
                    />
                  </div>
                </div>

                <Button onClick={agregarConcepto} className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  Agregar Concepto
                </Button>
              </CardContent>
            </Card>

            {conceptos.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Conceptos Agregados ({conceptos.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descripción</TableHead>
                        <TableHead className="text-right">Cantidad</TableHead>
                        <TableHead className="text-right">Valor Unit.</TableHead>
                        <TableHead className="text-right">Importe</TableHead>
                        <TableHead className="text-right">IVA (16%)</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {conceptos.map((concepto) => (
                        <TableRow key={concepto.id}>
                          <TableCell className="font-medium">{concepto.descripcion}</TableCell>
                          <TableCell className="text-right">{concepto.cantidad}</TableCell>
                          <TableCell className="text-right">${concepto.valorUnitario.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${concepto.importe.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${concepto.iva.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-semibold">
                            ${concepto.total.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => eliminarConcepto(concepto.id)}
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
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span className="font-medium">${totales.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">IVA (16%):</span>
                        <span className="font-medium">${totales.totalIVA.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold">${totales.total.toFixed(2)} MXN</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("datos")}>
                ← Volver a Datos
              </Button>
              <Button onClick={() => setStep("preview")} size="lg" disabled={conceptos.length === 0}>
                Continuar a Vista Previa →
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa del CFDI</CardTitle>
                <CardDescription>Revisa los datos antes de timbrar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Emisor</h3>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p>RFC: ABC123456XYZ</p>
                      <p>Mi Empresa S.A. de C.V.</p>
                      <p>601 - General de Ley Personas Morales</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Receptor</h3>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p>RFC: [RFC del cliente]</p>
                      <p>[Razón Social del cliente]</p>
                      <p>Uso CFDI: G03 - Gastos en general</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Comprobante</h3>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p>Método de Pago: PUE - Pago en una sola exhibición</p>
                    <p>Forma de Pago: 03 - Transferencia electrónica de fondos</p>
                    <p>Moneda: MXN</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Conceptos ({conceptos.length})</h3>
                  <div className="space-y-2 text-sm">
                    {conceptos.map((c) => (
                      <div key={c.id} className="flex justify-between">
                        <span>{c.descripcion}</span>
                        <span className="font-medium">${c.total.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <div className="space-y-2 w-64 text-right">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="font-medium">${totales.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IVA (16%):</span>
                      <span className="font-medium">${totales.totalIVA.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl">
                      <span className="font-bold">Total:</span>
                      <span className="font-bold">${totales.total.toFixed(2)} MXN</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between gap-4">
              <Button variant="outline" onClick={() => setStep("conceptos")}>
                ← Volver a Conceptos
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Guardar Borrador
                </Button>
                <Button onClick={generarYTimbrar} size="lg" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Generar y Timbrar CFDI
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default GeneracionCFDI;
