import teddybear from "../../assets/giftItem/teddybear.png";
import bag from "../../assets/giftItem/bag.jpg";
import bowlset from "../../assets/giftItem/bowlset.jpg";
import cactus from "../../assets/giftItem/cactus.png";
import glasses from "../../assets/giftItem/glasses.png";
import helmet from "../../assets/giftItem/helmet.png";
import laptopbag from "../../assets/giftItem/laptopbag.jpeg";
import shampoo from "../../assets/giftItem/shampoo.png";
import succulent from "../../assets/giftItem/succulent.png";
import supertepid from "../../assets/giftItem/supertepid.png";
import teaset from "../../assets/giftItem/teaset.png";
import teddyoctopus from "../../assets/giftItem/teddyoctopus.jpg";
import error from "../../assets/giftItem/error.png";
import React, { useEffect, useState } from "react";
import API from "../../services/API";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import ModalGift from "./../../components/shared/modal/ModalGift";
import { useNavigate } from "react-router-dom";

import "./index.css";
import { AnimatePresence } from "framer-motion";
import Listing from "./Listing";
import Overlay from "./Overlay";
import Item from "./Item";

const imgArray = [
  error,
  bag,
  bowlset,
  cactus,
  glasses,
  helmet,
  laptopbag,
  shampoo,
  succulent,
  supertepid,
  teaset,
  teddyoctopus,
  teddybear,
];

const GiftList = () => {
  const [open, setOpen] = useState(null);

  const openItem = (index) => {
    setOpen(index);
  };

  const closeItem = () => {
    setOpen(null);
  };

  // const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // const [selectedRecord, setSelectedRecord] = useState(null);
  // const handleUpdate = (record) => {
  //   setSelectedRecord(record);
  // };

  // const handleDelete = async (id) => {
  //   try {
  //     let answer = window.prompt(
  //       "Are you sure want to delete this gift",
  //       "sure"
  //     );
  //     if (!answer) return;
  //     const { data } = await API.delete(`/gift/delete-gift/${id}`);
  //     alert(data?.message);
  //     window.location.reload();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // find gift data
  const getGifts = async () => {
    try {
      const { data } = await API.get("/gift/gift-list");
      console.log(data);
      if (data?.success) {
        setData(data?.giftData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const findGiftImage = (giftName) => {
  //   const formattedGiftName = giftName.toLowerCase().replace(/[_-]/g, "");
  //   const index = imgArray.findIndex((img) =>
  //     img.toLowerCase().includes(formattedGiftName)
  //   );
  //   if (index !== -1) {
  //     return imgArray[index];
  //   }
  //   return imgArray[0];
  // };
  

  useEffect(() => {
    getGifts();
  }, []);

  return (
    <Layout>
      <br></br>
      {user?.role === "donar" && (
        <div className="container">
          <p>Your point: {user?.point || 0}</p>
        </div>
      )}
      {user?.role === "organisation" && (
        <div className="divButton">
          <button
            className="mb-4 button-89"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style={{ cursor: "pointer" }}
          >
            Add Gift
          </button>
        </div>
      )}
      <div className="container">
        {/* <div className="row">
          {data?.map((record) => (
            <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                <img
                  src={findGiftImage(record.giftName)}
                  alt=""
                  width="150px"
                />
                <div className="card-body">
                  <p className="card-text">Name: {record.giftName}</p>
                  <p className="card-text">Point: {record.point}</p>
                  <p className="card-text">Remain: {record.remain}</p>
                </div>
                {user?.role === "organisation" && (
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <div
                          className="ms-4"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          style={{ cursor: "pointer" }}
                        >
                          <button
                            onClick={() => handleUpdate(record)}
                            s
                            type="button"
                            className="btn btn-primary"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <button
                          onClick={() => handleDelete(record._id)}
                          type="button"
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div> */}
      </div>
      <div className="properties">
        {data?.map((record, index) => (
          <div key={index}>
            <Listing data={record} open={() => openItem(index)}/>
            <AnimatePresence>
              {open === index && (<>
                <Overlay close={closeItem}>
                  {/* <h1>{record.giftName}</h1> */}
                  <Item giftData={record} close={closeItem} isOpen={open === index}/>
                </Overlay>
                </>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      {/* <ModalGift record={selectedRecord} /> */}
      <ModalGift />
    </Layout>
  );
};

export default GiftList;
