import { Link } from "react-router-dom";
import Cover from "../../Components/Cover/Cover";
import PopularMenuCard from "../HomePage/PopularMenuCard";

const MenuCategory = ({items,title,img}) => {

    return (
        <div className="pt-10">
            {title  && <Cover img={img} title={title}></Cover> }
            <div className="grid grid-cols-1 lg:grid-cols-2 px-20 pt-16 gap-12">
                {
                    items.map(item=><PopularMenuCard key={item._id} item={item}></PopularMenuCard>)
                }
            </div>
            <Link to={`/order/${title}`}>
                <button className="btn btn-ghost my-8 text-2xl border-0 border-b-4 uppercase btn-outline">Order Our {title}</button>
            </Link>
            
        </div>
    );
};

export default MenuCategory;