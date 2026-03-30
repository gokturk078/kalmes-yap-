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
          src="/home/hero-arka-plan-clean.jpg"
          alt="KALMES YAPI Havalimanı Terminal"
          fill
          className="object-cover opacity-90"
          priority
        />
        {/* Multi-layered premium gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-slate-900/25 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-slate-950/10 to-transparent opacity-35" />
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl text-white text-xs uppercase font-black tracking-[0.3em] mb-10 shadow-xl shadow-white/5"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            Dünya Standartlarında Mühendislik
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-7xl md:text-9xl text-white font-black leading-tight sm:leading-[0.85] tracking-tight sm:tracking-[-0.08em] mb-8 sm:mb-16"
          >
            GELECEĞİN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">ANITLARINI</span> <br />
            İNŞA EDİYORUZ
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0"
          >
            <Link
              href="/projelerimiz"
              className="group relative px-10 py-5 bg-white text-slate-950 font-black uppercase text-xs tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-primary hover:text-white hover:scale-105 active:scale-95 shadow-2xl shadow-white/5"
            >
              Tüm Projelerimiz
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/kurumsal"
              className="px-10 py-5 border border-white/20 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl backdrop-blur-md flex items-center justify-center transition-all hover:bg-white/5 hover:border-white/40 active:scale-95"
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
