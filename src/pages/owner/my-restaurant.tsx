import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { DISH_FRAGMENT, ORDER_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { myRestaurant, myRestaurantVariables } from "../../__generated__/myRestaurant";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie, VictoryVoronoiContainer, VictoryLine, VictoryZoomContainer, VictoryTheme, VictoryLabel, VictoryTooltip } from 'victory';
import { Helmet } from "react-helmet-async";
import { useMe } from "../../hooks/useMe";

export const MY_RESTAURANT_QUERY = gql`
    query myRestaurant($input: MyRestaurantInput!){
        myRestaurant(input: $input){
            ok
            error
            restaurant {
                ...RestuarantParts
                    menu {
                    ...DishParts
                    }
                    orders {
                    ...OrderParts
                    }
            }
        }
    }
    ${RESTAURANT_FRAGMENT}
    ${DISH_FRAGMENT}
    ${ORDER_FRAGMENT}
`;

interface IParams {
    id: string;
}

export const MyRestaurant = () => {
    const {id} = useParams<IParams>();
    const { data } = useQuery<myRestaurant, myRestaurantVariables>(
        MY_RESTAURANT_QUERY,
        {variables: {
            input: {
                id: +id,
            }
        }}
    );
    console.log(data);
    const chartData = [
        { x:1 , y: 3000},
        { x:2 , y: 1500},
        { x:3 , y: 4250},
        { x:4 , y: 1250},
        { x:5 , y: 2300},
        { x:6 , y: 7150},
        { x:7 , y: 6830},
        { x:8 , y: 4030},
        { x:9 , y: 530},
        { x:10 , y: 4430},
        { x:11 , y: 443},

    ];
    const { data: userData} = useMe()
    const triggerPaddle = () => {
      if(userData?.me.email){
        //@ts-ignore
        console.log(window.Paddle);
        //@ts-ignore
        window.Paddle.Setup({vendor: 144555});
        //@ts-ignore
        window.Paddle.Checkout.open({product: 763344, email: userData.me.email});
      }
    };
    return (
      <div>
        <Helmet>
          <title>
          {data?.myRestaurant.restaurant?.name || "Loading..."} | Nuber Eats
          </title>
          <script src="https://cdn.paddle.com/paddle/paddle.js"></script>
          </Helmet>
        <div className="checkout-container"></div>
            <div
            className="bg-gray-700 py-28 bg-center bg-cover"
            style={{
                backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`
            }}></div>
            <div className="container mt-10">
                <h2 className="text-4xl font-medium mb-10">
                    {data?.myRestaurant.restaurant?.name || "Loading..."}
                </h2>
                <Link to={`/restaurants/${id}/add-dish`} className="mr-8 text-white bg-gray-800 py-3 px-10">
                    Add Dish &rarr;
                </Link>
                <span onClick={triggerPaddle} className=" cursor-pointer text-white bg-lime-700 py-3 px-10">
                    Buy Promotion &rarr;
                </span>
                <div className="mt-10">
                {data?.myRestaurant.restaurant?.menu.length === 0 ? (<h4 className="text-xl mb-5">Please upload a dish!</h4>) :
                (<div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
                    {data?.myRestaurant.restaurant?.menu.map((dish, index)=> (
                        <Dish key={index} name={dish.name} description={dish.description} price={dish.price}/>
                    ))}
                    </div>
                        )
                }
                </div>
                <div className="mt-20 mb-10">
                    <h4 className="text-center text-2xl font-medium">Sales</h4>
                    <div className="  mt-10">
            <VictoryChart
              height={500}
              theme={VictoryTheme.material}
              width={window.innerWidth}
              domainPadding={50}
              containerComponent={<VictoryVoronoiContainer />}
            >
              <VictoryLine
                labels={({ datum }) => `$${datum.y}`}
                labelComponent={
                  <VictoryTooltip
                    style={{ fontSize: 18 } as any}
                    renderInPortal
                    dy={-20}
                  />
                }
                data={data?.myRestaurant.restaurant?.orders.map((order) => ({
                  x: order.createdAt,
                  y: order.total,
                }))}
                interpolation="natural"
                style={{
                  data: {
                    strokeWidth: 5,
                  },
                }}
              />
              <VictoryAxis
                tickLabelComponent={<VictoryLabel renderInPortal />}
                style={{
                  tickLabels: {
                    fontSize: 20,
                  } as any,
                }}
                tickFormat={(tick) => new Date(tick).toLocaleDateString("ko")}
              />
            </VictoryChart>
                    </div>
                </div>
            </div>
            
        </div>
    );
}