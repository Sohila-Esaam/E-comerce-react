import { createContext, useEffect, useState } from "react";

export let UserContext = createContext(0);

//provider
export function UserContextProvider(props){
     
    let[userLogin, setUserLogin] = useState(null);

    //component did mount ==> awl 7aga httnfz f elcomponent zy oninit f angular
    useEffect(()=>{
        if(localStorage.getItem('userToken') !== null){
            setUserLogin(localStorage.getItem('userToken'))
        }
    },[])
   
    return <UserContext.Provider value={{userLogin , setUserLogin}}>
        {props.children}
    </UserContext.Provider>
}

