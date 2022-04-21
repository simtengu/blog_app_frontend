
import React,{useContext,useState} from 'react';
const contextInit  = React.createContext();
const AppContext = ({children}) => {
  //authentication section..............................  ...
  const [isLoginOpen,setIsLoginOpen] = useState(true)
  const [authUser,setAuthUser] = useState("")
 //setting active auth section
 const activateLoginSection = ()=>{
     setIsLoginOpen(true)
 }

  const activateRegisterSection = () => {
    setIsLoginOpen(false);
  };

  const handleSetAuthUser = (user)=>{
      setAuthUser(user)
  }

  const handleLogOut = ()=>{
      setAuthUser("")
      localStorage.removeItem("blog_app_token")
  }

  //end of authentication section..............................  
//snackbar section ................
const [isSnackbarOpen,setIsSnackbarOpen] = useState(false)
const [snackbarDuration,setSnackbarDuration] = useState(4000)
const [snackbarMessage,setSnackbarMessage] = useState("")
const [snackbarStatus,setSnackbarStatus] = useState("error")
const handleCloseSnackbar = ()=>{
    setIsSnackbarOpen(false)
}

const handleOpenSnackbar = (duration,status,message)=>{
    setSnackbarDuration(duration)
    setSnackbarStatus(status)
    setSnackbarMessage(message)
    setIsSnackbarOpen(true)
}

const snackbarInfo = {
    duration:snackbarDuration,
    status:snackbarStatus,
    message:snackbarMessage,
    isOpen:isSnackbarOpen
}
//end of snackbar section ................
//backdrop section ......
const [isBackdropOpen,setIsBackdropOpen] = useState(false) 
const handleOpenBackdrop = ()=>{
    setIsBackdropOpen(true)
}

const handleCloseBackdrop = ()=>{
    setIsBackdropOpen(false)
}
//end of backdrop section..............
    const globalData = {
      isLoginOpen,
      activateLoginSection,
      activateRegisterSection,
      authUser,
      handleSetAuthUser,
      handleLogOut,
      snackbarInfo,
      handleCloseSnackbar,
      handleOpenSnackbar,
      isBackdropOpen,
      handleOpenBackdrop,
      handleCloseBackdrop
    };
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