import React, { useContext } from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import { Context } from "./app/index";
import BasePage from "./components/BasePage";
// import LoginPage from "./components/Public/Login/LoginPage";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia, eth } from "@thirdweb-dev/chains";
import { Button, Card } from "antd/es";
import { StateContextProvider } from "./context";

function AppRouter() {
    const [userState] = useContext(Context);

    const isAuthenticated = () => {
        return (
            userState.jwtToken &&
            userState.jwtToken.length >= 0 &&
            userState.jwtToken.length !== undefined
        );
    };
    return (
        <div>
             <ThirdwebProvider desiredChainId={ChainId.Goerli} clientId={process.env.REACT_APP_THIRDWEB_CLIENTID}> 
                <Router>
                    <StateContextProvider>
                        <Switch>
                            {/* <Route exact path="/login" component={LoginPage} /> */}
                            <Route path="/">
                                {/* {!isAuthenticated() ? (
                                <Redirect to="/login" />
                                ) : (
                                    <Route path="/" component={BasePage} />
                                )} */}
                                <Route path="/" component={BasePage} />
                            </Route>
                        </Switch>
                    </StateContextProvider>
                </Router>
            </ThirdwebProvider>
        </div>
    );
}

export default AppRouter;
