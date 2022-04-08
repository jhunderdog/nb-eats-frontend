import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

interface ICoords {
    lat:number;
    lng:number;
}

export const Dashboard = () => {


    const [driverCoords, setDriverCoords] = useState<ICoords>({lng: 0, lat:0})
    //@ts-ignore
    const onSuccess = ({coords: {latitude, longitude}}: Position) => {
        setDriverCoords({lat: latitude, lng: longitude});
    }
    //@ts-ignore
    const onError = (error: PositionError) => {
        console.log(error);
    }
    useEffect(() => {
        navigator.geolocation.watchPosition(onSuccess, onError, {
            enableHighAccuracy: true,
        })
    }, []);
    const onApiLoaded = ({map, maps}: {map: any, maps:any}) => {
        console.log(map, maps);
        setTimeout(() => {
            map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
        }, 3000)
    };
    return <div>
        <div className="overflow-hidden" style={{width:window.innerWidth, height:"95vh"}}>
        <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={onApiLoaded}
            defaultZoom={20}
            defaultCenter={{
                lat: 36.58,
                lng: 125.95,
            }}
          bootstrapURLKeys={{ key: "AIzaSyAuHeQR9BSfgqoSB_SUJu9oEhh4jEHfdpc"}}
          
        >
          
        </GoogleMapReact>
        </div>
    </div>
}