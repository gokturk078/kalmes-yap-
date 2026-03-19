import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Facebook, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-32 pb-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-10 group relative h-16 w-48">
              <Image
                src="/logo.jpg"
                alt="KALMES YAPI Logo"
                fill
                className="object-contain"
              />
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Mühendislik mirasını modern teknolojiyle birleştirerek dünyanın dört bir yanında anıtsal projeler inşa ediyoruz.
            </p>
            <div className="flex gap-4">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                >
                  <Icon size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] uppercase font-black tracking-[0.4em] text-slate-500 mb-10">Hızlı Erişim</h4>
            <ul className="space-y-6">
              {[
                { n: "Anasayfa", h: "/" },
                { n: "Kurumsal", h: "/kurumsal" },
                { n: "Hizmetlerimiz", h: "/hizmetlerimiz" },
                { n: "Projelerimiz", h: "/projelerimiz" },
                { n: "İletişim", h: "/iletisim" }
              ].map((item) => (
                <li key={item.n}>
                  <Link href={item.h} className="text-slate-400 hover:text-white transition-colors font-black uppercase text-xs tracking-widest flex items-center group">
                    {item.n}
                    <ArrowRight size={14} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] uppercase font-black tracking-[0.4em] text-slate-500 mb-10">İletişim & Konum</h4>
            <div className="grid md:grid-cols-2 gap-12">
               <div className="space-y-8">
                  <div className="flex gap-6">
                    <MapPin className="text-primary shrink-0" size={24} />
                    <div>
                      <h5 className="font-black uppercase tracking-tight text-white mb-2">Merkez Ofis</h5>
                      <p className="text-slate-400 leading-relaxed font-medium">İstanbul, Türkiye</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <Phone className="text-primary shrink-0" size={24} />
                    <div>
                      <h5 className="font-black uppercase tracking-tight text-white mb-2">Kurucu İletişim</h5>
                      <div className="space-y-2">
                        <a
                          href="tel:+905428541208"
                          className="block text-slate-400 leading-relaxed font-medium hover:text-white transition-colors"
                        >
                          Muhittin Kalıntaş: +90 542 854 12 08
                        </a>
                        <a
                          href="tel:+905388221875"
                          className="block text-slate-400 leading-relaxed font-medium hover:text-white transition-colors"
                        >
                          Mesut Demiralp: +90 538 822 18 75
                        </a>
                      </div>
                    </div>
                  </div>
               </div>
               <div className="space-y-8">
                  <div className="flex gap-6">
                    <Mail className="text-primary shrink-0" size={24} />
                    <div>
                      <h5 className="font-black uppercase tracking-tight text-white mb-2">E-Posta</h5>
                      <p className="text-slate-400 leading-relaxed font-medium">info@kalmesyapi.com</p>
                    </div>
                  </div>
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/5 text-center">
                     <p className="text-xs font-black uppercase tracking-widest text-primary mb-4">7/24 Destek</p>
                     <Link href="/iletisim" className="text-sm font-black uppercase text-white hover:text-primary transition-colors">HIZLI TEKLİF AL</Link>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">
            © 2026 KALMES YAPI İNŞAAT. Tüm Hakları Saklıdır.
          </p>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-600">
            <Link href="#" className="hover:text-white transition-colors">KVKK</Link>
            <Link href="#" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
            <Link href="#" className="hover:text-white transition-colors">Çerezler</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
