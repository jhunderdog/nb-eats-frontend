import React from "react"
import { restaurant_restaurant_restaurant_menu_options } from "../__generated__/restaurant";

interface IDishProps {
    id?:number;
    description: string;
    name: string;
    price: number;
    isCustomer?:boolean;
    orderStarted?: boolean;
    options?: restaurant_restaurant_restaurant_menu_options[] | null;
    addItemToOrder?: (dishId: number) => void;
    removeFromOrder?: (dishId: number) => void;
    isSelected?: boolean;
}   

export const Dish:React.FC<IDishProps> = ({
    id = 0,
    description, 
    name ,
    price, 
    isCustomer = false, 
    orderStarted = false,
    options,
    addItemToOrder,
    removeFromOrder,
    isSelected,
    children:dishOptions,
}) => {
    const onClick = () => {
        console.log("clicked");
        console.log(id);
        if (orderStarted) {
          if (!isSelected && addItemToOrder) {
            console.log("add");
            return addItemToOrder(id);
            
          }
          if (isSelected && removeFromOrder) {
            console.log("remove");
            return removeFromOrder(id);
          }
        }
      };
    return (
        <div
        
        className={` px-8 py-4 border cursor-pointer  transition-all ${
          isSelected ? "border-gray-800" : " hover:border-gray-800"
        }`}
      >
        <div className="mb-5">
          <h3 className="text-lg font-medium ">{name}{orderStarted && <button onClick={onClick}>{isSelected ? "Remove" : "Add"}</button>}</h3>
          <h4 className="font-medium">{description}</h4>
        </div>
        <span>${price}</span>
        {isCustomer && options && options?.length !== 0 && (
          <div>
            <h5 className="mt-8 mb-3 font-medium">Dish Options:</h5>
            {dishOptions}
          </div>
        )}
      </div>
    )
}