import { Parallax } from 'react-parallax';
const Cover = ({img,title}) => {
    return (

        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={img}
            bgImageAlt="the Menu"
            strength={-200}
            >
            <div className="hero h-[700px]">
                <div className="hero-overlay bg-opacity-0"></div>
                    <div className="hero-content text-center text-neutral-content">
                    <div className="px-40 py-20 text-[#FFFFFF] font-Cinzel  bg-[#15151599]">
                        <h1 className="mb-5 text-5xl  ">{title}</h1>
                        <p className="mb-5 text-2xl ">Would you like to try a dish?</p>
                        
                    </div>
                </div>
            </div>
        </Parallax>

       
    );
};

export default Cover;