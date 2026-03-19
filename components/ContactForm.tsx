"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Mesaj gonderilemedi.");
      }

      setForm({ name: "", email: "", subject: "", message: "" });
      setFeedback({ type: "success", text: "Mesajiniz basariyla gonderildi." });
    } catch (error) {
      const text = error instanceof Error ? error.message : "Mesaj gonderilemedi.";
      setFeedback({ type: "error", text });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-[3.5rem] p-12 md:p-16 shadow-2xl shadow-slate-200"
    >
      <form className="space-y-10" onSubmit={onSubmit}>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Ad Soyad</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onFieldChange}
              required
              className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 focus:ring-2 focus:ring-primary transition-all text-slate-950 font-medium"
              placeholder="Adınız"
            />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">E-Posta</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onFieldChange}
              required
              className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 focus:ring-2 focus:ring-primary transition-all text-slate-950 font-medium"
              placeholder="mail@example.com"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Konu</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={onFieldChange}
            required
            className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 focus:ring-2 focus:ring-primary transition-all text-slate-950 font-medium"
            placeholder="Proje Detayları"
          />
        </div>

        <div className="space-y-4">
          <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Mesajınız</label>
          <textarea
            rows={5}
            name="message"
            value={form.message}
            onChange={onFieldChange}
            required
            className="w-full bg-slate-50 border-none rounded-3xl px-8 py-6 focus:ring-2 focus:ring-primary transition-all text-slate-950 font-medium resize-none"
            placeholder="Mesajınızı buraya yazınız..."
          ></textarea>
        </div>

        {feedback ? (
          <div
            className={`rounded-2xl px-6 py-4 text-sm font-semibold ${
              feedback.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
            role="status"
            aria-live="polite"
          >
            {feedback.text}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center justify-center gap-4 group disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Gonderiliyor..." : "Gönder"}
          <Send size={18} className="transition-transform group-hover:translate-x-2 group-hover:-translate-y-1" />
        </button>
      </form>
    </motion.div>
  );
}
