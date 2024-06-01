"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RestaurantHeader = () => {
  const headerStyle = {
    position: "absolute", // Fixed position to keep it at the top
    top: 0, // Positioned at the top
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // padding: "10px",
    backgroundColor: "#f2f2f2",
    width: "100vw",
    height: "10%",
    // zIndex: 1000, // Ensure it's above other content
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    marginLeft:'-15px'
  };

  const linkStyle = {
    marginRight: "10px",
    color: "black",
    textDecoration: "none",
  };

  const imgStyle = {
    width: "100px",
    marginRight: "10px",
  };
const LogoutButton={
  color:'tranparent',
  border:'none'
}
  const [details, setDetails] = useState();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const data = localStorage.getItem("restaurantUser");
    if (!data && pathName === "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathName === "/restaurant") {
      router.push("/restaurant/dashboard");
    } else {
      setDetails(JSON.parse(data));
    }
  }, [pathName, router]);

  const logout = () => {
    localStorage.clear("restaurantUser");
    router.push("/restaurant");
  };

  return (
    <div style={headerStyle}>
      <img
        style={imgStyle}
        src="https://img.freepik.com/premium-vector/food-delivery-logo-design-template-restaurant-logo_556845-430.jpg"
        alt="Restaurant Logo"
      />
      <div>
        {details && details.restaurantName ? (
          <>
            <Link href="/" style={linkStyle}>
              Home
            </Link>
            <button style={LogoutButton} onClick={logout}>Logout</button>
            <Link href="/profile" style={linkStyle}>
              Profile
            </Link>
          </>
        ) : (
          <Link href="/login" style={linkStyle}>
            Login/SignUp
          </Link>
        )}
      </div>
    </div>
  );
};

export default RestaurantHeader;
