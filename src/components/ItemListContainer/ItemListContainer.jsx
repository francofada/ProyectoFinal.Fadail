import { useEffect, useState } from "react"
import ItemList from "../ItemList/ItemList"
import clasess from './ItemListContainer.module.css'
import { useParams } from "react-router-dom"
import { db } from "../../Service/Firebase" //base de datos 
import { getDocs, collection, query, where } from "firebase/firestore"    //obtener todos los documentos



//Logica de Estado
const ItemLisContainer =({greeting})=>{
    const [products, setProducs] = useState([])
    const {categoryId} =useParams()
    const [loading, setLoading] = useState(true)
   
    useEffect(()=>{
        const productsRef = !categoryId 
        ? collection(db, 'products')
        : query(collection(db, 'products'), where('category', '==', categoryId))

        getDocs(productsRef)
        .then(querySnapshot =>{
           const productsAdapted = querySnapshot.docs.map(doc =>{
            const fields = doc.data()
            return {id: doc.id, ...fields}
           })
           setProducs(productsAdapted)
        })
        .catch(error=>{
            console.log(error)
        })
        .finally(() => {
            setLoading(false)
        })  
    },[categoryId])
    if(loading) {
        return <div className={clasess.loaders}><span className={clasess.loader}></span></div>
    }

    console.log(products)
   

    return(
        <div className={clasess.itemlist}>
            <p>{greeting}</p>
            <ItemList  products={products}/>      
        </div>
    )
}

export default ItemLisContainer