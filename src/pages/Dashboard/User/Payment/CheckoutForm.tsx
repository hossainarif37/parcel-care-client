import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import './checkoutForm.css'
import { useSaveTransactionMutation } from "@/redux/api/endpoints/transactionApi";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

type CheckoutFormType = {
    clientSecret: string;
    senderName: string;
    senderEmail: string;
    senderId: string;
    parcelId: string;
    price: number
}

const CheckoutForm = ({ clientSecret, senderName, senderEmail, senderId, parcelId, price }: CheckoutFormType) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [saveTransaction, { data, isLoading, error: saveError }] = useSaveTransactionMutation();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        setProcessing(true);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });


        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }




        try {
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: senderName,
                        email: senderEmail,
                    },
                },
            });

            if (result.error) {
                console.log(result.error);
            } else {
                saveTransaction({
                    parcel: parcelId,
                    sender: senderId,
                    amount: price,
                    transactionId: result.paymentIntent.id,
                    paymentMethod: result.paymentIntent.payment_method_types[0]
                })

                navigate(`/dashboard/user/my-parcels/${parcelId}/payment-success`);
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setProcessing(false);
        }
    }

    console.log(data);
    console.log(saveError);
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="py-3 w-28 flex justify-center btn-primary disabled:btn-disabled" type="submit" disabled={!stripe || processing}>
                {
                    processing ? <Icon className="animate-spin text-2xl" icon="mingcute:loading-fill" /> : 'Pay'
                }
            </button>
        </form>
    );
};

export default CheckoutForm;