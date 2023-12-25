import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import moment from "moment";
import API from "../services/API";
import { useSelector } from "react-redux";

const Request = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const handleDeny = async (id) => {
    try {
      let answer = window.prompt(
        "Are you sure want to accept this request?",
        "Sure"
      );
      if (!answer) return;
      console.log(id);
      const {data} = await API.put(`request/update-request/${id}`,{
        accepted: "deny",
      })
      console.log(data);
      if (data?.success) {
        alert("Accepted Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAccept = async (id, donar) => {
    try {
      let answer = window.prompt(
        "Are you sure want to accept this request?",
        "Sure"
      );
      if (!answer) return;
      console.log(id);
      const {data} = await API.put(`request/update-request/${id}`,{
        accepted: "accept",
      })
      // const {data: data1} = await API.put(`gift/update-user-point/${donar}`,{
      //   point: 50, 
      // });
      // console.log(data);
      if (data?.success) {
        const {data: userData} = await API.get(`gift/get-user/${donar}`);
        if (userData?.success) {
          console.log(userData.userData);
          console.log(userData);
          const {data: updateData} = await API.put(`gift/update-user-point/${donar}`,{
            point: userData.userData.point + 50,
          });
          if (updateData?.success) {
            alert("Accepted Successfully");
            window.location.reload();
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/request/get-request-in");
      if (data?.success) {
        setData(data?.requestData);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, [user]);

  return (
    <Layout>
      <h1>Requset</h1>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Blood Group</th>
            <th scope="col">Inventory Type</th>
            <th scope="col">Quantity</th>
            <th scope="col">Donar Email</th>
            <th scope="col">Time & Date</th>
            <th scope="col">Accepted</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.bloodGroup}</td>
              <td>{record.inventoryType}</td>
              <td>{record.quantity} (ML)</td>
              <td>{record.email}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                <div>
                  <button className="btn btn-primary" style={{marginRight: "5px"}} onClick={() => handleAccept(record._id, record.donar)}>Accept</button>
                  <button className="btn btn-primary" onClick={() => handleDeny(record._id)}>Deny</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Request;
