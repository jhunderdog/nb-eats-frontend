import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { category, categoryVariables } from "../../__generated__/category";

const CATEGORY_QUERY = gql`
    query category($input: CategoryInput!) {
        category(input: $input) {
            ok
            error
            totalPages
            totalResults
            restaurants { 
                ...RestuarantParts
            }
            category {
                ...CategoryParts
            }
        }
    }
    ${RESTAURANT_FRAGMENT}
    ${CATEGORY_FRAGMENT}
`;
interface ICategoryParams {
    slug:string;
}
export const Category = () => {
    // const location = useLocation();
    const params = useParams<ICategoryParams>();
    const { data, loading } = useQuery<category, categoryVariables>(CATEGORY_QUERY, {
        variables: {
            input: {
                page: 1,
                slug: params.slug,
            }
        }
    });
    console.log(data);
    return <h1>Category</h1>;
 
};