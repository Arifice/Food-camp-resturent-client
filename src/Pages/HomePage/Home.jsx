import { Helmet } from "react-helmet-async";
import Bannar from "./Bannar";
import Category from "./Category";
import Featured from "./Featured";
import FoodCamp from "./FoodCamp";
import PopularMenu from "./PopularMenu";
import Testimonials from "./Testimonials";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Food Camp/Home</title>                
            </Helmet>
            <Bannar></Bannar>
            <FoodCamp></FoodCamp>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;