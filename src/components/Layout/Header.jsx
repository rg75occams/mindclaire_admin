import { AiOutlineMenu } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { openMenus, toggleMenus } from '../../features/sidebar/sidebarSlice';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import { logout, selectUser } from "../../features/auth/authSlice";
import useResetApi from '../../hooks/useResetApi';
import { CONSTANTS } from '../../utils/staticData';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(selectUser);
    const { handleResetApi } = useResetApi();
    const userImage = user?.name ?
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name)}&color=FFFFFF&background=3C50E0` :
        '/assets/profile.png';

    const [openUserMenu, setOpenUserMenu] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem(CONSTANTS.companyNameLocalStorage);
        sessionStorage?.clear();
        handleResetApi();
        dispatch(openMenus());
        dispatch(logout());
        navigate("/admin/login", { replace: true });
    };

    const toggleDrawer = (e) => {
        e.stopPropagation();
        dispatch(toggleMenus());
    };

    useEffect(() => {
        const onDocClick = (e) => {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(e.target)) setOpenUserMenu(false);
        };

        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    return (
        <header className="sticky top-0 z-999 flex w-full bg-[#9D4EDD] font-inter border-b border-[#A3A3A3] shadow-sm">
            <div className="flex items-center w-full md:justify-end! justify-between px-4 md:px-6 py-[13px]">
                <button onClick={toggleDrawer} aria-label="menu" title="Toggle Menu"
                    className="items-center justify-center rounded-md! p-2 bg-gray-100 cursor-pointer block md:hidden"
                >
                    <AiOutlineMenu className='text-2xl text-black' />
                </button>

                <div className="flex items-center gap-2">
                    <div className="relative" ref={menuRef}>
                        <button className="flex items-center cusror-pointer" title="Open Profile"
                            onClick={() => setOpenUserMenu((v) => !v)}
                        >
                            <img alt={user?.name} src={userImage} className="h-12 w-12 rounded-full object-cover"
                                style={{ cursor: 'pointer' }}
                            />
                        </button>

                        {openUserMenu && (
                            <div role="menu" className="absolute right-0 mt-3.5 w-40 rounded-lg shadow-sm bg-white
                                flex items-center flex-col p-3.5 gap-3.5"
                            >
                                <button className="flex w-full items-center gap-3 text-base" onClick={() => {
                                    setOpenUserMenu(false);
                                    navigate(`/users/view/${user?.id}`);
                                }}>
                                    <FaUser size={22} /> My Profile
                                </button>

                                <button className="flex w-full items-center gap-3 text-base" onClick={handleLogout}>
                                    <FiLogOut size={22} /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header