import { Link } from "react-router-dom";

const AdminNotFound = () => {
    return (
        <main className="flex-1 flex flex-col md:ml-64 relative min-h-screen bg-white">

            {/* Content Canvas */}
            <div className="flex-1 flex items-center justify-center p-8 mt-20">
                <div className="max-w-4xl w-full flex flex-col items-center text-center relative">

                    {/* Large Abstract 404 Background */}
                    <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none select-none">
                        <h2 className="font-headline  text-[10rem] md:text-[32rem] text-[#f3f3f3] leading-none opacity-60">
                            404
                        </h2>
                    </div>

                    {/* Editorial Content */}
                    <div className="space-y-12 relative z-10">
                        <div className="space-y-4">
                            <p className="font-label uppercase tracking-[0.3em] text-[12px] text-[#777777]">ERROR CODE 404</p>
                            <h3 className="font-headline text-5xl md:text-7xl italic text-[#1a1c1c] tracking-tight">
                                Lost in the archives.
                            </h3>
                            <p className="font-body text-[#474747] max-w-md mx-auto text-lg leading-relaxed">
                                The admin page you are looking for does not exist or has been moved to another wing of the digital library.
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">
                            <Link to="/admin"
                                className="bg-black text-[#e5e2e1] px-12 py-5 font-label uppercase tracking-[0.15em] text-[11px] font-extrabold transition-all hover:bg-[#1a1c1c] scale-95 active:duration-150"
                                href="/admin"
                            >
                                Return to Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Decorative Asset Grid */}
                    <div className="mt-24 w-full grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30">
                        <div className="aspect-[3/4] bg-[#eeeeee] overflow-hidden grayscale">
                            <img
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuWsi6fUlH02mSILR6eMKKZUnHQk4cr5GISCrniXKvkzncKru4xdkc4pHrlyWXpkjphy4i0L-v2nybBC5R-cwESUVV0D7C0iY09smxUWAi18IH-UA-R_uH9bVt4gy041uO2rrdKWqOpcGNzbr80TPAEoSkeYuMOy8At3LvhW9Vqe01eIqUuymJqPcMcU8dvKkQxf01kp06OBF9OeYrrDMj3jOw3gFLG3Q4BcopirBfAm-9IyWHxrc8L9A9FGgHHDiYkZVw3dvJeD8"
                                alt="Showroom view"
                            />
                        </div>
                        <div className="aspect-[3/4] bg-[#eeeeee] overflow-hidden grayscale translate-y-8 hidden md:block">
                            <img
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX9dcJ-lmKj3NuEnojUZnmw7YVLarlSWoxAhSJ7O_6MRSnmIPdzShjxfhFZEZI3wRbJiHjtHfZGE4GDE-zZudZEMV55HVW9NSlUkuiW2qf9uxmu0jNltz9zdrCjuXUC90EParDuWKs7syf347ILGr0j4DJTEj6BK0jL6mfL4dLJv52eYXWPClNLF4I6TN-jG-f2zmdRCffBul0gk-EOqwmfQTiYZPJtovG1gZcrcNKQoo1xNSWj7ZO1_M_s5Qg3L00I1ungr89-JU"
                                alt="Linen texture"
                            />
                        </div>
                        <div className="aspect-[3/4] bg-[#eeeeee] overflow-hidden grayscale hidden md:block">
                            <img
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKZNUXoJySmG3EUnN390ssTxYF3bmbUZbNgfmQZtPexZyNPsOrSnP0YknXZ0ZVeLbBZ4YHhHkpLkGr_szghzpu8baXMzI2ejFUg1nS3Pm8-pDgghSIF5SZefx4MKCgV9y-7Z7XOSJCFc8rYQdqhNOvgF_Boo13RzxmlxVD8TKx9D0BDtxXEzZzu1TfotC8K4XDI4Si9CgAtZfTNrsm_QKSYTdZuLH3DKNSaEYjor-3kxZZ0_fuN31SK1F1eYtdZkBf-5HKiQ-n5lQ"
                                alt="Tailored suit"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
};

export default AdminNotFound;