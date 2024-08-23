import success from "../../../../assets/icons/Success Tick.webp"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
const PaymentSuccess = () => {
    const { width, height } = useWindowSize();
    return (
        <div className="min-h-screen px-2 md:px-0">
            <Confetti
                width={width}
                height={height}
            />
            <div className="flex-1 flex items-center flex-col justify-center py-20 gap-y-3 text-center">
                <img src={success} alt="" className="w-24 h-24" />
                <h2 className="font-bold text-[#516E6E] text-2xl md:text-4xl">Payment Successful!</h2>
                <h1 className="text-xl md:text-3xl font-bold md:font-normal  text-center text-green-500">We have received your payment. Thank you</h1>
            </div>
        </div>
    );
};

export default PaymentSuccess;