import { Link } from "react-router-dom";
import banner from "../../../../assets/images/banner.jpg"
import Button from "../../../../components/common/Buttons/Button";

const Banner = () => {
    return (
        <div
            className="h-screen flex justify-between"
        >
            {/* Left Side */}
            <div className="w-1/2 mt-20 pl-28 pt-40">
                <h1 className="text-6xl font-semibold text-black-50 flex flex-col gap-y-4">
                    <span>The Best Ever Courier</span> <span>Service In The World</span>
                </h1>
                <p className="pr-48 text-xl text-accent mt-10 leading-8 mb-14">
                    Deliver fastest across 25000+ pin codes in world with real time shipment tracking feature. Get best international courier services. we are the best courier service provider in world.Get best international.courier services at zero subscription fees.
                </p>
                <Button>
                    <Link to='#'>Contact Us</Link>
                </Button>
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