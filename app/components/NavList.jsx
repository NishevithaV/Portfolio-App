import Link from "next/link";

/**
 * Nav item. Monochrome by design - the accent is reserved for content the
 * visitor has reached for, not for chrome.
 */
const NavList = ({ href, title, onClick, isOverlay }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      data-cursor="link"
      className={`group relative block whitespace-nowrap text-muted transition-colors duration-200 hover:text-ink ${
        isOverlay
          ? "font-display text-4xl uppercase tracking-tight sm:text-5xl"
          : "fig-label px-4 py-1.5 hover:!text-ink"
      }`}
    >
      {title}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-4 right-4 block h-px origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100"
      />
    </Link>
  );
};

export default NavList;
