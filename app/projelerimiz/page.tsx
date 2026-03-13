import { getAllProjects } from "@/lib/projects";
import ProjectGallery from "@/components/ProjectGallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projelerimiz | Referanslarımız ve Tamamlanan Yapılar",
  description: "Kıbrıs ve Türkiye'deki tamamlanmış havalimanı, viyadük ve büyük ölçekli altyapı projelerimizi inceleyin.",
};

export default function ProjelerimizPage() {
  const projects = getAllProjects();

  return (
    <main className="pt-40 pb-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <span className="text-primary font-black uppercase text-xs tracking-[0.4em] mb-6 block">Portfolyo</span>
          <h1 className="text-6xl md:text-8xl font-black text-slate-950 tracking-[-0.06em] uppercase mb-10 leading-none">
            MÜHENDİSLİKTE <br /> <span className="text-slate-200">ANITSAL İMZALAR</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium leading-relaxed">
            Havalimanlarından enerji santrallerine, viyadüklerden mega-scale yapı projelerine kadar 20 yıllık küresel birikimimizi sergilediğimiz tüm projelerimiz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-16 lg:gap-24">
          {projects.map((project, idx) => (
            <ProjectGallery key={project.slug} project={project} index={idx} />
          ))}
        </div>
      </div>
    </main>
  );
}
