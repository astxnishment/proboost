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
  onLoad?: () => void;
  onChatMaximized?: () => void;
  onChatMinimized?: () => void;
  onChatHidden?: () => void;
  onChatMessageAgent?: () => void;
  showWidget?: () => void;
  hideWidget?: () => void;
  maximize?: () => void;
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
  let pending = false;
  let opened = false;
  let disposed = false;
  let unread = 0;

  const didOpen = () => {
    if (disposed || opened) return;
    opened = true;
    pending = false;
    unread = 0;
    events.onUnread(0);
    events.onOpen();
  };
  const didClose = () => {
    if (disposed || !opened) return;
    opened = false;
    events.onClose();
  };
  const open = () => {
    if (!ready || disposed) return;
    try {
      api.showWidget!();
      api.maximize!();
      didOpen();
    } catch {
      ready = false;
      pending = false;
      didClose();
      events.onError();
    }
  };

  api.customStyle = { zIndex: 80 };
  api.onLoad = () => {
    if (disposed) return;
    if (!api.showWidget || !api.hideWidget || !api.maximize) {
      pending = false;
      events.onError();
      return;
    }
    ready = true;
    api.hideWidget();
    events.onReady();
    if (pending) open();
  };
  api.onChatMaximized = didOpen;
  api.onChatHidden = didClose;
  api.onChatMinimized = () => {
    if (disposed) return;
    api.hideWidget?.();
    didClose();
  };
  api.onChatMessageAgent = () => {
    if (!disposed && !opened) events.onUnread(++unread);
  };

  return {
    requestOpen() {
      if (disposed) return;
      pending = true;
      if (ready) open();
    },
    cancelPending() { pending = false; },
    isReady() { return ready && !disposed; },
    dispose() {
      disposed = true;
      pending = false;
      api.hideWidget?.();
    },
  };
}
