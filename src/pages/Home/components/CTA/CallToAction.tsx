import { FC } from 'react';

const CallToAction: FC = () => {
    return (
        <div className="py-20 gradient-to-b">
            <div className="container mx-auto px-6">
                <div className="bg-primary rounded-3xl p-12 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20"></div>
                    <div className="relative max-w-2xl">
                        <h2 className="text-4xl font-bold text-white/90 mb-6">Ready to revolutionize your shipping experience?</h2>
                        <p className="text-xl text-blue-100 mb-8">Join thousands of businesses that trust ParcelCare for their delivery needs.</p>
                        <div className="flex space-x-4">
                            <button className="bg-white text-blue-900 px-8 py-4 rounded-full hover:bg-gray-100 transition">
                                Get Started Now
                            </button>
                            <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white/10 transition">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ div>
    );
};

export default CallToAction;