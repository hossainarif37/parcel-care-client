import { loadStripe } from "@stripe/stripe-js"
const stripePromise = loadStripe(import.meta.env.STRIPE_PUBLISHABLE_KEY);
console.log(stripePromise);

const Payment = () => {
    return (
        <div>
            Payment
        </div>
    );
};

export default Payment;