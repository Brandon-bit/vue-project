import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, AlertTriangle, FileText, Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ContratosConvenios = () => {
  const contracts = [
    {
      id: "CT-2024-001",
      nombre: "Contrato de Servicios de Software",
      contraparte: "TechSolutions Inc.",
      tipo: "Servicios",
      fechaInicio: "2024-01-15",
      fechaVencimiento: "2025-01-15",
      monto: 150000,
      estado: "vigente",
      diasVencimiento: 98
    },
    {
      id: "CT-2024-002",
      nombre: "Arrendamiento Oficinas",
      contraparte: "Inmobiliaria Central",
      tipo: "Arrendamiento",
      fechaInicio: "2023-06-01",
      fechaVencimiento: "2024-11-30",
      monto: 240000,
      estado: "proximo-vencer",
      diasVencimiento: 23
    },
    {
      id: "CT-2024-003",
      nombre: "Suministro de Equipos",
      contraparte: "Proveedor Global S.A.",
      tipo: "Compras",
      fechaInicio: "2024-03-01",
      fechaVencimiento: "2024-10-15",
      monto: 85000,
      estado: "vencido",
      diasVencimiento: -23
    },
    {
      id: "CT-2024-004",
      nombre: "Servicios de Consultoría",
      contraparte: "Consultores Asociados",
      tipo: "Servicios",
      fechaInicio: "2024-02-20",
      fechaVencimiento: "2025-02-20",
      monto: 200000,
      estado: "vigente",
      diasVencimiento: 135
    },
  ];

  const getEstadoBadge = (estado: string, dias: number) => {
    if (estado === "vencido") {
      return <Badge variant="destructive">Vencido</Badge>;
    }
    if (estado === "proximo-vencer") {
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Próximo a vencer ({dias}d)</Badge>;
    }
    return <Badge variant="default">Vigente</Badge>;
  };

  const contractsVencer = contracts.filter(c => c.estado === "proximo-vencer").length;
  const contractsVencidos = contracts.filter(c => c.estado === "vencido").length;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Contratos y Convenios</h1>
            <p className="text-muted-foreground">Control y seguimiento de contratos con clientes y proveedores</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Contrato
          </Button>
        </div>

        {/* Alertas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contratos Vigentes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contracts.filter(c => c.estado === "vigente").length}</div>
              <p className="text-xs text-muted-foreground">Activos en el sistema</p>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximos a Vencer</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{contractsVencer}</div>
              <p className="text-xs text-muted-foreground">Requieren atención</p>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contratos Vencidos</CardTitle>
              <Calendar className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{contractsVencidos}</div>
              <p className="text-xs text-muted-foreground">Acción inmediata</p>
            </CardContent>
          </Card>
        </div>

        {/* Búsqueda y Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Base de Datos de Contratos</CardTitle>
            <CardDescription>Búsqueda y gestión de todos los contratos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por ID, nombre, contraparte..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filtros</Button>
            </div>

            {/* Tabla de Contratos */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre del Contrato</TableHead>
                    <TableHead>Contraparte</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha Vencimiento</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow 
                      key={contract.id}
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">{contract.id}</TableCell>
                      <TableCell>{contract.nombre}</TableCell>
                      <TableCell>{contract.contraparte}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{contract.tipo}</Badge>
                      </TableCell>
                      <TableCell>{contract.fechaVencimiento}</TableCell>
                      <TableCell className="text-right">
                        ${contract.monto.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {getEstadoBadge(contract.estado, contract.diasVencimiento)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ContratosConvenios;
