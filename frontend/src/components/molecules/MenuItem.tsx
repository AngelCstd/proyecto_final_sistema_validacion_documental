import Link from "next/link";
import { Text } from "@/components/atoms/Text";

export function MenuItem({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-400"
    >
      <Text variant="subtitle" size="sm">
        {title}
      </Text>
      <Text variant="paragraph" size="sm" className="mt-1" color="zinc">
        {description}
      </Text>
    </Link>
  );
}
