import { Link } from 'react-router-dom'

const NotAllowed = () => {
    return (
        <div className="min-h-[81vh] flex flex-col items-center justify-center gap-10 px-4">
            <h2 className="flex items-center uppercase text-4xl sm:text-5xl lg:text-6xl text-center inter_semibold
                bg-linear-to-br from-fuchsia-500 to-indigo-500 bg-clip-text text-transparent"
            >
                404 not found
            </h2>

            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
                <section className="section--image">
                    <img src="/assets/scarecrow.png" alt="Scarecrow illustration"
                        className="w-full max-w-[470px]" loading="lazy"
                    />
                </section>

                <div className="flex flex-col items-center">
                    <h2 className="text-xl md:text-2xl inter_semibold capitalize text-gray-900 text-center">
                        I have bad news for you
                    </h2>

                    <div className="flex flex-col items-center">
                        <h4 className="mt-1.5 mb-2 text-base text-gray-700  inter_medium capitalize text-center">
                            You are not allowed to view this page!!
                        </h4>

                        <Link to='/admin/login' className=" inline-flex items-center justify-center rounded-md border-[#3C0A6D]! 
                            border px-4 pt-2 pb-[7px] text-[#3C0A6D] text-base inter_medium hover:bg-[#3C0A6D] 
                            hover:border-0 hover:text-white! focus:outline-none"
                        >
                            Back to Home Page
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotAllowed