import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, FileText, Send, CheckCircle, Package, Clock } from "lucide-react";
import { useState } from "react";

const OrdenesCompra = () => {
  const [crearDesde, setCrearDesde] = useState<"solicitud" | "directa">("solicitud");

  const ordenes = [
    {
      id: 1,
      folio: "OC-2024-001",
      proveedor: "Distribuidora Nacional S.A.",
      fecha: "2024-01-16",
      total: 45000,
      estatus: "Emitida",
      items: 3
    },
    {
      id: 2,
      folio: "OC-2024-002",
      proveedor: "Tech Solutions México",
      fecha: "2024-01-15",
      total: 125000,
      estatus: "Confirmada",
      items: 2
    },
    {
      id: 3,
      folio: "OC-2024-003",
      proveedor: "Servicios Industriales",
      fecha: "2024-01-14",
      total: 35000,
      estatus: "Entregada",
      items: 4
    },
    {
      id: 4,
      folio: "OC-2024-004",
      proveedor: "Distribuidora Nacional S.A.",
      fecha: "2024-01-10",
      total: 18500,
      estatus: "Cerrada",
      items: 1
    },
  ];

  const solicitudesAprobadas = [
    {
      id: 1,
      folio: "SC-2024-002",
      solicitante: "María García",
      area: "Tecnología",
      total: 125000,
      items: 2
    },
    {
      id: 2,
      folio: "SC-2024-005",
      solicitante: "Pedro Martínez",
      area: "Marketing",
      total: 35000,
      items: 3
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Emitida": "bg-blue-500",
      "Confirmada": "bg-purple-500",
      "Entregada": "bg-orange-500",
      "Cerrada": "bg-gray-500",
    };
    return <Badge className={variants[status] || "bg-gray-500"}>{status}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Emitida":
        return <FileText className="h-4 w-4" />;
      case "Confirmada":
        return <CheckCircle className="h-4 w-4" />;
      case "Entregada":
        return <Package className="h-4 w-4" />;
      case "Cerrada":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Órdenes de Compra</h1>
            <p className="text-muted-foreground">Gestión y seguimiento de órdenes emitidas</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Generar Órden de Compra
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Nueva Órden de Compra</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card
                    className={`cursor-pointer border-2 transition-all ${
                      crearDesde === "solicitud" ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                    onClick={() => setCrearDesde("solicitud")}
                  >
                    <CardContent className="p-6 text-center">
                      <FileText className="h-12 w-12 mx-auto mb-3 text-primary" />
                      <h3 className="font-semibold mb-2">Desde Solicitud Aprobada</h3>
                      <p className="text-sm text-muted-foreground">
                        Convierte una solicitud aprobada en OC con un clic
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer border-2 transition-all ${
                      crearDesde === "directa" ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                    onClick={() => setCrearDesde("directa")}
                  >
                    <CardContent className="p-6 text-center">
                      <Plus className="h-12 w-12 mx-auto mb-3 text-primary" />
                      <h3 className="font-semibold mb-2">Órden Directa</h3>
                      <p className="text-sm text-muted-foreground">
                        Crea una OC desde cero sin solicitud previa
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {crearDesde === "solicitud" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Seleccionar Solicitud Aprobada</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Elegir solicitud..." />
                        </SelectTrigger>
                        <SelectContent>
                          {solicitudesAprobadas.map((solicitud) => (
                            <SelectItem key={solicitud.id} value={solicitud.folio}>
                              {solicitud.folio} - {solicitud.solicitante} - ${solicitud.total.toLocaleString()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Card className="bg-accent">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3">Vista Previa</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <span className="text-muted-foreground">Solicitante:</span>
                          <span className="font-medium">María García</span>
                          <span className="text-muted-foreground">Área:</span>
                          <span className="font-medium">Tecnología</span>
                          <span className="text-muted-foreground">Items:</span>
                          <span className="font-medium">2 productos</span>
                          <span className="text-muted-foreground">Total:</span>
                          <span className="font-bold text-primary">$125,000.00</span>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-2">
                      <Label>Proveedor</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar proveedor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Distribuidora Nacional S.A.</SelectItem>
                          <SelectItem value="2">Servicios Industriales del Norte</SelectItem>
                          <SelectItem value="3">Tech Solutions México</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Fecha de Entrega Esperada</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar fecha" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 días</SelectItem>
                          <SelectItem value="15">15 días</SelectItem>
                          <SelectItem value="30">30 días</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {crearDesde === "directa" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Proveedor</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar proveedor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Distribuidora Nacional S.A.</SelectItem>
                          <SelectItem value="2">Servicios Industriales del Norte</SelectItem>
                          <SelectItem value="3">Tech Solutions México</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Área Solicitante</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar área" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="tecnologia">Tecnología</SelectItem>
                          <SelectItem value="operaciones">Operaciones</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                      <CardContent className="p-4 text-sm text-blue-700 dark:text-blue-400">
                        En el siguiente paso podrás agregar productos/servicios desde el catálogo
                      </CardContent>
                    </Card>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Generar Órden de Compra
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Send className="h-4 w-4" />
                    Generar y Enviar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Emitidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">1</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Confirmadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-500">1</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-1">
                <Package className="h-4 w-4" />
                Entregadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">1</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Comprometido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">$205K</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Órdenes de Compra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ordenes.map((orden) => (
                <Card key={orden.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{orden.folio}</h3>
                          {getStatusBadge(orden.estatus)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{orden.proveedor}</span>
                          <span>•</span>
                          <span>{orden.items} items</span>
                          <span>•</span>
                          <span>{orden.fecha}</span>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div>
                          <p className="text-xl font-bold">${orden.total.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Monto total</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm">
                            Ver Detalle
                          </Button>
                          {orden.estatus === "Emitida" && (
                            <Button size="sm" className="gap-1">
                              <Send className="h-3 w-3" />
                              Enviar
                            </Button>
                          )}
                          {orden.estatus === "Entregada" && (
                            <Button size="sm" variant="outline" className="gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Cerrar OC
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OrdenesCompra;