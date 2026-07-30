"use client";

import * as React from "react";

export default function DocumentLanguage({ lang }: { lang: string }) {
  React.useEffect(() => {
    const documentElement = document.documentElement;
    const previousLanguage = documentElement.lang || "en";
    documentElement.lang = lang;

    return () => {
      documentElement.lang = previousLanguage;
    };
  }, [lang]);

  return null;
}
