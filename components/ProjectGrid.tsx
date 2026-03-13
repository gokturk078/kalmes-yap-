"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Viyadük İnşaatı",
    category: "Altyapı",
    image: "/projeler/viyaduk/25.jpg",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Doğalgaz Santrali",
    category: "Endüstriyel",
    image: "/projeler/santral/24.jpeg",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Modern İş Merkezi",
    category: "Üst Yapı",
    image: "/projeler/bina/23.jpg",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Lüks Rezidans",
    category: "İç Mimari",
    image: "/home/home-4.jpg",
    className: "md:col-span-1 md:row-span-1",
  },
];

export default function ProjectGrid() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">
              Portfolyo
            </span>
            <h2 className="text-4xl md:text-6xl text-corporate-dark">
              ANITSAL <br />
              <span className="text-slate-400">PROJELERİMİZ</span>
            </h2>
          </div>
          <button className="text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-primary pb-1 hover:text-primary transition-colors">
            Tümünü Gör
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-[2.5rem] group ${project.className}`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-primary text-xs font-black uppercase tracking-[0.2em] mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-2xl text-white font-black uppercase leading-tight">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
