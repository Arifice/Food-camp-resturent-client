import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className="mx-auto">
            <h1 className="text-6xl text-center text-orange-400 font-Cinzel">Error</h1>
            <Link to={'/'}> <button className="btn btn-warning text-3xl font-Cinzel">Go Home</button></Link>
        </div>
    );
};

export default Error;