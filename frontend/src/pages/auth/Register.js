import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="container bg-success">
          <div className="row">
            <div className="col-md-6 offset-md-3 ">
              <div className="card my-5">
                <div className="card-body cardbody-color p-lg-5">
                  <div className="text-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfc4K28Spv8uCxDf8QsWzcH8N-h1QK_4oly2RzUsDaiMb6mPu2SPHNFfeMeklz5dOwnCY&usqp=CAU"
                      // src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                      className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                      width="200px"
                      alt="profile"
                    />
                  </div>
                  <Form
                    formTitle={"Register"}
                    submitBtn={"Register"}
                    formType={"register"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
