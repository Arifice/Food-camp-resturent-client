import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


import slide1 from  '../../assets/home/slide1.jpg'
import slide2 from '../../assets/home/slide2.jpg'
import slide3 from '../../assets/home/slide3.jpg'
import slide4 from '../../assets/home/slide4.jpg'
import slide5 from '../../assets/home/slide5.jpg'
import SectionTitle from '../../Components/SectionTitle';

const Category = () => {
    return (
        <section>
            <SectionTitle
                subHeading={"from 11.00 am to 10.00 pm"}
                heading={"Order Online"}
            ></SectionTitle>
            <Swiper
            slidesPerView={4}
            spaceBetween={30}
            // centeredSlides={true}
            pagination={{
            clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper mb-24"
      >
        <SwiperSlide>
            <img src={slide1} alt="" />
            <h1 className='text-3xl -mt-16  uppercase  font-bold text-secondary text-center'>Salads</h1>
        
        </SwiperSlide>
        <SwiperSlide>
            <img src={slide2} alt="" />
            <h1 className='text-4xl -mt-16 uppercase font-bold text-secondary text-center'>Pizzas</h1>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slide3} alt="" />
            <h1 className='text-4xl -mt-16 uppercase font-bold text-secondary text-center'>Soups</h1>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slide4} alt="" />
            <h1 className='text-4xl -mt-16 uppercase font-bold text-secondary text-center'>Desserts</h1>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slide5} alt="" />
            <h1 className='text-4xl -mt-16 uppercase font-bold text-secondary text-center'>Salads</h1>
        </SwiperSlide>        
      </Swiper>
        </section>
    );
};

export default Category;