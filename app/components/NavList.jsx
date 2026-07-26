import Link from "next/link";

const NavList = ({ href, title, onClick, isOverlay }) => {
    return (
        <Link
            href={href}
            className={`block whitespace-nowrap rounded-full text-term-muted hover:text-term-accent transition-colors duration-200 ${
                isOverlay
                    ? "text-[22px] py-2 px-4"
                    : "text-[15px] px-4 py-1.5 hover:bg-term-surface-2"
            }`}
            onClick={onClick}
        >
            <span className="text-term-accent-2/70">./</span>{title}
        </Link>
    )
}

export default NavList;
