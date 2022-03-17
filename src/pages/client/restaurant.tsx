import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { restaurant, restaurantVariables } from "../../__generated__/restaurant";

const RESTAURANT_QUERY = gql`
    query restaurant($input: RestaurantInput!){
        restaurant(input: $input){
        ok
        error
        restaurant {
            ...RestuarantParts
            }
        }
    }
    ${RESTAURANT_FRAGMENT}
`;

interface IRestaurantParams {
    id: string;
}

export const Restaurant = () => {
    const params = useParams<IRestaurantParams>();
    const {loading, data} = useQuery<restaurant,restaurantVariables>(RESTAURANT_QUERY, {
        variables: {
            input: {
                restaurantId: +params.id
            }
        }
    }
    );
    console.log(data);
    return <div>
        <div 
        className="bg-gray-800 bg-center bg-cover py-48" 
        style={{backgroundImage:`url(${data?.restaurant.restaurant?.coverImg})`,
        }}
        >
            <div className="bg-white w-6/12 py-4 pl-5 md:w-3/12 md:pl-10 lg:6/12 lg:pl-30 ">
                <h4 className="text-4xl mb-3">{data?.restaurant.restaurant?.name}</h4>
                <h5 className="text-sm font-light mb-2">{data?.restaurant.restaurant?.category?.name}</h5>
                <h6 className="text-sm font-light">{data?.restaurant.restaurant?.address}</h6>
            </div>
        </div>
        </div>
};