import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingButton, showLoading } from "../../helpers/loading";
import { showErrorMessage, showSuccessMessage } from "../../helpers/message";
import {
  getUserDetailsAction,
  updateUserProfileAction,
} from "../../redux/actions/userActions";
import { isEmpty } from "validator";
import Meta from "../../components/Meta/Meta";

const ProfileScreen = ({ history }) => {
  const [userProfileData, setUserProfileData] = useState({
    name: "",
    email: "",
    department: "",
    staffId: "",
    message: "",
    errorMessage: "",
  });

  const { name, email, department, staffId, errorMessage } = userProfileData;
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error: userError, loading: userLoading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading, success: uploadSuccess } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (user.name === undefined || !user.name) {
        dispatch(getUserDetailsAction());
      } else {
        setUserProfileData({
          name: user.name,
          email: user.email,
          department: user.department,
          staffId: user.staffId,
        });
      }
    }
  }, [dispatch, history, userInfo, user]);

  const handleChange = (e) => {
    setUserProfileData({
      ...userProfileData,
      [e.target.name]: e.target.value,
      errorMessage: "",
      successMessage: false,
      message: "",
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = { id: user._id, name };
    if (isEmpty(name)) {
      setUserProfileData({
        ...userProfileData,
        errorMessage: "Name cannot be empty",
      });
    } else {
      dispatch(updateUserProfileAction(userData));
    }
  };

  return (
    <div className="container-fluid">
      {console.log("user", user)}
      <Meta title={`Profile ${user.name}`} />
      <div className="mt-3 row">
        <div className="col-md-3 mt-3"></div>
        {userLoading ? (
          showLoading()
        ) : userError ? (
          showErrorMessage(errorMessage)
        ) : (
          <>
            <div className="col-md-6 mt-3">
              {uploadSuccess && showSuccessMessage("Profile Updated")}
              <form onSubmit={submitHandler}>
                <div className="col mb-3 ">
                  <label for="name" className="col-sm-2 col-form-label">
                    Name
                  </label>
                  <div>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="name"
                      value={name}
                      className="form-control"
                      id="name"
                    />
                  </div>
                </div>
                <div className="col mb-3 ">
                  <label for="staffId" className="col-sm-2 col-form-label">
                    Staff ID
                  </label>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      id="staffId"
                      value={staffId}
                      disabled
                    />
                  </div>
                </div>
                <div className="col mb-3 ">
                  <label for="email" className="col-sm-2 col-form-label">
                    Email
                  </label>
                  <div>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      disabled
                    />
                  </div>
                </div>

                <div className="col mb-3 ">
                  <label for="department" className="col-sm-2 col-form-label">
                    Department
                  </label>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      id="department"
                      value={department}
                      disabled
                    />
                  </div>
                </div>
                {updateLoading ? (
                  loadingButton()
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary form-control col-sm-8"
                  >
                    Update Record
                  </button>
                )}
              </form>
            </div>
            <div className="col-md-3 mt-3"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
