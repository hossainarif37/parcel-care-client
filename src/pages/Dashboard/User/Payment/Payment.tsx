import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm";
import paypal from "../../../../assets/icons/paypal.png"
import credit_card from "../../../../assets/icons/credit_card.png"
import { useState } from "react";
import { useLocation } from "react-router-dom";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const { state: { senderName, senderEmail, price, parcelId, parcelType } } = useLocation();
    console.log(parcelType);
    return (
        <div className="p-5 lg:max-w-[500px]">
            <h1 className="text-2xl font-bold text-black-50">Payment</h1>
            <div className="mt-7 ">
                <div className="space-y-3">
                    <input className="input text-gray-700 bg-white" type="text" value={parcelId} disabled />
                    <input className="input text-gray-700 bg-white" type="text" value={senderName} disabled />
                    <input className="input text-gray-700 bg-white" type="email" value={senderEmail} disabled />
                    <input className="input text-gray-700 bg-white" type="text" value={parcelType} disabled />
                </div>

                {/* Card Selector Start */}
                <div className="py-5">
                    <p className="mb-3 text-gray-500">Pay with</p>
                    <div className="flex gap-10">
                        {/* Credit Card */}
                        <div className="flex items-center gap-2 ">
                            <input
                                className="cursor-pointer"
                                type="radio" name="payment-option"
                                id="credit-card" value='Credit Card'
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label className="flex gap-2 cursor-pointer" htmlFor="credit-card"><img className="w-6" src={credit_card} alt="" /> <span>Credit Card</span></label>
                        </div>
                        {/* Paypal */}
                        <div className="flex items-center gap-2 ">
                            <input
                                className="cursor-pointer"
                                type="radio" name="payment-option"
                                id="paypal" value='Paypal'
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label className="flex gap-2 cursor-pointer" htmlFor="paypal"><img className="w-6 h-6" src={paypal} alt="" /> <span>Paypal</span></label>
                        </div>
                    </div>
                </div>
                {
                    paymentMethod === 'Credit Card' &&
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                }
                {
                    paymentMethod === 'Paypal' && <p className="error font-semibold mt-3"><span className="font-bold">Paypal</span> is not available at this moment!!!<br /> Please select <span className="font-bold">Credit Card</span>.</p>
                }

                {/* Card Input End */}
                <div className={`flex flex-col ${paymentMethod === 'Credit Card' ? 'block' : 'hidden'}  lg:flex-row space-y-3 justify-between items-center mt-5`}>
                    <p className="text-gray-800 ">Your Service Charge will be <span className="font-bold">${price}</span></p>
                </div>
            </div>
        </div>
    );
};

export default Payment;