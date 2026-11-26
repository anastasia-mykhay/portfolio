import Link from "next/link";

type NavLinkProps = {
  /** Текст посилання. */
  children: string;
  /** Адреса, куди веде посилання, наприклад «#projects». */
  href: string;
};

/** Посилання меню у верхній смузі hero. Лише для темного фону canvas-dark. */
export function NavLink({ children, href }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="text-label uppercase no-underline text-text-on-dark hover:text-link-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-on-dark"
    >
      {children}
    </Link>
  );
}
