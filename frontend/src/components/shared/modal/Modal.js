import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InputType from "./../Form/InputType";
import API from "./../../../services/API";

const Modal = () => {
  const [data, setData] = useState([]);

  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  // const [email, setEmail] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const { user } = useSelector((state) => state.auth);

  // get org lists
  const getOrgs = async () => {
    try {
      const { data } = await API.get("/inventory/org-list");
      console.log(data);
      if (data?.success) {
        setData(data?.orgData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle modal data
  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return alert("Please Provide All Fields");
      }
      // console.log(user?._id);
      const { data } = await API.post("/inventory/create-inventory", {
        email: user?.email,
        organisationName,
        inventoryType,
        bloodGroup,
        quantity,
        accepted: "process",
      });
      console.log(data);
      // if (user?.role === "donar") {
      //   const { data: data1 } = await API.put(
      //     `gift/update-user-point/${user._id}`,
      //     {
      //       point: user.point + 50,
      //     }
      //   );
      //   console.log(data1);
      // }
      if (data?.success) {
        alert("New Record Created");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
      window.location.reload();
    }
  };

  useEffect(() => {
    getOrgs();
  }, []);

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="d-flex mb-3">
                Blood Type: &nbsp;
                {user?.role === "donar" && (
                  <div className="form-check ms-3">
                    <input
                      type="radio"
                      name="inRadio"
                      value={"in"}
                      onChange={(e) => setInventoryType(e.target.value)}
                      className="form-check-input"
                    />
                    <label htmlFor="in" className="form-check-label">
                      IN
                    </label>
                  </div>
                )}
                {user?.role === "hospital" && (
                  <div className="form-check ms-3">
                    <input
                      type="radio"
                      name="inRadio"
                      value={"out"}
                      onChange={(e) => setInventoryType(e.target.value)}
                      className="form-check-input"
                    />
                    <label htmlFor="out" className="form-check-label">
                      OUT
                    </label>
                  </div>
                )}
              </div>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option defaultValue={"Open this select menu"}>
                  Open this select menu
                </option>
                <option value={"O+"}>O+</option>
                <option value={"O-"}>O-</option>
                <option value={"AB+"}>AB+</option>
                <option value={"AB-"}>AB-</option>
                <option value={"A+"}>A+</option>
                <option value={"A-"}>A-</option>
                <option value={"B+"}>B+</option>
                <option value={"B-"}>B-</option>
              </select>
              {/* <InputType
                labelText={"Donar Email"}
                labelFor={"donarEmail"}
                inputType={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /> */}
              <hr></hr>
              <label style={{marginBottom: "5px"}}>Organisation Name</label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
              >
                <option defaultValue={"Open this select menu"}>
                  Open this select menu
                </option>
                {data?.map((record) => (
                  <option key={record._id} value={record.organisationName}>
                    {record.organisationName}
                  </option>
                ))}
              </select>

              {/* <InputType 
                labelText={"Organisation Name"}
                labelFor={"organisationName"}
                inputType={"text"}
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
              /> */}
              <br></br>
              {/* <InputType
                labelText={"Quanitity (ML)"}
                labelFor={"quantity"}
                inputType={"Number"}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              /> */}
              <p style={{marginBottom: "5px"}}>Quantity</p>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              >
                <option defaultValue={"Open this select menu"}>
                  Open this select menu
                </option>
                <option value={"250"}>250</option>
                <option value={"300"}>300</option>
                <option value={"350"}>350</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleModalSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
