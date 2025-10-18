import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FolderOpen, Upload, Download, Eye, Trash2, Search, Filter, Calendar, User, Tag, Plus, AlertCircle, Lock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const GestionDocumental = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const categorias = [
    { id: "contratos", nombre: "Contratos", icon: FileText, count: 45, color: "text-blue-500" },
    { id: "facturas", nombre: "Facturas", icon: FileText, count: 234, color: "text-green-500" },
    { id: "nomina", nombre: "Nómina", icon: FileText, count: 89, color: "text-purple-500" },
    { id: "rh", nombre: "RH", icon: FileText, count: 156, color: "text-orange-500" },
    { id: "legal", nombre: "Legal", icon: FileText, count: 67, color: "text-red-500" },
    { id: "otros", nombre: "Otros", icon: FileText, count: 123, color: "text-gray-500" },
  ];

  const documentos = [
    { id: 1, nombre: "Contrato_Arrendamiento_2025.pdf", categoria: "Contratos", tamaño: "2.3 MB", fechaSubida: "2025-01-10", subidoPor: "María García", version: "v2", tags: ["Inmuebles", "Vigente"], confidencial: true },
    { id: 2, nombre: "Factura_A_1234.xml", categoria: "Facturas", tamaño: "45 KB", fechaSubida: "2025-01-09", subidoPor: "Sistema Automático", version: "v1", tags: ["CFDI", "Enero"], confidencial: false },
    { id: 3, nombre: "Nomina_Diciembre_2024.xlsx", categoria: "Nómina", tamaño: "1.8 MB", fechaSubida: "2025-01-05", subidoPor: "Juan Pérez", version: "v1", tags: ["2024", "Quincenal"], confidencial: true },
    { id: 4, nombre: "Expediente_Empleado_1023.pdf", categoria: "RH", tamaño: "5.6 MB", fechaSubida: "2025-01-03", subidoPor: "Ana Martínez", version: "v3", tags: ["Onboarding", "Documentación"], confidencial: true },
    { id: 5, nombre: "Poder_Notarial_2024.pdf", categoria: "Legal", tamaño: "3.2 MB", fechaSubida: "2024-12-28", subidoPor: "Carlos López", version: "v1", tags: ["Notarial", "Legal"], confidencial: true },
  ];

  const tiposDocumento = ["Contrato", "Factura", "Recibo", "Comprobante", "Expediente", "Acta", "Poder", "Otro"];

  const handleSubirDocumento = () => {
    toast.success("Documento subido correctamente");
    setUploadDialogOpen(false);
  };

  const handleDescargar = (doc: any) => {
    toast.success(`Descargando ${doc.nombre}`);
  };

  const handleEliminar = (doc: any) => {
    toast.error(`Documento ${doc.nombre} eliminado`);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión Documental</h1>
            <p className="text-muted-foreground">Repositorio centralizado de documentos corporativos</p>
          </div>
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Upload className="h-4 w-4" />
                Subir Documento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Subir Nuevo Documento</DialogTitle>
                <DialogDescription>Complete la información del documento</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Archivo</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Haga clic o arrastre el archivo aquí</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, DOC, XLS, JPG (Máx. 50MB)</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Categoría</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.nombre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de Documento</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposDocumento.map(tipo => (
                          <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Nombre del Documento</Label>
                  <Input placeholder="Ej. Contrato de Servicios 2025" />
                </div>
                <div className="space-y-2">
                  <Label>Etiquetas (Tags)</Label>
                  <Input placeholder="Separadas por comas: fiscal, vigente, importante" />
                </div>
                <div className="space-y-2">
                  <Label>Descripción / Notas</Label>
                  <Input placeholder="Información adicional sobre el documento" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="confidencial" className="rounded" />
                  <Label htmlFor="confidencial" className="cursor-pointer">
                    Marcar como Confidencial
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleSubirDocumento}>Subir Documento</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Categorías Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categorias.map(categoria => {
            const Icon = categoria.icon;
            return (
              <Card key={categoria.id} className="cursor-pointer hover:shadow-lg hover:border-primary transition-all">
                <CardHeader className="text-center pb-2">
                  <FolderOpen className={`h-10 w-10 mx-auto mb-2 ${categoria.color}`} />
                  <CardTitle className="text-sm">{categoria.nombre}</CardTitle>
                  <CardDescription className="text-xs">{categoria.count} documentos</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Documentos", value: "714", icon: FileText, color: "text-blue-500" },
            { label: "Subidos Este Mes", value: "47", icon: Upload, color: "text-green-500" },
            { label: "Confidenciales", value: "189", icon: Lock, color: "text-red-500" },
            { label: "Pendientes Revisión", value: "12", icon: AlertCircle, color: "text-yellow-500" },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardDescription>{stat.label}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Búsqueda y Filtros */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar documentos por nombre, categoría, tags..." 
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {categorias.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.nombre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="todos" className="space-y-4">
          <TabsList>
            <TabsTrigger value="todos">Todos los Documentos</TabsTrigger>
            <TabsTrigger value="recientes">Recientes</TabsTrigger>
            <TabsTrigger value="confidenciales">Confidenciales</TabsTrigger>
            <TabsTrigger value="compartidos">Compartidos</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Repositorio de Documentos</CardTitle>
                <CardDescription>Todos los documentos almacenados en el sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Documento</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Tamaño</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Subido Por</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documentos.map(doc => (
                      <TableRow key={doc.id} className="hover:bg-accent">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{doc.nombre}</p>
                              <p className="text-xs text-muted-foreground">{doc.version}</p>
                            </div>
                            {doc.confidencial && (
                              <Lock className="h-3 w-3 text-red-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{doc.categoria}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">{doc.tamaño}</TableCell>
                        <TableCell className="text-sm">{doc.fechaSubida}</TableCell>
                        <TableCell className="text-sm">{doc.subidoPor}</TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {doc.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Dialog open={viewDialogOpen && selectedDocument?.id === doc.id} onOpenChange={(open) => {
                              setViewDialogOpen(open);
                              if (open) setSelectedDocument(doc);
                            }}>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh]">
                                <DialogHeader>
                                  <DialogTitle>{doc.nombre}</DialogTitle>
                                  <DialogDescription>Vista previa del documento</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-muted-foreground">Categoría</Label>
                                      <p className="font-medium">{doc.categoria}</p>
                                    </div>
                                    <div>
                                      <Label className="text-muted-foreground">Tamaño</Label>
                                      <p className="font-medium">{doc.tamaño}</p>
                                    </div>
                                    <div>
                                      <Label className="text-muted-foreground">Fecha</Label>
                                      <p className="font-medium">{doc.fechaSubida}</p>
                                    </div>
                                    <div>
                                      <Label className="text-muted-foreground">Subido Por</Label>
                                      <p className="font-medium">{doc.subidoPor}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-muted-foreground">Tags</Label>
                                    <div className="flex gap-2 mt-1">
                                      {doc.tags.map(tag => (
                                        <Badge key={tag}>{tag}</Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="border rounded-lg p-8 bg-muted/50 text-center">
                                    <FileText className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
                                    <p className="text-muted-foreground">Vista previa del documento</p>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Cerrar</Button>
                                  <Button onClick={() => handleDescargar(doc)}>
                                    <Download className="h-4 w-4 mr-2" />
                                    Descargar
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDescargar(doc)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEliminar(doc)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recientes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentos Recientes</CardTitle>
                <CardDescription>Últimos documentos subidos al sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documentos.slice(0, 3).map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.nombre}</p>
                          <p className="text-sm text-muted-foreground">{doc.categoria} • {doc.fechaSubida}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="confidenciales" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-red-500" />
                  <div>
                    <CardTitle>Documentos Confidenciales</CardTitle>
                    <CardDescription>Acceso restringido - Solo personal autorizado</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documentos.filter(d => d.confidencial).map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border border-red-200 dark:border-red-900 rounded-lg bg-red-50 dark:bg-red-950/20">
                      <div className="flex items-center gap-3">
                        <Lock className="h-8 w-8 text-red-500" />
                        <div>
                          <p className="font-medium">{doc.nombre}</p>
                          <p className="text-sm text-muted-foreground">{doc.categoria} • {doc.fechaSubida}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Solicitar Acceso
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compartidos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentos Compartidos</CardTitle>
                <CardDescription>Documentos compartidos con otros usuarios o departamentos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No hay documentos compartidos actualmente</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default GestionDocumental;
