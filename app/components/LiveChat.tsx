"use client";

import Localized from "./Localization";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, ArrowUpRight, Check, Gamepad2, Headphones, LoaderCircle, Mail, MessageCircle, ReceiptText, ShieldCheck, X } from "lucide-react";
import { createChatController, liveChatConfig, type TawkApi } from "../lib/live-chat";

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

// Public embed identifiers from ProBoost's Tawk inbox; deployments may override them.
const config = liveChatConfig(
  process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID ?? "6abc1b642868e33441711d83",
  process.env.NEXT_PUBLIC_TAWK_WIDGET_ID ?? "1k3ncm050",
);
const ChatContext = createContext<((trigger?: HTMLElement) => void) | null>(null);
const topics = [
  { title: "Choosing a service", detail: "Tell us your game, platform, and the goal you have in mind.", icon: Gamepad2 },
  { title: "An existing order", detail: "Have your order reference and sign-in email ready so we can find your order.", icon: ReceiptText },
  { title: "Billing & payments", detail: "Include your order reference and charge date. Never share full card details.", icon: ShieldCheck },
] as const;

export function LiveChatButton({ children, className }: { children: ReactNode; className?: string }) {
  const open = useContext(ChatContext);
  return <Localized><button type="button" className={className} onClick={event => open?.(event.currentTarget)} aria-haspopup="dialog">{children}</button></Localized>;
}

export default function LiveChatProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const controller = useRef<ReturnType<typeof createChatController> | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusFrame = useRef<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const wantsChat = useRef(false);
  const backdropPress = useRef(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [providerOpen, setProviderOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [unread, setUnread] = useState(0);
  const [topic, setTopic] = useState(0);

  const clearTimer = () => { if (timer.current) clearTimeout(timer.current); timer.current = null; };
  const showPanel = () => {
    if (!dialog.current?.open) dialog.current?.showModal();
    setPanelOpen(true);
  };
  const closePanel = () => {
    wantsChat.current = false;
    backdropPress.current = false;
    controller.current?.cancelPending();
    dialog.current?.close();
    setPanelOpen(false);
  };
  const restoreFocus = () => {
    if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    focusFrame.current = requestAnimationFrame(() => {
      if (controller.current?.isOpen() || controller.current?.isPending() || dialog.current?.open) return;
      const target = opener.current?.isConnected ? opener.current : launcher.current;
      target?.focus({ preventScroll: true });
    });
  };
  const fail = () => {
    const showFallback = wantsChat.current;
    wantsChat.current = false;
    clearTimer();
    controller.current?.cancelPending();
    setState("error");
    if (showFallback) showPanel();
  };
  const openSupport = (trigger?: HTMLElement) => {
    if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    opener.current = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    if (controller.current?.isReady()) startChat();
    else showPanel();
  };
  const startChat = () => {
    if (!config || controller.current?.isOpen() || controller.current?.isPending()) return;
    wantsChat.current = true;
    setState("loading");
    clearTimer();
    timer.current = setTimeout(fail, 15_000);
    if (!controller.current) {
      const api = window.Tawk_API ??= {};
      window.Tawk_LoadStart = new Date();
      controller.current = createChatController(api, {
        onReady: () => {
          if (!controller.current?.isPending()) { clearTimer(); setState("ready"); }
        },
        onOpen: () => { clearTimer(); setState("ready"); setProviderOpen(true); closePanel(); },
        onClose: () => {
          setProviderOpen(false);
          restoreFocus();
        },
        onUnread: setUnread,
        onError: fail,
      });
    }
    controller.current.requestOpen();
    setRequested(true);
  };

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
    if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    controller.current?.dispose();
    controller.current = null;
  }, []);

  const isBackdrop = (event: { target: EventTarget; currentTarget: HTMLDialogElement; clientX: number; clientY: number }) => {
    if (event.target !== event.currentTarget) return false;
    const bounds = event.currentTarget.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  };

  const emailHref = `mailto:support@proboost.gg?subject=${encodeURIComponent(`ProBoost support — ${topics[topic].title}`)}`;

  return <Localized><ChatContext.Provider value={openSupport}>
    {children}
    {requested && config && <Script id="proboost-live-chat" src={config.scriptUrl} strategy="afterInteractive" onError={fail} />}
    <button ref={launcher} type="button" className="support-launcher" data-hidden={panelOpen || providerOpen} inert={panelOpen || providerOpen} aria-hidden={panelOpen || providerOpen} onClick={event => openSupport(event.currentTarget)} aria-haspopup="dialog" aria-controls="proboost-support" aria-expanded={panelOpen || providerOpen} aria-label={unread ? `Open support, ${unread} unread ${unread === 1 ? "message" : "messages"}` : "Open support chat"}>
      <MessageCircle size={21} aria-hidden /><span>Support</span>{unread > 0 && <span className="support-unread" aria-hidden>{unread > 9 ? "9+" : unread}</span>}
    </button>
    <dialog ref={dialog} id="proboost-support" className="support-panel" aria-labelledby="support-title" aria-describedby="support-intro" lang="en" onClose={() => {
      // Native close events are queued: don't cancel a freshly reopened panel.
      if (dialog.current?.open) return;
      setPanelOpen(false);
      restoreFocus();
    }} onCancel={event => { event.preventDefault(); closePanel(); }} onPointerDown={event => { backdropPress.current = isBackdrop(event); }} onPointerCancel={() => { backdropPress.current = false; }} onClick={event => {
      if (backdropPress.current && isBackdrop(event)) closePanel();
      backdropPress.current = false;
    }} onKeyDown={event => {
      if (event.key !== "Tab") return;
      const controls = event.currentTarget.querySelectorAll<HTMLElement>("button:not(:disabled), a[href]");
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}>
      <div className="support-panel-content">
        <header className="support-panel-header">
          <span className="support-avatar"><Headphones size={23} aria-hidden /></span>
          <div><strong>ProBoost Support</strong><span>A hand with your next step.</span></div>
          <button type="button" className="support-close" aria-label="Close support chat" onClick={closePanel}><X size={19} aria-hidden /></button>
        </header>
        <div className="support-panel-body">
          <span className="support-eyebrow">LET’S TALK</span>
          <h2 id="support-title">How can we help?</h2>
          <p id="support-intro">Questions about your climb? Pick a topic and get in touch.</p>
          <div className="support-topics" role="group" aria-label="Support topic">
            {topics.map((item, index) => <Localized key={item.title}><button key={item.title} type="button" aria-pressed={topic === index} onClick={() => setTopic(index)}><item.icon size={19} aria-hidden /><span>{item.title}</span>{topic === index ? <Check size={16} aria-hidden /> : <ArrowRight size={16} aria-hidden />}</button></Localized>)}
          </div>
          <p className="support-topic-detail">{topics[topic].detail}</p>
          {!config ? <div className="support-notice"><span className="support-status-dot" /><p>Live chat isn’t available right now. Email our support team and we’ll reply there.</p></div> : state === "error" ? <p className="support-notice" role="alert">Chat couldn’t load here. Open it in a new tab, or contact us by email.</p> : <p className="support-provider-note">Live chat opens with tawk.to. If the team is away, you can leave a message.</p>}
        </div>
        <div className="support-actions">
          {config ? state === "error" ? <a href={config.directUrl} target="_blank" rel="noopener noreferrer" className="support-primary">Open chat in a new tab<ArrowUpRight size={17} aria-hidden /></a> : <button type="button" className="support-primary" disabled={state === "loading"} onClick={startChat}>{state === "loading" ? <><LoaderCircle size={17} className="animate-spin" aria-hidden />Connecting to chat…</> : <><MessageCircle size={18} aria-hidden />Start live chat<ArrowRight size={17} aria-hidden /></>}</button> : <a href={emailHref} className="support-primary"><Mail size={18} aria-hidden />Email support<ArrowUpRight size={17} aria-hidden /></a>}
          <div role="status" className="sr-only">{state === "loading" ? "Connecting to support chat" : ""}</div>
          {config && <a href={emailHref} className="support-email"><Mail size={15} aria-hidden />Prefer email? Contact support</a>}
        </div>
        <footer className="support-panel-footer"><ShieldCheck size={14} aria-hidden /><span>Never share passwords or payment details.</span><Link href="/privacy" onClick={closePanel}>Privacy</Link></footer>
      </div>
    </dialog>
  </ChatContext.Provider></Localized>;
}
