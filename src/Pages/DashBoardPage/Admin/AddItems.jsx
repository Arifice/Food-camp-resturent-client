import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key=import.meta.env.VITE_Image_hosting_key;
const image_hosting_api=`https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`;

const AddItems = () => {
    const {register,handleSubmit} = useForm()
    const axiosPublic=useAxiosPublic();
    const axiosSecure=useAxiosSecure();
    
      const onSubmit =async (data) => {
        console.log(data);
        const imageFile={image:data.image[0]};
        const res= await axiosPublic.post(image_hosting_api,imageFile,{
            headers:{
                'content-type':'multipart/form-data'
            }
        })
        console.log(res.data);
        if(res.data?.success){
            // send the menu item data to the server with image.
            const menuItem={
                name:data.name,
                category:data.category,
                recipe:data.recipe,
                price:parseFloat(data.price),
                image:res.data.data?.display_url,
            }
            console.log({menuItem});
            // secure data:
            const menuRes=await axiosSecure.post('/menu',menuItem);
            console.log(menuRes.data);
            if(menuRes.data?.insertedId){
                Swal.fire({
                    title: "Good job!",
                    text: "You have successfully added an item",
                    icon: "success"
                  });

            }
        }
    }
    
    return (
        <div>
            <SectionTitle heading={'Add an Items'} subHeading={'Whats new?'}></SectionTitle>
        
            <div >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-base-200 px-16 pb-12 space-y-6  mx-auto text-3xl">              

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-3xl">Recipe name</span>
                            
                        </div>
                        <input type="text"
                        {...register('name',{required:true})}
                        placeholder="Racipe " className="input text-3xl input-secondary input-bordered w-full" />
                       
                    </label>             
                
                <div className="flex gap-10">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-3xl">Category</span>
                            
                        </div>
                        <select defaultValue={'default'} {...register("category",{required:true})}
                            className="select select-secondary text-3xl w-full ">
                                <option disabled  value={'default'}>Pick your favorite language</option>
                                <option value="salad">salad</option>
                                <option value="pizza">pizza</option>
                                <option value="soup">soup</option>
                                <option value="dessert">dessert</option>
                                <option value="offered">offered</option>
                                <option value="drinks">drinks</option>    
                        </select>                        
                    </label> 
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-3xl">Price</span>
                            
                        </div>
                        <input type="number"
                        {...register('price',{required:true})}
                        placeholder="Price " className="input input-secondary input-bordered w-full" />
                       
                    </label>               

                </div>
                <label className="form-control">
                    <div className="label">
                        <span className="label-text text-3xl">Recipe Details</span>                        
                    </div>
                    <textarea {...register('recipe',{required:true})} className="textarea textarea-warning textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                    
                </label>
                    <div className="form-control">
                        <input {...register('image',{required:true})} type="file" className="file-input text-3xl file-input-bordered file-input-secondary w-1/2 " />
                    </div>

                    <button className="btn btn-warning text-3xl font-Cinzel "> <FaUtensils></FaUtensils>Add an Item</button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;