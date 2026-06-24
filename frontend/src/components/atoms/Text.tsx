import type { ElementType, HTMLAttributes } from "react";

type TextVariant = "title" | "subtitle" | "paragraph" | "small";
type TextSize = "sm" | "md" | "lg";
type TextColor = "black" | "white" | "zinc";

type TextProps = HTMLAttributes<HTMLElement> & {
  variant?: TextVariant;
  size?: TextSize;
  color?: TextColor;
  as?: ElementType;
};

const defaultTagByVariant: Record<TextVariant, ElementType> = {
  title: "h1",
  subtitle: "h2",
  paragraph: "p",
  small: "span",
};

// Solo el peso de la fuente — el color vive aparte en colorClasses.
const variantClasses: Record<TextVariant, string> = {
  title: "font-bold",
  subtitle: "font-semibold",
  paragraph: "font-normal",
  small: "font-normal",
};

const colorClasses: Record<TextColor, string> = {
  black: "text-black",
  white: "text-white",
  zinc: "text-zinc-400",
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
  color = "black",
  as,
  className = "",
  ...props
}: TextProps) {
  const Component = as ?? defaultTagByVariant[variant];

  return (
    <Component
      className={`${variantClasses[variant]} ${colorClasses[color]} ${sizeClasses[variant][size]} ${className}`}
      {...props}
    />
  );
}
