const CardData = ({ title, total, children }) => {
    return (
        <div className="rounded-xl border-[#A3A3A3] shadow-sm bg-white py-6 px-7">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#f0f0ff]">
                {children}
            </div>

            <div className="mt-4 flex items-end justify-between">
                <div>
                    <h4 className="text-title-md font-bold text-black">{total}</h4>
                    <span className="text-sm font-medium">{title}</span>
                </div>
            </div>
        </div>
    );
};

export default CardData