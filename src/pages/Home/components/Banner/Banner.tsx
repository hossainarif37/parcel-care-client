import { Link } from "react-router-dom";
import banner from "../../../../assets/images/banner.jpg"
import CircleShape from "../../../../components/CircleShape";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";

const Banner = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    
    return (
        <div className={`flex flex-col md:-translate-y-24 gap-y-10 md:gap-y-0 md:flex-row justify-between`}>
            {/* Left Side */}
            <div className="w-full md:w-1/2 md:pl-28 px-5 md:px-0 md:pt-40 xl:pt-60 relative">
                <h1 className="text-3xl lg:text-5xl xl:text-7xl font-bold md:flex md:flex-col text-transparent bg-clip-text bg-gradient-to-r from-[#212121] to-primary gap-y-0 md:gap-y-4 bg-">
                    The Best Ever Courier Service In The World
                </h1>
                <p className="md:pr-48 text-sm md:text-base xl:text-xl text-accent mt-5 md:mt-10 leading-8 mb-5 md:mb-14">
                    Deliver fastest across 25000+ pin codes in world with real time shipment tracking feature. Get best international courier services at zero subscription fees.
                </p>


                {
                    user ? (
                        <Link className="py-3 xl:py-4 px-12 btn-primary" to='/dashboard/user/book-parcel'>
                            Book a parcel
                        </Link>
                    ) : (
                        <Link className="py-4 px-12 btn-primary" to='/register'>
                            Become an Agent
                        </Link>
                    )
                }

                {/* Circle Shapes */}
                <div className="hidden md:block">
                    <CircleShape width="w-8" height="h-8" bottom="bottom-60" right="right-10" />
                    <CircleShape width="w-5" height="h-5" bottom="bottom-40" right="right-32" />
                    <CircleShape width="w-16" height="h-16" bottom="bottom-10" right="right-40" />
                </div>
            </div>

            {/* Right Side */}
            <img
                className="lg:w-[600px] h-full xl:w-[900px] -z-10"
                src={banner} alt=""
            />

        </div>
    );
};

export default Banner;