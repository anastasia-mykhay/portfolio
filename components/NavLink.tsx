import Link from "next/link";

type NavLinkProps = {
  /** Текст посилання. */
  children: string;
  /** Адреса, куди веде посилання, наприклад «#projects». */
  href: string;
};

/** Посилання меню у верхній смузі hero. Лише для темного фону canvas-dark. */
export function NavLink({ children, href }: NavLinkProps) {
  /*
    Для якоря на цій самій сторінці беремо звичайний <a>. Link прокручує лише тоді,
    коли частина адреси після # змінюється, тому повторний клік нічого не робив.
  */
  const Anchor = href.startsWith("#") ? "a" : Link;

  return (
    <Anchor
      href={href}
      className="text-label uppercase no-underline text-text-on-dark hover:text-link-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-on-dark"
    >
      {children}
    </Anchor>
  );
}
