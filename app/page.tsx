import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import ProjectGallery from "@/components/ProjectGallery";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

export const revalidate = 0;

const services = [
  {
    title: "Alt Yapı Taahhüt",
    description: "Havalimanları, viyadükler ve köprüler gibi devasa altyapı projelerinde uzman mühendislik çözümleri.",
    iconName: "TowerControl",
  },
  {
    title: "Üst Yapı Projeleri",
    description: "Modern rezidanslar, ofis binaları ve ticari kompleksler için yüksek kaliteli üst yapı inşaatları.",
    iconName: "Building2",
  },
  {
    title: "Endüstriyel Tesisler",
    description: "Enerji santralleri, fabrikalar ve rafineriler için ileri teknoloji ağır sanayi yapıları.",
    iconName: "Factory",
  },
];

export default async function Home() {
  const allProjects = await getAllProjects();
  const featuredProjects = allProjects.slice(0, 4);

  return (
    <main className="relative overflow-hidden bg-white">
      <Hero />

      {/* Trust & Heritage Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="relative h-[300px] sm:h-[400px] md:h-[700px] group order-2 lg:order-1">
              <div className="absolute -inset-2 md:-inset-6 bg-slate-50 rounded-3xl md:rounded-[4rem] group-hover:scale-105 transition-transform duration-1000" />
              <div className="relative h-full overflow-hidden rounded-2xl md:rounded-[3.5rem] shadow-2xl">
                <Image
                  src="/home/hero-alti-gorsel-clean.jpg"
                  alt="Engineering Excellence"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 text-center lg:text-left">
              <span className="text-primary font-black uppercase text-[10px] md:text-xs tracking-[0.4em] mb-4 md:mb-6 block">Köklerimiz</span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-950 leading-[0.9] tracking-[-0.06em] mb-8 md:mb-10 uppercase">
                20 YILLIK <br />
                KÜRESEL <br />
                <span className="text-slate-300">DENEYİM</span>
              </h2>
              <p className="text-slate-600 text-base md:text-xl leading-relaxed mb-10 md:mb-12">
                Kalmes yapı inş. 2021&apos;de Muhittin Kalıntaş ve Mesut Demiralp tarafından kurulmuştur.
              </p>
              
              <div className="grid grid-cols-2 gap-6 md:gap-10 border-t border-slate-100 pt-10 md:pt-12">
                <div>
                  <div className="text-3xl md:text-5xl font-black text-slate-950 mb-1 md:mb-2">18+</div>
                  <div className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-slate-400">Yıl Tecrübe</div>
                </div>
                <div>
                  <div className="text-3xl md:text-5xl font-black text-slate-950 mb-1 md:mb-2">%100</div>
                  <div className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-slate-400">Müşteri Memnuniyeti</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Services Section */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-24">
            <span className="text-primary font-black uppercase text-[10px] md:text-xs tracking-[0.4em] mb-4 md:mb-6 block">Hizmet Alanları</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-950 tracking-[-0.06em] uppercase">
              MÜKEMMELİYETÇİ <br /> <span className="text-slate-300">ÇÖZÜM ORTAKLIĞI</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {services.map((item, idx) => (
              <ServiceCard key={idx} {...item} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Projects Preview */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-24 gap-6 md:gap-8 text-center md:text-left">
            <div>
              <span className="text-primary font-black uppercase text-[10px] md:text-xs tracking-[0.4em] mb-4 md:mb-6 block">Seçili Projeler</span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-950 tracking-[-0.06em] uppercase leading-none">
                MÜHENDİSLİKTE <br /> <span className="text-slate-300">ANITSAL İMZALAR</span>
              </h2>
            </div>
            <Link 
              href="/projelerimiz" 
              className="group flex items-center justify-center md:justify-start gap-3 text-xs md:text-sm font-black uppercase tracking-widest text-slate-950 hover:text-primary transition-colors pb-2 border-b-2 border-slate-100 hover:border-primary"
            >
              Tümünü Gör
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {featuredProjects.map((project, idx) => (
              <ProjectGallery key={project.slug} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto rounded-[2.5rem] md:rounded-[4rem] bg-slate-950 overflow-hidden relative p-12 md:p-32">
          <div className="absolute inset-0 opacity-20 bg-[url('/home/home-1.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-slate-950/90" />
          
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-10 md:mb-12 uppercase tracking-tighter leading-none">
              PROJENİZİ <br /> BİRLİKTE <br /> BAŞLATALIM
            </h2>
            <Link href="/iletisim" className="inline-flex px-10 md:px-12 py-5 md:py-6 bg-white text-slate-950 rounded-2xl font-black uppercase text-xs md:text-sm tracking-[0.2em] hover:bg-primary hover:text-white transition-all transform hover:scale-105 md:hover:scale-110">
              Bizimle İletişime Geçin
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
