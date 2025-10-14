import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, FileText, Building2, Download, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Activo {
  id: string;
  descripcion: string;
  fechaAdquisicion: string;
  valorOriginal: number;
  area: string;
  responsable: string;
  estatus: "Activo" | "Dado de baja";
  ubicacion: string;
}

const ActivosFijos = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const activos: Activo[] = [
    {
      id: "AF-001",
      descripcion: "Servidor Dell PowerEdge R740",
      fechaAdquisicion: "2023-01-15",
      valorOriginal: 85000,
      area: "Tecnología",
      responsable: "Juan Pérez",
      estatus: "Activo",
      ubicacion: "Centro de Datos - Piso 3",
    },
    {
      id: "AF-002",
      descripcion: "Vehículo Toyota Hilux 2023",
      fechaAdquisicion: "2023-03-20",
      valorOriginal: 450000,
      area: "Ventas",
      responsable: "María González",
      estatus: "Activo",
      ubicacion: "Estacionamiento Principal",
    },
    {
      id: "AF-003",
      descripcion: "Equipo de aire acondicionado industrial",
      fechaAdquisicion: "2022-11-10",
      valorOriginal: 125000,
      area: "Mantenimiento",
      responsable: "Carlos Ruiz",
      estatus: "Activo",
      ubicacion: "Planta Producción - Nave 2",
    },
    {
      id: "AF-004",
      descripcion: "Impresora HP LaserJet Enterprise",
      fechaAdquisicion: "2021-08-05",
      valorOriginal: 15000,
      area: "Administración",
      responsable: "Ana López",
      estatus: "Dado de baja",
      ubicacion: "Almacén General",
    },
  ];

  const activosActivos = activos.filter((a) => a.estatus === "Activo");
  const valorTotalActivos = activosActivos.reduce((sum, a) => sum + a.valorOriginal, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Activos Fijos</h1>
            <p className="text-muted-foreground mt-2">
              Control integral de bienes con trazabilidad contable y documental
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Dar de alta activo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Alta de Activo Fijo</DialogTitle>
                <DialogDescription>
                  Complete los datos del activo para registrarlo en el sistema
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Información General */}
                <Card>
                  <CardHeader>
                    <CardTitle>Información General</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label>Descripción del activo</Label>
                      <Input placeholder="Ej: Servidor Dell PowerEdge R740" />
                    </div>
                    <div>
                      <Label>Marca</Label>
                      <Input placeholder="Marca del activo" />
                    </div>
                    <div>
                      <Label>Modelo</Label>
                      <Input placeholder="Modelo del activo" />
                    </div>
                    <div>
                      <Label>Número de serie</Label>
                      <Input placeholder="Número de serie" />
                    </div>
                    <div>
                      <Label>Fecha de adquisición</Label>
                      <Input type="date" />
                    </div>
                  </CardContent>
                </Card>

                {/* Información Financiera */}
                <Card>
                  <CardHeader>
                    <CardTitle>Información Financiera</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Proveedor</Label>
                      <Input placeholder="Nombre del proveedor" />
                    </div>
                    <div>
                      <Label>Factura asociada</Label>
                      <Input placeholder="Número de factura" />
                    </div>
                    <div>
                      <Label>Valor original (sin IVA)</Label>
                      <Input type="number" placeholder="0.00" />
                    </div>
                    <div>
                      <Label>Vida útil (meses)</Label>
                      <Input type="number" placeholder="60" />
                    </div>
                    <div className="col-span-2">
                      <Label>Cuenta contable de activo</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar cuenta del catálogo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1201-001">
                            1201-001 - Equipo de cómputo
                          </SelectItem>
                          <SelectItem value="1202-001">
                            1202-001 - Equipo de transporte
                          </SelectItem>
                          <SelectItem value="1203-001">
                            1203-001 - Mobiliario y equipo
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Ubicación y Responsable */}
                <Card>
                  <CardHeader>
                    <CardTitle>Ubicación y Asignación</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Ubicación física</Label>
                      <Input placeholder="Ej: Centro de Datos - Piso 3" />
                    </div>
                    <div>
                      <Label>Área</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar área" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tecnologia">Tecnología</SelectItem>
                          <SelectItem value="ventas">Ventas</SelectItem>
                          <SelectItem value="admin">Administración</SelectItem>
                          <SelectItem value="produccion">Producción</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label>Responsable</Label>
                      <Input placeholder="Nombre del responsable del activo" />
                    </div>
                    <div className="col-span-2">
                      <Label>Notas adicionales</Label>
                      <Textarea
                        placeholder="Información adicional relevante..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  <Receipt className="mr-2 h-4 w-4" />
                  Guardar y generar póliza
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Dashboard de activos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Activos</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activosActivos.length}</div>
              <p className="text-xs text-muted-foreground">
                {activos.length - activosActivos.length} dados de baja
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${valorTotalActivos.toLocaleString("es-MX")}
              </div>
              <p className="text-xs text-muted-foreground">Valor original de activos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Por Área</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Áreas con activos asignados</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por ID, descripción o responsable..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label>Área</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="tecnologia">Tecnología</SelectItem>
                    <SelectItem value="ventas">Ventas</SelectItem>
                    <SelectItem value="admin">Administración</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Estatus</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="activo">Activos</SelectItem>
                    <SelectItem value="baja">Dados de baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de activos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Inventario de Activos Fijos</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Reporte de activos
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Fecha Adquisición</TableHead>
                  <TableHead className="text-right">Valor Original</TableHead>
                  <TableHead>Área</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Estatus</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activos.map((activo) => (
                  <TableRow key={activo.id}>
                    <TableCell className="font-medium">{activo.id}</TableCell>
                    <TableCell>{activo.descripcion}</TableCell>
                    <TableCell>
                      {new Date(activo.fechaAdquisicion).toLocaleDateString("es-MX")}
                    </TableCell>
                    <TableCell className="text-right">
                      ${activo.valorOriginal.toLocaleString("es-MX")}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{activo.area}</Badge>
                    </TableCell>
                    <TableCell>{activo.responsable}</TableCell>
                    <TableCell>
                      <Badge
                        variant={activo.estatus === "Activo" ? "default" : "secondary"}
                      >
                        {activo.estatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ActivosFijos;
