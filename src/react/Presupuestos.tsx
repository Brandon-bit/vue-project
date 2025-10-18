import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, TrendingDown, TrendingUp, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Presupuestos = () => {
  const budgetData = [
    { 
      area: "Marketing", 
      presupuestado: 150000, 
      gastado: 127500, 
      porcentaje: 85,
      status: "warning" 
    },
    { 
      area: "Operaciones", 
      presupuestado: 300000, 
      gastado: 195000, 
      porcentaje: 65,
      status: "success" 
    },
    { 
      area: "Tecnología", 
      presupuestado: 200000, 
      gastado: 205000, 
      porcentaje: 102.5,
      status: "danger" 
    },
    { 
      area: "Recursos Humanos", 
      presupuestado: 250000, 
      gastado: 187500, 
      porcentaje: 75,
      status: "success" 
    },
  ];

  const totalPresupuestado = budgetData.reduce((sum, item) => sum + item.presupuestado, 0);
  const totalGastado = budgetData.reduce((sum, item) => sum + item.gastado, 0);
  const porcentajeTotal = ((totalGastado / totalPresupuestado) * 100).toFixed(1);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Presupuestos</h1>
            <p className="text-muted-foreground">Control presupuestal por área y proyecto</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Presupuesto
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex gap-4">
          <Select defaultValue="2024">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Año fiscal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="todas">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Área" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas las áreas</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="operaciones">Operaciones</SelectItem>
              <SelectItem value="tecnologia">Tecnología</SelectItem>
              <SelectItem value="rh">Recursos Humanos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dashboard General */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Presupuestado</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPresupuestado.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Año fiscal 2024</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gastado</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalGastado.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {porcentajeTotal}% del presupuesto
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponible</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(totalPresupuestado - totalGastado).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {(100 - parseFloat(porcentajeTotal)).toFixed(1)}% restante
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de Presupuestos por Área */}
        <Card>
          <CardHeader>
            <CardTitle>Ejecución Presupuestal por Área</CardTitle>
            <CardDescription>
              Comparación entre presupuesto asignado y gasto real
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {budgetData.map((budget) => (
                <div key={budget.area} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{budget.area}</p>
                      <p className="text-sm text-muted-foreground">
                        ${budget.gastado.toLocaleString()} de ${budget.presupuestado.toLocaleString()}
                      </p>
                    </div>
                    <Badge 
                      variant={
                        budget.status === "danger" ? "destructive" : 
                        budget.status === "warning" ? "secondary" : 
                        "default"
                      }
                    >
                      {budget.porcentaje}%
                    </Badge>
                  </div>
                  <Progress 
                    value={budget.porcentaje > 100 ? 100 : budget.porcentaje} 
                    className={
                      budget.status === "danger" ? "[&>div]:bg-destructive" :
                      budget.status === "warning" ? "[&>div]:bg-yellow-500" :
                      ""
                    }
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Presupuestos;
