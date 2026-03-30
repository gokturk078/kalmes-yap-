"use client";

import React from "react";
import { motion } from "framer-motion";
import { HardHat, Factory, Building2, TowerControl as Tower } from "lucide-react";

const services = [
  {
    title: "Alt Yapı Taahhüt",
    description: "Havalimanları, viyadükler ve köprüler gibi devasa altyapı projelerinde uzman mühendislik çözümleri.",
    icon: Tower,
  },
  {
    title: "Üst Yapı Projeleri",
    description: "Modern rezidanslar, ofis binaları ve ticari kompleksler için yüksek kaliteli üst yapı inşaatları.",
    icon: Building2,
  },
  {
    title: "Endüstriyel Tesisler",
    description: "Enerji santralleri, fabrikalar ve rafineriler için ileri teknoloji ağır sanayi yapıları.",
    icon: Factory,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-corporate-dark text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-black uppercase tracking-[0.2em] text-sm mb-4 block"
          >
            Hizmet Alanlarımız
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl text-white"
          >
            MÜKEMMELİYETÇİ <br />
            <span className="text-slate-500">ÇÖZÜM ORTAKLIĞI</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-primary/50 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <service.icon size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tight">
                {service.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
