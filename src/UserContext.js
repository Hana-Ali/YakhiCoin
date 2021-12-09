import React, { useReducer, createContext } from 'react';

// Setting the initial state values - either null, or whatever's in local storage
const initialState = {
    priv: localStorage.getItem('privateKey') || '',
    pub: localStorage.getItem('publicKey') || '',
    transactions: []
}

// Reducer function
function reducer(state, action) {
    return { ...state, ...action };
}

// Creating context for users on website
const UserContext = createContext();

// The provider - allows us to change states across pages
const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <UserContext.Provider 
        value={{ state, dispatch }} >
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider }