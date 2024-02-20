import React, {createContext, useReducer} from "react";
import UserReducer, {userInitialState} from './user/UserReducer'

//We will need to eventually combine them
const Store = ({children}) => {
    const [state, dispatch] = useReducer(UserReducer, userInitialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(userInitialState);
export default Store;