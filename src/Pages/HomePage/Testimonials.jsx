import SectionTitle from "../../Components/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const [reviews,setreviews]=useState([]);
   
    useEffect(()=>{
        axios.get('http://localhost:5000/review')
            .then(res=>{
                console.log(res.data);
                setreviews(res.data);
            })
    },[])

    return (
        <section>
            <SectionTitle
                heading={"Testimonials"}
                subHeading={'what Our Client Says'}
            ></SectionTitle>
               
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                 {
                    reviews.map(reveiw=><SwiperSlide key={reveiw._id}>
                        
                        <div className="m-24 px-24 py-16 flex flex-col items-center">
                            <Rating 
                                    style={{ maxWidth: 180 }}
                                    value={reveiw.rating}
                            />
                            <p className="py-10">{reveiw.details}</p>
                            <h1 className="text-3xl font-bold text-center text-orange-400">{reveiw.name}</h1>
                        </div>
                        
                        
                    </SwiperSlide>)
                 } 
                  
                    
                   
                </Swiper>
            
        </section>
    );
};

export default Testimonials;