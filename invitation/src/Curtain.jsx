import { useEffect, useRef } from "react";

// Deform the real textile illustration, retaining its folds and pearl edging.
// The top valance stays fixed; the inner hems gather towards the side tiebacks.
export function Curtain({ progress }) {
  const ref = useRef(null);
  const imageRef = useRef(null);
  const openImageRef = useRef(null);
  const progressRef = useRef(progress);
  const drawRef = useRef(() => {});
  progressRef.current = progress;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let alive = true;
    const draw = () => {
      const image = imageRef.current;
      if (!image || !canvas.clientWidth) return;
      const width = canvas.clientWidth,
        height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (
        canvas.width !== Math.round(width * dpr) ||
        canvas.height !== Math.round(height * dpr)
      ) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const p = progressRef.current;
      const blend = openImageRef.current
        ? Math.max(0, Math.min(1, (p - 0.65) / 0.35))
        : 0;
      ctx.globalAlpha = 1 - blend;
      const swag = 0.205;
      const sourceTop = image.height * swag;
      const targetTop = height * swag;
      const half = image.width / 2;
      const rows = Math.ceil(height * (1 - swag));
      for (let row = 0; row < rows; row++) {
        const t = row / rows;
        // Narrowest at the tieback; a slight flare at the lower hem.
        const opening =
          t < 0.72
            ? Math.sin(((t / 0.72) * Math.PI) / 2) * 0.8
            : 0.8 - ((t - 0.72) / 0.28) * 0.13;
        const panelWidth = (width / 2) * (1 - opening * p);
        const sy = sourceTop + t * (image.height - sourceTop);
        const sh = (image.height - sourceTop) / rows + 0.7;
        const y = targetTop + row;
        ctx.drawImage(image, 0, sy, half, sh, 0, y, panelWidth + 0.3, 1.3);
        ctx.drawImage(
          image,
          half,
          sy,
          half,
          sh,
          width - panelWidth - 0.3,
          y,
          panelWidth + 0.3,
          1.3,
        );
      }
      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        sourceTop,
        0,
        0,
        width,
        targetTop + 1,
      );
      if (openImageRef.current && blend > 0) {
        ctx.globalAlpha = blend;
        ctx.drawImage(openImageRef.current, 0, 0, width, height);
      }
      ctx.globalAlpha = 1;
    };
    drawRef.current = draw;
    const image = new Image();
    image.onload = () => {
      if (alive) {
        imageRef.current = image;
        draw();
      }
    };
    image.src = "/assets/curtain.webp";
    const openImage = new Image();
    openImage.onload = () => {
      if (alive) {
        openImageRef.current = openImage;
        draw();
      }
    };
    openImage.src = "/assets/open-curtain.webp";
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => {
      alive = false;
      observer.disconnect();
      drawRef.current = () => {};
    };
  }, []);
  useEffect(() => {
    drawRef.current();
  }, [progress]);
  return <canvas className="curtain" ref={ref} aria-hidden="true" />;
}
