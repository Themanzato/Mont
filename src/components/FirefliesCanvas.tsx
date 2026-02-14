import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FirefliesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Fade out multiple fireflies as we reach the dark section (0.4 to 0.5 of document height)
  const masterOpacity = useTransform(scrollYProgress, [0.4, 0.5], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Firefly[] = [];
    const particleCount = 40;

    class Firefly {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      flickerSpeed: number;
      angle: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random();
        this.flickerSpeed = Math.random() * 0.02 + 0.005;
        this.angle = Math.random() * Math.PI * 2;
      }

      update(width: number, height: number) {
        this.x += this.speedX + Math.sin(this.angle) * 0.2;
        this.y += this.speedY + Math.cos(this.angle) * 0.2;
        this.angle += 0.02;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        this.opacity += this.flickerSpeed;
        if (this.opacity > 0.8 || this.opacity < 0.1) {
          this.flickerSpeed = -this.flickerSpeed;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 230, 150, ${this.opacity})`;
        
        context.shadowBlur = 10;
        context.shadowColor = 'rgba(255, 200, 50, 0.5)';
        
        context.fill();
        context.shadowBlur = 0;
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Firefly(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      style={{ 
        mixBlendMode: 'screen',
        opacity: masterOpacity
      }}
      className="fixed inset-0 pointer-events-none z-[6] w-full h-full"
    />
  );
};

export default FirefliesCanvas;
