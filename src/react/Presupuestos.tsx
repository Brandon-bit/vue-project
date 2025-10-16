import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

const PresupuestosCompras = () => {
  const presupuestos = [
    {
      id: 1,
      area: "Tecnología",
      proyecto: "Infraestructura IT",
      asignado: 500000,
      gastado: 320000,
      comprometido: 100000,
      disponible: 80000,
    },
    {
      id: 2,
      area: "Marketing",
      proyecto: "Campaña Q1 2024",
      asignado: 250000,
      gastado: 180000,
      comprometido: 45000,
      disponible: 25000,
    },
    {
      id: 3,
      area: "Operaciones",
      proyecto: "Mantenimiento General",
      asignado: 150000,
      gastado: 45000,
      comprometido: 30000,
      disponible: 75000,
    },
    {
      id: 4,
      area: "Administración",
      proyecto: "Papelería y Suministros",
      asignado: 80000,
      gastado: 75000,
      comprometido: 8000,
      disponible: -3000,
    },
  ];

  const calcularPorcentaje = (monto: number, total: number) => (monto / total) * 100;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Presupuestos de Compras</h1>
            <p className="text-muted-foreground">Control y seguimiento de presupuesto vs. gasto</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Crear Presupuesto
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nuevo Presupuesto</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Área o Departamento</Label>
                  <Input placeholder="Ej. Marketing, IT, Operaciones" />
                </div>
                <div className="space-y-2">
                  <Label>Proyecto o Concepto</Label>
                  <Input placeholder="Ej. Campaña Q1 2024" />
                </div>
                <div className="space-y-2">
                  <Label>Periodo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar periodo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="q1">Q1 2024</SelectItem>
                      <SelectItem value="q2">Q2 2024</SelectItem>
                      <SelectItem value="anual">Anual 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Monto Asignado</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
              </div>
              <Button className="w-full">Crear Presupuesto</Button>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Asignado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$980,000</div>
              <p className="text-xs text-muted-foreground">Presupuesto total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Gastado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">$620,000</div>
              <p className="text-xs text-muted-foreground">63.3% ejecutado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Comprometido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">$183,000</div>
              <p className="text-xs text-muted-foreground">18.7% en OCs</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Disponible</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">$177,000</div>
              <p className="text-xs text-muted-foreground">18.1% libre</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detalle por Área/Proyecto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {presupuestos.map((presupuesto) => {
              const porcentajeGastado = calcularPorcentaje(presupuesto.gastado, presupuesto.asignado);
              const porcentajeComprometido = calcularPorcentaje(presupuesto.comprometido, presupuesto.asignado);
              const porcentajeTotal = porcentajeGastado + porcentajeComprometido;
              const excedido = presupuesto.disponible < 0;

              return (
                <div key={presupuesto.id} className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{presupuesto.proyecto}</h3>
                        <Badge variant="outline">{presupuesto.area}</Badge>
                        {excedido && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Excedido
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Asignado: ${presupuesto.asignado.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${excedido ? 'text-destructive' : 'text-green-500'}`}>
                        ${presupuesto.disponible.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">Disponible</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="relative h-8 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-blue-500 transition-all"
                        style={{ width: `${Math.min(porcentajeGastado, 100)}%` }}
                      />
                      <div
                        className="absolute h-full bg-orange-500 transition-all"
                        style={{
                          left: `${Math.min(porcentajeGastado, 100)}%`,
                          width: `${Math.min(porcentajeComprometido, 100 - porcentajeGastado)}%`
                        }}
                      />
                      {porcentajeTotal > 100 && (
                        <div
                          className="absolute h-full bg-destructive transition-all"
                          style={{ width: '100%', opacity: 0.3 }}
                        />
                      )}
                    </div>

                    <div className="flex justify-between text-xs">
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-blue-500" />
                          <span>Gastado: ${presupuesto.gastado.toLocaleString()}</span>
                          <span className="text-muted-foreground">({porcentajeGastado.toFixed(1)}%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-orange-500" />
                          <span>Comprometido: ${presupuesto.comprometido.toLocaleString()}</span>
                          <span className="text-muted-foreground">({porcentajeComprometido.toFixed(1)}%)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {porcentajeTotal > 90 ? (
                          <TrendingUp className="h-3 w-3 text-destructive" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-green-500" />
                        )}
                        <span className={porcentajeTotal > 90 ? 'text-destructive' : 'text-green-500'}>
                          {porcentajeTotal.toFixed(1)}% utilizado
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Ver Detalle</Button>
                    <Button variant="outline" size="sm">Generar Reporte</Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PresupuestosCompras;