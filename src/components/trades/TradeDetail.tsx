
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { toast } from 'sonner';
import {
  MessageSquare,
  Check,
  X,
  RefreshCw,
  Clock,
  Star,
  Award,
  Send
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { Trade, Sticker } from '@/app/types';
import StickerCard from '../cards/StickerCard';

interface TradeDetailProps {
  trade: Trade;
  onStatusChange: (status: Trade['status']) => void;
}

export const TradeDetail = ({ trade, onStatusChange }: TradeDetailProps) => {
  const isMobile = useIsMobile();
  const [message, setMessage] = useState('');
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);
  const [showComparisonView, setShowComparisonView] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (isMobile && selectedSticker) {
        handleRejectSticker(selectedSticker);
      }
    },
    onSwipedRight: () => {
      if (isMobile && selectedSticker) {
        handleAcceptSticker(selectedSticker);
      }
    },
  });

  const handleAcceptSticker = (sticker: Sticker) => {
    // Lógica para aceptar cromo
    playSound('accept');
    vibrate();
    toast({
      title: "Cromo aceptado",
      description: `Has aceptado el cromo #${sticker.number}`,
    });
  };

  const handleRejectSticker = (sticker: Sticker) => {
    // Lógica para rechazar cromo
    playSound('reject');
    vibrate();
    toast({
      title: "Cromo rechazado",
      description: `Has rechazado el cromo #${sticker.number}`,
    });
  };

  const playSound = (type: 'accept' | 'reject' | 'message') => {
    const sounds = {
      accept: '/assets/accept.mp3',
      reject: '/assets/reject.mp3',
      message: '/assets/message.mp3'
    };
    const audio = new Audio(sounds[type]);
    audio.play();
  };

  const vibrate = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };

  const completeTrade = () => {
    onStatusChange('completed');
    toast({
      title: "¡Intercambio completado!",
      description: "El intercambio se ha completado exitosamente.",
    });
    // Activar animación de confeti
    // Código para la animación...
  };

  return (
    <div className="flex flex-col space-y-6 p-4 md:p-6" {...handlers}>
      {/* Cabecera del intercambio */}
      <div className="relative">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-4"
          >
            <img
              src={trade.sender.avatar}
              alt={trade.sender.name}
              className="w-16 h-16 rounded-full border-4 border-blue-500"
            />
            <div>
              <h3 className="font-bold">{trade.sender.name}</h3>
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{trade.sender.reputation} rep.</span>
              </div>
            </div>
          </motion.div>

          <div className="text-center">
            <Award className="w-8 h-8 text-purple-500 mx-auto" />
            <span className="text-sm font-medium">VS</span>
          </div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-4"
          >
            <div className="text-right">
              <h3 className="font-bold">{trade.receiver.name}</h3>
              <div className="flex items-center gap-2 text-sm justify-end">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{trade.receiver.reputation} rep.</span>
              </div>
            </div>
            <img
              src={trade.receiver.avatar}
              alt={trade.receiver.name}
              className="w-16 h-16 rounded-full border-4 border-green-500"
            />
          </motion.div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progreso del intercambio</span>
            <span className="capitalize">{trade.status}</span>
          </div>
          <Progress value={
            trade.status === 'completed' ? 100 :
            trade.status === 'accepted' ? 66 :
            trade.status === 'pending' ? 33 : 0
          } />
        </div>

        {trade.urgentUntil && (
          <div className="mt-4 flex items-center gap-2 text-orange-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Urgente - Expira en 2 horas</span>
          </div>
        )}
      </div>

      {/* Sección de cromos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h4 className="font-bold mb-4">Tus cromos ofrecidos</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <AnimatePresence>
              {trade.senderStickers.map((sticker) => (
                <motion.div
                  key={sticker.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <StickerCard
                    sticker={sticker}
                    onClick={() => setSelectedSticker(sticker)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-bold mb-4">Cromos que recibirías</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <AnimatePresence>
              {trade.receiverStickers.map((sticker) => (
                <motion.div
                  key={sticker.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <StickerCard
                    sticker={sticker}
                    onClick={() => setSelectedSticker(sticker)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      </div>

      {/* Chat y acciones */}
      <Card className="p-4">
        <div className="flex flex-col h-[300px]">
          <ScrollArea className="flex-1 mb-4">
            <div className="space-y-4">
              {trade.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.senderId === trade.sender.id ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      msg.senderId === trade.sender.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs opacity-75">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1"
            />
            <Button onClick={() => {
              // Lógica para enviar mensaje
              setMessage('');
              playSound('message');
            }}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Botones de acción */}
      <div className="flex gap-4 justify-end">
        <Button
          variant="outline"
          className="text-red-600 border-red-200"
          onClick={() => onStatusChange('rejected')}
        >
          <X className="w-4 h-4 mr-2" />
          Rechazar
        </Button>
        
        <Button
          variant="outline"
          onClick={() => setShowComparisonView(!showComparisonView)}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Cambiar vista
        </Button>
        
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={completeTrade}
        >
          <Check className="w-4 h-4 mr-2" />
          Completar intercambio
        </Button>
      </div>
    </div>
  );
};
