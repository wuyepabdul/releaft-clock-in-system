import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading } from "../../../helpers/loading";
import { getTodaysClockinsAction } from "../../../redux/actions/clockinAction";
import {filterClockins} from "../../../helpers/filter"

const TodayClockins = () => {
  const dispatch = useDispatch();

  const { todaysClockins } = useSelector((state) => state);
  const { clockins } = todaysClockins;
  useEffect(() => {
    dispatch(getTodaysClockinsAction());
  }, [dispatch]);
  return (
    <table className="table table-striped">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Staff</th>
            <th>Clockin</th>
            <th>Clockout</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="">
          {clockins && clockins.length === 0 && <h1 className='text-info'>No Clockins</h1> }
          {clockins && clockins.length !== 0
            ? clockins.map((clockin, index) => (
                <tr key={clockin.staff._id}>
                  <td>{index + 1}</td>
                  <td>{clockin.staff.name}</td>
                  <td>
                    {clockin.clockedIn ? new Date(clockin.clockedInAt).toLocaleTimeString() : (
                      <i className="fas fa-exclamation-circle text-warning"></i>
                    )}
                  </td>
                  <td>
                    {clockin.clockedOut ? new Date(clockin.clockedOutAt).toLocaleTimeString() : (
                      <i className="fas fa-exclamation-circle text-danger text-center"></i>
                    )}
                    {}
                  </td>
               

                  <td> {new Date(clockin.createdAt).toDateString()}</td>
                </tr>
              ))
            : <div>{showLoading()}</div>}
        </tbody>
      </table>
  );
};

export default TodayClockins;
