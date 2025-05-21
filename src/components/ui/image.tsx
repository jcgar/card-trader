import * as React from "react";
import { cn } from "@/lib/utils";
import { VisibleOnScreen } from "./visible-on-screen";

type BaseProps = React.ComponentProps<"img"> & {
  fill?: boolean;
  width?: number | string;
  height?: number | string;
};

const Image = React.forwardRef<HTMLImageElement, BaseProps>(
  ({ className, fill, width, height, style, loading = "lazy", ...props }, ref) => {
    const dynamicStyle = fill
      ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        ...style,
      }
      : {
        width,
        height,
        ...style,
      };

    return (
      <VisibleOnScreen>
        <img
          ref={ref}
          className={cn("object-cover", className)}
          style={dynamicStyle as React.CSSProperties}
          loading={loading}
          {...props}
        /></VisibleOnScreen>
    );
  }
);

Image.displayName = "Image";

export { Image };
