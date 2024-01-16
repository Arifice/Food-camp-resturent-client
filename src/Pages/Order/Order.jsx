import { useState } from "react";
import Cover from "../../Components/Cover/Cover";
import bg from '../../assets/shop/banner2.jpg'
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../Hooks/UseMenu";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Order = () => {    
    const categories=['pizza','salad','soup','dessert','drinks','offered'];
    const {category}=useParams();
    const initialIndex=categories.indexOf(category);
    const [menu]=useMenu();
    const [tabIndex,setTabIndex]=useState(initialIndex);
    
    const dessert=menu.filter(item=>item.category==='dessert');
    const soup=menu.filter(item=>item.category==='soup');
    const pizza=menu.filter(item=>item.category==='pizza');
    const salad=menu.filter(item=>item.category==='salad');
    const drinks=menu.filter(item=>item.category==='drinks');
    const offered=menu.filter(item=>item.category==='offered');
        return (
        <div>
            <Helmet>
                <title>FoodCamp/order</title>                
            </Helmet>
            <Cover img={bg} title={'Order Food'}></Cover>

            <div className="my-14 text-center  font-medium">
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className={"text-3xl font-Cinzel text-secondary my-12  border-b-4 "}>
                    
                    <Tab>Pizza</Tab>                    
                    <Tab>Salad</Tab>                    
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>                                    
                    <Tab>Drinks</Tab>
                    <Tab>Offered</Tab>    
                </TabList>

                <TabPanel>
                    <OrderTab items={pizza}></OrderTab>
                </TabPanel>                
                <TabPanel>
                    <OrderTab items={salad}></OrderTab>
                </TabPanel>                

                <TabPanel>
                    <OrderTab items={soup}></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab items={dessert}></OrderTab>  
               </TabPanel>
            
                <TabPanel>
                    <OrderTab items={drinks}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={offered}></OrderTab>
                </TabPanel>

            </Tabs>
            </div>
        </div>
    );
};

export default Order;