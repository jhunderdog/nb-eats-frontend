import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import nuberLogo from "../images/logo.svg";

const faUserIcon = faUser as IconProp;

export const Header:React.FC = () => {
    const { data } = useMe();
    
return (
  <>
  {
    !data?.me.verified && (
      <div className="bg-red-500 p-3 text-center text-xs text-white">
        <span>Please verify your email.</span>
      </div>
    )
  }
    <header className="py-4">
    <div className="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
      <img src={nuberLogo} className="w-24" alt="Nuber Eats" />
      <span className="text-xs">
        <Link to="/edit-profile">
          <FontAwesomeIcon icon={faUserIcon} className="text-xl" />
        </Link>
      </span>
    </div>
  </header>
  </>
);


}