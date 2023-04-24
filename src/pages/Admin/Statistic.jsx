import React, { useEffect, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

import AdminHeader from "../../components/AdminHeader";
import AdminSIdeBar from "../../components/AdminSideBar";
import { pieData } from "../../configs/pieChart";
import { lineOptions } from "../../configs/lineChart";
import { verticalData, verticalOptions } from "../../configs/verticalChart";
import storageService from "../../services/storage.service";

const Statistic = () => {
  const [lineData, setLineData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [barData, setBarData] = useState(null);

  useMemo(() => {
    (async () => {
      try {
        const promiseAll = await Promise.allSettled([
          await (
            await fetch(
              `${
                process.env.REACT_APP_API_URL
              }/api/v1/statistic/revenue?fromMonth=1&toMonth=12&year=${new Date().getFullYear()}`,
              {
                headers: {
                  Authorization: "Bearer " + storageService.get("token"),
                },
              }
            )
          ).json(),
          await (
            await fetch(
              `${process.env.REACT_APP_API_URL}/api/v1/statistic/top-booking`,
              {
                headers: {
                  Authorization: "Bearer " + storageService.get("token"),
                },
              }
            )
          ).json(),
          await (
            await fetch(
              `${
                process.env.REACT_APP_API_URL
              }/api/v1/statistic/room-booked-month?month=${
                new Date().getMonth() + 1
              }&year=${new Date().getFullYear()}`,
              {
                headers: {
                  Authorization: "Bearer " + storageService.get("token"),
                },
              }
            )
          ).json(),
        ]);
        if (promiseAll[0].status == "fulfilled") {
          if (promiseAll[0].value.status == "SUCCESS") {
            const revenues = promiseAll[0].value.data;
            const data = revenues.map((revenue) => revenue.totalRevenue);
            const lineData = {
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              datasets: [
                {
                  label: "Dataset 1",
                  data: data,
                  borderColor: "#EA7C31",
                  backgroundColor: "#EA7C31",
                },
              ],
            };
            setLineData(lineData);
          }
          if (promiseAll[1].value.status == "SUCCESS") {
            const users = promiseAll[1].value.data;
            const data = users.map((user) => user.value);
            const labels = users.map((user) => user.user.firstName);
            const pieData = {
              labels: labels,
              datasets: [
                {
                  label: "# of Votes",
                  data: data,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            };

            setPieData(pieData);
          }
          if (promiseAll[2].value.status == "SUCCESS") {
            const rooms = promiseAll[2].value.data.items;
            const backgroundColor = [
              "rgba(255, 99, 132, 0.5)",
              "rgba(53, 162, 235, 0.5)",
              "rgba(53, 162, 235, 0.5)",
              "rgba(53, 162, 235, 0.5)",
              "rgba(53, 162, 235, 0.5)",
              "rgba(53, 162, 235, 0.5)",
              "rgba(53, 162, 235, 0.5)",
              "rgba(53, 162, 235, 0.5)",
              "rgba(53, 162, 235, 0.5)",
              "rgba(53, 162, 235, 0.5)",
            ];
            const data = rooms.map((item, index) => {
              return {
                label: item.room.name,
                data: item.value,
                backgroundColor: backgroundColor[index],
              };
            });
            const chartData = {
              labels: ["January"],
              datasets: data,
            };
            setBarData(chartData);
            console.log("chartData", chartData);
          }
        }
        // console.log(promiseAll);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  console.log(pieData);

  return (
    <>
      <div className="main-wrapper">
        <AdminHeader />
        <AdminSIdeBar option={"admin"} />
        <div className="page-wrapper">
          <div className="content">
            <div className="content-revenue"></div>
            <div
              style={{ display: "flex", width: "100%" }}
              className="content-statistic"
            >
              <div style={{ width: "80%" }} className="content-statistic-room">
                {lineData && <Line options={lineOptions} data={lineData} />}
              </div>
              <div style={{ width: "20%" }} className="content-statistic-room">
                {/* <Pie data={pieData} /> */}
              </div>
            </div>
            <div
              style={{ display: "flex", width: "100%" }}
              className="content-statistic"
            >
              <div style={{ width: "30%" }} className="content-statistic-room">
                {pieData && <Pie data={pieData} />}
              </div>
              <div style={{ width: "70%" }} className="content-statistic-room">
                {barData && (
                  <Bar
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        title: {
                          display: true,
                          text: "Statistics TOP 10 rooms",
                        },
                      },
                    }}
                    data={barData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistic;
