import { Link } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle";
import image from '../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className="featuredItem bg-fixed  pt-12">
            <SectionTitle
                heading={'From Our Menu'}
                subHeading={"Featured Item"}
            ></SectionTitle>
            <div className="flex text-white justify-center items-center px-36 py-20 md:flex-row gap-8">
                <div>
                    <img src={image} alt="" />
                </div>
                <div className="space-y-5">
                    <h1 className="text-3xl font-semibold">March 20, 2023 <br></br>WHERE CAN I GET SOME?</h1>
                    <p className="text-justify text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                   <Link to={'/order/pizza'}> <button className="btn btn-secondary text-white text-2xl border-0 border-b-4 btn-outline">Order Now</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Featured;