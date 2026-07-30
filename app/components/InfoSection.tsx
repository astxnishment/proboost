type InfoCopy = {
  sections: Array<{
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
    benefits?: Array<{ title: string; desc: string }>;
  }>;
};

export default function InfoSection({ copy }: { copy: InfoCopy }) {
  return (
    <section className="mt-10 grid gap-x-10 gap-y-8 border-t border-[var(--line)] pt-8 text-sm leading-7 text-[var(--muted)] lg:grid-cols-2">
      {copy.sections.map((section) => (
        <div key={section.heading}>
          <h2 className="mb-3 text-xl font-semibold text-[var(--foreground)]">{section.heading}</h2>
          {section.paragraphs?.map((paragraph, index) => (
            <p key={paragraph} className={index < section.paragraphs!.length - 1 ? "mb-4" : ""}>
              {paragraph}
            </p>
          ))}
          {section.bullets && (
            <ul className="space-y-2">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--foreground)]" />
                  {bullet}
                </li>
              ))}
            </ul>
          )}
          {section.benefits && (
            <ul className="space-y-3">
              {section.benefits.map((benefit) => (
                <li key={benefit.title} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--foreground)]" />
                  <span><span className="font-semibold text-[var(--foreground)]">{benefit.title}.</span> {benefit.desc}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}
