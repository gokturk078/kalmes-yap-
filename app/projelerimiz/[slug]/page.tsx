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
    <main className="pt-40 pb-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Navigation & Header */}
        <div className="mb-20">
          <Link 
            href="/projelerimiz" 
            className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft size={16} />
            Projelerimize Dön
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-20 items-end">
            <div>
              <span className="text-primary font-black uppercase text-xs tracking-[0.4em] mb-6 block">Proje Detayları</span>
              <h1 className="text-6xl md:text-8xl font-black text-slate-950 tracking-[-0.06em] uppercase leading-none">
                {project.title}
              </h1>
            </div>
            
            <div className="flex flex-wrap gap-12 border-l border-slate-100 pl-12 h-fit">
               <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                     <MapPin size={12} /> Konum
                  </div>
                  <div className="text-xl font-black text-slate-950 tracking-tight">{location}</div>
               </div>
               <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                     <Calendar size={12} /> Yıl
                  </div>
                  <div className="text-xl font-black text-slate-950 tracking-tight">{projectYear}</div>
               </div>
               <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                     <HardHat size={12} /> Durum
                  </div>
                  <div className="text-xl font-black text-primary tracking-tight">{status}</div>
               </div>
            </div>
          </div>
        </div>

        {/* Image Grid / Masonry */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
           {images.map((img, idx) => (
             <div key={idx} className="relative overflow-hidden rounded-[2.5rem] group shadow-2xl shadow-slate-200/50">
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
        <div className="mt-32 p-16 md:p-32 rounded-[4rem] bg-slate-50 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 mb-12 uppercase tracking-tighter">BENZER BİR PROJENİZ Mİ VAR?</h2>
            <Link href="/iletisim" className="inline-flex px-12 py-6 bg-slate-950 text-white rounded-3xl font-black uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-2xl shadow-slate-300">
              TEKLİF AL & DANIŞ
            </Link>
        </div>
      </div>
    </main>
  );
}
