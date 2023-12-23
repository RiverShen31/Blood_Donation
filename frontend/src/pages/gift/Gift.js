import TeddyImg from "../../assets/giftItem/teddy.png";
import BagImg from "../../assets/giftItem/bag.jpg";
import BowlSetImg from "../../assets/giftItem/bowl-set.jpg";
import CactusImg from "../../assets/giftItem/cactus.png";
import GlassesImg from "../../assets/giftItem/glasses.png";
import HelmetImg from "../../assets/giftItem/helmet.png";
import LaptopBagImg from "../../assets/giftItem/laptop-bag.jpeg";
import ShampooImg from "../../assets/giftItem/shampoo.png";
import SucculentImg from "../../assets/giftItem/succulent.png";
import SuperTepidImg from "../../assets/giftItem/super-tepid.png";
import TeaSetImg from "../../assets/giftItem/tea-set.png";
import TeddyOctopusImg from "../../assets/giftItem/teddy-octopus.jpg";
import { useEffect, useState } from "react";
import API from "../../services/API";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import ModalGift from "./../../components/shared/modal/ModalGift";
import { useNavigate } from "react-router-dom";

const imgArray = [
  BagImg,
  BowlSetImg,
  CactusImg,
  GlassesImg,
  HelmetImg,
  LaptopBagImg,
  ShampooImg,
  SucculentImg,
  SuperTepidImg,
  TeaSetImg,
  TeddyOctopusImg,
  TeddyImg,
];

const GiftList = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const [selectedRecord, setSelectedRecord] = useState(null);
  const handleUpdate = (record) => {
    setSelectedRecord(record);
  };

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are you sure want to delete this gift",
        "sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/gift/delete-gift/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const ReceivedGift = async (record) => {
    console.log(record);
    console.log(user.point);
    if (user?.point < record.point) {
      alert("You do not have enough point");
      return;
    }
    if (record.remain < 1) {
      alert("This gifts is out of stock");
      return;
    }
    const {data} = await API.put(`gift/update-gift/${record._id}`,{
      giftName: record.giftName,
      point: record.point,
      remain: record.remain-1
    });
    console.log(data);
    const {data: data1} = await API.put(`gift/update-user-point/${user._id}`,{
      point: user.point - record.point
    });
    console.log(data1);
    if (data?.success) {
      alert("Received Successfully");
      navigate("/gift");
      window.location.reload();
    }
  }

  // find gift data
  const getGifts = async () => {
    try {
      const { data } = await API.get("/gift/gift-list");
      // console.log(data);
      if (data?.success) {
        setData(data?.giftData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   console.log(user);
  // });

  useEffect(() => {
    getGifts();
  }, []);

  return (
    <Layout>
      <h1>GIFT PAGE</h1>
      {user?.role === "donar" && (
        <div className="container">
          <p>Your point: {user?.point || 0}</p>
        </div>
      )}
      {user?.role === "organisation" && (
        <div className="col-md-3">
        <button
          className="btn btn-primary mb-4"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          style={{ cursor: "pointer" }}
        >
          Add Gift
        </button>
        </div>
      )}
      <div className="container">
        <div className="row">
          {data?.map((record, index) => (
            <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                <img src={imgArray[index]} alt="" width="150px" />
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
                            onClick={() => handleUpdate(record)}s
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
                {user?.role === "donar" && (
                    <div>
                        <button type="button" className="btn btn-primary" onClick={() => ReceivedGift(record)}>
                            Choose
                        </button>
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ModalGift  record={selectedRecord}/>
      {/* <ModalGift /> */}
    </Layout>
  );
};

export default GiftList;
