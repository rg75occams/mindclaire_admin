import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { LOCAL_STORAGE } from '../../constant';

const Dropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [user] = useLocalStorage(LOCAL_STORAGE.USER, null);
    const adminName = user?.name;

    const userImage = adminName ? `https://ui-avatars.com/api/?name=${encodeURIComponent
        (adminName)}&color=FFFFFF&background=3C50E0` : '/assets/profile.png';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <Link to="#" className="flex items-center gap-4"
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                <span className="hidden text-right lg:block">
                    <span className="block text-sm font-medium text-black dark:text-white capitalize">
                        {user?.name}
                    </span>

                    <span className="block text-xs capitalize">{user?.type}</span>
                </span>

                <span className="h-12 w-12 rounded-full">
                    <img loading="lazy" src={userImage}
                        alt={userImage} className="h-12 w-12 rounded-full"
                    />
                </span>
            </Link>
        </div>
    );
};

export default Dropdown