import React, { createContext, useState } from 'react';

export const SUContext = createContext();

const SignUpContext = (props) =>{
    const [showSignUp, setShowSignUp] = useState(false);

    return(
        <SUContext.Provider value={{showSignUp,setShowSignUp}}>
            {props.children}
        </SUContext.Provider>
    )
}
export default SignUpContext;