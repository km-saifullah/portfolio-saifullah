"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Enter a valid email"),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(10, "Message is too short").max(5000),
  company: z.string().max(0).optional(), // honeypot
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (values: FormValues) => {
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      setStatus("sent");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
            Let&apos;s build something
          </h2>
          <p className="mt-4 text-text-muted max-w-lg">
            Have a project, role, or idea in mind? Send a message and I&apos;ll
            get back to you directly at my inbox.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-12 space-y-5"
            noValidate
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
              {...register("company")}
            />

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="font-mono text-xs text-text-muted"
                >
                  Name
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-green-bright transition-colors"
                  placeholder="Jane Doe"
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="font-mono text-xs text-text-muted"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-green-bright transition-colors"
                  placeholder="jane@example.com"
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="font-mono text-xs text-text-muted"
              >
                Subject <span className="text-text-faint">(optional)</span>
              </label>
              <input
                id="subject"
                {...register("subject")}
                className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-green-bright transition-colors"
                placeholder="Project inquiry"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="font-mono text-xs text-text-muted"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                {...register("message")}
                className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-green-bright transition-colors resize-none"
                placeholder="Tell me a bit about what you're building..."
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 font-medium text-[#04140b] hover:bg-green-bright transition-colors disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : status === "sent" ? (
                <>
                  <CheckCircle2 size={16} /> Sent
                </>
              ) : (
                <>
                  <Send size={16} /> Send message
                </>
              )}
            </button>

            {status === "sent" && (
              <p className="text-sm text-green-bright">
                Thank you! Your message is on its way. I&apos;ll reply soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">{errorMsg}</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
