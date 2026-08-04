import { useState, useEffect } from "react";
import { TbShoppingBag, TbUser } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const navigate = useNavigate();

    const cartCount = useSelector((state) =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0)
    );

    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", controlNavbar);

        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    // Get user from session storage
    const user = JSON.parse(sessionStorage.getItem("user"));

    const profilePath =
        user?.role === "admin" ? "/admin/overview" : "/profile";



    return (
        <nav
            className={`sticky top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 h-14 md:h-16 flex items-center transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            <div className="max-w-[1440px] mx-auto flex justify-between items-center px-4 md:px-8 w-full">
                <div className="flex-shrink-0">
                    <Link
                        to="/"
                        className="text-zinc-100 font-serif italic text-lg md:text-2xl tracking-[0.15em]"
                    >
                        VOIRE
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link to={profilePath}
                        className="text-zinc-900 dark:text-zinc-100 hover:opacity-60"
                    >
                        <TbUser className="text-xl md:text-2xl" />
                    </Link>

                    <Link
                        to="/cart"
                        className="relative text-zinc-900 dark:text-zinc-100 hover:opacity-60"
                    >
                        <TbShoppingBag className="text-xl md:text-2xl" />
                        <span className="absolute -top-1 -right-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                            {cartCount}
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}