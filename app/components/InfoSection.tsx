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
    <section className="mt-8 space-y-10 text-sm leading-7 text-zinc-400">
      {copy.sections.map((section) => (
        <div key={section.heading}>
          <h2 className="mb-3 text-xl font-bold text-white">{section.heading}</h2>
          {section.paragraphs?.map((paragraph, index) => (
            <p key={paragraph} className={index < section.paragraphs!.length - 1 ? "mb-4" : ""}>
              {paragraph}
            </p>
          ))}
          {section.bullets && (
            <ul className="space-y-2 pl-4">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  {bullet}
                </li>
              ))}
            </ul>
          )}
          {section.benefits && (
            <ul className="space-y-3 pl-4">
              {section.benefits.map((benefit) => (
                <li key={benefit.title} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  <span><span className="font-semibold text-white">{benefit.title}.</span> {benefit.desc}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

    </section>
  );
}
