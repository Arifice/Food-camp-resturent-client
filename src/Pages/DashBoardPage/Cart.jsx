import { FaTrash } from "react-icons/fa";
import useCart from "../../Hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
    const axiosSecure=useAxiosSecure();
    const [cart,refetch]=useCart();
    const totalPrice=cart.reduce((total,item)=>total+item.price,0);
    
    const handleDelete=id=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/cart/${id}`)
                    .then(res=>{
                        console.log(res.data);
                        if(res.data?.deletedCount>0){
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Item has been deleted.",
                                icon: "success"
                              });
                        }
                    })
             
            }
          });

    }
    return (
        <div>
            <div className="flex justify-around my-20">
                <h1 className="text-5xl text-center">Total Items : {cart.length}</h1>
                <h1 className="text-5xl text-center">Total price : {totalPrice}</h1>
                {
                    cart.length?<Link to={'/dashboard/payment'}><button className="btn btn-secondary text-2xl">Pay</button></Link>
                    :
                    <Link to={'/dashboard/payment'}><button disabled className="btn btn-secondary text-2xl">Pay</button></Link>
                }
            </div>
        <div>
            <div className="overflow-x-auto mt-12 ">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className="text-3xl font-Cinzel">
                    <tr>
                        <th>SL</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                        
                    </tr>
                    </thead>
                        <tbody className="text-2xl">
                        
                            {
                                cart.map((item,idx)=><tr className="hover" key={item._id}>
                                   <td>{idx+1}</td>
                                    <td>
                                        <div className="rounded-xl w-20 h-20">
                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </td>
                                    <td>
                                       {item.name}
                                    </td>
                                    <td>{item.price}</td>
                                    <th>
                                        <button onClick={()=>handleDelete(item._id)} className="btn  btn-ghost text-3xl btn-outline"><FaTrash></FaTrash></button>
                                    </th>
                                    </tr>)
                            }
                        
                        
                        </tbody>
                </table>
            </div>
        </div>
        
    </div>

    );
};

export default Cart;