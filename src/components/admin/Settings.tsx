import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Ajustes de la Aplicación</h1>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Configuración General</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nombre de la App</label>
              <Input defaultValue="Card Trader" />
            </div>
            <div>
              <label className="text-sm font-medium">Idioma por defecto</label>
              <Select defaultValue="es">
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Funcionalidades</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Registro de usuarios</p>
                <p className="text-sm text-gray-500">Permitir que nuevos usuarios se registren</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Intercambios</p>
                <p className="text-sm text-gray-500">Habilitar sistema de intercambios</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Modo mantenimiento</p>
                <p className="text-sm text-gray-500">Activar modo mantenimiento</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Límites y Cuotas</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Máximo de colecciones por usuario</label>
              <Input type="number" defaultValue="10" />
            </div>
            <div>
              <label className="text-sm font-medium">Máximo de intercambios diarios</label>
              <Input type="number" defaultValue="50" />
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancelar</Button>
          <Button>Guardar Cambios</Button>
        </div>
      </div>
    </div>
  )
}

