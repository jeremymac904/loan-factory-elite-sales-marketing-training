import Link from "next/link";

const links = [
  { label: "Overview", href: "/ai-twins/" },
  { label: "My Twin", href: "/ai-twins/my-twin/" },
  { label: "Projects", href: "/ai-twins/projects/" },
  { label: "Sources", href: "/ai-twins/sources/" },
  { label: "Gmail Review", href: "/ai-twins/gmail-review/" },
  { label: "Drive Sources", href: "/ai-twins/drive-sources/" },
];

export default function AITwinNav() {
  return (
    <nav className="flex gap-2 overflow-x-auto py-3" aria-label="AI Twin sections">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="whitespace-nowrap rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal hover:border-lf-orange hover:text-lf-orange"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
