import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Category } from "../pages/client/category";
import { Restaurant } from "../pages/client/restaurant";
import { Restaurants } from "../pages/client/restaurants";
import { Search } from "../pages/client/search";
import { Order } from "../pages/order";
import { AddDish } from "../pages/owner/add-dish";
import { AddRestaurant } from "../pages/owner/add-restaurants";
import { MyRestaurant } from "../pages/owner/my-restaurant";
import { MyRestaurants } from "../pages/owner/my-restaurants";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";

// const ClientRoutes = [
//     <Route key={1} path="/" exact>
//         <Restaurants/>
//     </Route>,
//     <Route key={2} path="/confirm" exact>
//         <ConfirmEmail/>
//     </Route>,
//     <Route key={3} path="/edit-profile" exact>
//         <EditProfile/>
//     </Route>,
//     <Route key={4} path="/search">
//         <Search/>
//     </Route>,
//     <Route key={5} path="/category/:slug">
//         <Category/>
//     </Route>,
//     <Route key={6} path="/restaurants/:id">
//         <Restaurant/>
//     </Route>,
// ];

const clientRoutes = [
    {
        path: "/",
        component: <Restaurants/>
    },
    {
        path: "/search",
        component: <Search/>
    },
    {
        path: "/category/:slug",
        component: <Category/>
    },
    {
        path: "/restaurants/:id",
        component: <Restaurant/>
    },
]

const commonRoutes = [
    {
        path: "/confirm",
        component: <ConfirmEmail/>
    },
    {
        path: "/edit-profile",
        component: <EditProfile/>
    },
    {
        path: "/orders/:id",
        component: <Order/>
    }
]

const restaurantRoutes = [
    {
        path: "/",
        component: <MyRestaurants/>
    },
    {
        path: "/add-restaurant",
        component: <AddRestaurant/>
    },
    {
        path: "/restaurants/:id",
        component: <MyRestaurant/>
    },
    {
        path: "/restaurants/:restaurantId/add-dish",
        component: <AddDish/>
    },
]




export const LoggedInRouter = () =>  {
const { data, loading, error} = useMe();
// console.log(error);
console.log(data?.me.role);
if (!data ||loading || error){
    return <div className=" h-screen flex justify-center items-center"><span className=" font-medium text-xl tracking-wide">Loading...</span></div>
}
    return (
        <Router>
            <Header/>
            <Switch>
            {data.me.role === "Client" && 
            clientRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
                {route.component}
                </Route>
            ))}   
            {data.me.role === "Owner" &&
            restaurantRoutes.map((route) => (
                <Route exact key={route.path} path={route.path}>
                    {route.component}
                </Route>
            ))}
            {commonRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
                {route.component}
                </Route>
            ))}
            
            <Route>
                <NotFound/>
            </Route>
            </Switch>            
        </Router>
    )
}
