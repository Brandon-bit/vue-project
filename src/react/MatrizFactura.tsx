import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Download,
  FileText,
  RefreshCw,
  Search,
  Settings,
  XCircle,
  Eye,
  Mail,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MatrizFacturas = () => {
  const { toast } = useToast();
  const [filtroTipo, setFiltroTipo] = useState<"todas" | "emitidas" | "recibidas">("todas");
  const [filtroEstatus, setFiltroEstatus] = useState<"todos" | "vigente" | "cancelada">("todos");

  const sincronizarSAT = () => {
    toast({
      title: "Sincronizando con el SAT...",
      description: "Descargando facturas recibidas",
    });
    setTimeout(() => {
      toast({
        title: "✅ Sincronización Completa",
        description: "Se descargaron 15 facturas nuevas",
      });
    }, 3000);
  };

  // Datos de ejemplo
  const facturas = [
    {
      id: "1",
      tipo: "emitida",
      folioFiscal: "A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6",
      folio: "A-1001",
      emisor: "Mi Empresa S.A. de C.V.",
      receptor: "Cliente Ejemplo S.A.",
      fecha: "2024-01-15",
      total: 11600.0,
      estatus: "vigente",
    },
    {
      id: "2",
      tipo: "recibida",
      folioFiscal: "Z9Y8X7W6-V5U4-T3S2-R1Q0-P9O8N7M6L5K4",
      folio: "FAC-5020",
      emisor: "Proveedor XYZ S.A.",
      receptor: "Mi Empresa S.A. de C.V.",
      fecha: "2024-01-18",
      total: 23200.0,
      estatus: "vigente",
    },
    {
      id: "3",
      tipo: "emitida",
      folioFiscal: "P5Q6R7S8-T9U0-V1W2-X3Y4-Z5A6B7C8D9E0",
      folio: "A-1002",
      emisor: "Mi Empresa S.A. de C.V.",
      receptor: "Otro Cliente S.A.",
      fecha: "2024-01-20",
      total: 5800.0,
      estatus: "cancelada",
    },
    {
      id: "4",
      tipo: "recibida",
      folioFiscal: "K1L2M3N4-O5P6-Q7R8-S9T0-U1V2W3X4Y5Z6",
      folio: "FAC-7821",
      emisor: "Servicios ABC S.A.",
      receptor: "Mi Empresa S.A. de C.V.",
      fecha: "2024-01-22",
      total: 17400.0,
      estatus: "vigente",
    },
  ];

  const facturasFiltradas = facturas.filter((f) => {
    if (filtroTipo !== "todas" && f.tipo !== filtroTipo) return false;
    if (filtroEstatus !== "todos" && f.estatus !== filtroEstatus) return false;
    return true;
  });

  return (
    <Layout>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Matriz de Facturas</h1>
            <p className="text-muted-foreground mt-1">
              Control centralizado de todas tus facturas emitidas y recibidas
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Configurar SAT
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Configuración de Conexión al SAT</DialogTitle>
                  <DialogDescription>
                    Configura tus credenciales para la descarga automática de facturas
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>RFC</Label>
                    <Input placeholder="ABC123456XYZ" />
                  </div>
                  <div className="space-y-2">
                    <Label>Contraseña CIEC</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    🔒 Tus credenciales se almacenan de forma segura y encriptada
                  </p>
                  <Button className="w-full">Validar y Guardar</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={sincronizarSAT} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Sincronizar con SAT
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtros de Búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Factura</Label>
                <Select value={filtroTipo} onValueChange={(v: any) => setFiltroTipo(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="emitidas">⬆️ Emitidas</SelectItem>
                    <SelectItem value="recibidas">⬇️ Recibidas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Estatus SAT</Label>
                <Select value={filtroEstatus} onValueChange={(v: any) => setFiltroEstatus(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="vigente">Vigente</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fecha Desde</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Fecha Hasta</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Input placeholder="Buscar por RFC, Folio Fiscal (UUID) o Razón Social" className="flex-1" />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Facturas ({facturasFiltradas.length})</CardTitle>
            <CardDescription>
              {filtroTipo === "todas"
                ? "Todas las facturas"
                : filtroTipo === "emitidas"
                ? "Facturas emitidas"
                : "Facturas recibidas"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Folio</TableHead>
                  <TableHead>Folio Fiscal (UUID)</TableHead>
                  <TableHead>Emisor</TableHead>
                  <TableHead>Receptor</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Estatus</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facturasFiltradas.map((factura) => (
                  <TableRow key={factura.id}>
                    <TableCell>
                      {factura.tipo === "emitida" ? (
                        <div className="flex items-center gap-2">
                          <ArrowUpCircle className="h-4 w-4 text-green-500" />
                          <span className="text-xs">Emitida</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <ArrowDownCircle className="h-4 w-4 text-blue-500" />
                          <span className="text-xs">Recibida</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{factura.folio}</TableCell>
                    <TableCell className="font-mono text-xs">{factura.folioFiscal}</TableCell>
                    <TableCell>{factura.emisor}</TableCell>
                    <TableCell>{factura.receptor}</TableCell>
                    <TableCell>{factura.fecha}</TableCell>
                    <TableCell className="text-right font-semibold">
                      ${factura.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      {factura.estatus === "vigente" ? (
                        <Badge variant="default" className="bg-green-500">
                          Vigente
                        </Badge>
                      ) : (
                        <Badge variant="destructive">Cancelada</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" title="Ver Detalle">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Descargar PDF">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Descargar XML">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Enviar por Correo">
                          <Mail className="h-4 w-4" />
                        </Button>
                        {factura.tipo === "emitida" && factura.estatus === "vigente" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Cancelar CFDI"
                            className="text-destructive"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {facturas.filter((f) => f.tipo === "emitida" && f.estatus === "vigente").length}
                </p>
                <p className="text-sm text-muted-foreground">Emitidas Vigentes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {facturas.filter((f) => f.tipo === "recibida" && f.estatus === "vigente").length}
                </p>
                <p className="text-sm text-muted-foreground">Recibidas Vigentes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  $
                  {facturas
                    .filter((f) => f.tipo === "emitida" && f.estatus === "vigente")
                    .reduce((sum, f) => sum + f.total, 0)
                    .toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-muted-foreground">Total Emitido</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  $
                  {facturas
                    .filter((f) => f.tipo === "recibida" && f.estatus === "vigente")
                    .reduce((sum, f) => sum + f.total, 0)
                    .toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-muted-foreground">Total Recibido</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default MatrizFacturas;
