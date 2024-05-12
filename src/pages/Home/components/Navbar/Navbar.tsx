import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="absolute w-full md:px-28 py-5">
            <Link to='/' className="text-4xl font-bold"><span className="text-primary">Parcel</span><span className="text-secondary">Care</span></Link>
        </div>
    );
};

export default Navbar;