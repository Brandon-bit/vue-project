import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Edit, FileText, TrendingUp, Star, Building2, Phone, Mail } from "lucide-react";
import { useState } from "react";

const Proveedores = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);

  const proveedores = [
    { 
      id: 1, 
      nombre: "Distribuidora Nacional S.A.", 
      rfc: "DNA990101ABC", 
      categoria: "Materiales", 
      estatus: "Activo",
      puntuacion: 4.5,
      ordenes: 45,
      montoTotal: 2500000
    },
    { 
      id: 2, 
      nombre: "Servicios Industriales del Norte", 
      rfc: "SIN850615XYZ", 
      categoria: "Servicios", 
      estatus: "Activo",
      puntuacion: 4.8,
      ordenes: 32,
      montoTotal: 1800000
    },
    { 
      id: 3, 
      nombre: "Tech Solutions México", 
      rfc: "TSM920420DEF", 
      categoria: "Tecnología", 
      estatus: "Activo",
      puntuacion: 4.2,
      ordenes: 28,
      montoTotal: 3200000
    },
  ];

  const filteredProveedores = proveedores.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.rfc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Proveedores</h1>
            <p className="text-muted-foreground">CRM de Compras - Vista 360° de proveedores</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Registrar Proveedor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nuevo Proveedor</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Razón Social</Label>
                  <Input placeholder="Nombre completo de la empresa" />
                </div>
                <div className="space-y-2">
                  <Label>RFC</Label>
                  <Input placeholder="RFC123456789" />
                </div>
                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="materiales">Materiales</SelectItem>
                      <SelectItem value="servicios">Servicios</SelectItem>
                      <SelectItem value="tecnologia">Tecnología</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <Input placeholder="555-1234-5678" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="contacto@proveedor.com" />
                </div>
                <div className="space-y-2">
                  <Label>Banco</Label>
                  <Input placeholder="Nombre del banco" />
                </div>
                <div className="space-y-2">
                  <Label>CLABE</Label>
                  <Input placeholder="18 dígitos" maxLength={18} />
                </div>
              </div>
              <Button className="w-full">Guardar Proveedor</Button>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por nombre o RFC..."
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
                  <SelectItem value="materiales">Materiales</SelectItem>
                  <SelectItem value="servicios">Servicios</SelectItem>
                  <SelectItem value="tecnologia">Tecnología</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProveedores.map((proveedor) => (
                <Dialog key={proveedor.id} onOpenChange={(open) => open && setSelectedProvider(proveedor)}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Building2 className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{proveedor.nombre}</h3>
                                <Badge variant="outline">{proveedor.categoria}</Badge>
                                <Badge className="bg-green-500">{proveedor.estatus}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">RFC: {proveedor.rfc}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 text-center">
                            <div>
                              <div className="flex items-center gap-1 text-yellow-500 mb-1">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="font-semibold">{proveedor.puntuacion}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Puntuación</p>
                            </div>
                            <div>
                              <p className="font-semibold">{proveedor.ordenes}</p>
                              <p className="text-xs text-muted-foreground">Órdenes</p>
                            </div>
                            <div>
                              <p className="font-semibold">${(proveedor.montoTotal / 1000).toFixed(0)}K</p>
                              <p className="text-xs text-muted-foreground">Total Comprado</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        {selectedProvider?.nombre}
                      </DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="general" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="historial">Historial</TabsTrigger>
                        <TabsTrigger value="evaluacion">Evaluación</TabsTrigger>
                        <TabsTrigger value="documentos">Documentos</TabsTrigger>
                      </TabsList>
                      <TabsContent value="general" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                Información Fiscal
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                              <div>
                                <p className="text-muted-foreground">RFC</p>
                                <p className="font-semibold">{selectedProvider?.rfc}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Razón Social</p>
                                <p className="font-semibold">{selectedProvider?.nombre}</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                Contacto
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>555-1234-5678</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>contacto@proveedor.com</span>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Información Bancaria</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2 text-sm">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-muted-foreground">Banco</p>
                                <p className="font-semibold">BBVA México</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">CLABE</p>
                                <p className="font-semibold">012345678901234567</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="historial" className="space-y-4">
                        <div className="space-y-2">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Card key={i}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-semibold">OC-2024-{1000 + i}</p>
                                    <p className="text-sm text-muted-foreground">15 de Enero, 2024</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold">${(50000 + i * 10000).toLocaleString()}</p>
                                    <Badge className="bg-green-500">Entregada</Badge>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="evaluacion" className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <Card>
                            <CardContent className="p-4 text-center">
                              <div className="text-3xl font-bold text-green-500 mb-2">4.8</div>
                              <p className="text-sm text-muted-foreground">Calidad</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 text-center">
                              <div className="text-3xl font-bold text-blue-500 mb-2">4.5</div>
                              <p className="text-sm text-muted-foreground">Tiempo de Entrega</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 text-center">
                              <div className="text-3xl font-bold text-yellow-500 mb-2">4.3</div>
                              <p className="text-sm text-muted-foreground">Precio</p>
                            </CardContent>
                          </Card>
                        </div>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Tendencia de Desempeño</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-48 flex items-center justify-center text-muted-foreground">
                              <TrendingUp className="h-16 w-16" />
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="documentos" className="space-y-4">
                        <div className="border-2 border-dashed rounded-lg p-8 text-center">
                          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-muted-foreground mb-4">Arrastra y suelta documentos aquí</p>
                          <Button variant="outline">Seleccionar archivos</Button>
                        </div>
                        <div className="space-y-2">
                          {["Constancia Fiscal.pdf", "Contrato Marco.pdf"].map((doc, i) => (
                            <Card key={i}>
                              <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  <span className="text-sm">{doc}</span>
                                </div>
                                <Button variant="ghost" size="sm">Ver</Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Proveedores;