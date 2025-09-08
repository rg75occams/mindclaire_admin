import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CustomTable from "../components/CustomTable";
import { RxCross2 } from "react-icons/rx";

const Blog = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const blogs = useMemo(() => [
        {
            title: "Unseen Battles: Understanding PTSD and the Path to Healing",
            category: "ADHD",
            description: "June marks National PTSD Awareness Month—a crucial reminder that healing takes time and compassion. PTSD affects millions, often silently, yet recovery is possible through awareness, therapy, and supportive care.",
            image: "/assets/understanding-ptsd-thumbnail.webp",
            date: "2025-09-01",
            scheduleDate: "2025-09-04",
        },
        {
            title: "Thriving Without Burning Out: 11 Habits for a More Aligned Life",
            category: "Autism",
            description: "In a world that glorifies hustle, it’s easy to believe rest is laziness. But thriving means balance. From mindful breaks to healthy boundaries, these 11 habits can help you live with more alignment and joy.",
            image: "/assets/thriving_blog.webp",
            date: "2025-09-02",
            scheduleDate: "2025-09-04",
        },
        {
            title: "Comprehensive Guide to Integrative Child Psychiatry",
            category: "Nutrition",
            description: "Are you on the lookout for a compassionate, holistic approach to child psychiatry? This guide explores integrative practices that bridge traditional care with nutrition, lifestyle, and emotional well-being for children.",
            image: "/assets/blog-thumb.webp",
            date: "2025-09-03",
            scheduleDate: "2025-09-04",
        },
        {
            title: "Comprehensive Guide to Integrative Child Psychiatry",
            category: "Nutrition",
            description: "Are you on the lookout for a compassionate, holistic approach to child psychiatry? This guide explores integrative practices that bridge traditional care with nutrition, lifestyle, and emotional well-being for children.",
            image: "/assets/blog-thumb.webp",
            date: "2025-09-03",
            scheduleDate: "2025-09-04",
        },
        {
            title: "Comprehensive Guide to Integrative Child Psychiatry",
            category: "Nutrition",
            description: "Are you on the lookout for a compassionate, holistic approach to child psychiatry? This guide explores integrative practices that bridge traditional care with nutrition, lifestyle, and emotional well-being for children.",
            image: "/assets/blog-thumb.webp",
            date: "2025-09-03",
            scheduleDate: "2025-09-04",
        },
        {
            title: "Comprehensive Guide to Integrative Child Psychiatry",
            category: "Nutrition",
            description: "Are you on the lookout for a compassionate, holistic approach to child psychiatry? This guide explores integrative practices that bridge traditional care with nutrition, lifestyle, and emotional well-being for children.",
            image: "/assets/blog-thumb.webp",
            date: "2025-09-03",
            scheduleDate: "2025-09-04",
        },
        {
            title: "Comprehensive Guide to Integrative Child Psychiatry",
            category: "Nutrition",
            description: "Are you on the lookout for a compassionate, holistic approach to child psychiatry? This guide explores integrative practices that bridge traditional care with nutrition, lifestyle, and emotional well-being for children.",
            image: "/assets/blog-thumb.webp",
            date: "2025-09-03",
            scheduleDate: "2025-09-04",
        },
    ], []);

    const columns = useMemo(() => [
        {
            accessorKey: "serial",
            header: "Sr No.",
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: "title",
            header: "Title",
        },
        {
            accessorKey: "category",
            header: "Category",
        },
        {
            accessorKey: "date",
            header: "Date",
            cell: (info) => (
                <span className="whitespace-nowrap">
                    {info.getValue()}
                </span>
            ),
        },
        {
            accessorKey: "scheduleDate",
            header: "Schedule Date",
            cell: (info) => (
                <span className="whitespace-nowrap">
                    {info.getValue()}
                </span>
            ),
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "image",
            header: "Image",
            cell: (info) => {
                const img = info.getValue();
                return img ? (
                    <img src={img} alt="Preview" onClick={() => setSelectedImage(img)}
                        className="w-24 h-[60px] object-contain rounded cursor-pointer"
                    />
                ) : (
                    <span className="text-gray-400 italic">No Image</span>
                );
            },
        },

    ], []);

    return (
        <>
            <div className="flex justify-end">
                <Link to="/blog/add-blog"
                    className="px-6 py-1.5 !bg-[#3C0A6D] w-max !text-white inter_medium rounded-md"
                >
                    Add Blog
                </Link>
            </div>

            <div className="shadow-md w-full bg-white p-4 mt-5 rounded-lg">
                <CustomTable columns={columns} data={blogs} title={"Blog List"} />
            </div>

            {selectedImage && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="p-4 relative" onClick={(e) => e.stopPropagation()}>
                        <div className='flex justify-end absolute top-2 right-2'>
                            <button onClick={() => setSelectedImage(null)} className="flex cursor-pointer justify-center
                                items-center w-7 h-7 rounded-full bg-black text-white text-xl"
                            >
                                <RxCross2 />
                            </button>
                        </div>

                        <img src={selectedImage} className="rounded-2xl w-96 object-contain"
                            alt="Preview"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Blog