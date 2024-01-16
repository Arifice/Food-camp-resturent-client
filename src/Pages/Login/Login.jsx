import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { Link  } from 'react-router-dom';
import img from '../../assets/others/authentication1.png'
import { useEffect, useRef } from 'react';
// import { useContext } from 'react';
// import { AuthContext } from '../../Provider/AuthProvider';


const Login = () => {
    // const {signIn}=useContext(AuthContext);
    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])
    const captchaReff=useRef(null);
    const handleLogin=e=>{        
        e.preventDefault();
        const form=e.target;
        const email=form.email.value;
        const password=form.password.value;
        const user={name,password};
        console.log(user);
        // signIn(email,password)
        //     .then(result=>{       
        //         const loggedInuser=result.user;
        //         const user={email};
        //         console.log(loggedInuser);
        //         axios.post('https://car-doctor-server-azure-phi.vercel.app/jwt',user, {
        //             withCredentials:true
        //         })
        //             .then(res=>{
        //                 console.log('axios',res.data);
        //                 if(res.data.success){
        //                  navigate(location?.state? location.state:'/');
        //                 }
        //             })
        //     })
            // .catch(error=>{
            //     console.log(error);
            // })
    }
    const handleValidateCaptcha=()=>{

    }
    return (
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-1/2">                        
                        <img src={img} alt="" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login</h1>
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
                                <input href={captchaReff} type="text" name='captcha'  placeholder="captcha" className="input input-bordered" required />
                                <button onClick={handleValidateCaptcha} className='btn btn-outline btn-xs'>Validate Captcha</button>
                            </div>
                            <div className="form-control mt-6">
                                <input type='submit' value={'Login'} className="btn btn-secondary btn-outline"></input>
                            </div>
                            <p className='text-center my-5'>New to Car Doctors ? Please go to <Link to={'/signup'} className='text-red-500 underline font-semibold'>Sign Up</Link></p>
                        </form>
                    </div>
                </div>
            </div>
    );
};

export default Login;