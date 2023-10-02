import { createContext, useContext, useState } from "react"
import clasess from './NotificationService.module.css'

const Notification = ({msg} ) => {

    return (
      <div className={clasess.notification}>
        {msg}
      </div>
    )
  }

const NotificationContext = createContext()



export const NotificationProvider =({ children })=>{
    const [message, setMessage] = useState('')
    
    const setNotification = (msg, time=2) =>{
        setMessage(msg)
        setTimeout(()=>{
            setMessage('')

        },(time*1000))
    }



    return(
        <NotificationContext.Provider value={{setNotification}}>
            {message && <Notification msg={message}/>}
            { children }
        </NotificationContext.Provider>

    )
}

export const useNotification =()=>{
    return useContext(NotificationContext)
}