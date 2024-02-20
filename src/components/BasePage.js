import React, { useContext, useState } from "react";
import { Layout, Menu, theme } from "antd";
import { Link, Route, Switch, useHistory, useLocation } from "react-router-dom";

import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Context } from "../app/index";
import { USER_LOGOUT } from "../app/user/UserTypes";
import { RiDashboardLine } from "react-icons/ri";
import SideBar from "./navigation/SideBar";
import NavBar from "./navigation/NavBar";
import DashboardPage from "./dashboard/DashboardPage";
import ProfilePage from "./profile/ProfilePage";
import CompetitionPage from "./competition/CompetitionPage";
import CompetitionDetailPage from "./competition/CompetitionDetailPage";
import ProductDetail from "./product/ProductDetail";
import CreateCompetitionPage from "./competition/CreateCompetitionPage";
import CreateProductPage from "./product/CreateProductPage";

export default function BasePage() {
    const { Content, Sider, Header } = Layout;
    const history = useHistory();
    const location = useLocation();
    const dispatch = useContext(Context)[1];

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = (collapsed) => {
        setCollapsed(collapsed);
    };

    const logout = () => {
        dispatch({ type: USER_LOGOUT });
        history.push("/");
    };

    const itemsMenu = [
        {
            key: "/",
            icon: <RiDashboardLine />,
            label: <Link to="/">Dashboard</Link>,
        },
        {
            key: "/logout",
            icon: <LogoutOutlined />,
            label: "Logout",
            className: "logout-button",
            onClick: () => {
                logout();
            },
        },
    ];

    const siderStyle = {
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
    };

    const contentStyle = {
        margin: "24px 16px 0",
        overflow: "initial",
    };

    const currentKey = itemsMenu.find((item) => item.key === location.pathname);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
            <div className="sm:flex hidden mr-10 relative">
                <SideBar />
            </div>

            <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
                <NavBar />
                <Switch>
                    <Route exact path="/" component={DashboardPage} />
                    <Route exact path="/profile" component={ProfilePage} />
                    <Route exact path="/create-competition" component={CreateProductPage} />
                    <Route exact path="/competition" component={CompetitionPage} />
                    <Route exact path="/competition/:id" component={CompetitionDetailPage} />
                    <Route exact path="/product/:id" component={ProductDetail} />
                    <Route exact path="/wallet" component={ProductDetail} />
                </Switch>
            </div>
        </div>
    );
}
