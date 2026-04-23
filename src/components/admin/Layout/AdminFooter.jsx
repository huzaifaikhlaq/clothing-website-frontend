import React from 'react'

const AdminFooter = () => {
    return (
        <footer className="bg-white py-12 px-8 border-t border-[#eeeeee] mt-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
                <div className="col-span-1 md:col-span-2">
                    <p className="font-headline italic text-2xl mb-4 text-[#1a1c1c]">VOIRE</p>
                    <p className="text-xs font-label text-[#777777] max-w-xs leading-relaxed uppercase tracking-tighter">
                        The editorial engine for curated luxury. Real-time data visualization and archive management for the modern maison.
                    </p>
                </div>
                <div>
                    <h4 className="text-[10px] font-label uppercase tracking-widest font-bold mb-6 text-[#1a1c1c]">Internal Tools</h4>
                    <ul className="space-y-4 text-xs font-label text-[#777777]">
                        <li className="hover:text-black cursor-pointer transition-colors">Asset Library</li>
                        <li className="hover:text-black cursor-pointer transition-colors">Press Portal</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-[10px] font-label uppercase tracking-widest font-bold mb-6 text-[#1a1c1c]">Support</h4>
                    <ul className="space-y-4 text-xs font-label text-[#777777]">
                        <li className="hover:text-black cursor-pointer transition-colors">Documentation</li>
                        <li className="hover:text-black cursor-pointer transition-colors">System Status</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default AdminFooter