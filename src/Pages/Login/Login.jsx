import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha, } from 'react-simple-captcha';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import img from '../../assets/others/authentication1.png'
import {  useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from '../../Components/SocialLogin';




const Login = () => {    
    const {signIn}=useAuth();
    const [disabled,setDisabled]=useState(false);
    const navigate=useNavigate();
    const location=useLocation();
    const from=location.state?.from?.pathname? location.state?.from?.pathname : '/';
    console.log('from in login ',from);
    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])
    

    const handleLogin=e=>{        
        e.preventDefault();
        const form=e.target;
        const email=form.email.value;
        const password=form.password.value;
        const user={email,password};
        console.log(user);
        signIn(email,password)
            .then(result=>{   
                console.log(result); 
                Swal.fire({
                    title: "Good job!",
                    text: "You have successfully login",
                    icon: "success",
                    timer:'1000'
                  }); 
                navigate(from,{replace:true}) ;               
               
            })
            .catch(error=>{
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: `${error.message}`,
                    icon: "error",                    
                    });
            })
    }
    const handleValidateCaptcha=(e)=>{
            const captcha=e.target.value;
            console.log(captcha);
            if (validateCaptcha(captcha)==true) {
                setDisabled(false);
            }
       
            else {
                Swal.fire({
                    title: "Error!",
                    text: "Captcha is not correct",
                    icon: "error",
                    timer:'1000'
                  }); 
            }
    }
    return (
        <>
            <Helmet>
                    <title>FoodCamp/login</title>                
            </Helmet>
            
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-1/2">                        
                        <img src={img} alt="" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <h1 className="text-3xl text-center py-5 font-bold">Login</h1>
                        <div>
                            <SocialLogin></SocialLogin>
                        </div>

                        <form onSubmit={handleLogin} className="card-body">                        
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password'  placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                <LoadCanvasTemplate />
                                </label>
                                <input disabled onBlur={handleValidateCaptcha} type="text" name='captcha'  placeholder="captcha" className="input input-bordered" required />
                                {/* <button onClick={handleValidateCaptcha} className='btn mt-4 btn-outline btn-xs'>Submit Captcha</button> */}
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disabled} type='submit' value={'Login'} className="btn btn-secondary btn-outline"></input>
                            </div>
                            <p className='text-center my-5'>New to Car Doctors ? Please go to <Link to={'/signup'} className='text-red-500 underline font-semibold'>Sign Up</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;