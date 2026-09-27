"use client";

import * as React from "react";

export default function DocumentLanguage({ lang }: { lang: string }) {
  React.useEffect(() => {
    const documentElement = document.documentElement;
    documentElement.lang = lang;
  }, [lang]);

  return null;
}
