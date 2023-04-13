import {
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { Routes, Route, useParams, Link } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import AdminSideBar from "../../components/AdminSideBar";

import adminPlus from "../../assets/img/admin/adminPlus.png";
import { useDispatch } from "react-redux";
import {
  fetchDeleteRoom,
  fetchGetRooms,
} from "../../store/roomSlice/roomSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import {
  fetchDeleteHotelService,
  fetchGetHotelServices,
  fetchGetHotelServicesAdmin,
} from "../../store/hotelServiceSlice/hotelServiceSlice";
import {
  fetchDeleteSale,
  fetchGetSales,
} from "../../store/saleSlice/saleSlice";
import {
  fetchDeleteUser,
  fetchGetUsers,
} from "../../store/userSlice/userSlice";
import {
  fetchDeleteProduct,
  fetchGetProducts,
  fetchGetProductsAdmin,
} from "../../store/productSlice/productSlice";
import saleInterface from "../../interfaces/sales.interface";
import roomsInterface from "../../interfaces/rooms.interface";
import usersInterface from "../../interfaces/users.interface";
import servicesInterface from "../../interfaces/service.interface.js";
import productInterface from "../../interfaces/product.interface.js";
import bookingInterface from "../../interfaces/booking.interface.js";
import Swal from "sweetalert2";
import postInterface from "../../interfaces/post.interface.js";
import {
  fetchDeletePost,
  fetchGetPosts,
  fetchGetPostsAdmin,
} from "../../store/postSlice/postSlice";
import { fetchGetBookingsAdmin } from "../../store/bookingSlice/bookingSlice";
import Card from "../../components/Card/Card";

const UserManage = () => {
  const [iconsActive, setIconsActive] = useState("tab1");
  const [deleteFlag, setDeleteFlag] = useState(false);

  const handleIconsClick = (value) => {
    if (value === iconsActive) {
      return;
    }
    if (value == "tab1") {
      setDeleteFlag(false);
    } else {
      setDeleteFlag(true);
    }

    setIconsActive(value);
  };

  const dispatch = useDispatch();
  const [keys, setKeys] = useState([]);
  const [data, setData] = useState([]);
  let { option, optionId } = useParams();

  useEffect(() => {
    (async () => {
      let func;
      if (option == "rooms") {
        func = fetchGetRooms(deleteFlag);
        setKeys([...Object.keys(roomsInterface)]);
      } else if (option == "sales") {
        func = fetchGetSales(deleteFlag);
        setKeys([...Object.keys(saleInterface)]);
      } else if (option == "users") {
        func = fetchGetUsers(deleteFlag);
        setKeys([...Object.keys(usersInterface)]);
      } else if (option == "services") {
        func = fetchGetHotelServicesAdmin(deleteFlag);
        setKeys([...Object.keys(servicesInterface)]);
      } else if (option == "products") {
        func = fetchGetProductsAdmin(deleteFlag);
        setKeys([...Object.keys(productInterface)]);
      } else if (option == "posts") {
        func = fetchGetPostsAdmin(deleteFlag);
        setKeys([...Object.keys(postInterface)]);
      } else if (option == "bookings") {
        func = fetchGetBookingsAdmin(deleteFlag);
        setKeys([...Object.keys(bookingInterface)]);
      }
      const result = await dispatch(func)
        .then(unwrapResult)
        .then((originalPromiseResult) => {
          console.log(originalPromiseResult);
          const data = originalPromiseResult.data.items;
          setData(data);
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
        });
    })();
  }, [option, deleteFlag]);

  const deleteOption = async (id) => {
    let func;
    if (option == "rooms") {
      func = fetchDeleteRoom(id);
    } else if (option == "users") {
      func = fetchDeleteUser(id);
    } else if (option == "sales") {
      func = fetchDeleteSale(id);
    } else if (option == "services") {
      func = fetchDeleteHotelService(id);
    } else if (option == "products") {
      func = fetchDeleteProduct(id);
    } else if (option == "posts") {
      func = fetchDeletePost(id);
    }
    Swal.fire({
      title: "Bạn có chắc chắn xóa ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Chấp nhận",
    }).then(async (e) => {
      if (e.isConfirmed) {
        const result = await dispatch(func)
          .then(unwrapResult)
          .then((originalPromiseResult) => {
            console.log("delete", originalPromiseResult);
            Swal.fire("Xóa thành công", "", "success");
            setTimeout(() => {
              window.location.href = "/admin/" + option;
            }, 2000);
          })
          .catch((rejectedValueOrSerializedError) => {
            console.log(rejectedValueOrSerializedError);
            Swal.fire("Có lỗi xảy ra", "", "error");
          });
      }
    });
  };

  return (
    <>
      <div className="main-wrapper">
        <AdminHeader />
        <AdminSideBar />
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>{option.charAt(0).toUpperCase() + option.slice(1)} List</h4>
                <h6>
                  Manage your {option.charAt(0).toUpperCase() + option.slice(1)}
                </h6>
              </div>
              {option != "users" && option != "bookings" && (
                <div className="page-btn">
                  <a href={"/admin/add/" + option} className="btn btn-added">
                    <img src={adminPlus} alt="img" />
                    Add {option}
                  </a>
                </div>
              )}
            </div>
            <>
              <MDBTabs className="mb-3">
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleIconsClick("tab1")}
                    active={iconsActive === "tab1"}
                  >
                    <MDBIcon fas icon="database" />{" "}
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleIconsClick("tab2")}
                    active={iconsActive === "tab2"}
                  >
                    <MDBIcon fas icon="trash-alt" /> Trash
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>

              <MDBTabsContent>
                <MDBTabsPane show={iconsActive === "tab1"}>
                  <Card
                    option={option}
                    data={data}
                    keys={keys}
                    deleteOption={deleteOption}
                    deleteFlag={deleteFlag}
                  />
                </MDBTabsPane>
                <MDBTabsPane show={iconsActive === "tab2"}>
                  <Card
                    option={option}
                    data={data}
                    keys={keys}
                    deleteOption={deleteOption}
                    deleteFlag={deleteFlag}
                  />{" "}
                </MDBTabsPane>
                <MDBTabsPane show={iconsActive === "tab3"}>
                  Tab 3 content
                </MDBTabsPane>
              </MDBTabsContent>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManage;
