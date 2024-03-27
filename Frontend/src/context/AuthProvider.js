import { createContext, useState, useEffect} from "react";

const AuthContext = createContext({})

const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null)
    const [expired,setExpired] = useState(null)

    return (
        <AuthContext.Provider value = {{user, setUser, expired, setExpired}}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContext, AuthProvider} ;