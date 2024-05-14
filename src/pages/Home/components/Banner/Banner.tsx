import { Link } from "react-router-dom";
import banner from "../../../../assets/images/banner.jpg"
import CircleShape from "../../../../components/CircleShape";
import Button from "../../../../components/Buttons/Button";

const Banner = () => {
    return (
        <div
            className="h-screen flex flex-col md:flex-row justify-between"
        >
            {/* Left Side */}
            <div className="md:w-1/2 mt-20 md:pl-28 md:pt-40 relative">
                <h1 className="md:text-6xl font-semibold text-black-50 flex flex-col gap-y-4">
                    <span>The Best Ever Courier</span> <span>Service In The World</span>
                </h1>
                <p className="pr-48 text-xl text-accent mt-10 leading-8 mb-14">
                    Deliver fastest across 25000+ pin codes in world with real time shipment tracking feature. Get best international courier services. we are the best courier service provider in world.Get best international.courier services at zero subscription fees.
                </p>
                <Button>
                    <Link to='#'>Book a parcel</Link>
                </Button>
                <CircleShape width="w-8" height="h-8" bottom="bottom-60" right="right-10" />
                <CircleShape width="w-5" height="h-5" bottom="bottom-40" right="right-32" />
                <CircleShape width="w-16" height="h-16" bottom="bottom-10" right="right-40" />

            </div>

            {/* Right Side */}
            <div>
                <img
                    className="md:w-[900px]"
                    src={banner} alt="" />
            </div>

        </div>
    );
};

export default Banner;