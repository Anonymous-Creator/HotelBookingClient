import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./billModal.scss";

const BillModal = ({
  displayModal,
  statusModal,
  messageModal,
  callback,
  booking,
  url,
}) => {
  const [display, setDisplay] = useState(displayModal);
  const [status, setStatus] = useState(statusModal);
  const [message, setMessage] = useState(messageModal);

  useEffect(() => {
    setDisplay(displayModal);
    setStatus(statusModal);
    setMessage(messageModal);
    // console.log(displayModal, statusModal, messageModal);
  }, [displayModal, statusModal, messageModal]);

  console.log(booking);

  return (
    <div>
      {/* Modal HTML */}
      <div
        style={{
          display: display ? "block" : "none",
          overflowX: "scroll",
        }}
        id="myModal"
        className={"modal" + " fade " + (display ? "show" : "")}
      >
        <div className="modal-dialog modal-confirm">
          <div
            className="modal-content"
            style={{ height: "600px", overflowX: "scroll" }}
          >
            <div className="container mt-6 mb-7">
              <div className="row justify-content-center">
                <div className="">
                  <div className="card">
                    <div className="card-body p-5">
                      <h2>
                        Hey{" "}
                        {booking &&
                          Object.keys(booking).length > 0 &&
                          booking.createdBy.firstName}
                        ,
                      </h2>
                      <p className="fs-sm">
                        This is the receipt for a payment of{" "}
                        <strong>$312.00</strong> (USD) you made to Spacial
                        Themes.
                      </p>
                      <div className="border-top border-gray-200 pt-4 mt-4">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="text-muted mb-2">Payment No.</div>
                            <strong>
                              {booking &&
                                Object.keys(booking).length > 0 &&
                                booking.id}
                            </strong>
                          </div>
                          <div className="col-md-6 text-md-end">
                            <div className="text-muted mb-2">Payment Date</div>
                            <strong>
                              {booking &&
                                Object.keys(booking).length > 0 &&
                                booking.checkOut}
                            </strong>
                          </div>
                        </div>
                      </div>
                      <div className="border-top border-gray-200 mt-4 py-4">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="text-muted mb-2">Client</div>
                            <strong>
                              {booking &&
                                Object.keys(booking).length > 0 &&
                                booking.createdBy.lastName.concat(
                                  " " + booking.createdBy.firstName
                                )}
                            </strong>
                            {/* <p className="fs-sm">
                              989 5th Avenue, New York, 55832
                              <br />
                              <a href="#!" className="text-purple">
                                john@email.com
                              </a>
                            </p> */}
                          </div>
                          <div className="col-md-6 text-md-end">
                            <div className="text-muted mb-2">Payment To</div>
                            <strong>Themes LLC</strong>
                            <p className="fs-sm">
                              Thanh Xuan, Ha Noi
                              <br />
                              <a href="#!" className="text-purple">
                                thanhhuonghotelluxury@gmail.com
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                      <table className="table border-bottom border-gray-200 mt-3">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="fs-sm text-dark text-uppercase-bold-sm px-0"
                            >
                              Description
                            </th>
                            <th
                              scope="col"
                              className="fs-sm text-dark text-uppercase-bold-sm text-end px-0"
                            >
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-0">Services</td>
                            <td className="text-end px-0">
                              {booking &&
                                Object.keys(booking).length > 0 &&
                                booking.totalServicePrice.toLocaleString(
                                  "it-IT",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-0">Rooms</td>
                            <td className="text-end px-0">
                              {booking &&
                                Object.keys(booking).length > 0 &&
                                booking.totalRoomPrice.toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="mt-5">
                        <div className="d-flex justify-content-end">
                          <p className="text-muted me-3">Subtotal:</p>
                          <span>
                            {booking &&
                              Object.keys(booking).length > 0 &&
                              (
                                booking.totalRoomPrice +
                                booking.totalServicePrice
                              ).toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                          </span>
                        </div>
                        <div className="d-flex justify-content-end">
                          <p className="text-muted me-3">Surcharges:</p>
                          <span>
                            {booking &&
                              Object.keys(booking).length > 0 &&
                              booking.surcharges.length > 0 &&
                              booking.surcharges
                                .reduce((total, item) => {
                                  return total + item.roomSurcharge;
                                }, 0)
                                .toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                          </span>
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                          <h5 className="me-3">Total:</h5>
                          <h5 className="text-success">
                            {booking &&
                              Object.keys(booking).length > 0 &&
                              (
                                booking.totalRoomPrice +
                                booking.totalServicePrice +
                                booking.surcharges.reduce((total, item) => {
                                  return total + item.roomSurcharge;
                                }, 0)
                              ).toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <a
                      href="#!"
                      className="btn btn-dark btn-lg card-footer-btn justify-content-center text-uppercase-bold-sm hover-lift-light"
                    >
                      <span className="svg-icon text-white me-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={512}
                          height={512}
                          viewBox="0 0 512 512"
                        >
                          <title>ionicons-v5-g</title>
                          <path
                            d="M336,208V113a80,80,0,0,0-160,0v95"
                            style={{
                              fill: "none",
                              stroke: "#000",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "32px",
                            }}
                          />
                          <rect
                            x={96}
                            y={208}
                            width={320}
                            height={272}
                            rx={48}
                            ry={48}
                            style={{
                              fill: "none",
                              stroke: "#000",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "32px",
                            }}
                          />
                        </svg>
                      </span>
                      Pay Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body text-center">
              <Link
                // to={"/admin/bookings"}
                className="btn btn-success"
                data-dismiss="modal"
                onClick={() => {
                  callback();
                }}
              >
                <span>Quay lại</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ display: display ? "block" : "none" }}
        class={"modal-backdrop" + " fade " + (display ? "show" : "")}
      ></div>
    </div>
  );
};

export default BillModal;
