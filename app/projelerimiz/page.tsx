import { getAllProjects } from "@/lib/projects";
import ProjectGallery from "@/components/ProjectGallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projelerimiz | Referanslarımız ve Tamamlanan Yapılar",
  description: "Kıbrıs ve Türkiye'deki tamamlanmış havalimanı, viyadük ve büyük ölçekli altyapı projelerimizi inceleyin.",
};

export const revalidate = 0;

export default async function ProjelerimizPage() {
  const projects = await getAllProjects();

  return (
    <main className="pt-32 md:pt-40 pb-20 md:pb-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="max-w-4xl mb-12 md:mb-24 text-center md:text-left">
          <span className="text-primary font-black uppercase text-[10px] md:text-xs tracking-[0.4em] mb-4 md:mb-6 block">Portfolyo</span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-950 tracking-[-0.06em] uppercase mb-6 md:mb-10 leading-[0.9]">
            MÜHENDİSLİKTE <br /> <span className="text-slate-200">ANITSAL İMZALAR</span>
          </h1>
          <p className="text-slate-500 text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto md:mx-0">
            Havalimanlarından enerji santrallerine, viyadüklerden mega-scale yapı projelerine kadar 20 yıllık küresel birikimimizi sergilediğimiz tüm projelerimiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          {projects.map((project, idx) => (
            <ProjectGallery key={project.slug} project={project} index={idx} />
          ))}
        </div>
      </div>
    </main>
  );
}
