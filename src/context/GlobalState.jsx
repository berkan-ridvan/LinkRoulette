import React from "react";
import { useReducer } from "react";
import { createContext } from "react";

export const GlobalContext = createContext();

const initialState = {
    selectedCategory: "",
}

const categoryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CATEGORY':
            return {
                ...state,
                selectedCategory: action.payload
            };
        default:
            return state;
    }
};

export const GlobalProvider = ({children}) => {
    const [state , dispatch] = useReducer(categoryReducer , initialState);

    const setCategory = (category) => {
        dispatch({ type: 'SET_CATEGORY', payload: category });
    };

    return (
        <GlobalContext.Provider value={{ selectedCategory: state.selectedCategory, setCategory }}>
            {children}
        </GlobalContext.Provider>
    );

}

