import React, { useContext, createContext } from "react";

import {
    useAddress,
    useContract,
    // useMetamask,
    useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract(
        process.env.REACT_APP_CONTRACT_ADDRESS
    );
    const { mutateAsync: createProduct } = useContractWrite(
        contract,
        "createProduct"
    );

    const address = useAddress();
    // const connect = useMetamask();

    const publishProduct = async (form) => {
        try {
            const data = await createProduct({
                args: [
                    address, // owner
                    form.title, // title
                    form.description, // description
                    form.target,
                    new Date(form.deadline).getTime(), // deadline,
                    form.image,
                ],
            });

            console.log("contract call success", data);
        } catch (error) {
            console.log("contract call failure", error);
        }
    };

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                // connect,
                createProduct: publishProduct,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
