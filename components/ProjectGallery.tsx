"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectGalleryProps {
  project: Project;
  index: number;
}

export default function ProjectGallery({ project, index }: ProjectGalleryProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const images = project.images.length > 0 ? project.images : ["/home/home-1.jpg"];

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group relative flex flex-col"
    >
      <Link href={`/projelerimiz/${project.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-slate-100 shadow-2xl shadow-slate-200/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIdx]}
                alt={project.title}
                fill
                className="object-cover origin-center scale-[1.07] transition-transform duration-700 group-hover:scale-[1.12]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700" />
          
          <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700">
            <button 
              onClick={prev}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-all"
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            <button 
              onClick={next}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-all"
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>
          </div>

          <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
             <div className="px-6 py-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full text-white text-[10px] uppercase font-black tracking-[0.2em]">
                Tüm Fotoğrafları Gör
             </div>
          </div>

          <div className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 hover:bg-primary pointer-events-auto">
            <Maximize2 size={18} className="md:w-5 md:h-5" />
          </div>

          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 transform md:translate-y-4 md:group-hover:translate-y-0">
             <div className="flex gap-1.5 mb-4 flex-wrap max-w-full">
                {images.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-[2px] transition-all ${i === currentIdx ? "bg-primary w-6 md:w-8" : "bg-white/30 w-2 md:w-3"}`} 
                  />
                ))}
             </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 px-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-2xl md:text-3xl font-black text-slate-950 uppercase tracking-tighter transition-colors group-hover:text-primary">
              {project.title}
            </h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-4 py-1.5 rounded-full w-fit">
              {project.images.length} GÖRSEL
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
