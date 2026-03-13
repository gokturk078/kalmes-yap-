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
          "max-w-7xl mx-auto flex items-center justify-between px-8 py-4 rounded-[2rem] transition-all duration-700",
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
            className="relative h-12 w-48 md:h-16 md:w-64"
          >
            <Image
              src="/logo.jpg"
              alt="KALMES YAPI Logo"
              fill
              className="object-contain transition-all duration-500"
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
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="absolute top-28 left-4 right-4 bg-white rounded-[2.5rem] shadow-2xl p-10 lg:hidden border border-slate-100 z-[101]"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-2xl font-black uppercase tracking-tighter flex items-center justify-between group",
                    pathname === link.href ? "text-primary" : "text-slate-400"
                  )}
                >
                  {link.name}
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
