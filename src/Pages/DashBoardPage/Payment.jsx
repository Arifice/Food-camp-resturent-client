import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../Components/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
// TODO :publisheble key

const stripePromise = loadStripe(import.meta.env.VITE_stripe_PK);
const Payment = () => {
    return (
        <div>
            <SectionTitle heading={'Payment'} subHeading={'Please pay to Eat'}></SectionTitle>

            <div>
               <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;