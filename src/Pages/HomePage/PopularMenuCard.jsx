
const PopularMenuCard = ({item}) => {
    const {name,price,image,recipe}=item;
    return (
        <div className="flex space-x-4">
            <img style={{borderRadius:'0 200px 200px 200px ' }} className="w-[120px]" src={image} alt="" />
            <div>
                <p className="font-Cinzel text-2xl font-semibold">{name}...........</p>
                <p>{recipe}</p>
            </div>
            <p className="text-[#BB8506]">${price}</p>
        </div>
    );
};

export default PopularMenuCard;