
import SectionTitle from "../../Components/SectionTitle";
import PopularMenuCard from "./PopularMenuCard";
import useMenu from "../../Hooks/UseMenu";
import { Link } from "react-router-dom";

const PopularMenu = () => {
    const [menu]=useMenu();
    const popular=menu.filter(item=>item.category==='popular');
    
    return (
        <section className="my-12">
            <SectionTitle 
                heading={"From Our Menu"}
                subHeading={"Popular Items"}
            ></SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {
                    popular.map(item=><PopularMenuCard key={item._id} item={item}></PopularMenuCard>)
                }
            </div>
            <Link to={'/menu'}><button className="btn btn-ghost my-8 text-2xl border-0 border-b-4 btn-outline">View Full Menu</button></Link>
        </section>
    );
};

export default PopularMenu;