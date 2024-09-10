import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { ChevronFirst, ChevronLast } from "lucide-react";

function Navbar() {
  const nav = useAppSelector((state) => state.nav.nav);
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  let items;
  if (nav === "Home") {
    items = Home;
  }

  return (
    <div className="relative mr-1 bg-white border">
      <nav className="flex h-screen flex-col items-center justify-start bg-gray-100 p-4">
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="absolute right-[-10px] bg-transparent top-64 rounded hover:bg-gray-100 z-50"
        >
          {expanded ? <ChevronFirst color="gray" /> : <ChevronLast color="gray" />}
        </button>

        <ul className="mt-2 flex flex-col gap-3">
          {items?.map((nav, index) => (
            <NavLink
              to={nav.url}
              key={index}
              className={({ isActive }) =>
                `group relative flex items-center rounded-sm transition-all duration-300 ease-in-out hover:rounded-md hover:shadow-lg ${
                  expanded ? "p-2 py-2" : ""
                } ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-white hover:bg-primary hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <div className="flex items-center px-4 py-2">
                  <img
                    className={`${expanded ? "mr-2" : ""} transition-transform duration-300 ease-in-out group-hover:scale-110`}
                    src={nav.srcs}
                    alt="nav-icon"
                    style={{ width: nav.imgsize }}
                  />
                  <span
                    className={`text-12px leading-14.4px tracking-0.1px font-roboto overflow-hidden font-medium transition-all duration-300 ease-in-out ${
                      expanded ? "w-32" : "hidden"
                    } ${isActive ? "text-white" : "group-hover:text-white"}`}
                  >
                    {nav.name}
                  </span>
                  {!expanded && (
                    <div
                      className={`
                      invisible absolute left-full ml-2 transform rounded-md
                      bg-primary px-2 py-1
                      text-sm text-white opacity-0 transition-all duration-300 ease-in-out
                      group-hover:visible group-hover:translate-x-1 group-hover:opacity-100 z-50
                    `}
                    >
                      {nav.name}
                    </div>
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

// ... rest of your code (Home array) remains the same of your code (Home array) remains the same

const Home = [
  {
    name: "Home",
    imgsize: "",
    srcs: "/layout/home.svg",
    url: "/dashboard/home",
  },
  {
    name: "Shop Inventory",
    imgsize: "",
    srcs: "/layout/inventrory.svg",
    url: "/dashboard/inventoryList",
  },
  {
    name: "Sale",
    imgsize: "",
    srcs: "/layout/sale.svg",
    url: "/dashboard/sale",
  },
  {
    name: "Product",
    imgsize: "",
    srcs: "/layout/product.svg",
    url: "/dashboard/ProductList",
  },
  // {
  //   name: "Add Farmer",
  //   imgsize: "",
  //   srcs: "/images/farmer.svg",
  //   url: "/dashboard/farmer",
  // },
  {
    name: "Purchase Details",
    imgsize: "",
    srcs: "/layout/supplier.svg",
    url: "/dashboard/SupplierList",
  },
 
  // {
  //   name: "Customer Details",
  //   imgsize: "",
  //   srcs: "/layout/customer.svg",
  //   url: "/dashboard/CustomerList",
  // },
  // {
  //   name: "Comminity Forum",
  //   imgsize: "",
  //   srcs: "/layout/community.svg",
  //   url: "/dashboard/governmentSchemes",
  // },
  
  // {
  //   name: "Govt. Schemes",
  //   imgsize: "",
  //   srcs: "/layout/govt.svg",
  //   url: "/dashboard/governmentSchemes",
  // },
  
];

