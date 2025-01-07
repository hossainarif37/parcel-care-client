import { Phone } from 'lucide-react';
import { FC } from 'react';
import Logo from '../Navbar/Logo';
import { Link } from 'react-router-dom';

const Footer: FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="gradient-to-t pt-20" >
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12">
                    <div>
                        <Logo />
                        <p className="text-gray-700">
                            Your trusted partner in worldwide parcel delivery services.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-black-100 text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li><Link to="#" className="hover:text-primary">About Us</Link></li>
                            <li><Link to="#" className="hover:text-primary">Careers</Link></li>
                            <li><Link to="#" className="hover:text-primary">Press</Link></li>
                            <li><Link to="#" className="hover:text-primary">Blog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-black-100 text-lg font-semibold mb-4">Services</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li><Link to="#" className="hover:text-primary">Domestic Shipping</Link></li>
                            <li><Link to="#" className="hover:text-primary">International Delivery</Link></li>
                            <li><Link to="#" className="hover:text-primary">Express Service</Link></li>
                            <li><Link to="#" className="hover:text-primary">Bulk Orders</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-black-100 text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-center">
                                <Phone size={20} className="mr-2" />
                                +1 (555) 123-4567
                            </li>
                            <li>1234 Delivery Street</li>
                            <li>New York, NY 10001</li>
                            <li>contact@parcelcare.com</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t mt-12 py-8 text-center text-gray-700">
                    <p>&copy; {currentYear} ParcelCare. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;