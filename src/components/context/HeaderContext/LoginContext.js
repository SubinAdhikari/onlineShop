import React, { createContext, useState } from 'react';

export const LContext = createContext();

const LoginContext = (props) =>{
    const [show, setShow] = useState(false);

    return(
        <LContext.Provider value={{show,setShow}}>
            {props.children}
        </LContext.Provider>
    )
}
export default LoginContext;