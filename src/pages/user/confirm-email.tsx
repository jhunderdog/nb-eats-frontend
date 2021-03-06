import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import { verifyEmail } from "../../__generated__/verifyEmail";

const VERIFY_EMAIL_MUTATION = gql`
    mutation verifyEmail($input:VerifyEmailInput!){
    verifyEmail(input: $input) {
        ok
        error
        }
    }
`;
export const ConfirmEmail = () => {
    const { data: userData, refetch } = useMe();
    const client = useApolloClient();
    const histroy = useHistory();
    const onCompleted = async (data: verifyEmail) => {
        const {verifyEmail: { ok } } = data;
        if(ok && userData?.me.id){
            // await refetch()
            client.writeFragment({
                id: `User:${userData?.me.id}`,
                fragment: gql`
                    fragment VerifiedUser on User {
                        verified
                    }
                `,
                data: {
                    verified: true,
                }
            });
            histroy.push("/")
        }
    }
    const [verifyEmail] = 
    useMutation(VERIFY_EMAIL_MUTATION, {
        onCompleted
    });
    
    useEffect(() => {
        const [, code] = window.location.href.split("code=");
        console.log(code);
        verifyEmail({
            variables: {
                input: {
                    code,
                }
            }
        });    
    }, []);
    return <div className=" mt-52 flex flex-col items-center justify-center">
        <Helmet>
            <title>Verify Email | Nuber Eats</title>
        </Helmet>
        <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
        <h4 className=" text-gray-700 text-sm">Please wait, don't close the page...</h4>
    </div>
}