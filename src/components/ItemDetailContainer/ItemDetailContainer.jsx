import { useState, useEffect } from "react"
import ItemDetail from "../ItemDetail/ItemDetail"
import { useParams } from "react-router-dom"
import clasess from "./itemDetailConteiner.module.css"
import { db } from "../../Service/Firebase"
import { getDoc, doc } from "firebase/firestore"


const ItemDetailConteiner = ()=>{

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const {productID } = useParams()

    useEffect(()=>{
        document.title = 'Athena Tienda Online - Detalle';

        const productDetail = doc(db, 'products',productID )

        getDoc(productDetail)
        .then(documentSnapshot =>{
            const fields = documentSnapshot.data()
            const productAdapted = {id: documentSnapshot.id, ...fields}
            setProduct(productAdapted)
        })
        .catch(error=>{
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    },[productID])
    if(loading) {
        return <div className={clasess.loaders}><span className={clasess.loader}></span></div>
    }
    return(
        <div className={clasess.detailitem}>
            <h1>DETALLE DE PRODUCTO</h1>
            <ItemDetail {...product}/>
        </div>
    )
}

export default ItemDetailConteiner