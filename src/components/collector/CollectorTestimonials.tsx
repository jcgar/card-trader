import { Card } from "@/components/ui/card"
import { MessageSquare, Star } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

interface CollectorTestimonialsProps {
  profile: CollectorProfile
}

export const CollectorTestimonials = ({ profile }: CollectorTestimonialsProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-green-500" />
        <h2 className="text-xl font-semibold">Testimonios</h2>
      </div>

      <div className="space-y-4">
        {profile.testimonials.map((testimonial) => (
          <div key={testimonial.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <img src={testimonial.author.avatar} alt={testimonial.author.name} className="w-8 h-8 rounded-full" />
              <div>
                <h4 className="font-medium">{testimonial.author.name}</h4>
                <div className="flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500 ml-auto">
                {formatDistanceToNow(new Date(testimonial.date), {
                  addSuffix: true,
                  locale: es,
                })}
              </span>
            </div>
            <p className="text-gray-600">{testimonial.content}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

