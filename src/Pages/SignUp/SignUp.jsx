import { Link } from "react-router-dom";
import img from '../../assets/others/authentication2.png';
// import { useContext } from "react";
// import { AuthContext } from "../../Provider/AuthProvider";


const SignUp = () => {
    // const {createUser}=useContext(AuthContext);
    const handleSignUp=e=>{
        e.preventDefault();
        const form=e.target;
        const name=form.name.value;
        const email=form.email.value;
        const password=form.password.value;
        const user={name,email,password};
        console.log(user);
        // createUser(email,password)
        //     .then(result=>{
        //         console.log(result.user);
        //     })
        //     .catch(error=>{
        //         console.log(error);
        //     })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-1/2">                        
                        <img src={img} alt="" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSignUp} className="card-body">
                        <h1 className="text-3xl text-center font-bold">Sign Up</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
                            </div>
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
    );
};

export default SignUp;