import { createContext, useReducer,useEffect } from "react"
import AuthReducer from "./AuthReducer";

const INITIAL_STATE= {
    user:JSON.parse(localStorage.getItem("user")) || null,
    error:false
};
export const AuthContext=createContext(INITIAL_STATE);

export const AuthContextProvider = (props)=>{
    const [state, dispatch]= useReducer(AuthReducer, INITIAL_STATE);
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
      },[state.user])
    return (<AuthContext.Provider value={{
        user: state.user,
        isFetching:state.isFetching,
        error: state.error,
        dispatch,
    }}>{props.children}</AuthContext.Provider>);
};
