"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[800px] w-full flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background with advanced parallax-ready setup */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/home/home-1.jpg"
          alt="KALMES YAPI Havalimanı Terminal"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Multi-layered premium gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-slate-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent opacity-80" />
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-primary text-[10px] uppercase font-black tracking-[0.4em] mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Dünya Standartlarında Mühendislik
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-9xl text-white font-black leading-[0.85] tracking-[-0.08em] mb-8"
          >
            GELECEĞİN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">ANITLARINI</span> <br />
            İNŞA EDİYORUZ
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-medium mb-16 leading-relaxed"
          >
            2004 yılından bu yana, Alarko Holding tecrübesiyle havalimanları, enerji santralleri ve devasa altyapı projelerinde küresel bir vizyon sunuyoruz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link
              href="/projelerimiz"
              className="group relative px-10 py-5 bg-white text-slate-950 font-black uppercase text-xs tracking-[0.2em] rounded-2xl flex items-center gap-3 transition-all hover:bg-primary hover:text-white hover:scale-105 active:scale-95 shadow-2xl shadow-white/5"
            >
              Tüm Projelerimiz
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/kurumsal"
              className="px-10 py-5 border border-white/20 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl backdrop-blur-md transition-all hover:bg-white/5 hover:border-white/40 active:scale-95"
            >
              Hakkımızda
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Down arrow link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/30"
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
}
