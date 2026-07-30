import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: "page" | "content" | "reading";
};

export function PageContainer({
  size = "page",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={classes(
        size === "page" && "page-container",
        size === "content" && "content-container",
        size === "reading" && "reading-container",
        className,
      )}
      {...props}
    />
  );
}

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  spacing?: "default" | "compact" | "none";
};

export function Section({
  spacing = "default",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={classes(
        spacing === "default" && "section-shell",
        spacing === "compact" && "section-shell-compact",
        className,
      )}
      {...props}
    />
  );
}

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleAs?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleAs = "h2",
}: SectionHeadingProps) {
  const Heading = titleAs;
  return (
    <div
      className={classes(
        "section-heading",
        align === "center" && "section-heading-centered",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading className={titleAs === "h1" ? "page-title" : "section-title"}>
        {title}
      </Heading>
      {description ? <p className="body-large">{description}</p> : null}
    </div>
  );
}

type SurfaceProps = ComponentPropsWithoutRef<"div"> & {
  variant?: "standard" | "interactive" | "featured" | "muted";
};

export function Surface({
  variant = "standard",
  className,
  ...props
}: SurfaceProps) {
  return (
    <div
      className={classes(
        variant === "standard" && "surface",
        variant === "interactive" && "surface-interactive",
        variant === "featured" && "surface-featured",
        variant === "muted" && "surface-muted",
        className,
      )}
      {...props}
    />
  );
}

type StatusBadgeProps = ComponentPropsWithoutRef<"span"> & {
  tone?: "default" | "accent" | "success" | "muted";
};

export function StatusBadge({
  tone = "default",
  className,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={classes("status-badge", className)}
      data-tone={tone}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "standard" | "large";
};

export function ButtonLink({
  variant = "primary",
  size = "standard",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={classes(
        size === "small" && "button-small",
        size === "standard" && "button-base",
        size === "large" && "button-large",
        variant === "primary" && "button-primary",
        variant === "secondary" && "button-secondary",
        variant === "ghost" && "button-ghost",
        className,
      )}
      {...props}
    />
  );
}
