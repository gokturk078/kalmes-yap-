"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";
import { Check, Loader2, LogOut, Mail, Plus, Save, Trash2, Upload } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { hasSupabaseConfig, supabaseProjectsBucket } from "@/lib/supabase/config";
import { slugify } from "@/lib/slugify";
import type { Database } from "@/lib/supabase/types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ProjectImageRow = Database["public"]["Tables"]["project_images"]["Row"];
type ContactMessageRow = Database["public"]["Tables"]["contact_messages"]["Row"];

type AdminProject = ProjectRow & {
  project_images: ProjectImageRow[];
};

interface NewProjectForm {
  title: string;
  slug: string;
  description: string;
  location: string;
  year: string;
  status: string;
  sort_order: string;
}

const initialNewProjectForm: NewProjectForm = {
  title: "",
  slug: "",
  description: "",
  location: "",
  year: "",
  status: "Tamamlandı",
  sort_order: "0",
};

export default function AdminPanel() {
  const supabase = useMemo(() => (hasSupabaseConfig ? getSupabaseBrowserClient() : null), []);

  const [loadingSession, setLoadingSession] = useState(hasSupabaseConfig);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [authError, setAuthError] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");
  const [busyAction, setBusyAction] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const [newProject, setNewProject] = useState<NewProjectForm>(initialNewProjectForm);
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [messages, setMessages] = useState<ContactMessageRow[]>([]);

  const clearNotices = () => {
    setActionError("");
    setActionSuccess("");
  };

  const fetchProjects = useCallback(async () => {
    if (!supabase) {
      return;
    }

    setLoadingProjects(true);
    setActionError("");

    const { data, error } = await supabase
      .from("projects")
      .select(
        "id, slug, title, description, location, year, status, cover_image_url, sort_order, created_at, updated_at, project_images(id, project_id, image_url, storage_path, sort_order, created_at)"
      )
      .order("sort_order", { ascending: true, nullsFirst: true })
      .order("created_at", { ascending: false });

    if (error) {
      setActionError(`Projeler yüklenemedi: ${error.message}`);
      setLoadingProjects(false);
      return;
    }

    const mapped = (data ?? []).map((project) => ({
      ...project,
      project_images: [...(project.project_images ?? [])].sort(
        (a, b) => (a.sort_order ?? Number.MAX_SAFE_INTEGER) - (b.sort_order ?? Number.MAX_SAFE_INTEGER)
      ),
    }));

    setProjects(mapped as AdminProject[]);
    setLoadingProjects(false);
  }, [supabase]);

  const fetchMessages = useCallback(async () => {
    if (!supabase) {
      return;
    }

    setLoadingMessages(true);

    const { data, error } = await supabase
      .from("contact_messages")
      .select("id, name, email, subject, message, status, ip_address, user_agent, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      setActionError(`Mesajlar yuklenemedi: ${error.message}`);
      setLoadingMessages(false);
      return;
    }

    setMessages((data ?? []) as ContactMessageRow[]);
    setLoadingMessages(false);
  }, [supabase]);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let active = true;

    const syncSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!active) {
        return;
      }

      if (error) {
        setAuthError(error.message);
        setLoadingSession(false);
        return;
      }

      const currentUser = data.session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        await Promise.all([fetchProjects(), fetchMessages()]);
      } else {
        setProjects([]);
        setMessages([]);
      }

      setLoadingSession(false);
    };

    syncSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      setAuthError("");

      if (nextUser) {
        void Promise.all([fetchProjects(), fetchMessages()]);
      } else {
        setProjects([]);
        setMessages([]);
      }
    });

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, [fetchMessages, fetchProjects, supabase]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    clearNotices();
    setBusyAction("login");

    if (!supabase) {
      setBusyAction("");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setAuthError(error.message);
      setBusyAction("");
      return;
    }

    setAuthError("");
    setActionSuccess("Giriş başarılı.");
    setBusyAction("");
  };

  const handleLogout = async () => {
    if (!supabase) {
      return;
    }

    clearNotices();
    setBusyAction("logout");
    await supabase.auth.signOut();
    setProjects([]);
    setBusyAction("");
  };

  const handleCreateProject = async (event: FormEvent) => {
    event.preventDefault();
    clearNotices();

    if (!supabase) {
      return;
    }

    if (!newProject.title.trim()) {
      setActionError("Proje adı zorunludur.");
      return;
    }

    setBusyAction("create-project");

    const baseSlug = slugify(newProject.slug || newProject.title);
    let finalSlug = baseSlug;
    let counter = 2;

    while (projects.some((project) => project.slug === finalSlug)) {
      finalSlug = `${baseSlug}-${counter}`;
      counter += 1;
    }

    const yearValue = Number(newProject.year);
    const year = Number.isNaN(yearValue) || !newProject.year ? null : yearValue;

    const { error } = await supabase.from("projects").insert({
      slug: finalSlug,
      title: newProject.title.trim(),
      description: newProject.description.trim() || null,
      location: newProject.location.trim() || null,
      year,
      status: newProject.status.trim() || null,
      sort_order: Number(newProject.sort_order) || 0,
    });

    if (error) {
      setActionError(`Proje eklenemedi: ${error.message}`);
      setBusyAction("");
      return;
    }

    setNewProject(initialNewProjectForm);
    setActionSuccess("Proje eklendi.");
    setBusyAction("");
    await fetchProjects();
  };

  const updateProjectState = (projectId: string, updater: (current: AdminProject) => AdminProject) => {
    setProjects((prev) => prev.map((project) => (project.id === projectId ? updater(project) : project)));
  };

  const handleSaveProject = async (project: AdminProject) => {
    if (!supabase) {
      return;
    }

    clearNotices();
    setBusyAction(`save-${project.id}`);

    const parsedYear = Number(project.year);
    const year = Number.isNaN(parsedYear) ? null : parsedYear;

    const { error } = await supabase
      .from("projects")
      .update({
        title: project.title.trim(),
        slug: slugify(project.slug),
        description: project.description?.trim() || null,
        location: project.location?.trim() || null,
        year,
        status: project.status?.trim() || null,
        sort_order: project.sort_order ?? 0,
        cover_image_url: project.cover_image_url || null,
      })
      .eq("id", project.id);

    if (error) {
      setActionError(`Proje güncellenemedi: ${error.message}`);
      setBusyAction("");
      return;
    }

    setActionSuccess(`"${project.title}" güncellendi.`);
    setBusyAction("");
    await fetchProjects();
  };

  const handleDeleteProject = async (project: AdminProject) => {
    if (!supabase) {
      return;
    }

    const confirmed = window.confirm(`"${project.title}" projesi kalıcı olarak silinsin mi?`);
    if (!confirmed) {
      return;
    }

    clearNotices();
    setBusyAction(`delete-${project.id}`);

    const storagePaths = project.project_images
      .map((image) => image.storage_path)
      .filter((value): value is string => Boolean(value));

    if (storagePaths.length > 0) {
      await supabase.storage.from(supabaseProjectsBucket).remove(storagePaths);
    }

    const { error } = await supabase.from("projects").delete().eq("id", project.id);

    if (error) {
      setActionError(`Proje silinemedi: ${error.message}`);
      setBusyAction("");
      return;
    }

    setActionSuccess(`"${project.title}" silindi.`);
    setBusyAction("");
    await fetchProjects();
  };

  const uploadProjectImages = async ({
    project,
    files,
    setCoverFromFirst,
  }: {
    project: AdminProject;
    files: File[];
    setCoverFromFirst?: boolean;
  }) => {
    if (!supabase || files.length === 0) {
      return;
    }

    clearNotices();
    setBusyAction(`upload-${project.id}`);

    const currentMaxSort = project.project_images.reduce(
      (max, image) => Math.max(max, image.sort_order ?? 0),
      0
    );

    const rowsToInsert: Database["public"]["Tables"]["project_images"]["Insert"][] = [];

    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
      const filename = slugify(file.name.replace(/\.[^.]+$/, "")) || `gorsel-${Date.now()}`;
      const storagePath = `${project.id}/${Date.now()}-${index}-${filename}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from(supabaseProjectsBucket)
        .upload(storagePath, file, { upsert: false });

      if (uploadError) {
        setActionError(`Fotoğraf yüklenemedi: ${uploadError.message}`);
        setBusyAction("");
        return;
      }

      const { data: publicData } = supabase.storage.from(supabaseProjectsBucket).getPublicUrl(storagePath);

      rowsToInsert.push({
        project_id: project.id,
        image_url: publicData.publicUrl,
        storage_path: storagePath,
        sort_order: currentMaxSort + index + 1,
      });
    }

    const { error: insertError } = await supabase.from("project_images").insert(rowsToInsert);

    if (insertError) {
      setActionError(`Fotoğraf kaydı oluşturulamadı: ${insertError.message}`);
      setBusyAction("");
      return;
    }

    const firstUploadedUrl = rowsToInsert[0]?.image_url;

    if (firstUploadedUrl && (setCoverFromFirst || !project.cover_image_url)) {
      const { error: coverError } = await supabase
        .from("projects")
        .update({ cover_image_url: firstUploadedUrl })
        .eq("id", project.id);

      if (coverError) {
        setActionError(`Kapak güncellenemedi: ${coverError.message}`);
        setBusyAction("");
        return;
      }
    }

    setActionSuccess(`${files.length} fotoğraf yüklendi.`);
    setBusyAction("");
    await fetchProjects();
  };

  const handleSetCoverImage = async (projectId: string, imageUrl: string) => {
    if (!supabase) {
      return;
    }

    clearNotices();
    setBusyAction(`cover-${projectId}`);

    const { error } = await supabase
      .from("projects")
      .update({ cover_image_url: imageUrl })
      .eq("id", projectId);

    if (error) {
      setActionError(`Kapak güncellenemedi: ${error.message}`);
      setBusyAction("");
      return;
    }

    setActionSuccess("Kapak görseli güncellendi.");
    setBusyAction("");
    await fetchProjects();
  };

  const handleDeleteImage = async (project: AdminProject, image: ProjectImageRow) => {
    if (!supabase) {
      return;
    }

    const confirmed = window.confirm("Bu görsel kalıcı olarak silinsin mi?");
    if (!confirmed) {
      return;
    }

    clearNotices();
    setBusyAction(`delete-image-${image.id}`);

    if (image.storage_path) {
      await supabase.storage.from(supabaseProjectsBucket).remove([image.storage_path]);
    }

    const { error: deleteError } = await supabase.from("project_images").delete().eq("id", image.id);

    if (deleteError) {
      setActionError(`Görsel silinemedi: ${deleteError.message}`);
      setBusyAction("");
      return;
    }

    if (project.cover_image_url === image.image_url) {
      const nextImage = project.project_images.find((candidate) => candidate.id !== image.id)?.image_url ?? null;
      const { error: coverError } = await supabase
        .from("projects")
        .update({ cover_image_url: nextImage })
        .eq("id", project.id);

      if (coverError) {
        setActionError(`Kapak güncellenemedi: ${coverError.message}`);
        setBusyAction("");
        return;
      }
    }

    setActionSuccess("Görsel silindi.");
    setBusyAction("");
    await fetchProjects();
  };

  const handleMarkMessageRead = async (messageId: string) => {
    if (!supabase) {
      return;
    }

    clearNotices();
    setBusyAction(`message-read-${messageId}`);

    const { error } = await supabase
      .from("contact_messages")
      .update({ status: "read" })
      .eq("id", messageId);

    if (error) {
      setActionError(`Mesaj guncellenemedi: ${error.message}`);
      setBusyAction("");
      return;
    }

    setActionSuccess("Mesaj okundu olarak isaretlendi.");
    setBusyAction("");
    await fetchMessages();
  };

  if (!hasSupabaseConfig) {
    return (
      <main className="min-h-screen bg-slate-950 text-white px-6 py-20">
        <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-10">
          <h1 className="text-3xl font-black tracking-tight uppercase mb-4">Admin Kurulumu Eksik</h1>
          <p className="text-slate-300 leading-relaxed">
            Supabase bağlantısı için <code>NEXT_PUBLIC_SUPABASE_URL</code> ve <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
            ortam değişkenlerini eklemelisiniz.
          </p>
        </div>
      </main>
    );
  }

  if (loadingSession) {
    return (
      <main className="min-h-screen bg-slate-950 text-white grid place-items-center">
        <div className="flex items-center gap-3 text-slate-300 uppercase tracking-widest text-xs font-black">
          <Loader2 className="w-5 h-5 animate-spin" /> Oturum kontrol ediliyor
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-950 text-white px-6 py-20 grid place-items-center">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 shadow-2xl">
          <p className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-4">Kalmes Yapı</p>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-8">Admin Giriş</h1>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="admin-email" className="text-xs uppercase tracking-widest text-slate-400 font-black">
                E-posta
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-xs uppercase tracking-widest text-slate-400 font-black">
                Şifre
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-primary"
                required
              />
            </div>

            {authError ? <p className="text-red-400 text-sm">{authError}</p> : null}

            <button
              type="submit"
              disabled={busyAction === "login"}
              className="w-full rounded-xl bg-primary py-3.5 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-colors disabled:opacity-60"
            >
              {busyAction === "login" ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950 px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="rounded-3xl bg-slate-950 text-white px-6 md:px-10 py-8 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <div>
            <p className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-2">Yönetim Paneli</p>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Projeler, Fotoğraflar ve Mesajlar</h1>
            <p className="text-slate-300 mt-2">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={busyAction === "logout"}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-xs font-black uppercase tracking-wider hover:bg-white/10 transition-colors disabled:opacity-60"
          >
            <LogOut size={16} /> Çıkış Yap
          </button>
        </header>

        <section className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Plus className="text-primary" size={18} />
            <h2 className="text-xl font-black uppercase tracking-tight">Yeni Proje Ekle</h2>
          </div>

          <form onSubmit={handleCreateProject} className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Proje Adı"
              value={newProject.title}
              onChange={(event) => setNewProject((prev) => ({ ...prev, title: event.target.value }))}
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
              required
            />
            <input
              placeholder="Slug (opsiyonel)"
              value={newProject.slug}
              onChange={(event) => setNewProject((prev) => ({ ...prev, slug: event.target.value }))}
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
            />
            <input
              placeholder="Lokasyon"
              value={newProject.location}
              onChange={(event) => setNewProject((prev) => ({ ...prev, location: event.target.value }))}
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
            />
            <input
              placeholder="Yıl"
              type="number"
              value={newProject.year}
              onChange={(event) => setNewProject((prev) => ({ ...prev, year: event.target.value }))}
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
            />
            <input
              placeholder="Durum (örn: Tamamlandı)"
              value={newProject.status}
              onChange={(event) => setNewProject((prev) => ({ ...prev, status: event.target.value }))}
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
            />
            <input
              placeholder="Sıra"
              type="number"
              value={newProject.sort_order}
              onChange={(event) => setNewProject((prev) => ({ ...prev, sort_order: event.target.value }))}
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
            />
            <textarea
              placeholder="Açıklama"
              value={newProject.description}
              onChange={(event) => setNewProject((prev) => ({ ...prev, description: event.target.value }))}
              className="md:col-span-2 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary min-h-28"
            />
            <button
              type="submit"
              disabled={busyAction === "create-project"}
              className="md:col-span-2 rounded-xl bg-primary text-white py-3 font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-colors disabled:opacity-60"
            >
              {busyAction === "create-project" ? "Ekleniyor..." : "Projeyi Ekle"}
            </button>
          </form>
        </section>

        {actionError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3">{actionError}</div>
        ) : null}
        {actionSuccess ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 px-4 py-3">{actionSuccess}</div>
        ) : null}

        <section className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 space-y-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Mail className="text-primary" size={18} />
              <h2 className="text-xl font-black uppercase tracking-tight">İletişim Mesajları</h2>
            </div>
            {loadingMessages ? (
              <div className="flex items-center gap-2 text-slate-500 text-xs font-black uppercase tracking-wider">
                <Loader2 className="w-4 h-4 animate-spin" /> Yukleniyor
              </div>
            ) : null}
          </div>

          {messages.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-500">
              Henuz iletisim mesaji yok.
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <article key={message.id} className="rounded-2xl border border-slate-200 p-5 bg-white space-y-3">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="text-lg font-black text-slate-950 tracking-tight">{message.subject}</p>
                      <p className="text-sm text-slate-500">
                        {message.name} ({message.email})
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider ${
                          message.status === "read"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {message.status === "read" ? "Okundu" : "Yeni"}
                      </span>
                      {message.status !== "read" ? (
                        <button
                          onClick={() => void handleMarkMessageRead(message.id)}
                          disabled={busyAction === `message-read-${message.id}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-black uppercase tracking-wide hover:bg-slate-50 disabled:opacity-50"
                        >
                          <Check size={13} />
                          Okundu Yap
                        </button>
                      ) : null}
                    </div>
                  </div>

                  <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{message.message}</p>
                  <p className="text-xs text-slate-400">
                    {new Date(message.created_at).toLocaleString("tr-TR")}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-tight">Tüm Projeler</h2>
            {loadingProjects ? (
              <div className="flex items-center gap-2 text-slate-500 text-xs font-black uppercase tracking-wider">
                <Loader2 className="w-4 h-4 animate-spin" /> Güncelleniyor
              </div>
            ) : null}
          </div>

          {projects.length === 0 ? (
            <div className="rounded-2xl bg-white border border-slate-200 p-8 text-slate-500">Henüz proje yok.</div>
          ) : null}

          {projects.map((project) => (
            <article key={project.id} className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  value={project.title}
                  onChange={(event) =>
                    updateProjectState(project.id, (current) => ({ ...current, title: event.target.value }))
                  }
                  className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                  placeholder="Proje Adı"
                />
                <input
                  value={project.slug}
                  onChange={(event) =>
                    updateProjectState(project.id, (current) => ({ ...current, slug: event.target.value }))
                  }
                  className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                  placeholder="Slug"
                />
                <input
                  value={project.location ?? ""}
                  onChange={(event) =>
                    updateProjectState(project.id, (current) => ({ ...current, location: event.target.value }))
                  }
                  className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                  placeholder="Lokasyon"
                />
                <input
                  type="number"
                  value={project.year ?? ""}
                  onChange={(event) =>
                    updateProjectState(project.id, (current) => ({
                      ...current,
                      year: event.target.value ? Number(event.target.value) : null,
                    }))
                  }
                  className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                  placeholder="Yıl"
                />
                <input
                  value={project.status ?? ""}
                  onChange={(event) =>
                    updateProjectState(project.id, (current) => ({ ...current, status: event.target.value }))
                  }
                  className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                  placeholder="Durum"
                />
                <input
                  type="number"
                  value={project.sort_order ?? 0}
                  onChange={(event) =>
                    updateProjectState(project.id, (current) => ({
                      ...current,
                      sort_order: Number(event.target.value),
                    }))
                  }
                  className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                  placeholder="Sıra"
                />
                <textarea
                  value={project.description ?? ""}
                  onChange={(event) =>
                    updateProjectState(project.id, (current) => ({ ...current, description: event.target.value }))
                  }
                  className="md:col-span-2 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-primary min-h-28"
                  placeholder="Açıklama"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => void handleSaveProject(project)}
                  disabled={busyAction === `save-${project.id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 text-white px-5 py-3 text-xs font-black uppercase tracking-wider hover:bg-primary transition-colors disabled:opacity-60"
                >
                  <Save size={16} />
                  {busyAction === `save-${project.id}` ? "Kaydediliyor..." : "Projeyi Kaydet"}
                </button>

                <button
                  onClick={() => void handleDeleteProject(project)}
                  disabled={busyAction === `delete-${project.id}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 text-red-700 px-5 py-3 text-xs font-black uppercase tracking-wider hover:bg-red-100 transition-colors disabled:opacity-60"
                >
                  <Trash2 size={16} />
                  {busyAction === `delete-${project.id}` ? "Siliniyor..." : "Projeyi Sil"}
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <h3 className="text-lg font-black uppercase tracking-tight">Kapak Görseli</h3>
                  <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs font-black uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors">
                    <Upload size={14} /> Kapak Yükle
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        const files = event.target.files ? Array.from(event.target.files) : [];
                        if (files.length === 0) {
                          return;
                        }
                        void uploadProjectImages({ project, files: [files[0]], setCoverFromFirst: true });
                        event.currentTarget.value = "";
                      }}
                    />
                  </label>
                </div>

                <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  {project.cover_image_url ? (
                    <Image
                      src={project.cover_image_url}
                      alt={`${project.title} Kapak`}
                      fill
                      className="object-cover origin-center scale-[1.07]"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-slate-400 text-sm">Kapak görseli yok</div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <h3 className="text-lg font-black uppercase tracking-tight">Proje Fotoğrafları</h3>
                  <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs font-black uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors">
                    <Upload size={14} /> Fotoğraf Yükle
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(event) => {
                        const files = event.target.files ? Array.from(event.target.files) : [];
                        if (files.length === 0) {
                          return;
                        }
                        void uploadProjectImages({ project, files });
                        event.currentTarget.value = "";
                      }}
                    />
                  </label>
                </div>

                {project.project_images.length === 0 ? (
                  <p className="text-slate-500">Henüz fotoğraf yok.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {project.project_images.map((image) => {
                      const isCover = project.cover_image_url === image.image_url;

                      return (
                        <div key={image.id} className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
                          <div className="relative aspect-[16/10] bg-slate-100">
                            <Image
                              src={image.image_url}
                              alt={project.title}
                              fill
                              className="object-cover origin-center scale-[1.07]"
                            />
                          </div>
                          <div className="p-3 flex items-center gap-2">
                            <button
                              onClick={() => void handleSetCoverImage(project.id, image.image_url)}
                              disabled={isCover || busyAction === `cover-${project.id}`}
                              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-black uppercase tracking-wide hover:bg-slate-50 disabled:opacity-50"
                            >
                              {isCover ? "Kapak" : "Kapak Yap"}
                            </button>
                            <button
                              onClick={() => void handleDeleteImage(project, image)}
                              disabled={busyAction === `delete-image-${image.id}`}
                              className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-[11px] font-black uppercase tracking-wide hover:bg-red-100 disabled:opacity-50"
                            >
                              Sil
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
