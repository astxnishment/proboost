export type LiveChatConfig = { scriptUrl: string; directUrl: string };

// Only public widget identifiers belong here; never accept an arbitrary script URL.
export function liveChatConfig(propertyId?: string, widgetId?: string): LiveChatConfig | null {
  const property = propertyId?.trim();
  const widget = widgetId?.trim();
  if (!property || !widget || !/^[a-f\d]{24}$/i.test(property) || !/^[a-z\d_-]{1,64}$/i.test(widget)) return null;
  return {
    scriptUrl: `https://embed.tawk.to/${property}/${widget}`,
    directUrl: `https://tawk.to/chat/${property}/${widget}`,
  };
}

export type TawkApi = {
  customStyle?: { zIndex: number };
  onBeforeLoad?: () => void;
  onLoad?: () => void;
  onChatMaximized?: () => void;
  onChatMinimized?: () => void;
  onChatHidden?: () => void;
  onChatMessageAgent?: () => void;
  showWidget?: () => void;
  hideWidget?: () => void;
  maximize?: () => void;
  isChatMaximized?: () => boolean;
  isChatMinimized?: () => boolean;
  isChatHidden?: () => boolean;
};

type ChatEvents = {
  onReady: () => void;
  onOpen: () => void;
  onClose: () => void;
  onUnread: (count: number) => void;
  onError: () => void;
};

// Keeps delayed provider callbacks from opening a chat after the visitor dismisses it.
export function createChatController(api: TawkApi, events: ChatEvents) {
  let ready = false;
  let requested = false;
  let opening = false;
  let opened = false;
  let disposed = false;
  let unread = 0;

  const didOpen = () => {
    if (disposed || !ready) return;
    // Ignore stale callbacks and provider auto-open triggers after dismissal.
    if (!requested) { api.hideWidget?.(); return; }
    if (api.isChatHidden?.() === true || api.isChatMaximized?.() === false || opened) return;
    opening = false;
    opened = true;
    unread = 0;
    events.onUnread(0);
    events.onOpen();
  };
  const didClose = () => {
    requested = false;
    opening = false;
    if (disposed || !opened) return;
    opened = false;
    events.onClose();
  };
  const open = () => {
    if (!ready || disposed || !requested || opened || opening) return;
    opening = true;
    try {
      api.showWidget!();
      api.maximize!();
      // Some provider versions don't emit maximize again when reopening a hidden
      // maximized widget. Confirm the actual state instead of assuming it opened.
      if (api.isChatMaximized?.() === true && api.isChatHidden?.() !== true) didOpen();
    } catch {
      ready = false;
      didClose();
      events.onError();
    }
  };

  api.customStyle = { zIndex: 80 };
  api.onBeforeLoad = () => { api.hideWidget?.(); };
  api.onLoad = () => {
    if (disposed) return;
    if (!api.showWidget || !api.hideWidget || !api.maximize) {
      requested = false;
      events.onError();
      return;
    }
    ready = true;
    events.onReady();
    if (requested) open();
    else api.hideWidget();
  };
  api.onChatMaximized = didOpen;
  api.onChatHidden = () => {
    // The initial hide event can arrive after show/maximize. It must not put
    // our launcher back over an opening or already-visible conversation.
    if (disposed || !ready || opening || api.isChatHidden?.() === false) return;
    didClose();
  };
  api.onChatMinimized = () => {
    if (disposed || !ready || opening || api.isChatMinimized?.() === false) return;
    didClose();
    api.hideWidget?.();
  };
  api.onChatMessageAgent = () => {
    if (!disposed && !opened) events.onUnread(++unread);
  };

  return {
    requestOpen() {
      if (disposed) return;
      requested = true;
      if (ready) open();
    },
    cancelPending() {
      if (opened || disposed) return;
      requested = false;
      opening = false;
      if (ready) api.hideWidget?.();
    },
    isReady() { return ready && !disposed; },
    isOpen() { return opened && !disposed; },
    isPending() { return requested && !opened && !disposed; },
    dispose() {
      disposed = true;
      requested = false;
      opening = false;
      api.hideWidget?.();
    },
  };
}
