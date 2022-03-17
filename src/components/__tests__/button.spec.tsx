import { render } from "@testing-library/react";
import React from "react";
import { Button } from "../button";

describe("<Button />", () => {
    it("should render OK with props", ()=> {
       const { debug, getByText, rerender } =  render(<Button canClick={true} loading={false} actionText={"test"}/>)
       getByText("test");
       
    });
    it("should display loading", () => {
        const { debug, getByText, container } =  render(<Button canClick={false} loading={true} actionText={"test"}/>);
        debug();
        
       getByText("Loading...");
    //    console.log(container);
       expect(container.firstChild).toHaveClass("bg-gray-300 pointer-events-none");
    })
});