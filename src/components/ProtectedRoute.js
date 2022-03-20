import { Navigate } from "react-router-dom";



export function ProtectedRoute({ component: Component, ...props }) {
    return (
        <>
            {
                props.isLoggedIn ? <Component {...props} /> : <Navigate to='/signin' />

            }

        </>

    )

}