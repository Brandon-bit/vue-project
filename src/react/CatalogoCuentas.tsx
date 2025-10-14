import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Edit, Trash2, FileDown, ChevronRight, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Cuenta {
  id: string;
  codigo: string;
  nombre: string;
  tipo: string;
  naturaleza: "Deudora" | "Acreedora";
  nivel: number;
  saldo: number;
  moneda: string;
  aceptaMovimientos: boolean;
  requiereAuxiliar: boolean;
  activa: boolean;
  subcuentas?: Cuenta[];
}

const cuentasEjemplo: Cuenta[] = [
  {
    id: "1",
    codigo: "1000",
    nombre: "ACTIVO",
    tipo: "Grupo",
    naturaleza: "Deudora",
    nivel: 1,
    saldo: 850000,
    moneda: "MXN",
    aceptaMovimientos: false,
    requiereAuxiliar: false,
    activa: true,
    subcuentas: [
      {
        id: "1-1",
        codigo: "1100",
        nombre: "Activo Circulante",
        tipo: "Subgrupo",
        naturaleza: "Deudora",
        nivel: 2,
        saldo: 450000,
        moneda: "MXN",
        aceptaMovimientos: false,
        requiereAuxiliar: false,
        activa: true,
        subcuentas: [
          {
            id: "1-1-1",
            codigo: "1101",
            nombre: "Caja",
            tipo: "Cuenta",
            naturaleza: "Deudora",
            nivel: 3,
            saldo: 50000,
            moneda: "MXN",
            aceptaMovimientos: true,
            requiereAuxiliar: false,
            activa: true,
          },
          {
            id: "1-1-2",
            codigo: "1102",
            nombre: "Bancos",
            tipo: "Cuenta",
            naturaleza: "Deudora",
            nivel: 3,
            saldo: 400000,
            moneda: "MXN",
            aceptaMovimientos: true,
            requiereAuxiliar: true,
            activa: true,
          },
        ],
      },
      {
        id: "1-2",
        codigo: "1200",
        nombre: "Activo Fijo",
        tipo: "Subgrupo",
        naturaleza: "Deudora",
        nivel: 2,
        saldo: 400000,
        moneda: "MXN",
        aceptaMovimientos: false,
        requiereAuxiliar: false,
        activa: true,
        subcuentas: [
          {
            id: "1-2-1",
            codigo: "1201",
            nombre: "Equipo de Cómputo",
            tipo: "Cuenta",
            naturaleza: "Deudora",
            nivel: 3,
            saldo: 150000,
            moneda: "MXN",
            aceptaMovimientos: true,
            requiereAuxiliar: true,
            activa: true,
          },
          {
            id: "1-2-2",
            codigo: "1202",
            nombre: "Mobiliario y Equipo",
            tipo: "Cuenta",
            naturaleza: "Deudora",
            nivel: 3,
            saldo: 250000,
            moneda: "MXN",
            aceptaMovimientos: true,
            requiereAuxiliar: false,
            activa: true,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    codigo: "2000",
    nombre: "PASIVO",
    tipo: "Grupo",
    naturaleza: "Acreedora",
    nivel: 1,
    saldo: 350000,
    moneda: "MXN",
    aceptaMovimientos: false,
    requiereAuxiliar: false,
    activa: true,
    subcuentas: [
      {
        id: "2-1",
        codigo: "2100",
        nombre: "Pasivo Circulante",
        tipo: "Subgrupo",
        naturaleza: "Acreedora",
        nivel: 2,
        saldo: 200000,
        moneda: "MXN",
        aceptaMovimientos: false,
        requiereAuxiliar: false,
        activa: true,
        subcuentas: [
          {
            id: "2-1-1",
            codigo: "2101",
            nombre: "Proveedores",
            tipo: "Cuenta",
            naturaleza: "Acreedora",
            nivel: 3,
            saldo: 150000,
            moneda: "MXN",
            aceptaMovimientos: true,
            requiereAuxiliar: true,
            activa: true,
          },
          {
            id: "2-1-2",
            codigo: "2102",
            nombre: "Acreedores Diversos",
            tipo: "Cuenta",
            naturaleza: "Acreedora",
            nivel: 3,
            saldo: 50000,
            moneda: "MXN",
            aceptaMovimientos: true,
            requiereAuxiliar: false,
            activa: true,
          },
        ],
      },
    ],
  },
];

const CatalogoCuentas = () => {
  const [cuentas] = useState<Cuenta[]>(cuentasEjemplo);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set(["1", "2", "1-1", "2-1"]));
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCuenta, setEditingCuenta] = useState<Cuenta | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderCuentaRow = (cuenta: Cuenta, level: number = 0) => {
    const hasSubcuentas = cuenta.subcuentas && cuenta.subcuentas.length > 0;
    const isExpanded = expandedRows.has(cuenta.id);
    const matchesSearch =
      searchTerm === "" ||
      cuenta.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cuenta.nombre.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch && level === 0) return null;

    return (
      <>
        <TableRow key={cuenta.id} className="hover:bg-muted/50">
          <TableCell className="font-medium" style={{ paddingLeft: `${level * 2 + 1}rem` }}>
            <div className="flex items-center gap-2">
              {hasSubcuentas && (
                <button
                  onClick={() => toggleRow(cuenta.id)}
                  className="hover:bg-accent p-1 rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
              {!hasSubcuentas && <span className="w-6" />}
              <span>{cuenta.codigo}</span>
            </div>
          </TableCell>
          <TableCell>
            <span className={level === 0 ? "font-semibold" : level === 1 ? "font-medium" : ""}>
              {cuenta.nombre}
            </span>
          </TableCell>
          <TableCell>
            <Badge variant={cuenta.tipo === "Grupo" ? "default" : cuenta.tipo === "Subgrupo" ? "secondary" : "outline"}>
              {cuenta.tipo}
            </Badge>
          </TableCell>
          <TableCell>
            <Badge variant={cuenta.naturaleza === "Deudora" ? "default" : "secondary"}>
              {cuenta.naturaleza}
            </Badge>
          </TableCell>
          <TableCell className="text-right font-mono">
            ${cuenta.saldo.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  setEditingCuenta(cuenta);
                  setIsDialogOpen(true);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => {
                  toast.success("Cuenta eliminada correctamente");
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
        {hasSubcuentas &&
          isExpanded &&
          cuenta.subcuentas!.map((subcuenta) => renderCuentaRow(subcuenta, level + 1))}
      </>
    );
  };

  const handleSaveCuenta = () => {
    toast.success(editingCuenta ? "Cuenta actualizada correctamente" : "Cuenta creada correctamente");
    setIsDialogOpen(false);
    setEditingCuenta(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Catálogo de Cuentas</h1>
            <p className="text-muted-foreground">
              Estructura jerárquica del plan de cuentas contable
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => toast.success("Exportando catálogo...")}>
              <FileDown className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingCuenta(null)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Cuenta
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingCuenta ? "Editar Cuenta" : "Nueva Cuenta"}
                  </DialogTitle>
                  <DialogDescription>
                    Complete los datos de la cuenta contable
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="codigo">Código</Label>
                      <Input id="codigo" placeholder="1000" defaultValue={editingCuenta?.codigo} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input id="nombre" placeholder="Nombre de la cuenta" defaultValue={editingCuenta?.nombre} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tipo">Tipo</Label>
                      <Select defaultValue={editingCuenta?.tipo || "Cuenta"}>
                        <SelectTrigger id="tipo">
                          <SelectValue placeholder="Seleccione tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Grupo">Grupo</SelectItem>
                          <SelectItem value="Subgrupo">Subgrupo</SelectItem>
                          <SelectItem value="Cuenta">Cuenta</SelectItem>
                          <SelectItem value="Subcuenta">Subcuenta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="naturaleza">Naturaleza</Label>
                      <Select defaultValue={editingCuenta?.naturaleza || "Deudora"}>
                        <SelectTrigger id="naturaleza">
                          <SelectValue placeholder="Seleccione naturaleza" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Deudora">Deudora</SelectItem>
                          <SelectItem value="Acreedora">Acreedora</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nivel">Nivel</Label>
                      <Select defaultValue={editingCuenta?.nivel?.toString() || "3"}>
                        <SelectTrigger id="nivel">
                          <SelectValue placeholder="Seleccione nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Nivel 1 - Grupo</SelectItem>
                          <SelectItem value="2">Nivel 2 - Subgrupo</SelectItem>
                          <SelectItem value="3">Nivel 3 - Cuenta</SelectItem>
                          <SelectItem value="4">Nivel 4 - Subcuenta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="moneda">Moneda</Label>
                      <Select defaultValue={editingCuenta?.moneda || "MXN"}>
                        <SelectTrigger id="moneda">
                          <SelectValue placeholder="Seleccione moneda" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MXN">MXN - Peso Mexicano</SelectItem>
                          <SelectItem value="USD">USD - Dólar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="acepta-movimientos">¿Acepta movimientos?</Label>
                        <p className="text-sm text-muted-foreground">
                          Permite registrar transacciones directas
                        </p>
                      </div>
                      <Switch id="acepta-movimientos" defaultChecked={editingCuenta?.aceptaMovimientos} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="requiere-auxiliar">¿Requiere auxiliar?</Label>
                        <p className="text-sm text-muted-foreground">
                          Necesita un desglose adicional
                        </p>
                      </div>
                      <Switch id="requiere-auxiliar" defaultChecked={editingCuenta?.requiereAuxiliar} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="activa">¿Cuenta activa?</Label>
                        <p className="text-sm text-muted-foreground">
                          Disponible para operaciones
                        </p>
                      </div>
                      <Switch id="activa" defaultChecked={editingCuenta?.activa ?? true} />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveCuenta}>
                    {editingCuenta ? "Actualizar" : "Crear"} Cuenta
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Estructura del Catálogo</CardTitle>
                <CardDescription>
                  Vista jerárquica de todas las cuentas contables
                </CardDescription>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por código o nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Código</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="w-[150px]">Tipo</TableHead>
                    <TableHead className="w-[150px]">Naturaleza</TableHead>
                    <TableHead className="text-right w-[180px]">Saldo Actual</TableHead>
                    <TableHead className="w-[120px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cuentas.map((cuenta) => renderCuentaRow(cuenta))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CatalogoCuentas;
