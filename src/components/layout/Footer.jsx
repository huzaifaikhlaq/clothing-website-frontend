export default function Footer() {
    return (
        <footer className="bg-zinc-50 dark:bg-zinc-950 w-full py-14 px-6 border-t border-zinc-200 dark:border-zinc-800 pb-28 md:pb-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
                {/* Brand */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h4 className="font-serif italic text-2xl mb-4 dark:text-zinc-100">VOIRE</h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[200px]">
                            Curating editorial excellence in modern fashion.
                        </p>
                    </div>
                </div>

                {/* Shop - Fixed Contrast Classes */}
                <div>
                    <h5 className="font-label text-[10px] uppercase tracking-[0.2em] mb-6 font-bold text-zinc-900 dark:text-zinc-100">Shop</h5>
                    <ul className="space-y-4 text-xs text-zinc-500 dark:text-zinc-400">
                        <li><a className="hover:text-zinc-900 dark:hover:text-white" href="#">New In</a></li>
                        <li><a className="hover:text-zinc-900 dark:hover:text-white" href="#">Women</a></li>
                        <li><a className="hover:text-zinc-900 dark:hover:text-white" href="#">Men</a></li>
                    </ul>
                </div>

                {/* Help */}
                <div>
                    <h5 className="font-label text-[10px] uppercase tracking-[0.2em] mb-6 font-bold text-zinc-900 dark:text-zinc-100">Help</h5>
                    <ul className="space-y-4 text-xs text-zinc-500 dark:text-zinc-400">
                        <li><a className="hover:text-zinc-900 dark:hover:text-white" href="#">Shipping</a></li>
                        <li><a className="hover:text-zinc-900 dark:hover:text-white" href="#">Returns</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h5 className="font-label text-[10px] uppercase tracking-[0.2em] mb-6 font-bold text-zinc-900 dark:text-zinc-100">Newsletter</h5>
                    <div className="flex border-b border-zinc-900 dark:border-zinc-100 py-2">
                        <input className="bg-transparent border-none focus:ring-0 text-xs w-full text-zinc-900 dark:text-zinc-100 outline-none" placeholder="Email address" type="email" />
                        <button className="text-[10px] uppercase tracking-widest font-bold dark:text-zinc-100">Join</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}