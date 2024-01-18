import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useCart from "../Hooks/useCart";

const FoodCard = ({item}) => {

    const {name,image,price,recipe,_id}=item;
    const axiosSecure=useAxiosSecure();
    const {user}=useAuth();
    const navigate=useNavigate();
    const location=useLocation();
    const [,refech]=useCart();

    const handleAddToCart=()=>{        
        if(user && user.email){
            const cartItem={
                menuId:_id,
                email:user.email,
                name,image,price,recipe
            }
            axiosSecure.post('/cart',cartItem)
                .then(res=>{
                    console.log(res.data);
                    if(res.data?.insertedId){
                        Swal.fire({
                            title: "Success",
                            text: `${name} added to your cart`,
                            icon: "success",
                            timer:'800'
                        })
                        refech();
                    }
                })
        }

            else{
                Swal.fire({
                    title: "You are not log in",
                    text: "Are You want to add to the cart? Please login",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Login ?"
                }).then((result) => {
                    if (result.isConfirmed) {
                    navigate('/login',{state:{from:location}});
                    }
                });
            }
    }

    return (
        <div className="card card-compact relative bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="bg-stone-700 right-10 rounded-lg top-10 absolute w-20 p-2 text-2xl text-white font-Cinzel">$ {price}</p>
            <div className="card-body">
                <h2 className="card-title text-center font-Cinzel">{name}</h2>
                
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                <button onClick={()=>handleAddToCart(item)} className="btn btn-ghost my-8 text-2xl border-0 border-b-4 bg-slate-200 border-orange-400 font-Cinzel btn-outline">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;