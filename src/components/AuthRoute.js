import {getToken} from '@/utils/token'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({children})=>{
    const token = getToken()
    if(token){
        return (
            <>{children}</>
        )
    }
    else{
        return (<Navigate to="/login" replace></Navigate>)
       
    }
}

export {AuthRoute}