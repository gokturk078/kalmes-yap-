import ServiceCard from "@/components/ServiceCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetlerimiz | Altyapı ve Üst Yapı Çözümleri",
  description: "Havalimanı inşaatından enerji santrallerine, yol yapımından lüks konutlara kadar sunduğumuz profesyonel inşaat hizmetleri.",
};

const services = [
  {
    title: "Alt Yapı Taahhüt",
    description: "Havalimanları, viyadükler, köprüler ve otoyol projelerinde yüksek hassasiyetli mühendislik ve uygulama hizmetleri.",
    iconName: "TowerControl",
  },
  {
    title: "Üst Yapı Projeleri",
    description: "Lüks konut kompleksleri, modern ofis binaları ve ticari merkezler için estetik ve dayanıklı çözümler.",
    iconName: "Building2",
  },
  {
    title: "Endüstriyel Tesisler",
    description: "Fabrikalar, rafineriler ve lojistik merkezleri için ağır sanayi yapı teknikleri ile anahtar teslim kurulumlar.",
    iconName: "Factory",
  },
  {
    title: "Enerji Santralleri",
    description: "Doğalgaz, rüzgar ve güneş enerjisi tesisleri için kapsamlı inşaat ve elektromekanik altyapı desteği.",
    iconName: "HardHat",
  },
];

export default function ServicesPage() {
  return (
    <main className="pt-40 pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mb-32">
          <span className="text-primary font-black uppercase text-xs tracking-[0.4em] mb-6 block">Uzmanlık Alanlarımız</span>
          <h1 className="text-6xl md:text-8xl font-black text-slate-950 tracking-[-0.06em] uppercase mb-10 leading-none">
            GENİŞ ÇAPLI <br /> <span className="text-slate-200">MÜHENDİSLİK ÇÖZÜMLERİ</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium leading-relaxed">
            Sektörün farklı dinamiklerine uygun, her biri uzmanlık gerektiren inşaat ve taahhüt alanlarında KALMES YAPI güvencesiyle yanınızdayız.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {services.map((s, i) => (
             <ServiceCard key={i} {...s} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
