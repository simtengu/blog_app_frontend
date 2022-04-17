
import React,{useContext} from 'react';
const contextInit  = React.createContext();
const AppContext = ({children}) => {
    
    const globalData = {
        authUser: "albert oscar simtengu"
    }
    return ( <>
       <contextInit.Provider value={globalData}>
       {children}
       </contextInit.Provider>
    </> );
}

export const useGlobalInfo = ()=>{
    const context = useContext(contextInit);
    return context;
}

export default AppContext;