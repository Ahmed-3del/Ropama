"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { useCart } from "@/lib/cart";
import { composeOrderMessage, whatsappLink } from "@/lib/order";
import { Sketch } from "@/components/sketch/Sketch";

const ease = [0.16, 1, 0.3, 1] as const;

export function CartDrawer() {
  const { lines, count, isOpen, close, setQuantity, remove, clear } = useCart();
  const [step, setStep] = useState<"bag" | "send">("bag");
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      prev?.focus();
    };
  }, [isOpen, close]);

  const message = composeOrderMessage(lines);
  const wa = whatsappLink(message);

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
  };

  const onClose = () => {
    close();
    setStep("bag");
    setCopied("idle");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Close bag" onClick={onClose} className="absolute inset-0 h-full w-full cursor-default bg-forest-950/60 backdrop-blur-[2px]" />
          <motion.aside
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Your order"
            initial={{ x: "100%", rotate: 2 }}
            animate={{ x: 0, rotate: 0 }}
            exit={{ x: "100%", rotate: 2 }}
            transition={{ duration: 0.6, ease }}
            className="notebook absolute inset-y-0 right-0 flex w-full max-w-md origin-bottom-right flex-col text-ink shadow-2xl outline-none"
          >
            <header className="flex items-center justify-between border-b border-ink/10 bg-notebook px-6 py-5">
              <h2 className="font-hand text-4xl font-bold text-forest-900">
                {step === "bag" ? "Your order" : "Send it to us"}
                {step === "bag" && count > 0 && <span className="ml-2 align-top font-sans text-sm font-normal text-ink-soft">({count})</span>}
              </h2>
              <button type="button" onClick={onClose} className="eyebrow text-[0.65rem] text-ink/60 hover:text-ink">
                Close
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
                <Sketch name="kanaka" className="w-32 text-forest-900/40" />
                <p className="font-hand text-3xl text-forest-900">Nothing here yet… but maybe.</p>
                <Link href="/beans" onClick={onClose} className="inline-flex min-h-12 items-center rounded-full bg-forest-900 px-7 text-sm font-semibold text-paper hover:bg-forest-700">
                  Shop coffee beans
                </Link>
              </div>
            ) : step === "bag" ? (
              <>
                <ul className="flex-1 overflow-y-auto px-6 pl-16">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li
                        key={l.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease }}
                        className="overflow-hidden"
                      >
                        <div className="py-4">
                          <p className="font-hand text-2xl font-bold leading-tight text-forest-900">{l.name}</p>
                          {l.options.length > 0 && <p className="mt-1 text-sm text-ink-soft">{l.options.join(" · ")}</p>}
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-ink/20 bg-paper/70">
                              <button type="button" aria-label={`Decrease ${l.name}`} onClick={() => setQuantity(l.id, l.quantity - 1)} className="h-9 w-9 text-lg leading-none hover:text-amber-600">
                                −
                              </button>
                              <span className="w-6 text-center text-sm tabular-nums" aria-label="Quantity">
                                {l.quantity}
                              </span>
                              <button type="button" aria-label={`Increase ${l.name}`} onClick={() => setQuantity(l.id, l.quantity + 1)} className="h-9 w-9 text-lg leading-none hover:text-amber-600">
                                +
                              </button>
                            </div>
                            <button type="button" onClick={() => remove(l.id)} className="text-xs text-ink-soft underline-offset-4 hover:underline">
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <footer className="border-t border-ink/10 bg-notebook px-6 py-5">
                  <p className="text-xs leading-relaxed text-ink-soft">No payment online. You send this list to {site.name}, and we reply with the price and pickup or delivery details.</p>
                  <button type="button" onClick={() => setStep("send")} className="mt-4 flex min-h-12 w-full items-center justify-center rounded-full bg-forest-900 text-sm font-semibold text-paper transition-colors hover:bg-forest-700">
                    Continue
                  </button>
                  <button type="button" onClick={clear} className="mt-3 w-full text-center text-xs text-ink-soft hover:text-ink">
                    Clear order
                  </button>
                </footer>
              </>
            ) : (
              <div className="flex flex-1 flex-col overflow-y-auto px-6 py-6">
                <pre className="relative whitespace-pre-wrap rounded-sm bg-paper p-5 font-hand text-xl leading-snug text-forest-900 shadow-md">
                  <span aria-hidden className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2" />
                  {message}
                </pre>
                <div className="mt-6 flex flex-col gap-3">
                  {wa && (
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center rounded-full bg-forest-900 text-sm font-semibold text-paper hover:bg-forest-700">
                      Send on WhatsApp
                    </a>
                  )}
                  <button type="button" onClick={copyMessage} className="flex min-h-12 items-center justify-center rounded-full border border-ink/25 bg-paper/60 text-sm font-semibold hover:border-ink">
                    {copied === "ok" ? "Copied ✓" : "1 · Copy the list"}
                  </button>
                  <a href={site.contact.messenger} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center rounded-full bg-amber-500 text-sm font-semibold text-forest-900 hover:bg-amber-400">
                    2 · Paste it in Messenger
                  </a>
                  <a href={`tel:${site.contact.phone}`} className="text-center text-sm text-ink-soft underline-offset-4 hover:underline">
                    or call {site.contact.phoneDisplay}
                  </a>
                  <p className="text-xs text-ink-soft" aria-live="polite">
                    {copied === "fail" ? "Couldn’t copy automatically — select the text above and copy it." : "Your order is confirmed when we reply."}
                  </p>
                </div>
                <button type="button" onClick={() => setStep("bag")} className="mt-auto pt-6 text-left text-xs text-ink-soft hover:text-ink">
                  ← Back
                </button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
