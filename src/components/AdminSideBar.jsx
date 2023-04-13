import React from "react";
import { Link } from "react-router-dom";
import adminDashboard from "../assets/img/admin/adminDashboard.png";

const AdminSIdeBar = () => {
  const sideBars = [
    {
      path: "/admin/users",
      name: "Manage Users",
    },
    {
      path: "/admin/rooms",
      name: "Manage Rooms",
    },
    {
      path: "/admin/sales",
      name: "Manage Sales",
    },
    {
      path: "/admin/services",
      name: "Manage Services",
    },
    {
      path: "/admin/products",
      name: "Manage Products",
    },
    {
      path: "/admin/posts",
      name: "Manage Posts",
    },
    {
      path: "/admin/bookings",
      name: "Manage Bookings",
    },
  ];

  return (
    <>
      {/* <div style={{ backgroundColor: "blue" }} className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li>
                <a href="index.html">
                  <img src="assets/img/icons/dashboard.svg" alt="img" />
                  <span> Dashboard</span>
                </a>
              </li>

              <li className="">
                <ul>
                  {sideBars.map((sideBar) => (
                    <li style={{ padding: "12px" }}>
                      <Link to={sideBar.path}>{sideBar.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      <div className="sidebar" id="sidebar">
        <div
          className="slimScrollDiv"
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: "672px",
          }}
        >
          <div
            className="sidebar-inner slimscroll"
            style={{ overflow: "hidden", width: "100%", height: "672px" }}
          >
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="submenu">
                  <a className="active">
                    <img src={adminDashboard} alt="img" />
                    <span> Dashboards</span> <span className="menu-arrow" />
                  </a>
                  <ul style={{ display: "block" }}>
                    {sideBars.map((sideBar, index) => (
                      <li key={index} style={{ padding: "12px" }}>
                        <Link to={sideBar.path}>{sideBar.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSIdeBar;
