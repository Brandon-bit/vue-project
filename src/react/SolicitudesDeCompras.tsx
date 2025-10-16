import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";

const SolicitudesCompra = () => {
  const [step, setStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const solicitudes = [
    {
      id: 1,
      folio: "SC-2024-001",
      solicitante: "Juan Pérez",
      area: "Marketing",
      fecha: "2024-01-15",
      total: 35000,
      estatus: "Pendiente",
      items: 3
    },
    {
      id: 2,
      folio: "SC-2024-002",
      solicitante: "María García",
      area: "Tecnología",
      fecha: "2024-01-14",
      total: 125000,
      estatus: "Aprobada",
      items: 2
    },
    {
      id: 3,
      folio: "SC-2024-003",
      solicitante: "Carlos Rodríguez",
      area: "Operaciones",
      fecha: "2024-01-13",
      total: 8500,
      estatus: "Rechazada",
      items: 5
    },
  ];

  const catalogoProductos = [
    { id: 1, codigo: "MAT-001", nombre: "Resma de Papel Bond", precio: 85.00 },
    { id: 2, codigo: "TEC-015", nombre: "Laptop Dell Latitude 5420", precio: 18500.00 },
    { id: 3, codigo: "SRV-008", nombre: "Mantenimiento Industrial", precio: 3500.00 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aprobada":
        return <CheckCircle className="h-4 w-4" />;
      case "Rechazada":
        return <XCircle className="h-4 w-4" />;
      case "Pendiente":
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Pendiente": "bg-yellow-500",
      "Aprobada": "bg-green-500",
      "Rechazada": "bg-red-500",
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  const addItem = (producto: any) => {
    setSelectedItems([...selectedItems, { ...producto, cantidad: 1 }]);
  };

  const removeItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const calcularTotal = () => {
    return selectedItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Solicitudes de Compra</h1>
            <p className="text-muted-foreground">Gestión de solicitudes y flujo de aprobación</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2" onClick={() => setStep(1)}>
                <Plus className="h-4 w-4" />
                Nueva Solicitud
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Nueva Solicitud de Compra - Paso {step} de 4</DialogTitle>
              </DialogHeader>

              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Solicitante</Label>
                    <Input defaultValue="Juan Pérez" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Área o Departamento</Label>
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
                  <div className="space-y-2">
                    <Label>Justificación</Label>
                    <Textarea placeholder="Describe la necesidad y justificación de esta compra..." rows={4} />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Buscar en Catálogo</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Buscar productos o servicios..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-2 max-h-48 overflow-y-auto">
                    {catalogoProductos
                      .filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((producto) => (
                        <div key={producto.id} className="flex justify-between items-center p-2 hover:bg-accent rounded">
                          <div>
                            <p className="font-medium">{producto.nombre}</p>
                            <p className="text-sm text-muted-foreground">{producto.codigo} - ${producto.precio}</p>
                          </div>
                          <Button size="sm" onClick={() => addItem(producto)}>Agregar</Button>
                        </div>
                      ))}
                  </div>

                  <div className="space-y-2">
                    <Label>Productos/Servicios Seleccionados</Label>
                    <div className="border rounded-lg p-4 space-y-2 min-h-[100px]">
                      {selectedItems.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No hay items seleccionados
                        </p>
                      ) : (
                        selectedItems.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-accent rounded">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.nombre}</p>
                            </div>
                            <Input
                              type="number"
                              className="w-20"
                              value={item.cantidad}
                              onChange={(e) => {
                                const newItems = [...selectedItems];
                                newItems[index].cantidad = parseInt(e.target.value) || 1;
                                setSelectedItems(newItems);
                              }}
                              min="1"
                            />
                            <span className="text-sm font-semibold w-24 text-right">
                              ${(item.precio * item.cantidad).toFixed(2)}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(index)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                    {selectedItems.length > 0 && (
                      <div className="flex justify-end items-center gap-2 pt-2 border-t">
                        <span className="font-semibold">Total:</span>
                        <span className="text-xl font-bold text-primary">
                          ${calcularTotal().toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        Validación de Presupuesto
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Presupuesto disponible:</span>
                        <span className="font-bold text-green-500">$45,000.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Monto de esta solicitud:</span>
                        <span className="font-bold">${calcularTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="font-semibold">Saldo restante:</span>
                        <span className="text-lg font-bold text-green-500">
                          ${(45000 - calcularTotal()).toFixed(2)}
                        </span>
                      </div>
                      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3 flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-semibold text-green-700 dark:text-green-400">Presupuesto Suficiente</p>
                          <p className="text-sm text-green-600 dark:text-green-500">
                            La solicitud está dentro del presupuesto asignado
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Resumen de Solicitud</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground">Solicitante:</span>
                        <span className="font-medium">Juan Pérez</span>
                        <span className="text-muted-foreground">Área:</span>
                        <span className="font-medium">Marketing</span>
                        <span className="text-muted-foreground">Items:</span>
                        <span className="font-medium">{selectedItems.length} productos/servicios</span>
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-bold text-primary">${calcularTotal().toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-4 flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-semibold text-blue-700 dark:text-blue-400">Flujo de Aprobación</p>
                        <p className="text-sm text-blue-600 dark:text-blue-500">
                          Esta solicitud será enviada a tu supervisor para aprobación. Recibirás una notificación con la decisión.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <DialogFooter className="flex justify-between">
                {step > 1 && (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    Anterior
                  </Button>
                )}
                {step < 4 ? (
                  <Button onClick={() => setStep(step + 1)} disabled={step === 2 && selectedItems.length === 0}>
                    Siguiente
                  </Button>
                ) : (
                  <Button>Enviar Solicitud</Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Solicitudes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{solicitudes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Pendientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">1</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Aprobadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">1</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-1">
                <XCircle className="h-4 w-4" />
                Rechazadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">1</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Mis Solicitudes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {solicitudes.map((solicitud) => (
                <Card key={solicitud.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{solicitud.folio}</h3>
                          {getStatusBadge(solicitud.estatus)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{solicitud.solicitante}</span>
                          <span>•</span>
                          <span>{solicitud.area}</span>
                          <span>•</span>
                          <span>{solicitud.items} items</span>
                          <span>•</span>
                          <span>{solicitud.fecha}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">${solicitud.total.toLocaleString()}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Ver Detalle
                        </Button>
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

export default SolicitudesCompra;