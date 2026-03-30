import { getProjectBySlug } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, HardHat } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) return { title: "Proje Bulunamadı" };

  return {
    title: `${project.title} | Proje Detayları`,
    description: `${project.title} projesi detayları, görselleri ve KALMES YAPI mühendislik çözümleri. Kıbrıs altyapı ve üst yapı referanslarımız.`,
    openGraph: {
      images: project.images[0] ? [project.images[0]] : [],
    },
  };
}

export const revalidate = 0;

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const images = project.images.length > 0 ? project.images : ["/home/home-1.jpg"];
  const location = project.location || "Türkiye";
  const projectYear = project.year ? String(project.year) : "2024";
  const status = project.status || "Tamamlandı";

  return (
    <main className="pt-32 md:pt-40 pb-20 md:pb-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Navigation & Header */}
        <div className="mb-12 md:mb-24">
          <Link 
            href="/projelerimiz" 
            className="inline-flex items-center gap-3 text-[10px] md:text-xs font-black uppercase text-slate-400 hover:text-primary transition-colors mb-10 md:mb-16"
          >
            <ArrowLeft size={14} className="md:w-4 md:h-4" />
            Tüm Projelerimiz
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-end">
            <div className="text-center lg:text-left">
              <span className="text-primary font-black uppercase text-[10px] md:text-xs tracking-[0.4em] mb-4 md:mb-6 block">Proje Detayları</span>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-950 tracking-[-0.06em] uppercase leading-[0.9]">
                {project.title}
              </h1>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 lg:border-l lg:border-slate-100 lg:pl-12 h-fit">
               <div className="text-center lg:text-left p-4 rounded-2xl bg-slate-50 lg:bg-transparent">
                  <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 md:mb-2 flex items-center justify-center lg:justify-start gap-2">
                     <MapPin size={12} className="text-primary" /> Konum
                  </div>
                  <div className="text-base md:text-xl font-black text-slate-950 tracking-tight">{location}</div>
               </div>
               <div className="text-center lg:text-left p-4 rounded-2xl bg-slate-50 lg:bg-transparent">
                  <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 md:mb-2 flex items-center justify-center lg:justify-start gap-2">
                     <Calendar size={12} className="text-primary" /> Yıl
                  </div>
                  <div className="text-base md:text-xl font-black text-slate-950 tracking-tight">{projectYear}</div>
               </div>
               <div className="text-center lg:text-left p-4 rounded-2xl bg-slate-50 lg:bg-transparent">
                  <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 md:mb-2 flex items-center justify-center lg:justify-start gap-2">
                     <HardHat size={12} className="text-primary" /> Durum
                  </div>
                  <div className="text-base md:text-xl font-black text-primary tracking-tight">{status}</div>
               </div>
            </div>
          </div>
        </div>

        {/* Image Grid / Masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
           {images.map((img, idx) => (
             <div key={idx} className="relative overflow-hidden rounded-3xl md:rounded-[3.5rem] group shadow-2xl shadow-slate-200/50">
                <Image
                  src={img}
                  alt={`${project.title} - Görsel ${idx + 1}`}
                  width={800}
                  height={1200}
                  className="w-full h-auto object-cover origin-center scale-[1.06] transition-transform duration-1000 group-hover:scale-[1.11]"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
             </div>
           ))}
        </div>

        {/* CTA */}
        <div className="mt-24 md:mt-32 p-10 md:p-32 rounded-3xl md:rounded-[5rem] bg-slate-950 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('/home/home-1.jpg')] bg-cover bg-center" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-black text-white mb-10 md:mb-16 uppercase tracking-tighter leading-tight">BENZER BİR PROJENİZ Mİ VAR?</h2>
              <Link href="/iletisim" className="inline-flex px-12 py-6 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-white hover:text-slate-950 transition-all shadow-2xl shadow-primary/20 text-xs md:text-sm">
                BİZE ULAŞIN
              </Link>
            </div>
        </div>
      </div>
    </main>
  );
}
