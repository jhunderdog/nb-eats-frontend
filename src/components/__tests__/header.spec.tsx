import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Header } from "../header";
import { BrowserRouter as Router} from "react-router-dom";
import { ME_QUERY } from "../../hooks/useMe";

describe("<Header />", () => {
    it("renders without verify banner", async ()=> {
        await waitFor(async () => {
        const { queryByText } = render(
                <MockedProvider mocks={[
                    {
                        request: {
                            query: ME_QUERY,
        
                        },
                        result: {
                            data: {
                                me: {
                                    id:1,
                                    email: "",
                                    role: "",
                                    verified:true,
                                }
                            }
                        }
                    }
                ]}>
                    <Router>
                    <Header />
                    </Router>
                </MockedProvider>
                );
        await new Promise((resolve) => setTimeout(resolve, 5));   
        expect(queryByText("Please verify your email.")).toBeNull();
        });       
    });
    it("renders verify banner", async ()=> {
        await waitFor(async () => {
        const { getByText } = render(
                <MockedProvider mocks={[
                    {
                        request: {
                            query: ME_QUERY,
        
                        },
                        result: {
                            data: {
                                me: {
                                    id:1,
                                    email: "",
                                    role: "",
                                    verified:false,
                                }
                            }
                        }
                    }
                ]}>
                    <Router>
                    <Header />
                    </Router>
                </MockedProvider>
                );
        await new Promise((resolve) => setTimeout(resolve, 5));   
        getByText("Please verify your email.")
        });       
    });
})