import { Fragment, useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RiCloseFill } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { FaBlog } from 'react-icons/fa';
import { FiChevronRight } from "react-icons/fi";
import { closeMenus, selectIsSidebarOpen } from '../../features/sidebar/sidebarSlice';
import { SA_MENU_LIST } from '../../utils/staticData';

const ICONS = { RxDashboard, FaBlog };
const getIcon = (key) => ICONS[key] || RxDashboard;

const Sidebar = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectIsSidebarOpen);
    const sidebarRef = useRef(null);
    const triggerRef = useRef(null);
    const [openDropdown, setOpenDropdown] = useState(null);

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

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    return (
        <aside ref={sidebarRef} className={`fixed md:static left-0 top-0 z-9999 flex h-screen w-72.5 flex-col bg-[#d0a4ff]
            overflow-y-hidden duration-300 ease-linear ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >
            <div className="flex items-center md:justify-center justify-between gap-2 px-4 md:py-[12.5px] py-[15.5px] 
                border-b border-[#A3A3A3] shadow-sm"
            >
                <Link to="/admin/dashboard" className="flex items-center">
                    <img loading="lazy" src="/assets/logo.svg" alt="Logo" className="md:h-[50px] h-11" />
                </Link>

                <button ref={triggerRef} onClick={() => dispatch(closeMenus())} aria-controls="sidebar"
                    aria-expanded={isOpen} className="md:hidden rounded-md! p-2 bg-gray-100"
                >
                    <RiCloseFill className="text-2xl text-black" />
                </button>
            </div>

            <div className="flex flex-col justify-between h-full shadow-sm">
                <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                    <nav className="py-4 px-4">
                        <ul className="flex flex-col gap-2.5">
                            {SA_MENU_LIST.map((item, index) => {
                                const Icon = getIcon(item?.icon);

                                if (item?.children && item?.children.length > 0) {
                                    const isOpen = openDropdown === item.id;

                                    return (
                                        <li key={item.id} className={`flex flex-col rounded-lg  ${isOpen ? `linear-gradient
                                            inter_semibold text-white!` : `text-[#3C0A6D]! hover:text-white! inter_medium
                                            linear-gradient-hover`}`}
                                        >
                                            <button onClick={() => toggleDropdown(item?.id)} className={`group flex px-4 text-left
                                                cursor-pointer justify-between items-center py-2.5 duration-300 ease-in-out w-full`}
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <Icon size={22} className={`transition-colors duration-300 
                                                        ${isOpen ? 'text-white' : 'text-[#3C0A6D] group-hover:text-white'}`}
                                                    />
                                                    <span>{item.title}</span>
                                                </div>

                                                <FiChevronRight size={18} className={`transition-transform duration-300 
                                                    ${isOpen ? 'rotate-90' : ''}`}
                                                />
                                            </button>

                                            <div className={`overflow-hidden transition-all duration-300 ease-in-out 
                                                ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                                            >
                                                <ul className={`flex flex-col gap-2.5 linear-gradient py-2 transition-all
                                                    duration-300 ease-in-out ${isOpen ? 'rounded-b-lg' : ''}`}
                                                >
                                                    {item?.children?.map((sub, index) => (
                                                        <NavLink key={index} to={sub.path} className={({ isActive }) =>
                                                            `group relative flex items-center gap-2.5 rounded-l-lg py-2.5 px-4 ml-12
                                                            duration-300 ease-in-out text-white! ${isActive ? `linear-gradient 
                                                            inter_semibold` : `inter_medium linear-gradient-hover`}`
                                                        }
                                                            onClick={() => { dispatch(closeMenus()); setOpenDropdown(null) }}
                                                        >
                                                            <span>{sub.title}</span>
                                                        </NavLink>
                                                    ))}
                                                </ul>
                                            </div>
                                        </li>
                                    )
                                }

                                return (
                                    <NavLink key={index} to={item.path} className={({ isActive }) =>
                                        `group relative flex items-center gap-2.5 rounded-lg py-2.5 duration-300 ease-in-out
                                        px-4 ${isActive ? 'linear-gradient text-white! inter_semibold' :
                                            'text-[#3C0A6D]! inter_medium linear-gradient-hover hover:text-white!'}`
                                    }
                                        onClick={() => { dispatch(closeMenus()); setOpenDropdown(null) }}
                                    >
                                        {({ isActive }) => (
                                            <Fragment>
                                                <Icon size={22} className={isActive ? 'text-white' :
                                                    'group-hover:text-white! text-[#3C0A6D]'
                                                } />
                                                <span>{item.title}</span>
                                            </Fragment>
                                        )}
                                    </NavLink>
                                )
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
        </aside>
    )
};

export default Sidebar