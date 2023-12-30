import React, { useEffect, useState } from "react";
import InputType from "../Form/InputType";
import API from "../../../services/API";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalGift = ({ record }) => {
  const navigate = useNavigate();
  const [giftName, setGiftName] = useState("");
  const [point, setPoint] = useState(0);
  const [remain, setRemain] = useState(0);

  useEffect(() => {
    if (record) {
      setGiftName(record.giftName);
      setPoint(record.point);
      setRemain(record.remain);
    }
  }, [record]);

  // handle modal data
  const handleModalSubmit = async () => {
    try {
      if (!giftName || !point || !remain) {
        return alert("Please Provide All Fields");
      }

      if (record) {
        // update existing record
        const { data } = await API.put(`gift/update-gift/${record._id}`, {
          giftName,
          point,
          remain,
        });
        if (data?.success) {
          alert("Gift Updated");
          navigate("/gift");
          window.location.reload();
        }
      } else {
        const { data } = await API.post("/gift/create-gift", {
          giftName,
          point,
          remain,
        });
        if (data?.success) {
          alert("New Gift Created");
          navigate("/gift");
          window.location.reload();
        }
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
      window.location.reload();
    }
  };

  useEffect(() => {
    const backdrop = document.getElementById("staticBackdrop");
    if (backdrop) {
      backdrop.addEventListener("hidden.bs.modal", handleModalClose);
    }

    return () => {
      if (backdrop) {
        backdrop.removeEventListener("hidden.bs.modal", handleModalClose);
      }
    };
  }, []);

  const handleModalClose = () => {
    // Reset form fields when the modal is closed
    setGiftName("");
    setPoint(0);
    setRemain(0);
  };

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
        <Box sx={style}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Gift Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <TextField fullWidth label="Gift Name" id="giftName" value={giftName}
                onChange={(e) => setGiftName(e.target.value)}/>
              <div></div>
              <br></br>
              <TextField type="Number" fullWidth label="Gift Point" id="giftPoint" value={point}
                onChange={(e) => setPoint(e.target.value)}/>
              <div></div>
              <br></br>
              <TextField type="Number" fullWidth label="Remain" id="remain" value={remain}
                onChange={(e) => setRemain(e.target.value)}/>
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
        </Box>
      </div>
    </>
  );
};

export default ModalGift;
