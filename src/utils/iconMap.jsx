import { RxDashboard } from "react-icons/rx";
import { FaBlog, FaRegSquare } from "react-icons/fa";
import { FiSquare } from "react-icons/fi";

const ICONS = { RxDashboard, FaBlog }

export const getIcon = (key, { className, size = 22, color } = {}) => {
    const Comp = ICONS[key] || FiSquare || FaRegSquare;
    return <Comp className={className} size={size} color={color} />
};