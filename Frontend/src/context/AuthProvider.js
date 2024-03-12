import { createContext, useState, useEffect} from "react";

const AuthContext = createContext({})

const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null)

    return (
        <AuthContext.Provider value = {{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContext, AuthProvider} ;