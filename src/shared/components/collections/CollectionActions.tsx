import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Trash2, PowerOff, Search } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const CollectionActions = () => {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Acciones</h3>
      <div className="space-y-3">
        <Button variant="outline" className="w-full justify-start">
          <Heart className="mr-2 h-4 w-4 text-red-500" />
          Marcar como favorita
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <PowerOff className="mr-2 h-4 w-4 text-yellow-500" />
          Marcar como dormida
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Share2 className="mr-2 h-4 w-4 text-blue-500" />
          Compartir colección
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Search className="mr-2 h-4 w-4 text-green-500" />
          Buscar similares
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar colección
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Se eliminará esta colección de tu perfil y perderás todo el progreso
                registrado.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 hover:bg-red-600">Eliminar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  )
}

