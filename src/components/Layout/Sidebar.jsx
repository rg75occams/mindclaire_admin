import { Fragment, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RiCloseFill } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { FaBlog } from 'react-icons/fa';
import { closeMenus, selectIsSidebarOpen } from '../../features/sidebar/sidebarSlice';
import { SA_MENU_LIST } from '../../utils/staticData';

const ICONS = { RxDashboard, FaBlog };
const getIcon = (key) => ICONS[key] || RxDashboard;

const Sidebar = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectIsSidebarOpen);
    const sidebarRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const onDocClick = (e) => {
            if (!isOpen) return;
            if (!sidebarRef.current) return;
            if (e.target.closest('[data-sidebar-trigger]')) return;
            if (sidebarRef.current.contains(e.target)) return;
            dispatch(closeMenus());
        };

        document.addEventListener('click', onDocClick);
        return () => document.removeEventListener('click', onDocClick);
    }, [isOpen, dispatch]);

    useEffect(() => {
        const onKey = (e) => { if (isOpen && e.key === 'Escape') dispatch(closeMenus()); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen, dispatch]);

    return (
        <aside ref={sidebarRef} className={`font-inter fixed md:static left-0 top-0 z-9999 flex h-screen w-72.5 flex-col
            overflow-y-hidden bg-[#d0a4ff] duration-300 ease-linear ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0`}
        >
            <div className="flex items-center md:justify-center justify-between gap-2 px-4 md:py-[12.5px] py-[15.5px] 
                border-b border-[#A3A3A3] shadow-sm"
            >
                <Link to="/dashboard" className="flex items-center">
                    <img loading="lazy" src="/assets/logo.svg" alt="Logo" className="md:h-[50px] h-11" />
                </Link>

                <button ref={triggerRef} onClick={() => dispatch(closeMenus())} aria-controls="sidebar"
                    aria-expanded={isOpen} className="md:hidden !rounded-md p-2 bg-gray-100"
                >
                    <RiCloseFill className="text-2xl text-black" />
                </button>
            </div>

            <div className="flex flex-col justify-between h-full shadow-sm">
                <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                    <nav className="py-4 px-4">
                        <ul className="flex flex-col gap-2.5">
                            {SA_MENU_LIST.map((item, index) => {
                                const Icon = getIcon(item.icon);
                                return (
                                    <NavLink key={index} to={item.path} className={({ isActive }) =>
                                        `group relative flex items-center gap-2.5 rounded-lg py-2.5 duration-300 ease-in-out
                                        px-4 ${isActive ? '!bg-[#3C0A6D] !text-white inter_semibold' :
                                            '!text-[#3C0A6D] inter_medium hover:!bg-[#3C0A6D] hover:!text-white'}`
                                    }
                                        onClick={() => dispatch(closeMenus())}
                                    >
                                        {({ isActive }) => (
                                            <Fragment>
                                                <Icon size={22} className={isActive ? 'text-white' :
                                                    'group-hover:!text-white text-[#3C0A6D]'
                                                } />
                                                <span>{item.title}</span>
                                            </Fragment>
                                        )}
                                    </NavLink>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar