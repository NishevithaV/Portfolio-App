import Link from "next/link";

const NavList = ({ href, title, onClick, isOverlay }) => {
    return (
        <Link
            href={href}
            className={`block whitespace-nowrap rounded-full text-[#ADB7BE] hover:text-white transition-colors duration-200 ${
                isOverlay
                    ? "text-[22px] py-2 px-4"
                    : "text-[15px] px-4 py-1.5 hover:bg-white/5"
            }`}
            onClick={onClick}
        >
            {title}
        </Link>
    )
}

export default NavList;
