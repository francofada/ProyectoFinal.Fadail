import {  useState, createContext, useContext } from "react"



export const CartContext = createContext('')


export const CartProvider = ({children})=>{

const [cart,setCart] = useState([])
    console.log(cart)
  const addItem = (productToAdd) => {
    if (!isInCart(productToAdd.id)) {
      setCart((prev) => [...prev, productToAdd]);
    } else {
      // Actualiza la cantidad si el producto ya está en el carrito
      const updatedCart = cart.map((item) => {
        if (item.id === productToAdd.id) {
          return { ...item, quantity: item.quantity + productToAdd.quantity };
        }
        return item;
      });
  
      setCart(updatedCart);
    }
  }
  
const isInCart = (id) =>{
      return cart.some(prod => prod.id === id)
}

//suma elementos  
const getTotalQuantity = () => {
    let totalQuantity = 0

    cart.forEach(prod => {
        totalQuantity += prod.quantity
    })

    return totalQuantity
}
const totalQuantity = getTotalQuantity()

//suma de price
const getTotal= () => {
    let total = 0

    cart.forEach(prod => {
        total += prod.quantity * prod.price
    })

    return total
}

const total = getTotal()

//remover elementos
const removeItem = (id) => {
    setCart(prev => prev.filter(prod => prod.id !== id))
}

//remover todo
const clearCart = () => {
    setCart([])
}

    
    return(
        <CartContext.Provider value={{cart, addItem,totalQuantity,removeItem,clearCart,total}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = ()=>{
    return useContext(CartContext)
}

 
