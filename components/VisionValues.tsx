"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const values = [
  {
    title: "Kalite ve İnsan Odaklı Hizmet",
    description: "Her projemizde insan yaşamını odağımıza alıyor, en yüksek mühendislik kalitesini estetikle birleştiriyoruz.",
  },
  {
    title: "Etik Değerler ve Şeffaflık",
    description: "Tüm süreçlerimizde dürüstlük ve şeffaflık ilkelerinden ödün vermeden güven inşa ediyoruz.",
  },
  {
    title: "Zamanında ve Kusursuz Teslimat",
    description: "Zamanın değerini biliyor, mega projeleri planlanan sürede ve sıfır hata vizyonuyla tamamlıyoruz.",
  },
];

export default function VisionValues() {
  return (
    <section id="vision" className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">
              Vizyonumuz
            </span>
            <h2 className="text-4xl md:text-6xl text-corporate-dark mb-12">
              DEĞERLERİMİZLE <br />
              <span className="text-slate-400">YÜKSELİYORUZ</span>
            </h2>
            
            <div className="space-y-8">
              {values.map((v, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-primary mt-1">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-corporate-dark mb-2 uppercase tracking-tight">
                      {v.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-slate-200 rounded-[3rem] overflow-hidden relative">
              {/* Decorative engineering grid or placeholder for a detailed shot */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
              <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                <blockquote className="text-2xl md:text-3xl font-black text-corporate-dark uppercase italic leading-tight">
                  &quot;BİR YAPIDAN DAHA FAZLASI; BİZ GÜVEN İNŞA EDİYORUZ.&quot;
                </blockquote>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
