import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import './index.css'

const ProductItem=props=>{
    const {productItem}=props 
    const {image,title,price,id}=productItem
    return(
        <Link to= {`/products/${id}`} className="link-text">
            <li className='list-items'>
                <img src={image} alt={title} className='product-image'/>
                <h1 className='product-title'>{title}</h1>
                <p className='product-price'>{price}/-</p>
                <p className='more-details-text'>More Details <FaArrowRight/></p>
            </li>
        </Link>
    )
}

export default ProductItem