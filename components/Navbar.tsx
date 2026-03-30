"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Anasayfa", href: "/" },
  { name: "Kurumsal", href: "/kurumsal" },
  { name: "Hizmetlerimiz", href: "/hizmetlerimiz" },
  { name: "Projelerimiz", href: "/projelerimiz" },
  { name: "İletişim", href: "/iletisim" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const useTransparent = isHome && !scrolled;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out px-4 py-6 md:px-8",
        scrolled ? "py-4" : "py-8"
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3 md:py-4 rounded-2xl md:rounded-[2rem] transition-all duration-700",
          scrolled 
            ? "bg-white/90 backdrop-blur-2xl shadow-2xl shadow-slate-200/50 border border-slate-100" 
            : "bg-transparent"
        )}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "relative transition-all duration-700",
              scrolled ? "h-14 w-52 sm:h-16 sm:w-64 md:h-24 md:w-[21rem]" : "h-16 w-60 sm:h-20 sm:w-80 md:h-28 md:w-[24rem]"
            )}
          >
            <Image
              src="/logo.jpg"
              alt="KALMES YAPI Logo"
              fill
              className="object-contain transition-all duration-500 brightness-110 saturate-125 drop-shadow-[0_14px_34px_rgba(2,6,23,0.55)]"
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-[13px] font-black uppercase tracking-[0.2em] transition-all duration-500 relative group",
                useTransparent 
                  ? "text-white/80 hover:text-white" 
                  : "text-slate-500 hover:text-slate-900",
                pathname === link.href && (useTransparent ? "text-white" : "text-slate-950")
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-500",
                pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
          
          <Link 
            href="/iletisim"
            className={cn(
              "px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-500",
              useTransparent 
                ? "bg-white text-slate-900 hover:bg-primary hover:text-white" 
                : "bg-slate-900 text-white hover:bg-primary shadow-lg"
            )}
          >
            Teklif Al
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            "lg:hidden p-2 rounded-xl transition-colors duration-500",
            useTransparent ? "text-white hover:bg-white/10" : "text-slate-900 hover:bg-slate-100"
          )}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-slate-950 z-[110] flex flex-col p-6 sm:p-10 lg:hidden"
          >
            <div className="flex justify-between items-center mb-10 sm:mb-16">
              <div className="relative h-20 w-80">
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-white/5 rounded-2xl text-white"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col gap-4 sm:gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-2xl sm:text-4xl font-black uppercase tracking-tighter flex items-center justify-between group py-2",
                      pathname === link.href ? "text-primary" : "text-white/40"
                    )}
                  >
                    {link.name}
                    <ArrowRight className={cn(
                      "w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300",
                      pathname === link.href ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                    )} />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-6 sm:pt-10 border-t border-white/5">
              <Link
                href="/iletisim"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 sm:py-6 bg-primary text-white rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-xs sm:text-base flex items-center justify-center gap-3 shadow-2xl shadow-primary/20"
              >
                Hemen Teklif Al
                <ArrowRight size={18} className="sm:w-5 sm:h-5" />
              </Link>
              
              <div className="mt-6 sm:mt-10 flex gap-4 sm:gap-6 justify-center">
                <Link href="https://www.instagram.com/muhittin_kalintas61/" target="_blank" className="text-white/40 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest">Instagram</Link>
                <Link href="/kurumsal" className="text-white/40 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest">Kurumsal</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
