import React, { useEffect, useRef } from 'react';
import { Star, Meteor } from '../types';

const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Initialize Stars
    const stars: Star[] = [];
    const starCount = 300;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    // Initialize Meteors
    const meteors: Meteor[] = [];
    const maxMeteors = 5;

    const createMeteor = (): Meteor => {
      return {
        x: Math.random() * width + width * 0.5, // Start mostly from right
        y: Math.random() * height * 0.5 - height * 0.2, // Start mostly from top
        length: Math.random() * 80 + 150,
        speed: Math.random() * 10 + 15, // Fast speed
        angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1), // roughly 45 degrees
        opacity: 1,
      };
    };

    const animate = () => {
      ctx.fillStyle = 'linear-gradient(to bottom, #0f172a, #1e1b4b)'; // Deep space blue/purple
      ctx.fillRect(0, 0, width, height);

      // Draw Stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });

      // Manage Meteors
      if (Math.random() < 0.02 && meteors.length < maxMeteors) {
        meteors.push(createMeteor());
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const meteor = meteors[i];
        
        // Calculate end point based on angle
        const endX = meteor.x - Math.cos(meteor.angle) * meteor.length;
        const endY = meteor.y + Math.sin(meteor.angle) * meteor.length;

        // Draw Meteor
        const gradient = ctx.createLinearGradient(meteor.x, meteor.y, endX, endY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Update position
        meteor.x -= Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;
        meteor.opacity -= 0.01;

        // Remove if out of bounds or faded
        if (meteor.x < -100 || meteor.y > height + 100 || meteor.opacity <= 0) {
          meteors.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
    />
  );
};

export default StarryBackground;
