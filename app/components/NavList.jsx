import Link from "next/link";

const NavList = ({ href, title, onClick, isOverlay }) => {
    return (
        <Link
            href={href}
            className={`block py-2 pl-3 pr-4 rounded md:p-0 text-[#ADB7BE] hover:text-white ${
                isOverlay ? "text-[22px] sm:[24px]" : "text-[18px] sm:text-[19px]"
              }`}
            onClick={onClick}
        >
            {title}
        </Link>
    )
}

export default NavList;