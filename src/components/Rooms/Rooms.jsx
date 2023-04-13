import Title from "../../components/Title";
import Header from "../../components/Header";

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
import "./room.scss";

const Rooms = ({
  expectedCheckIn,
  expectedCheckOut,
  num,
  type,
  roomCallBack,
}) => {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);

  // console.log({ expectedCheckIn, expectedCheckOut, num, type });
  const transferDateTimeToTime = (dateTime) => {
    const time = dateTime.split("T")[0];
    return time;
  };

  useEffect(() => {
    (async () => {
      const result = await dispatch(
        fetchGetAvailableRooms({
          expectedCheckIn: transferDateTimeToTime(expectedCheckIn),
          expectedCheckOut: transferDateTimeToTime(expectedCheckOut),
          num,
          type,
        })
      )
        .then(unwrapResult)
        .then((originalPromiseResult) => {
          setRooms(originalPromiseResult.data.items);
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
        });
    })();
    transferDateTimeToTime(expectedCheckIn);
    // console.log()
    // console.log(expectedCheckIn, expectedCheckOut, num, type);
  }, [expectedCheckIn, expectedCheckOut, num, type]);

  return (
    <div>
      <section className="rooms-section spad">
        <div className="">
          {rooms &&
            rooms.map((room) => {
              return (
                <div key={room.id} className="col-lg-12 col-md-6">
                  <div className="room-item" style={{ display: "flex" }}>
                    <div style={{ width: "40%" }}>
                      <img
                        style={{ width: "100%" }}
                        src={room?.medias?.[0]?.url}
                        alt=""
                      />
                    </div>
                    <div style={{ width: "60%" }} className="ri-text">
                      <h4>{room.name}</h4>
                      <h3>
                        {room &&
                          room.price.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}{" "}
                        <span>/Pernight</span>
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
                      <div style={{ marginTop: "30px" }}></div>
                      <button
                        className="btn btn-link p-0 btn-add-room"
                        onClick={(e) => {
                          roomCallBack(room);
                        }}
                        style={{
                          color: "#848492",
                          height: "40px",
                          width: "200px",
                        }}
                      >
                        Add to my booking
                      </button>
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
      </section>
      {/* Rooms Section End */}
    </div>
  );
};

export default Rooms;
