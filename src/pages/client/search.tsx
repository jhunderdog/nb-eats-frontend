import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { searchRestaurant, searchRestaurantVariables } from "../../__generated__/searchRestaurant";

const SEARCH_RESTAURANT = gql`
    query searchRestaurant($input: SearchRestaurantInput!){
        searchRestaurant(input: $input) {
            error
            ok
            totalPages
            totalResults
            restaurants {
                ...RestuarantParts
            }            
        }
    }
    ${RESTAURANT_FRAGMENT}
`;
export const Search = () => {
    const location = useLocation();
    const history = useHistory();
    const [queryReadyToStart, {loading, data, called}] = useLazyQuery<searchRestaurant,searchRestaurantVariables>(SEARCH_RESTAURANT);

    useEffect(() => {
        const [_, query] = location.search.split("?term=");
        console.log(query);
        if(!query) {
          return  history.replace("/");
        }
        queryReadyToStart({
            variables: {
                input: {
                    page:1,
                    query,
                }
            }
        })
    }, [history, location]);
    console.log(data);
    return (
        <div>
            <Helmet>
                <title>Search | Nuber Eats</title>
            </Helmet>
            <h1>Search Page</h1>
        </div>
    );
}