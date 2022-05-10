import React from "react";
import { useSelector } from "react-redux";
import { getAddressCookie } from "../../hooks/getCookie";
import { NavLink } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";

const TableAddress = () => {
  const userGlobal = useSelector((state) => state.user);

  const addressCookie = getAddressCookie()
    ? JSON.parse(getAddressCookie())
    : null;

  return (
    <div className="w-full items-end">
      <div className=" w-full rounded-xl shadow-sm">
        <div className="p-3 rounded-t-xl">
          <div className="space-y-3">
            <div className="flex space-x-2">
              <h2 className="font-bold">{userGlobal.full_name}</h2>
              <p className="text-gray-400 text-sm">(Home)</p>{" "}
              <span className="text-xl text-green-600">
                <AiOutlineCheck />
              </span>
              {addressCookie?.isDefault ? (
                <p className="text-xs border-1 bg-info text-white border-accent px-1 rounded-sm">
                  Default
                </p>
              ) : null}
            </div>
            <h2 className="text-sm">
              {addressCookie.address_line},{" "}
              <span>{addressCookie.district}</span>,{" "}
              <span>{addressCookie.city}</span>,
              <span> {addressCookie.province}</span>,{" "}
            </h2>
            <div className="flex justify-between items-center">
              <h2 className="text-gray-400">021-7587535</h2>
              <NavLink to="billing">
                <button className="flex btn btn-ghost text-accent hover:text-green-500 hover:bg-white btn-xs font-bold normal-case">
                  Choose Another Address
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableAddress;
