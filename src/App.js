// import React,{useState} from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import NavigationBar from './NavigationBar';
// import Home from './components/Home/index.js';
// import Contact from './components/Contact/index.js';
// import AboutUs from './AboutUs';
// import Login from './Login';
// import './styles.css';
// import RegistrationForm from './RegistrationForm';

// function App() {
//   // const [loggedIn, setLoggedIn] = useState(false);
//   return (
//     <>
//     <Router>
//     <NavigationBar />
//       <div>
//         <Routes>
//           <Route path="/" exact element={<Home/>} />
//           <Route path="/contact" element={<Contact/>} />
//           <Route path="/about" element={<AboutUs/>} />
//           <Route path='/login' element={<Login/>}/>
//           <Route path='/RegistrationForm' element={<RegistrationForm/>}></Route>
//         </Routes>
//       </div>
//     </Router>
    
//     </>
//   );
// }
// export default App;


import {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import CartContext from './context/CartContext'

import './App.css'
// import Payment from './components/Payment'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.itemsCount + 1
          return {...eachCartItem, itemsCount: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.itemsCount > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.itemsCount - 1
            return {...eachCartItem, itemsCount: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )

    this.setState({cartList: updatedCartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )

    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (productObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.itemsCount + product.itemsCount

            return {...eachCartItem, itemsCount: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]

      this.setState({cartList: updatedCartList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={Products} />
          <Route
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <Route exact path="/cart" component={Cart} />
          {/* <Route exact path="/payments" component={Payment}/> */}
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App