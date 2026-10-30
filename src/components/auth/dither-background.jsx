"use client";

import { useEffect, useRef } from "react";

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

export default function DitherBackground({ className }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d", { alpha: false });
        if (!context) return;
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let frame;
        let pixels;
        let lastFrame = -Infinity;
        let visible = true;

        const draw = (time) => {
            const { width, height } = canvas;
            const t = motion.matches ? 0 : time * 0.00013;
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const nx = x / width;
                    const ny = y / height;
                    const wave = Math.sin(nx * 9 + ny * 5 + t) * 0.17
                        + Math.cos(ny * 11 - nx * 4 - t * 0.8) * 0.13
                        + Math.sin(Math.hypot(nx - 0.5, ny - 0.5) * 18 - t * 1.3) * 0.1;
                    const threshold = (BAYER[(y % 4) * 4 + x % 4] + 0.5) / 16;
                    const shade = 0.33 + wave > threshold ? 57 : 10;
                    const i = (y * width + x) * 4;
                    pixels.data[i] = shade;
                    pixels.data[i + 1] = shade;
                    pixels.data[i + 2] = shade;
                    pixels.data[i + 3] = 255;
                }
            }
            context.putImageData(pixels, 0, 0);
        };

        const resize = () => {
            // A small bitmap keeps the ordered dots crisp and rendering inexpensive.
            canvas.width = Math.min(480, Math.ceil(window.innerWidth / 4));
            canvas.height = Math.min(300, Math.ceil(window.innerHeight / 4));
            pixels = context.createImageData(canvas.width, canvas.height);
            draw(performance.now());
        };
        const animate = (time) => {
            if (!motion.matches && visible && document.visibilityState === "visible" && time - lastFrame >= 65) {
                draw(time);
                lastFrame = time;
            }
            if (!motion.matches) frame = requestAnimationFrame(animate);
        };
        const updateMotion = () => {
            cancelAnimationFrame(frame);
            draw(performance.now());
            if (!motion.matches) frame = requestAnimationFrame(animate);
        };
        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
        });
        observer.observe(canvas);
        resize();
        updateMotion();
        window.addEventListener("resize", resize);
        motion.addEventListener("change", updateMotion);
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            window.removeEventListener("resize", resize);
            motion.removeEventListener("change", updateMotion);
        };
    }, []);

    return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
