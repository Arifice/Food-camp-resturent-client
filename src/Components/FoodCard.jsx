
const FoodCard = ({item}) => {
    const {name,image,price,recipe}=item;
    return (
        <div className="card card-compact relative bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="bg-stone-700 right-10 rounded-lg top-10 absolute w-20 p-2 text-2xl text-white font-Cinzel">$ {price}</p>
            <div className="card-body">
                <h2 className="card-title text-center font-Cinzel">{name}</h2>
                
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                <button className="btn btn-ghost my-8 text-2xl border-0 border-b-4 bg-slate-200 border-orange-400 font-Cinzel btn-outline">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;