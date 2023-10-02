import  './App.css'
import NavBar from './components/NavBar/Navbar'
import ItemLisContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailConteiner from './components/ItemDetailContainer/ItemDetailContainer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import { CartProvider } from './Context/cartContext'
import { NotificationProvider } from './Notification/NotificationService'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'

function App() {

  return (
    <>
      <NotificationProvider>
        <CartProvider>
              <BrowserRouter>
                  <div className='body'>
                      <NavBar />
                            <Routes>
                              <Route path='/' element={ <ItemLisContainer greeting='ATHENEA TIENDA ONLINE'/>}/>
                              <Route path='/category/:categoryId' element={ <ItemLisContainer greeting='PRODUCTOS POR CATEGORIA'/>}/>
                              <Route path='/detail/:productID' element={ <ItemDetailConteiner/>}/>
                              <Route path='/cart' element={ <Cart/>}/>
                              <Route path='/checkout' element={ <Checkout/>}/>
                              <Route path='*' element={<h1>Error 404 Not Found</h1>}/>
                            </Routes>
                      <Footer/>
                  </div>
              </BrowserRouter>
        </CartProvider>
      </NotificationProvider>
    </>
  )
}

export default App
