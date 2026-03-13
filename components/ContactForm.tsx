"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactForm() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-[3.5rem] p-12 md:p-16 shadow-2xl shadow-slate-200"
    >
      <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Ad Soyad</label>
            <input type="text" className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 focus:ring-2 focus:ring-primary transition-all text-slate-950 font-medium" placeholder="Adınız" />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">E-Posta</label>
            <input type="email" className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 focus:ring-2 focus:ring-primary transition-all text-slate-950 font-medium" placeholder="mail@example.com" />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Konu</label>
          <input type="text" className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 focus:ring-2 focus:ring-primary transition-all text-slate-950 font-medium" placeholder="Proje Detayları" />
        </div>

        <div className="space-y-4">
          <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Mesajınız</label>
          <textarea rows={5} className="w-full bg-slate-50 border-none rounded-3xl px-8 py-6 focus:ring-2 focus:ring-primary transition-all text-slate-950 font-medium resize-none" placeholder="Mesajınızı buraya yazınız..."></textarea>
        </div>

        <button className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center justify-center gap-4 group">
          Gönder
          <Send size={18} className="transition-transform group-hover:translate-x-2 group-hover:-translate-y-1" />
        </button>
      </form>
    </motion.div>
  );
}
