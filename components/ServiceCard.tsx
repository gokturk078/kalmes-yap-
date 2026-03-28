"use client";

import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  iconName: string;
  index: number;
}

export default function ServiceCard({ title, description, iconName, index }: ServiceCardProps) {
  // Dynamically get the icon from LucideIcons
  const Icon = (LucideIcons as any)[iconName] || LucideIcons.HardHat;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group relative p-10 md:p-12 rounded-[2.5rem] md:rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-700"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem] md:rounded-[3rem]" />
      
      <div className="relative z-10">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 mb-8 md:mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-700">
          <Icon size={28} className="md:w-8 md:h-8" strokeWidth={1.5} />
        </div>
        
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 md:mb-6 uppercase tracking-[-0.04em] leading-tight">
          {title}
        </h3>
        
        <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
          {description}
        </p>

        <div className="h-[2px] w-12 bg-slate-100 group-hover:w-full group-hover:bg-primary transition-all duration-700" />
      </div>
    </motion.div>
  );
}
