import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"
import { RootState } from "store";

const ProtectedRoute = ({children}:{children: JSX.Element}) => {
    const authenticated = useSelector((state:RootState) => state.auth.isAuthenticated);

    if(!authenticated) {
        return <Navigate to="/login"replace />
    }
 return children

};

export default ProtectedRoute;