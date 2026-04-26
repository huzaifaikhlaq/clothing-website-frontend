import { useState, useEffect } from 'react';
import { TbShoppingBag, TbSearch, TbUser, TbX } from "react-icons/tb";
import { Link } from 'react-router-dom';

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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
        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);

    return (
        <nav className={`sticky top-0  w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 h-14 md:h-16  flex items-center transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            
            <div className="max-w-[1440px] mx-auto flex justify-between items-center px-4 md:px-8 w-full">

                {/* LOGO */}
                <div className="flex-shrink-0">
                    <Link to="/home" className="font-serif italic text-lg md:text-2xl tracking-[0.15em] cursor-pointer text-zinc-900 dark:text-zinc-100">
                        VOIRE
                    </Link>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center justify-end flex-1 gap-3 md:gap-6">
                    {/* SEARCH INPUT */}
                    <div className={`flex items-center transition-all duration-500 ease-in-out overflow-hidden
                        ${isSearchOpen ? 'max-w-[100px] md:max-w-[130px] lg:max-w-[150px] opacity-100' : 'max-w-0 opacity-0'}`}>
                        <div className="flex items-center w-full border-b border-zinc-900 dark:border-zinc-100 py-1">
                            <input type="text" placeholder="Search..." className="bg-transparent border-none focus:ring-0 text-sm w-full font-light outline-none text-zinc-900 dark:text-zinc-100" />
                            <button onClick={() => setIsSearchOpen(false)} className="hover:text-red-500">
                                <TbX className="text-lg" />
                            </button>
                        </div>
                    </div>

                    {/* ICONS */}
                    <div className="flex items-center gap-4">
                        {!isSearchOpen && (
                            <button onClick={() => setIsSearchOpen(true)} className="text-zinc-900 dark:text-zinc-100 hover:opacity-60 transition-opacity">
                                <TbSearch className="text-xl md:text-2xl" />
                            </button>
                        )}
                        <Link to="/profile" className="text-zinc-900 dark:text-zinc-100 hover:opacity-60">
                            <TbUser className="text-xl md:text-2xl" />
                        </Link>
                        <button className="relative text-zinc-900 dark:text-zinc-100 hover:opacity-60">
                            <TbShoppingBag className="text-xl md:text-2xl" />
                            <span className="absolute -top-1 -right-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                                0
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}