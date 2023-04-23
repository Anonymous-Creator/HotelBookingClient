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
        }
        console.log(promiseAll);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

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
                <Pie data={pieData} />
              </div>
              <div style={{ width: "70%" }} className="content-statistic-room">
                <Bar options={verticalOptions} data={verticalData} />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistic;
