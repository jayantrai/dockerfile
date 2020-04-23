import React, { Component } from 'react'
// import Product list from data
import {storeProducts, detailProduct} from './data'

// create a context API
const ProductContext = React.createContext()
// Context API has two components of Provider and Consumer
class ProductProvider extends Component {
    // define the state
    state={
        products: [],
        detailProduct: detailProduct,
        cart: []
    }

    // lifeCylce methods
    componentDidMount() {
      this.setProducts()
    }
    

    // with this method we are copying the values not referencing them
    // this method helps access real values not the modified values
    setProducts = () => {
        let products = []
        storeProducts.forEach(item => {
            const singleItem = {...item}
            products = [...products, singleItem]

        })
        this.setState(()=> {
            return{products}
        })
    }

    getItem = id =>  {
        const product = this.state.products.find(item => item.id === id)
        return product
    }

    // create methods
    handleDetail = id => {
        const product = this.getItem(id)
        this.setState(()=>{
            return {detailProduct:product}
        })
        
    }

    addToCart = id => {
        let tempProducts = [...this.state.products]
        const index = tempProducts.indexOf(this.getItem(id))
        const product = tempProducts[index]
        product.inCart = true
        product.count = 1
        const price = product.price
        product.total = price
        this.setState(() => {
            return {products: tempProducts, cart: [...this.state.cart, product]}
        }, ()=> {
            console.log(this.state)
        })


    }
    // to test whether we should pass objects to variables in react which 
    // is a bad idea
//     tester =() => {
//         console.log('State Products: ', this.state.products[0].inCart)
//         console.log('Data Products: ', storeProducts[0].inCart)
//     // get values from the state
//         const tempProducts = [...this.state.products]
//         tempProducts[0].inCart = true

// this.setState(()=> {
//     return {products:tempProducts}
// },()=> {
//     console.log('State Products: ', this.state.products[0].inCart)
//     console.log('Data Products: ', storeProducts[0].inCart) 
// })    }

    render() { 
        return (
            // in ordet to grab the value use double curly braces
                <ProductContext.Provider value={{...this.state, 
                handleDetail:this.handleDetail,
                addToCart:this.addToCart}}
          >
          {/* <button onClick={this.tester}>TestMe</button> */}
                    {this.props.children}
                </ProductContext.Provider>
            
            
         );
    }
}

// we also need to create a Consumer 
const ProductConsumer = ProductContext.Consumer
 
export {ProductProvider, ProductConsumer} 
// context API comes directly from the react . we dont need to install
// the method to create context is React.createContext
// Whenever we create a context it comes with two components. 1. Provider 2. Consumer
// Provider is going to provide all the information for the application 
// whenever we want to use the information, we will access it through consumer
// this way we dont have to pass the props to the components instead we ll grab them
// Instead of returning div we return Procvider