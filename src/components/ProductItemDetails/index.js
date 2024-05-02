import { Component } from "react";
import { FaShoppingBag,FaRupeeSign,FaStar,FaMinus,FaPlus} from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import CartContext from "../../context/CartContext";
// import Header from "../Header";
import './index.css'



class ProductItemDetails extends Component{
    state={productItemDetails:{},rate:0,count:0,itemsCount:0}

    componentDidMount(){
        this.getProductItemDetails()
    }

    getProductItemDetails=async()=>{
        const {match}=this.props 
        const {params}=match 
        const {id}=params
        const apiUrl=`https://fakestoreapi.com/products/${id}`
        const options={
            method:'GET'
        }
        const response=await fetch(apiUrl,options)
        const data=await response.json()
        this.setState({productItemDetails:data,rate:data.rating.rate,count:data.rating.count})
    }

    minusBtn=()=>{
        const {itemsCount}=this.state 
        if (itemsCount>0){
            this.setState(prev=>({itemsCount:prev.itemsCount-1}))
        }
    }

    plusBtn=()=>{
        this.setState(prev=>({itemsCount:prev.itemsCount+1}))
    }

    render(){
        return(
            <CartContext.Consumer>
                {
                    value=>{
                        const {productItemDetails,rate,count,itemsCount}=this.state
                        const {title,price,description,category,image}=productItemDetails
                        const {addCartItem}=value 
                        const onClickAddtoCart=()=>{
                            addCartItem({...productItemDetails,itemsCount})
                        }
                        return(
                            <div>
                {/* <Header/> */}
                <div className="details-container">
                    <img src={image} alt={title} className="details-image"/>
                    <div className="details-text-container">
                        <h1 className="details-title">{title}</h1>
                        <p className="details-des">{description}</p>
                        <p className="para"><FaShoppingBag/> {category}</p>
                        <p className="para"><FaRupeeSign/> {price}/-</p>
                        <p className="para"><FaStar className="star-icon"/> {rate}</p>
                        <p className="para"><IoPeople /> {count}</p>  
                        <div className="items-container">
                             <button type="button" className="minus-plus-btn" onClick={this.minusBtn}>
                                <FaMinus/>
                             </button>
                             <p>{itemsCount}</p>
                             <button type="button" className="minus-plus-btn" onClick={this.plusBtn}>
                                <FaPlus/>
                             </button>
                        </div>
                        <button type="button" className="buttons" onClick={onClickAddtoCart}>Add to Cart</button>
                    </div>
                </div>
                </div>
                        )
                    }
                }
            </CartContext.Consumer>
        )
    }
}

export default ProductItemDetails