import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchGetHotelServices } from "../../store/hotelServiceSlice/hotelServiceSlice";
import room1 from "../../assets/img/room/room-1.jpg";
import "./services.scss";

const Services = ({ serviceCallBack }) => {
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await dispatch(fetchGetHotelServices())
        .then(unwrapResult)
        .then((originalPromiseResult) => {
          console.log(originalPromiseResult.data.items);
          setServices(originalPromiseResult.data.items);
          // console.log(services);
          // handle result here
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
          // handle result here
        });
    })();
  }, []);

  return (
    <>
      {services &&
        services.map((service) => (
          <div className="booking-servies">
            <div className="booking-servies__left">
              <img src={service.thumbnail} />
            </div>
            <div className="booking-servies__right">
              <h4>{service.title}</h4>
              <p>
                {service.description.length <= 130
                  ? service.description
                  : service.description.slice(0, 126).concat("...")}
              </p>
              <h6>{service.price}€</h6>
              <button
                class="btn btn-link p-0"
                onClick={(e) => {
                  serviceCallBack(service);
                }}
              >
                Add service
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default Services;
