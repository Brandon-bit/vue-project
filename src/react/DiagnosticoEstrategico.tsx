import { useState } from "react";
import { Plus, TrendingUp, AlertTriangle, Target, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FODAItem {
  id: string;
  text: string;
  category: 'fortalezas' | 'oportunidades' | 'debilidades' | 'amenazas';
}

interface PESTELItem {
  category: string;
  factor: string;
  impacto: number;
  tendencia: 'creciente' | 'estable' | 'decreciente';
}

interface Riesgo {
  id: string;
  nombre: string;
  probabilidad: number;
  impacto: number;
  estrategia: string;
}

export default function DiagnosticoEstrategico() {
  const [fodaItems, setFodaItems] = useState<FODAItem[]>([
    { id: '1', text: 'Equipo altamente capacitado', category: 'fortalezas' },
    { id: '2', text: 'Expansión al mercado internacional', category: 'oportunidades' },
    { id: '3', text: 'Procesos operativos lentos', category: 'debilidades' },
    { id: '4', text: 'Nueva competencia emergente', category: 'amenazas' },
  ]);

  const [pestelData, setPestelData] = useState<PESTELItem[]>([
    { category: 'Político', factor: 'Estabilidad gubernamental', impacto: 7, tendencia: 'estable' },
    { category: 'Económico', factor: 'Crecimiento del PIB', impacto: 8, tendencia: 'creciente' },
    { category: 'Social', factor: 'Cambios demográficos', impacto: 6, tendencia: 'creciente' },
    { category: 'Tecnológico', factor: 'Digitalización', impacto: 9, tendencia: 'creciente' },
    { category: 'Ecológico', factor: 'Regulaciones ambientales', impacto: 7, tendencia: 'creciente' },
    { category: 'Legal', factor: 'Nuevas normativas', impacto: 6, tendencia: 'estable' },
  ]);

  const [riesgos, setRiesgos] = useState<Riesgo[]>([
    { id: '1', nombre: 'Interrupción de cadena de suministro', probabilidad: 7, impacto: 9, estrategia: 'Mitigar' },
    { id: '2', nombre: 'Ciberseguridad', probabilidad: 8, impacto: 8, estrategia: 'Prevenir' },
    { id: '3', nombre: 'Rotación de personal clave', probabilidad: 5, impacto: 7, estrategia: 'Mitigar' },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [pestelDialogOpen, setPestelDialogOpen] = useState(false);
  const [riesgoDialogOpen, setRiesgoDialogOpen] = useState(false);

  const [newFodaItem, setNewFodaItem] = useState({ text: '', category: 'fortalezas' as FODAItem['category'] });
  const [newPestelItem, setNewPestelItem] = useState({ category: 'Político', factor: '', impacto: 5, tendencia: 'estable' as PESTELItem['tendencia'] });
  const [newRiesgo, setNewRiesgo] = useState({ nombre: '', probabilidad: 5, impacto: 5, estrategia: 'Mitigar' });

  const handleAddFodaItem = () => {
    if (newFodaItem.text.trim()) {
      setFodaItems([...fodaItems, { id: Date.now().toString(), ...newFodaItem }]);
      setNewFodaItem({ text: '', category: 'fortalezas' });
      setDialogOpen(false);
      toast({ title: "Elemento agregado", description: "Se ha agregado el nuevo elemento al análisis FODA" });
    }
  };

  const handleAddPestelItem = () => {
    if (newPestelItem.factor.trim()) {
      setPestelData([...pestelData, newPestelItem]);
      setNewPestelItem({ category: 'Político', factor: '', impacto: 5, tendencia: 'estable' });
      setPestelDialogOpen(false);
      toast({ title: "Factor agregado", description: "Se ha agregado el nuevo factor al análisis PESTEL" });
    }
  };

  const handleAddRiesgo = () => {
    if (newRiesgo.nombre.trim()) {
      setRiesgos([...riesgos, { id: Date.now().toString(), ...newRiesgo }]);
      setNewRiesgo({ nombre: '', probabilidad: 5, impacto: 5, estrategia: 'Mitigar' });
      setRiesgoDialogOpen(false);
      toast({ title: "Riesgo agregado", description: "Se ha agregado el nuevo riesgo al mapa" });
    }
  };

  const removeFodaItem = (id: string) => {
    setFodaItems(fodaItems.filter(item => item.id !== id));
  };

  const getRiesgoColor = (probabilidad: number, impacto: number) => {
    const score = probabilidad * impacto;
    if (score >= 49) return 'bg-red-500';
    if (score >= 25) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getCategoryTitle = (category: FODAItem['category']) => {
    const titles = {
      fortalezas: 'Fortalezas',
      oportunidades: 'Oportunidades',
      debilidades: 'Debilidades',
      amenazas: 'Amenazas'
    };
    return titles[category];
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Diagnóstico Estratégico</h1>
            <p className="text-muted-foreground mt-1">
              Análisis del entorno y evaluación de riesgos organizacionales
            </p>
          </div>
        </div>

        <Tabs defaultValue="foda" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="foda">Análisis FODA</TabsTrigger>
            <TabsTrigger value="pestel">Análisis PESTEL</TabsTrigger>
            <TabsTrigger value="riesgos">Mapa de Riesgos</TabsTrigger>
          </TabsList>

          <TabsContent value="foda" className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Matriz interactiva de análisis FODA</p>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Elemento
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nuevo Elemento FODA</DialogTitle>
                    <DialogDescription>
                      Agrega un nuevo elemento al análisis FODA
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría</Label>
                      <Select 
                        value={newFodaItem.category} 
                        onValueChange={(value) => setNewFodaItem({ ...newFodaItem, category: value as FODAItem['category'] })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fortalezas">Fortalezas</SelectItem>
                          <SelectItem value="oportunidades">Oportunidades</SelectItem>
                          <SelectItem value="debilidades">Debilidades</SelectItem>
                          <SelectItem value="amenazas">Amenazas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="text">Descripción</Label>
                      <Textarea
                        id="text"
                        value={newFodaItem.text}
                        onChange={(e) => setNewFodaItem({ ...newFodaItem, text: e.target.value })}
                        placeholder="Describe el elemento..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={handleAddFodaItem}>Agregar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {['fortalezas', 'oportunidades', 'debilidades', 'amenazas'].map((category) => (
                <Card key={category} className={category === 'fortalezas' || category === 'oportunidades' ? 'border-green-500/50' : 'border-red-500/50'}>
                  <CardHeader>
                    <CardTitle className="text-lg">{getCategoryTitle(category as FODAItem['category'])}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {fodaItems.filter(item => item.category === category).map((item) => (
                      <div key={item.id} className="group relative rounded-lg border bg-card p-3 hover:shadow-md transition-shadow">
                        <p className="text-sm pr-6">{item.text}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                          onClick={() => removeFodaItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        {(category === 'oportunidades' || category === 'amenazas') && (
                          <Button
                            variant="link"
                            size="sm"
                            className="mt-2 h-auto p-0 text-xs"
                            onClick={() => toast({ title: "Crear Iniciativa", description: `Iniciativa basada en: ${item.text}` })}
                          >
                            🔗 Crear Iniciativa Estratégica
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pestel" className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Análisis del entorno macro</p>
              <Dialog open={pestelDialogOpen} onOpenChange={setPestelDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Factor
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nuevo Factor PESTEL</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Categoría</Label>
                      <Select 
                        value={newPestelItem.category} 
                        onValueChange={(value) => setNewPestelItem({ ...newPestelItem, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Político">Político</SelectItem>
                          <SelectItem value="Económico">Económico</SelectItem>
                          <SelectItem value="Social">Social</SelectItem>
                          <SelectItem value="Tecnológico">Tecnológico</SelectItem>
                          <SelectItem value="Ecológico">Ecológico</SelectItem>
                          <SelectItem value="Legal">Legal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Factor</Label>
                      <Input
                        value={newPestelItem.factor}
                        onChange={(e) => setNewPestelItem({ ...newPestelItem, factor: e.target.value })}
                        placeholder="Describe el factor..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Impacto (1-10)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={newPestelItem.impacto}
                        onChange={(e) => setNewPestelItem({ ...newPestelItem, impacto: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Tendencia</Label>
                      <Select 
                        value={newPestelItem.tendencia} 
                        onValueChange={(value) => setNewPestelItem({ ...newPestelItem, tendencia: value as PESTELItem['tendencia'] })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="creciente">Creciente</SelectItem>
                          <SelectItem value="estable">Estable</SelectItem>
                          <SelectItem value="decreciente">Decreciente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setPestelDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={handleAddPestelItem}>Agregar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {pestelData.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{item.category}</CardTitle>
                      <Badge variant={
                        item.tendencia === 'creciente' ? 'default' : 
                        item.tendencia === 'estable' ? 'secondary' : 
                        'destructive'
                      }>
                        {item.tendencia === 'creciente' ? '↗' : item.tendencia === 'estable' ? '→' : '↘'} {item.tendencia}
                      </Badge>
                    </div>
                    <CardDescription>{item.factor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Impacto</span>
                        <span className="font-medium">{item.impacto}/10</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary">
                        <div 
                          className="h-full rounded-full bg-primary transition-all" 
                          style={{ width: `${item.impacto * 10}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="riesgos" className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Matriz de probabilidad e impacto</p>
              <Dialog open={riesgoDialogOpen} onOpenChange={setRiesgoDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Riesgo
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nuevo Riesgo</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Nombre del Riesgo</Label>
                      <Input
                        value={newRiesgo.nombre}
                        onChange={(e) => setNewRiesgo({ ...newRiesgo, nombre: e.target.value })}
                        placeholder="Describe el riesgo..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Probabilidad (1-10)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={newRiesgo.probabilidad}
                        onChange={(e) => setNewRiesgo({ ...newRiesgo, probabilidad: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Impacto (1-10)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={newRiesgo.impacto}
                        onChange={(e) => setNewRiesgo({ ...newRiesgo, impacto: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Estrategia</Label>
                      <Select 
                        value={newRiesgo.estrategia} 
                        onValueChange={(value) => setNewRiesgo({ ...newRiesgo, estrategia: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mitigar">Mitigar</SelectItem>
                          <SelectItem value="Prevenir">Prevenir</SelectItem>
                          <SelectItem value="Transferir">Transferir</SelectItem>
                          <SelectItem value="Aceptar">Aceptar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setRiesgoDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={handleAddRiesgo}>Agregar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {riesgos.map((riesgo) => (
                <Card key={riesgo.id} className="border-l-4" style={{ borderLeftColor: getRiesgoColor(riesgo.probabilidad, riesgo.impacto).replace('bg-', '#') }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{riesgo.nombre}</CardTitle>
                      <Badge variant="outline">
                        {riesgo.estrategia}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Probabilidad</p>
                        <div className="flex items-center gap-2">
                          <div className="h-2 flex-1 rounded-full bg-secondary">
                            <div 
                              className="h-full rounded-full bg-primary" 
                              style={{ width: `${riesgo.probabilidad * 10}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{riesgo.probabilidad}/10</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Impacto</p>
                        <div className="flex items-center gap-2">
                          <div className="h-2 flex-1 rounded-full bg-secondary">
                            <div 
                              className="h-full rounded-full bg-destructive" 
                              style={{ width: `${riesgo.impacto * 10}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{riesgo.impacto}/10</span>
                        </div>
                      </div>
                    </div>
                    {riesgo.probabilidad * riesgo.impacto >= 49 && (
                      <Button
                        variant="link"
                        size="sm"
                        className="mt-3 h-auto p-0 text-xs"
                        onClick={() => toast({ title: "Crear Iniciativa de Mitigación", description: `Iniciativa para: ${riesgo.nombre}` })}
                      >
                        🔗 Crear Iniciativa de Mitigación
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-sm">Matriz de Riesgos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 text-xs text-center">
                  <div className="rounded bg-green-500/20 p-2 border border-green-500/50">Bajo</div>
                  <div className="rounded bg-yellow-500/20 p-2 border border-yellow-500/50">Medio</div>
                  <div className="rounded bg-red-500/20 p-2 border border-red-500/50">Alto</div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Los riesgos en zona roja (score ≥ 49) requieren atención inmediata
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}