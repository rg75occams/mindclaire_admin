import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import { AiOutlineMenu } from 'react-icons/ai';

const Header = ({ isOpen, setIsOpen }) => {
    return (
        <header className="sticky top-0 z-999 flex w-full bg-[#9D4EDD] font-inter">
            <div className="flex flex-grow items-center justify-between px-3.5 py-3.5 md:px-5 2xl:px-9 shadow-sm">
                <div className="flex items-center gap-2.5 sm:gap-4 lg:hidden">
                    <button aria-controls="sidebar" className="z-99999 block rounded-md border border-[#A3A3A3]
                        p-1.5 lg:hidden cursor-pointer" onClick={(e) => {
                            e.stopPropagation(); setIsOpen(!isOpen);
                        }}
                    >
                        <AiOutlineMenu className='text-2xl text-white' />
                    </button>

                    <Link className="block flex-shrink-0 lg:hidden" to="#">
                        <img loading="lazy" src='/assets/logo_white.svg' alt="Logo" className='h-[48px]' />
                    </Link>
                </div>

                <div className="hidden sm:block"></div>
                <div className="flex items-center gap-3 2xsm:gap-7">
                    <Dropdown />
                </div>
            </div>
        </header>
    );
};

export default Header