
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";

export const CollectionSocial = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Compartir</h3>
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full bg-[#1877f2] hover:bg-[#1877f2]/90 text-white"
        >
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </Button>
        <Button
          variant="outline"
          className="w-full bg-[#1da1f2] hover:bg-[#1da1f2]/90 text-white"
        >
          <Twitter className="mr-2 h-4 w-4" />
          Twitter
        </Button>
        <Button
          variant="outline"
          className="w-full bg-[#e4405f] hover:bg-[#e4405f]/90 text-white"
        >
          <Instagram className="mr-2 h-4 w-4" />
          Instagram
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleCopyLink}
        >
          {copied ? (
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {copied ? "¡Enlace copiado!" : "Copiar enlace"}
        </Button>
      </div>
    </Card>
  );
};
