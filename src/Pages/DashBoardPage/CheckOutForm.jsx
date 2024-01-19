import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error,setError]=useState('');
    const [clientSecret,setClientSecret]=useState('');
    const [transactionId,setTransactionId]=useState('');
    const navigate=useNavigate();
    // console.log({clientSecret});
    
    const axiosSecure=useAxiosSecure();
    const [cart,refetch]=useCart();
    const {user}=useAuth(); 
    const totalPrice=cart.reduce((total,item)=>total+item.price,0);    
    useEffect(()=>{
        if(totalPrice>0){
          axiosSecure.post('/create-payment-intent',{price:totalPrice})
          .then(res=>{
            console.log(res.data?.clientSecret);
            setClientSecret(res.data?.clientSecret);
          })
        }
    },[axiosSecure,totalPrice])

    const handleSubmit = async (event) => {        
        event.preventDefault();    
        if (!stripe || !elements) {          
          return;
        }      
        const card = elements.getElement(CardElement);    
        if (card == null) {
          return;
        }        
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });    
        if (error) {
          console.log('[error]', error);
          setError(error.message);
        } else {
          console.log('[PaymentMethod]', paymentMethod);
          setError('');
        }
        const {paymentIntent,error:cofirmError}=await stripe.confirmCardPayment(clientSecret,{
          payment_method:{
            card:card,
            billing_details:{
              email:user?.email || 'anonymous',
              name:user?.displayName || 'anonymous',
            }
          }
        })
        if(cofirmError){
          console.log(cofirmError);
          setError(cofirmError?.message);
        }
        else{
          setError('');
          console.log({paymentIntent});
          if(paymentIntent.status==='succeeded'){
              setTransactionId(paymentIntent.id);
              // now save the payment in the database
              const payment={
                email:user?.email,
                name:user?.displayName,
                price:totalPrice,
                transactionId:paymentIntent.id,
                date:new Date(),//utc convert date ,use moment js
                cartIds: cart.map(item=>item._id),
                menuItemIds:cart.map(item=>item.menuId),
                status:'pending',
              }
              console.log({payment});
              const res=await axiosSecure.post('/payments',payment);
              console.log(res.data);
              refetch();
              if(res.data?.paymentResult?.insertedId){
                Swal.fire({
                  title: "Thank You",
                  text: "Your payment successfull",
                  icon: "success",
                  timer:'1000'
                }); 
                navigate('/dashboard/paymentHistory')
              }
              
          }
        }

      };


    return (
        <div>
            <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    className="my-10   px-24"
                    options={{
                    style: {
                        base: {
                        fontSize: '32px',
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
                <div className="flex justify-center my-20">
                    <button disabled={!stripe || !elements || !clientSecret  } className="btn text-3xl font-Cinzel btn-warning" type="submit">
                        Pay
                    </button>                    
                </div>
                <p className="text-2xl text-red-600 text-center mt-10">{error}</p>
               

            </form>
            <p className="text-2xl text-red-600 text-center mt-10">Total item : {cart.length}  Toatalprice:US${totalPrice}</p>
            {
              transactionId && <p className="text-2xl text-green-600 text-center mt-10">Your Transaction Id : {transactionId} </p>
            }
            </div>
        </div>
    );
};

export default CheckOutForm;