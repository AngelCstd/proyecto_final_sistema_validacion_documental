import type { ElementType, HTMLAttributes } from "react";

type TextVariant = "title" | "subtitle" | "paragraph" | "small";
type TextSize = "sm" | "md" | "lg";

type TextProps = HTMLAttributes<HTMLElement> & {
  variant?: TextVariant;
  size?: TextSize;
  /** Sobreescribe la etiqueta semántica que usa la variante por default (útil para SEO/jerarquía de encabezados). */
  as?: ElementType;
};

const defaultTagByVariant: Record<TextVariant, ElementType> = {
  title: "h1",
  subtitle: "h2",
  paragraph: "p",
  small: "span",
};

const variantClasses: Record<TextVariant, string> = {
  title: "font-bold text-zinc-900 dark:text-zinc-50",
  subtitle: "font-semibold text-zinc-800 dark:text-zinc-200",
  paragraph: "font-normal text-zinc-700 dark:text-zinc-300",
  small: "font-normal text-zinc-500 dark:text-zinc-400",
};

const sizeClasses: Record<TextVariant, Record<TextSize, string>> = {
  title: { sm: "text-xl", md: "text-3xl", lg: "text-4xl" },
  subtitle: { sm: "text-base", md: "text-xl", lg: "text-2xl" },
  paragraph: { sm: "text-xs", md: "text-sm", lg: "text-base" },
  small: { sm: "text-[0.65rem]", md: "text-xs", lg: "text-sm" },
};

export function Text({
  variant = "paragraph",
  size = "md",
  as,
  className = "",
  ...props
}: TextProps) {
  const Component = as ?? defaultTagByVariant[variant];

  return (
    <Component
      className={`${variantClasses[variant]} ${sizeClasses[variant][size]} ${className}`}
      {...props}
    />
  );
}
