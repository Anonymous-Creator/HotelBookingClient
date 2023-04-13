import React from "react";
import adminFilter from "../../assets/img/admin/adminFilter.png";
import admionSearchWhite from "../../assets/img/admin/admionSearchWhite.png";
import excel from "../../assets/img/admin/excel.png";
import pdf from "../../assets/img/admin/pdf.png";
import printer from "../../assets/img/admin/printer.png";
import eye from "../../assets/img/admin/eye.png";
import edit from "../../assets/img/admin/edit.png";
import adminDelete from "../../assets/img/admin/adminDelete.png";
import lock from "../../assets/img/admin/lock.png";
import { Link } from "react-router-dom";
const Card = ({ option, data, keys, deleteOption, deleteFlag }) => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="table-top">
            <div className="search-set">
              <div className="search-path">
                <a className="btn btn-filter" id="filter_search">
                  <img src={adminFilter} alt="img" />
                  <span></span>
                </a>
              </div>
              <div className="search-input">
                <a className="btn btn-searchset">
                  <img src={admionSearchWhite} alt="img" />
                </a>
                <div
                  id="DataTables_Table_0_filter"
                  className="dataTables_filter"
                >
                  <label>
                    {" "}
                    <input
                      type="search"
                      className="form-control form-control-sm"
                      placeholder="Search..."
                      aria-controls="DataTables_Table_0"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="wordset">
              <ul>
                <li>
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="pdf"
                  >
                    <img src={pdf} alt="img" />
                  </a>
                </li>
                <li>
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="excel"
                  >
                    <img src={excel} alt="img" />
                  </a>
                </li>
                <li>
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="print"
                  >
                    <img src={printer} alt="img" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* render here */}
          <div className="card" id="filter_inputs">
            <div className="card-body pb-0">
              <div className="row">
                <div className="col-lg-2 col-sm-6 col-12">
                  <div className="form-group">
                    <input type="text" placeholder="Enter Customer Code" />
                  </div>
                </div>
                <div className="col-lg-2 col-sm-6 col-12">
                  <div className="form-group">
                    <input type="text" placeholder="Enter Customer Name" />
                  </div>
                </div>
                <div className="col-lg-2 col-sm-6 col-12">
                  <div className="form-group">
                    <input type="text" placeholder="Enter Phone Number" />
                  </div>
                </div>
                <div className="col-lg-2 col-sm-6 col-12">
                  <div className="form-group">
                    <input type="text" placeholder="Enter Email" />
                  </div>
                </div>
                <div className="col-lg-1 col-sm-6 col-12 ms-auto">
                  <div className="form-group">
                    <a className="btn btn-filters ms-auto">
                      <img src="assets/img/icons/search-whites.svg" alt="img" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table datanew">
              <thead>
                <tr>
                  {keys && keys.map((key) => <th>{key}</th>)}
                  <th>Settings</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => (
                    <tr>
                      {keys && keys.map((key) => <td>{item[key]}</td>)}
                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Link
                          className="me-3"
                          to={"/admin/update/" + option + "/" + item["id"]}
                          style={{ marginRight: "8px" }}
                        ></Link>
                        {option == "bookings" && (
                          <Link
                            className="me-3"
                            to={"/admin/update/" + option + "/" + item["id"]}
                          >
                            <img src={eye} alt="img" />
                          </Link>
                        )}
                        {option != "bookings" && (
                          <>
                            <Link
                              className="me-3"
                              to={"/admin/update/" + option + "/" + item["id"]}
                            >
                              <img src={edit} alt="img" />
                            </Link>
                            <a
                              className="me-3 confirm-text"
                              href="#"
                              onClick={() => deleteOption(item["id"])}
                            >
                              <img src={adminDelete} alt="img" />
                            </a>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {data && data.length == 0 && (
              <div style={{ textAlign: "center", padding: "12px" }}>
                no {option} data
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
