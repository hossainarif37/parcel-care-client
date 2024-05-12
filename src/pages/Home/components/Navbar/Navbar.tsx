import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="w-full absolute md:px-28 py-5 flex md:justify-between z-10 bg-transparent">
            {/* Logo */}
            <div>
                <Link to='/' className="text-4xl font-bold"><span className="text-primary">Parcel</span><span className="text-secondary">Care</span></Link>
            </div>

            {/* NavLinks */}
            <ul className="md:text-white hidden  font-semibold md:flex justify-center items-center gap-x-10">
                <li>Home</li>
                <li>Services</li>
                <li>Contact Us</li>
                <li>About Us</li>
                <li>Login</li>
            </ul>
        </div>
    );
};

export default Navbar;