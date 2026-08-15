"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  disabled = false,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.22;
    const y = (clientY - (top + height / 2)) * 0.22;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 16, mass: 0.1 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`relative overflow-hidden group cursor-pointer ${className}`}
    >
      {/* Laser Light Sweep Effect on Hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#ffffff]/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
