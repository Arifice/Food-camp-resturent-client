import { Link, useNavigate } from "react-router-dom";
import img from '../../assets/others/authentication2.png';
import { useForm } from 'react-hook-form';
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin";


const SignUp = () => {
    const axiosPublic=useAxiosPublic();
    const {createUser,updateUserProfile}=useAuth();
    const navigate=useNavigate();

    const {register,handleSubmit,reset,formState: { errors }} = useForm();
    const onSubmit = (data) =>{
        console.log(data);
        createUser(data.email,data.password)
            .then(result=>{
                console.log(result.user);
                updateUserProfile(data.name,data?.photoURL)
                    .then(result=>{
                        console.log(result); 
                        const user={
                            name:data.name,
                            image:data?.photoURL,
                            email:data.email,
                            password:data.password
                        }
                        axiosPublic.post('/users',user)
                            .then(res=>{
                                console.log(res.data);
                                if(res.data?.insertedId){
                                    reset();                      
                                    Swal.fire({
                                        title: "Good job!",
                                        text: "You have successfully sign up",
                                        icon: "success",
                                        timer:'1000'
                                      });                          
                                      navigate('/');
                                }
                            })
                       
                         
                    })
                    .catch(error=>{
                        console.log(error);
                    })           
             
            })
            .catch(error=>{
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: `${error.message}`,
                    icon: "error",                    
                    });
            })
    };   

    
        
    // }
    return (
            <>
                <Helmet>
                    <title>FoodCamp/signup</title>                
            </Helmet>

        <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-1/2">                        
                        <img src={img} alt="" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-3xl text-center py-5 font-bold">Sign Up</h1>
                        <div>
                        <SocialLogin></SocialLogin>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name",{ required: true })} name='name' placeholder="Name" className="input input-bordered"  />
                                {errors.name && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo url</span>
                                </label>
                                <input type="text" {...register("photoURL")} name='photoURL' placeholder="Photo Url" className="input input-bordered"  />
                                
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email",{ required: true })} name='email' placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" 
                                
                                {...register("password",{
                                     required: true,
                                     minLength:6, 
                                     maxLength: 20,
                                     pattern:  /(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]/
                                })} name='password'  placeholder="password" className="input input-bordered"/>
                                {errors.password?.type==='required' && <span className="text-red-600">Password is required</span>}
                                {errors.password?.type==='minLength' && <span className="text-red-600">Must be 6 character </span>}
                                {errors.password?.type==='maxLength' && <span className="text-red-600">Maximum 20 character </span>}
                                {errors.password?.type=='pattern' && <span className="text-red-600">Must have one uppercase one lowercase one special character </span>}
                            <label className="label my-4">
                                <input type="checkbox" />
                                <p className="ml-3">Accept our terms & conditions</p>
                            </label>
                            </div>
                            <div className="form-control mt-6">
                                <input type='submit' value={'Sign Up'} className="btn btn-secondary btn-outline"></input>
                            </div>
                            <p className='text-center my-5'>Already have an account? Please go to <Link to={'/login'} className='text-red-500 underline font-semibold'>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
            
            </>
    );
};

export default SignUp;