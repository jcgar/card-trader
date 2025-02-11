
import { Card } from "./ui/card";
import { useEffect, useState } from "react";

const steps = [
  {
    title: "1. Selecciona los cromos que quieres intercambiar",
    image: "https://images.unsplash.com/photo-1590845947670-c009801ffa74?w=800",
  },
  {
    title: "2. Chatea con otros coleccionistas",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800",
  },
  {
    title: "3. Confirma el intercambio",
    image: "https://images.unsplash.com/photo-1590845947670-c009801ffa74?w=800",
  },
  {
    title: "4. ¡Intercambio completado!",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800",
  },
];

export const LiveExchange = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-green-800">
            Simulación de Intercambio
          </h2>
          <p className="text-green-600 max-w-2xl mx-auto">
            Descubre lo fácil que es intercambiar cromos en nuestra plataforma
          </p>
        </div>
        <div className="relative overflow-hidden rounded-xl shadow-xl bg-white">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentStep * 100}%)` }}
          >
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="min-w-full"
                style={{ flex: '0 0 100%' }}
              >
                <div className="relative aspect-video">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent flex items-end justify-center p-8">
                    <h3 className="text-white text-xl md:text-2xl font-bold text-center">
                      {step.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentStep === index ? 'bg-green-500' : 'bg-white/50'
                }`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
