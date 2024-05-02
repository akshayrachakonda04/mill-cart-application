
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import './index.css'

const Home=()=>(
    <div className="home-container">
        <div className="hero-container">
            <div className="hero-content">
                <img src="https://res.cloudinary.com/de2lwnsu7/image/upload/v1704534836/star_vjpysq.png" alt="star-img" className="star-image"/>
                <h1 className="head">NEW WEEK,</h1>
                <h1 className="head">NEW ARRIVALS</h1>
                <Link to="/products" className="link-text">
                    <button type="button" className="shop-now-button">
                        Shop Now <FaArrowRight className='arrow-icon'/>
                    </button>
                </Link> 
            </div>
        </div>
    </div>
)

export default Home