import { FaFacebook, FaFacebookMessenger, FaGithub,FaGooglePlusG, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const SocialLogin = () => {
    const {signWithgoogle,signWithGithub}= useAuth();
    const navigate=useNavigate();
    const  location=useLocation();
    const axiosPublic=useAxiosPublic();
    const from=location.state?.from?.pathname? location.state?.from?.pathname : '/'; 
    const handleGoogleSignIn=()=>{
        signWithgoogle()
            .then(result=>{
                console.log(result.user);
                const userInfo={
                    name:result.user?.displayName,
                    email:result.user?.email,
                    image:result.user?.photoURL,
                    phoneNumber:result?.userphoneNumbe,
                }
                axiosPublic.post('/users',userInfo)
                    .then(res=>{
                        console.log(res.data);
                        Swal.fire({
                            title: "Good job!",
                            text: "You have successfully login",
                            icon: "success"
                          }); 
                          navigate(from,{replace:true});
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
    }
    const handleGithubSignIn=()=>{
        signWithGithub()
            .then(result=>{
                console.log(result.user);
                Swal.fire({
                    title: "Good job!",
                    text: "You have successfully login",
                    icon: "success"
                  }); 
                  navigate(from,{replace:true});
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
    return (
        <div>
            <div><hr className="border-b-4 border-black mb-4"></hr></div>
            <div className="grid grid-cols-4 p-8 gap-5">                
                <button onClick={handleGoogleSignIn} className="btn btn-circle text-3xl btn-warning"><FaGooglePlusG></FaGooglePlusG></button>
                <button onClick={handleGithubSignIn} className="btn btn-circle text-3xl btn-warning"><FaGithub></FaGithub></button>
                <button className="btn btn-circle text-3xl btn-warning"><FaFacebook></FaFacebook></button>
                <button className="btn btn-circle text-3xl btn-warning"><FaInstagram></FaInstagram></button>
                <button className="btn btn-circle text-3xl btn-warning"><FaLinkedin></FaLinkedin></button>
                <button className="btn btn-circle text-3xl btn-warning"><FaTwitter></FaTwitter></button>
                <button className="btn btn-circle text-3xl btn-warning"><FaWhatsapp></FaWhatsapp></button>
                <button className="btn btn-circle text-3xl btn-warning"><FaFacebookMessenger></FaFacebookMessenger></button>
            </div>
        </div>
    );
};

export default SocialLogin;