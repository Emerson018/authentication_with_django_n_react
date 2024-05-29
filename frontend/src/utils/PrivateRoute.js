import {Navigate, Outlet} from "react-router-dom"
import {useContext} from "react"
import AuthContext from "../context/AuthContext"

const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return user ? <Outlet {...rest}>{children}</Outlet> : <Navigate to="/login" />
}

export default PrivateRoute
