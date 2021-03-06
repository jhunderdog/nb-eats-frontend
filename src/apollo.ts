import { InMemoryCache, ApolloClient, makeVar, createHttpLink, split } from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { LOCALSTORAGE_TOKEN } from "./constants";
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from "@apollo/client/utilities";


const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
        reconnect:true,
        connectionParams: {
            "x-jwt": authTokenVar() || "",
        }
    }
});
const authLink = setContext((_, {headers}) => {
    console.log(headers);
    return {
        headers: {
            ...headers,
            "x-jwt": authTokenVar() || "",            
        }
    }
});

const httpLink = createHttpLink({
    uri:'http://localhost:4000/graphql',
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink),
)




// console.log("default value of isLoggedInVar is:", isLoggedInVar())
// console.log("default value of authTokenVar is:", authTokenVar())

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    isLoggedIn: {
                        read(){
                            return isLoggedInVar();
                        }
                    },
                    token: {
                        read(){
                            return authTokenVar();
                        }
                    }
                }
            }
        }
    })
});