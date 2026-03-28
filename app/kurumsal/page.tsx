import { CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kurumsal | Vizyon ve Küresel Tecrübe",
  description: "KALMES YAPI'nın 20 yıllık mühendislik mirasını, kurucu vizyonumuzu ve Kıbrıs'taki inşaat gücümüzü keşfedin.",
};

export default function KurumsalPage() {
  return (
    <main className="pt-40 pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-start mb-32">
          <div>
            <span className="text-primary font-black uppercase text-xs tracking-[0.4em] mb-6 block">Hakkımızda</span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-950 tracking-[-0.06em] uppercase mb-10 leading-none">
              GELECEĞE <br /> <span className="text-slate-200">GÜVEN İNŞA EDİYORUZ</span>
            </h1>
            <div className="space-y-8 text-slate-600 text-xl font-medium leading-relaxed">
              <p>
                KALMES YAPI İNŞAAT, temelleri 2004 yılında Alarko Holding bünyesindeki mega projelerle atılmış, köklü bir mühendislik mirasının güncel temsilcisidir.
              </p>
              <p>
                Muhittin Kalıntaş ve Mesut Demiralp tarafından 2021 yılında kurulan firmamız, 18 yılı aşkın global tecrübesini günümüzün modern inşaat teknolojileriyle harmanlamaktadır.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10">
            <div className="bg-slate-50 p-16 rounded-[4rem]">
              <h3 className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-10">Temel Değerlerimiz</h3>
              <div className="space-y-10">
                {[
                  { t: "Kusursuz Mühendislik", d: "Sıfır hata vizyonuyla en karmaşık yapıları güvenle inşa ediyoruz." },
                  { t: "Zamanında Teslim", d: "Mega projelerde planlama ve zaman yönetimi bizim için taahhüttür." },
                  { t: "Küresel Vizyon", d: "Rusya'dan Türkiye'ye uzanan uluslararası standartlarda hizmet." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <CheckCircle2 className="text-primary shrink-0" size={24} />
                    <div>
                      <h4 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-2">{item.t}</h4>
                      <p className="text-slate-500 font-medium">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="bg-slate-950 rounded-[4rem] overflow-hidden p-12 md:p-32 text-center text-white relative">
          <div className="absolute inset-0 opacity-10 bg-[url('/home/home-1.jpg')] bg-cover bg-center" />
          <div className="relative z-10">
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12">KURUCU VİZYONUMUZ</h2>
             <p className="max-w-3xl mx-auto text-xl text-slate-400 leading-relaxed mb-16 italic">
               &quot;Amacımız sadece bina inşa etmek değil, nesiller boyu ayakta kalacak güvenli yaşam alanları ve modern altyapılar oluşturmaktır.&quot;
             </p>
             <div className="flex flex-col md:flex-row justify-center gap-12 font-black uppercase tracking-widest text-xs">
                <div>
                   <div className="text-primary mb-2">Muhittin Kalıntaş</div>
                   <div className="text-slate-600 mb-3">Kurucu Ortak</div>
                   <a
                     href="tel:+905367644931"
                     className="text-slate-300 hover:text-white transition-colors normal-case tracking-normal text-sm font-semibold"
                   >
                     +90 536 764 49 31
                   </a>
                </div>
                <div>
                   <div className="text-primary mb-2">Mesut Demiralp</div>
                   <div className="text-slate-600 mb-3">Kurucu Ortak</div>
                   <a
                     href="tel:+905388221875"
                     className="text-slate-300 hover:text-white transition-colors normal-case tracking-normal text-sm font-semibold"
                   >
                     +90 538 822 18 75
                   </a>
                </div>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
