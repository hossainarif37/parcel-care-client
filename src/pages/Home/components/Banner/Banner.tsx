import { Link } from "react-router-dom";
import banner from "../../../../assets/images/banner.jpg"
import CircleShape from "../../../../components/CircleShape";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/types";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

const Banner = () => {
    const { user } = useSelector((state: IRootState) => state.userSlice);

    return (
        <div className={`flex flex-col md:-translate-y-24 gap-y-10 md:gap-y-0 md:flex-row justify-between`}>
            {/* Left Side */}
            <div className="w-full md:w-1/2 md:pl-28 px-5 md:px-0 md:pt-40 xl:pt-60 relative">
                <h1 className="text-3xl lg:text-6xl xl:text-7xl font-bold md:flex md:flex-col text-transparent bg-clip-text bg-gradient-to-r from-[#212121] to-primary">
                    The Best Ever <br className="hidden md:block"/> Courier Service <br className="hidden md:block"/> In The World
                </h1>
                <p className="md:pr-48 text-sm md:text-base xl:text-xl text-accent  my-5 xl:my-10">
                    Deliver fastest across 25000+ pin codes in world with real time shipment tracking feature. Get best international courier services at zero subscription fees.
                </p>


                {
                    user ? (
                        <Link to='/dashboard/user/book-parcel'>
                            <PrimaryButton className="rounded-full">
                                Book a parcel
                            </PrimaryButton>
                        </Link>
                    ) : (
                        <Link to='/register'>
                            <PrimaryButton className="rounded-full">
                                Become an Agent
                            </PrimaryButton>
                        </Link>
                    )
                }

                {/* Circle Shapes */}
                <div className="hidden md:block">
                    <CircleShape className="w-6 h-6 bottom-52 right-0 xl:right-14 xl:bottom-[300px]" />
                    <CircleShape className="w-4 h-4 bottom-36 right-20 xl:right-40 xl:bottom-56" />
                    <CircleShape className="w-10 h-10 bottom-8 right-28 xl:w-16 xl:h-16 xl:bottom-20 xl:right-52" />
                </div>
            </div>

            {/* Right Side */}
            <img
                className="lg:w-[700px] h-full xl:w-[900px] -z-10"
                src={banner} alt=""
            />

        </div>
    );
};

export default Banner;