"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { label: "18+ Yıl Tecrübe", value: "20+" },
  { label: "Küresel Vizyon", value: "100%" },
  { label: "%100 Başarı", value: "50+" },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-corporate-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">
              Biz Kimiz?
            </span>
            <h2 className="text-4xl md:text-6xl text-corporate-dark mb-8">
              MÜHENDİSLİKTE <br />
              <span className="text-slate-400">ÜSTÜN STANDARTLAR</span>
            </h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                <strong>KALMES YAPI</strong>, 2021 yılında Muhittin Kalıntaş ve Mesut Demiralp tarafından, inşaat sektöründe 18 yılı aşkın global tecrübenin bir meyvesi olarak kurulmuştur.
              </p>
              <p>
                Temelleri 2004 yılında Alarko Holding bünyesindeki Rusya LNG II projesiyle atılan bu vizyon, bugün havalimanlarından enerji santrallerine, viyadüklerden endüstriyel tesislere kadar geniş bir yelpazede devasa projelere imza atmaktadır.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 bg-white p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center sm:text-left">
                  <div className="text-4xl font-black text-primary mb-1">{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest font-bold text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[600px] group"
          >
            <div className="absolute -inset-2 md:-inset-4 border-2 border-primary/20 rounded-[2rem] md:rounded-[3rem] transition-transform duration-500 group-hover:scale-105" />
            <div className="relative h-full overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl">
              <Image
                src="/home/home-3.jpg"
                alt="İnşaat Sahası"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
