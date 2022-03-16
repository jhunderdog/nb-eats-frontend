import { gql } from "@apollo/client";

export const RESTAURANT_FRAGMENT = gql`
    fragment RestuarantParts on Restaurant {
        id
        name
        coverImg 
        category {
            name
        }
        address
        isPromoted
    }
`