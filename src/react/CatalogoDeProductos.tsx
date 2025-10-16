import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Package, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const CatalogoProductos = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const productos = [
    {
      id: 1,
      codigo: "MAT-001",
      nombre: "Resma de Papel Bond",
      categoria: "Papelería",
      unidad: "Pza",
      costoEstimado: 85.00,
      proveedorPreferente: "Distribuidora Nacional"
    },
    {
      id: 2,
      codigo: "TEC-015",
      nombre: "Laptop Dell Latitude 5420",
      categoria: "Tecnología",
      unidad: "Pza",
      costoEstimado: 18500.00,
      proveedorPreferente: "Tech Solutions"
    },
    {
      id: 3,
      codigo: "SRV-008",
      nombre: "Mantenimiento de Equipo Industrial",
      categoria: "Servicios",
      unidad: "Servicio",
      costoEstimado: 3500.00,
      proveedorPreferente: "Servicios Industriales"
    },
    {
      id: 4,
      codigo: "MAT-045",
      nombre: "Tóner para Impresora HP",
      categoria: "Papelería",
      unidad: "Pza",
      costoEstimado: 1200.00,
      proveedorPreferente: "Distribuidora Nacional"
    },
  ];

  const filteredProductos = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Catálogo de Productos y Servicios</h1>
            <p className="text-muted-foreground">Catálogo central estandarizado</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Agregar al Catálogo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nuevo Producto/Servicio</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Código</Label>
                  <Input placeholder="MAT-001" />
                </div>
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input placeholder="Nombre del producto o servicio" />
                </div>
                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="papeleria">Papelería</SelectItem>
                      <SelectItem value="tecnologia">Tecnología</SelectItem>
                      <SelectItem value="servicios">Servicios</SelectItem>
                      <SelectItem value="materiales">Materiales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Unidad de Medida</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pza">Pieza</SelectItem>
                      <SelectItem value="kg">Kilogramo</SelectItem>
                      <SelectItem value="lt">Litro</SelectItem>
                      <SelectItem value="servicio">Servicio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Costo Estimado</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label>Cuenta Contable</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5101">5101 - Papelería y útiles</SelectItem>
                      <SelectItem value="5102">5102 - Equipo de cómputo</SelectItem>
                      <SelectItem value="5103">5103 - Servicios generales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Proveedor Preferente</Label>
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
                <div className="space-y-2 col-span-2">
                  <Label>Descripción (Opcional)</Label>
                  <Input placeholder="Descripción detallada del producto o servicio" />
                </div>
              </div>
              <Button className="w-full">Guardar en Catálogo</Button>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por código o nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select defaultValue="todos">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas las categorías</SelectItem>
                  <SelectItem value="papeleria">Papelería</SelectItem>
                  <SelectItem value="tecnologia">Tecnología</SelectItem>
                  <SelectItem value="servicios">Servicios</SelectItem>
                  <SelectItem value="materiales">Materiales</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProductos.map((producto) => (
                <Card key={producto.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="outline">{producto.categoria}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Código: {producto.codigo}</p>
                      <h3 className="font-semibold line-clamp-2">{producto.nombre}</h3>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Unidad:</span>
                      <span className="font-medium">{producto.unidad}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Costo estimado:</span>
                      <span className="text-lg font-bold text-primary">${producto.costoEstimado.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground mb-1">Proveedor preferente:</p>
                      <p className="text-sm font-medium">{producto.proveedorPreferente}</p>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estadísticas del Catálogo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{productos.length}</div>
                <p className="text-sm text-muted-foreground">Total de ítems</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-1">4</div>
                <p className="text-sm text-muted-foreground">Categorías</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-1">3</div>
                <p className="text-sm text-muted-foreground">Proveedores asignados</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-1">$23.3K</div>
                <p className="text-sm text-muted-foreground">Valor estimado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CatalogoProductos;