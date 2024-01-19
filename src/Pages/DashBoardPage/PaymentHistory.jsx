import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/SectionTitle";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
    const axiosSecure=useAxiosSecure();
    const {user}=useAuth();
    const {data:payments=[]}=useQuery({
        queryKey:['payments',user.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    })
    return (
        <div>
            <SectionTitle heading={'Payment History'} subHeading={'check now'}></SectionTitle>
            <h1 className="text-3xl font-Cinzel text-center">total payments : {payments.length}</h1>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra-zebra">
                        {/* head */}
                        <thead className="text-3xl font-Cinzel">
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Transaction Id</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody className="">
                            {
                                payments.map((payment,idx)=><tr key={payment._id} className="hover text-2xl my-2 bg-base-200">
                                <th>{idx+1}</th>                                
                                <td>{payment.date}</td>
                                <td>{parseFloat(payment.price)}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.status}</td>
                            </tr>)
                            }
                        
                        
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;