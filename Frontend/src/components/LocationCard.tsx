import React from "react";
import logo from "../assets/logo.svg";

interface Props {
    street: string;
    city: string;
    country: string;
}

const LocationCard = (props: Props) => {
    return (
        <div className="w-[445px] h-[70px] relative shadow">
            <div className="w-[445px] h-[70px] left-0 top-0 absolute bg-white rounded"/>
            <div
                className="w-[378.25px] left-[33px] top-[8px] absolute text-center text-black text-[20px] font-semibold leading-tight">
                Suggested Swap Location
            </div>
            <div
                className="w-[365px] h-[27px] left-[40px] top-[35px] absolute text-center text-black text-[15px] font-normal uppercase leading-tight">
                {props.street}, {props.city}, {props.country}
            </div>
        </div>
    );
};

export default LocationCard;
