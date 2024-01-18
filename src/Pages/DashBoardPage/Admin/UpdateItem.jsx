import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
const image_hosting_key=import.meta.env.VITE_Image_hosting_key;
const image_hosting_api=`https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`;


const UpdateItem = () => {
    const item=useLoaderData();
    const axiosSecure=useAxiosSecure();
    const axiosPublic=useAxiosPublic();
    console.log('update',{item});
    const {name,recipe,category,price,_id}=item;
    const {register,handleSubmit} = useForm()
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
            const menuRes=await axiosSecure.patch(`/menu/${_id}`,menuItem);
            console.log(menuRes.data);
            if(menuRes.data?.modifiedCount>0){
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
            <div>
                <SectionTitle heading={'Update an Item'} subHeading={'hurry up'}></SectionTitle>
            </div>
            <div >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-base-200 px-16 pb-12 space-y-6  mx-auto text-3xl">              

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-3xl">Recipe name</span>
                            
                        </div>
                        <input type="text"
                        {...register('name',{required:true})}
                        placeholder="Racipe " defaultValue={name} className="input text-3xl input-secondary input-bordered w-full" />
                       
                    </label>             
                
                <div className="flex gap-10">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-3xl">Category</span>
                            
                        </div>
                        <select  defaultChecked={category} {...register("category",{required:true})}
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
                        <input type="number" defaultValue={price}
                        {...register('price',{required:true})}
                        placeholder="Price " className="input input-secondary input-bordered w-full" />
                       
                    </label>               

                </div>
                <label className="form-control">
                    <div className="label">
                        <span className="label-text text-3xl">Recipe Details</span>                        
                    </div>
                    <textarea {...register('recipe',{required:true})} defaultValue={recipe} className="textarea textarea-warning textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                    
                </label>
                    <div className="form-control">
                        <input {...register('image',{required:true})}  type="file" className="file-input text-3xl file-input-bordered file-input-secondary w-1/2 " />
                    </div>

                    <button className="btn btn-warning text-3xl btn-lg font-Cinzel "> <FaUtensils></FaUtensils>Update Item</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;