import { Mail, Phone, MapPin } from "lucide-react";
import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "İletişim | Teklif Alın ve Bize Ulaşın",
  description: "KALMES YAPI ile projenizi başlatın. Trabzon ve Kıbrıs ofislerimiz üzerinden bizimle iletişime geçebilirsiniz.",
};

export default function IletisimPage() {
  return (
    <main className="pt-28 md:pt-40 pb-20 md:pb-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="text-center lg:text-left">
            <span className="text-primary font-black uppercase text-[10px] md:text-xs tracking-[0.4em] mb-4 md:mb-6 block">İletişim</span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-950 tracking-[-0.06em] uppercase mb-8 md:mb-10 leading-none">
              PROJENİZİ <br /> <span className="text-slate-300">BAŞLATALIM</span>
            </h1>
            
            <div className="space-y-8 md:space-y-12 mt-12 md:mt-20">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center lg:items-start">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white shadow-xl flex items-center justify-center text-primary shrink-0">
                  <MapPin size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-slate-400 mb-1 md:mb-2">Genel Merkez</h3>
                  <p className="text-lg md:text-2xl font-black text-slate-950 uppercase tracking-tight">Trabzon / Türkiye</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center lg:items-start">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white shadow-xl flex items-center justify-center text-primary shrink-0">
                  <Phone size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-slate-400 mb-1 md:mb-2">Telefon</h3>
                  <div className="flex flex-col gap-1 md:gap-2">
                    <a
                      href="tel:+905367644931"
                      className="text-lg md:text-2xl font-black text-slate-950 tracking-tight hover:text-primary transition-colors"
                    >
                      Muhittin Kalıntaş: +90 536 764 49 31
                    </a>
                    <a
                      href="tel:+905388221875"
                      className="text-lg md:text-2xl font-black text-slate-950 tracking-tight hover:text-primary transition-colors"
                    >
                      Mesut Demiralp: +90 538 822 18 75
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center lg:items-start">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white shadow-xl flex items-center justify-center text-primary shrink-0">
                  <Mail size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-slate-400 mb-1 md:mb-2">E-Posta</h3>
                  <a
                    href="mailto:info@kalmesyapi.com"
                    className="text-lg md:text-2xl font-black text-slate-950 tracking-tight hover:text-primary transition-colors"
                  >
                    info@kalmesyapi.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </main>
  );
}
