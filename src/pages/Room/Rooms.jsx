import Title from "../../components/Title";
import Header from "../../components/Header";
import OwlCarousel from "react-owl-carousel";

import flag from "../../assets/img/flag.jpg";
import room1 from "../../assets/img/room/room-1.jpg";
import room2 from "../../assets/img/room/room-2.jpg";
import room3 from "../../assets/img/room/room-3.jpg";
import room4 from "../../assets/img/room/room-4.jpg";
import room5 from "../../assets/img/room/room-5.jpg";
import room6 from "../../assets/img/room/room-6.jpg";
import { useDispatch } from "react-redux";
import {
  fetchGetRooms,
  fetchGetAvailableRooms,
} from "../../store/roomSlice/roomSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Rooms = () => {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await dispatch(fetchGetAvailableRooms({}))
        .then(unwrapResult)
        .then((originalPromiseResult) => {
          setRooms(originalPromiseResult.data.items);
          console.log(originalPromiseResult.data.items);
          console.log(rooms);
          // handle result here
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
          // handle result here
        });
    })();

    // return () => {}; // no-op
  }, []);

  return (
    <div>
      <Header />
      {Title("Our Rooms", "Rooms")}
      {/* Breadcrumb Section End */}
      {/* Rooms Section Begin */}
      <section className="rooms-section spad">
        <div className="container">
          <div className="row">
            {rooms &&
              rooms.map((room) => {
                return (
                  <div key={room.id} className="col-lg-4 col-md-6">
                    <div
                      style={{ boxShadow: "0 0 10px #8888" }}
                      className="room-item"
                    >
                      <OwlCarousel
                        style={{
                          // position: "absolute",
                          top: "0",
                          width: "100%",
                        }}
                        className="owl-main hero-slider"
                        items={1}
                        loop
                      >
                        {room?.medias?.map((media) => {
                          return (
                            <div className="item hs-item set-bg">
                              <img
                                style={{ height: "250px", width: "100%" }}
                                src={media.url}
                                alt=""
                              />
                            </div>
                          );
                        })}
                      </OwlCarousel>

                      <div className="ri-text">
                        <h4>{room.name}</h4>
                        <h3>
                          {room.price} VNĐ<span>/Pernight</span>
                        </h3>
                        <table>
                          <tbody>
                            <tr>
                              <td className="r-o">Type:</td>
                              <td>{room.type}</td>
                            </tr>
                            <tr>
                              <td className="r-o">Capacity:</td>
                              <td>Max persion {room.capacity}</td>
                            </tr>
                            <tr>
                              <td className="r-o">Bed:</td>
                              <td>{room.bed}</td>
                            </tr>
                            <tr>
                              <td className="r-o">Size:</td>
                              <td>{room.size}</td>
                            </tr>
                          </tbody>
                        </table>
                        <Link
                          className="primary-btn"
                          to={"/room-detail/" + room.id}
                        >
                          More Details
                        </Link>
                        {!room.isAvailable && (
                          <div
                            style={{ marginLeft: "8px", color: "red" }}
                            className="primary-btn"
                          >
                            Booked
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="col-lg-12">
              <div className="room-pagination">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">
                  Next <i className="fa fa-long-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Rooms Section End */}
    </div>
  );
};

export default Rooms;
