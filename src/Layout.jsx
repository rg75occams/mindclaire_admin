import { useState } from 'react'
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const Layout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-[#f0f0ff]">
            <div className="flex h-screen overflow-hidden">
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header isOpen={isOpen} setIsOpen={setIsOpen} />

                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 inter">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Layout