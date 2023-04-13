import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCreateBooking } from "../../store/bookingSlice/bookingSlice";
import Swal from "sweetalert2";

const Reservation = ({
  expectedCheckIn,
  expectedCheckOut,
  num,
  type,
  room,
  reservation,
  services,
  step,
}) => {
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(services);
    // if (Object.keys(room).length > 0) {
    //   setPrice((prev) => prev + room.price);
    // }
    setPrice(room.price);
    if (services?.length > 0) {
      setPrice((prev) => prev + services[services.length - 1].price);
    }
  }, [room, services.length]);

  return (
    <section style={{ padding: "12px" }} className="card">
      <h2 className="mb-4">Reservation Summary</h2>
      <div className="d-flex justify-content-between">
        {/* <h3>{room.name}</h3> */}
        {/* <SelectList name="rooms" start={1} /> */}
      </div>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <div className="font-weight-bold">Check in</div>
          <div>
            {/* From 12.00h {expectedCheckIn && expectedCheckIn.split("T")[0]} */}
            From 12.00h {expectedCheckIn}
          </div>
        </div>
        <div>
          <div className="font-weight-bold">Check out</div>
          <div>
            {/* Before 12.00h {expectedCheckOut && expectedCheckOut.split("T")[0]} */}
            Before 14.00h {expectedCheckOut}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <div className="font-weight-bold">Reservation date</div>
        <div>
          {/* From <strong>{formatDateView(data.checkin)}</strong> to{" "}
          <strong>{formatDateView(data.checkout)}</strong> */}
        </div>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <div className="font-weight-bold">Title</div>
        <div>
          <strong>{room && room.name}</strong>
        </div>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <div className="font-weight-bold">People</div>
        <div>
          <strong>{num || room.capacity}</strong>
        </div>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <div className="font-weight-bold">Type</div>
        <div>
          <strong>{room && room.type}</strong>
        </div>
      </div>
      {services &&
        services.map((service) => {
          return (
            <>
              <div className="d-flex justify-content-between mb-3">
                <div className="font-weight-bold">{service.title}</div>
                <div>
                  <strong>
                    {" "}
                    {service.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </strong>
                </div>
              </div>
            </>
          );
        })}

      <div className="card-total">
        <div
          style={{ height: "1px", border: "1px solid black", margin: "4px 0" }}
        ></div>

        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="mb-3"
        >
          <div>
            <div
              style={{ fontWeight: "bold", fontSize: "20px" }}
              className="price"
            >
              Total
            </div>
          </div>
          <div className="price">
            {price &&
              price.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary btn-group-justified"
        onClick={async () => {
          if (step == 1) {
            if (Object.keys(room).length > 0) {
              reservation(step + 1);
            } else {
              alert("Vui lòng chọn phòng");
            }
          } else if (step == 2) {
            if (!(num == 0 || !room.capacity)) {
              alert("Vui lòng điền đầy đủ Check in, Check out");
            } else {
              // console.log({
              //   roomId: room.id,
              //   expectedCheckIn,
              //   expectedCheckOut,
              //   services,
              // });
              const servicesUpdate = services.map((service) => {
                return { serviceId: service.id, amount: 1 };
              });
              const result = await dispatch(
                fetchCreateBooking({
                  roomIds: [room.id],
                  expectedCheckIn,
                  expectedCheckOut,
                  services: servicesUpdate,
                })
              )
                .then(unwrapResult)
                .then((originalPromiseResult) => {
                  console.log(originalPromiseResult);
                  if (originalPromiseResult.status == "SUCCESS") {
                    Swal.fire("Đặt phòng thành công", "", "success");
                    reservation(step + 1);
                  } else {
                    Swal.fire("Có lỗi xảy ra", "", "error");
                  }
                })
                .catch((rejectedValueOrSerializedError) => {
                  Swal.fire("Có lỗi xảy ra", "", "error");
                  console.log(rejectedValueOrSerializedError);
                });
            }
          }
        }}
      >
        Continue
      </button>
    </section>
  );
};

export default Reservation;
