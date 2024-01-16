import { Helmet} from 'react-helmet-async';
import Cover from '../../Components/Cover/Cover';
import menu_bg_img from '../../assets/menu/banner3.jpg';
import dessert_bg_img from '../../assets/menu/dessert-bg.jpeg';
import pizza_bg_img from '../../assets/menu/pizza-bg.jpg';
import salad_bg_img from '../../assets/menu/salad-bg.jpg';
import soup_bg_img from '../../assets/menu/soup-bg.jpg';
import offered_bg_img from '../../assets/menu/banner.jpg';
import useMenu from '../../Hooks/UseMenu';
import SectionTitle from '../../Components/SectionTitle';
import MenuCategory from './MenuCategory';

const Menu = () => {
    const [menu]=useMenu();
    const dessert=menu.filter(item=>item.category==='dessert');
    const soup=menu.filter(item=>item.category==='soup');
    const pizza=menu.filter(item=>item.category==='pizza');
    const salad=menu.filter(item=>item.category==='salad');
    const offered=menu.filter(item=>item.category==='offered');

    return (
        <div>
            <Helmet>
                <title>FoodCamp/Menu</title>                
            </Helmet>
            {/* Main Cover */}
            <Cover img={menu_bg_img} title={"Our Menu"}></Cover> 
            <SectionTitle subHeading={"Don't Miss"} heading={"Today's Offer"}></SectionTitle>          
            
            {/* Offered Items */}
            <MenuCategory items={offered} title={'offered'} img={offered_bg_img}></MenuCategory>
           
           {/* Dessert Items */}
            <MenuCategory items={dessert} title={'dessert'} img={dessert_bg_img}></MenuCategory>
          
           {/* pizza Items */}
            <MenuCategory items={pizza} title={'pizza'} img={pizza_bg_img}></MenuCategory>
           
           {/* salad Items */}
            <MenuCategory items={salad} title={'salad'} img={salad_bg_img}></MenuCategory>
          
          {/* soup Items */}
            <MenuCategory items={soup} title={'soup'} img={soup_bg_img}></MenuCategory>
        </div>
    );
};

export default Menu;