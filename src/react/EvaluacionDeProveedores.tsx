import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, TrendingUp, AlertTriangle, Award, BarChart3 } from "lucide-react";

const EvaluacionProveedores = () => {
  const proveedores = [
    {
      id: 1,
      nombre: "Tech Solutions México",
      categoria: "Tecnología",
      puntuacionTotal: 4.6,
      calidad: 4.8,
      tiempo: 4.5,
      precio: 4.2,
      soporte: 4.9,
      ordenes: 28,
      incidencias: 2
    },
    {
      id: 2,
      nombre: "Distribuidora Nacional S.A.",
      categoria: "Materiales",
      puntuacionTotal: 4.3,
      calidad: 4.5,
      tiempo: 4.2,
      precio: 4.0,
      soporte: 4.5,
      ordenes: 45,
      incidencias: 5
    },
    {
      id: 3,
      nombre: "Servicios Industriales",
      categoria: "Servicios",
      puntuacionTotal: 4.7,
      calidad: 4.9,
      tiempo: 4.6,
      precio: 4.3,
      soporte: 5.0,
      ordenes: 32,
      incidencias: 1
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getPerformanceBadge = (score: number) => {
    if (score >= 4.5) return <Badge className="bg-green-500">Excelente</Badge>;
    if (score >= 4.0) return <Badge className="bg-blue-500">Bueno</Badge>;
    if (score >= 3.5) return <Badge className="bg-yellow-500">Regular</Badge>;
    return <Badge className="bg-red-500">Bajo</Badge>;
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Evaluación de Proveedores</h1>
            <p className="text-muted-foreground">Sistema de calificación y desempeño</p>
          </div>
          <Button variant="outline" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Generar Reporte Comparativo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Proveedores Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{proveedores.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-1">
                <Award className="h-4 w-4" />
                Puntuación Promedio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-yellow-500">4.5</div>
                {renderStars(4.5)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Órdenes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">105</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                Incidencias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">8</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ranking de Proveedores por Categoría</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {proveedores
              .sort((a, b) => b.puntuacionTotal - a.puntuacionTotal)
              .map((proveedor, index) => (
                <Card key={proveedor.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="text-center min-w-[60px]">
                        <div className="text-4xl font-bold text-muted-foreground">#{index + 1}</div>
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{proveedor.nombre}</h3>
                              <Badge variant="outline">{proveedor.categoria}</Badge>
                              {getPerformanceBadge(proveedor.puntuacionTotal)}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{proveedor.ordenes} órdenes completadas</span>
                              <span>•</span>
                              <span className={proveedor.incidencias > 3 ? "text-orange-500" : ""}>
                                {proveedor.incidencias} incidencias
                              </span>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="text-3xl font-bold text-yellow-500">{proveedor.puntuacionTotal}</div>
                              <Star className="h-6 w-6 fill-yellow-500 text-yellow-500" />
                            </div>
                            <p className="text-xs text-muted-foreground">Puntuación global</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-accent rounded-lg">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <span className="font-bold text-lg">{proveedor.calidad}</span>
                              <Star className="h-4 w-4 fill-current text-green-500" />
                            </div>
                            <p className="text-xs text-muted-foreground">Calidad</p>
                          </div>
                          <div className="text-center p-3 bg-accent rounded-lg">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <span className="font-bold text-lg">{proveedor.tiempo}</span>
                              <Star className="h-4 w-4 fill-current text-blue-500" />
                            </div>
                            <p className="text-xs text-muted-foreground">Tiempo</p>
                          </div>
                          <div className="text-center p-3 bg-accent rounded-lg">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <span className="font-bold text-lg">{proveedor.precio}</span>
                              <Star className="h-4 w-4 fill-current text-orange-500" />
                            </div>
                            <p className="text-xs text-muted-foreground">Precio</p>
                          </div>
                          <div className="text-center p-3 bg-accent rounded-lg">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <span className="font-bold text-lg">{proveedor.soporte}</span>
                              <Star className="h-4 w-4 fill-current text-purple-500" />
                            </div>
                            <p className="text-xs text-muted-foreground">Soporte</p>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                Registrar Incidencia
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Registrar Incidencia - {proveedor.nombre}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Órden de Compra Relacionada</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Seleccionar OC" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="oc1">OC-2024-001</SelectItem>
                                      <SelectItem value="oc2">OC-2024-002</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Tipo de Incidencia</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Seleccionar tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="calidad">Producto dañado / Defecto de calidad</SelectItem>
                                      <SelectItem value="incompleto">Entrega incompleta</SelectItem>
                                      <SelectItem value="retraso">Retraso en entrega</SelectItem>
                                      <SelectItem value="diferencia">Diferencia en facturación</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Descripción Detallada</Label>
                                  <Textarea
                                    placeholder="Describe la incidencia, el impacto y las acciones tomadas..."
                                    rows={4}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Impacto en Calificación</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Seleccionar impacto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="bajo">Bajo (-0.1 pts)</SelectItem>
                                      <SelectItem value="medio">Medio (-0.3 pts)</SelectItem>
                                      <SelectItem value="alto">Alto (-0.5 pts)</SelectItem>
                                      <SelectItem value="critico">Crítico (-1.0 pts)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <Button className="w-full">Registrar Incidencia</Button>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            Ver Tendencia
                          </Button>
                          <Button variant="outline" size="sm">Ver Historial Completo</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cálculo Automático de Puntuaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Tiempo de Entrega
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-500">
                    Se calcula automáticamente comparando la fecha de entrega prometida vs. la fecha real de recepción registrada en cada OC.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Calidad
                  </h4>
                  <p className="text-sm text-green-600 dark:text-green-500">
                    Se ajusta automáticamente con base en las incidencias registradas (productos dañados, defectos, etc.).
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EvaluacionProveedores;