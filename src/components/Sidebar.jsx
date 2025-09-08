import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { TbArrowNarrowLeft } from 'react-icons/tb';
import { LOCAL_STORAGE } from '../constant';
import useLocalStorage from '../hooks/useLocalStorage';
import { RxDashboard } from 'react-icons/rx';
import { FaBlog } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const { pathname } = location;
    const trigger = useRef(null);
    const sidebar = useRef(null);
    const navigate = useNavigate();
    const [, setIsAuthenticated] = useLocalStorage(LOCAL_STORAGE.IS_AUTHENTICATED, false);

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    const [sidebarExpanded, _] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
    );

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !isOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setIsOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!isOpen || keyCode !== 27) return;
            setIsOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector('body')?.classList.add('sidebar-expanded');
        } else {
            document.querySelector('body')?.classList.remove('sidebar-expanded');
        }
    }, [sidebarExpanded]);

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem(LOCAL_STORAGE.USER);
        navigate('/');
    };

    return (
        <aside ref={sidebar} className={`font-inter absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col 
            lg:static overflow-y-hidden bg-[#d0a4ff] duration-300 ease-linear lg:translate-x-0 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <div className="flex items-center justify-between gap-2 px-6 py-[7.5px] border-b border-[#A3A3A3] shadow-sm">
                <NavLink to="#" className="flex flex-row items-center justify-center">
                    <img loading="lazy" src={'/assets/logo_white.svg'}
                        alt="Logo" className="h-[60px] invert-0"
                    />
                </NavLink>

                <button ref={trigger} onClick={() => setIsOpen(!isOpen)} aria-controls="sidebar"
                    aria-expanded={isOpen} className="block lg:hidden cursor-pointer"
                >
                    <TbArrowNarrowLeft size={35} />
                </button>
            </div>

            <div className="flex flex-col justify-between h-full shadow-sm">
                <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                    <nav className="py-4 px-4 lg:px-6">
                        <ul className="flex flex-col gap-1.5">
                            <NavLink to="/dashboard" className={`group relative flex items-center gap-2.5 rounded-lg py-2 px-4
                                duration-300 ease-in-out hover:!bg-[#3C0A6D] hover:!text-white ${pathname === '/dashboard'
                                    ? '!bg-[#3C0A6D] !text-white inter_semibold' : '!text-[#3C0A6D] inter_medium'}`}
                            >
                                <RxDashboard size={22} className={`group-hover:text-white
                                    ${pathname === '/dashboard' ? 'text-white' : 'text-[#3C0A6D]'}`}
                                />
                                Dashboard
                            </NavLink>

                            <NavLink to="/blog" className={`group relative flex items-center gap-2.5 rounded-lg py-2 px-4
                                duration-300 ease-in-out hover:!bg-[#3C0A6D] hover:text-white ${pathname === '/blog' ?
                                    '!bg-[#3C0A6D] !text-white inter_semibold' : '!text-[#3C0A6D] inter_medium'}`}
                            >
                                <FaBlog size={22} className={`group-hover:text-white 
                                    ${pathname === '/blog' ? 'text-white' : 'text-[#3C0A6D]'}`}
                                />
                                Blog
                            </NavLink>
                        </ul>
                    </nav>
                </div>

                <div className="py-4 px-4 lg:px-6 w-full">
                    <NavLink to="/" className={`group relative flex items-center gap-2.5 rounded-lg ease-in-out px-4 
                        inter_medium !text-[#3C0A6D] duration-300 py-2 hover:!bg-[#3C0A6D] hover:!text-white`}
                        onClick={handleLogout}
                    >
                        <FiLogOut size={22} className='text-[#3C0A6D] group-hover:text-white' />
                        Log Out
                    </NavLink>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar