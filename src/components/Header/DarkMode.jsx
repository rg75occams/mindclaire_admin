import { BsFillBrightnessLowFill } from "react-icons/bs";
import { MdNightlightRound } from "react-icons/md";
import useColorMode from "../../hooks/useColorMode";

const DarkMode = () => {
    const [colorMode, setColorMode] = useColorMode();

    return (
        <label className={`relative m-0 block h-7.5 w-14 rounded-full ${colorMode === 'dark' ?
            'bg-primary' : 'bg-stroke'}`}
        >
            <input type="checkbox" className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer 
                opacity-0" onChange={() => {
                    if (typeof setColorMode === 'function') {
                        setColorMode(colorMode === 'light' ? 'dark' : 'light');
                    }
                }}
            />

            <span className={`absolute top-1/2 left-[4px] flex h-6 w-6 -translate-y-1/2 translate-x-0 
                items-center justify-center rounded-full bg-white shadow-switcher duration-75 
                ease-linear ${colorMode === 'dark' && '!right-[3px] !translate-x-full'}`}
            >
                <span className="dark:hidden">
                    <BsFillBrightnessLowFill size={22} className='text-[#969AA1]' />
                </span>

                <span className="hidden dark:inline-block">
                    <MdNightlightRound size={20} className='text-[#969AA1]'
                        style={{ transform: 'rotate(-45deg)' }}
                    />
                </span>
            </span>
        </label>
    );
};

export default DarkMode