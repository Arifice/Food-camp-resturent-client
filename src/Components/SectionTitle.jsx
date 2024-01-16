
const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="md:w-1/4 lg:w-1/3 mx-auto text-center my-4">
            <p className="text-[#D99904]">---{subHeading}---</p>
            <h1 className="text-3xl font-Cinzel border-y-4 py-3">{heading}</h1>
        </div>
    );
};

export default SectionTitle;