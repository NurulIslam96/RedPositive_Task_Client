import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Form from "./Form";
import Spinner from "./Spinner";
import UpdatableForm from "./UpdatableForm";

const Table = () => {
  const [modalStatus, setModalStatus] = useState(null);
  const [updateModal, setUpdateModal] = useState(null)
  const [selectValue, setSelectValue] = useState([]);
  const [user, setUser] = useState()

  const {
    data: usersCollection = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["usersCollection"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_api_link}/entries`);
      const data = await res.json();
      return data;
    },
  });

  if(isLoading){
    return <Spinner></Spinner>
  }

  const handleSetUser = (user) => {
    setUser(user)
    setUpdateModal("Active")
  }

  const handleSelectBox = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setSelectValue([...selectValue, value]);
    } else {
      setSelectValue(selectValue.filter((prevValue) => prevValue !== value));
    }
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Do you Really want to delete?");
    if (confirm) {
      fetch(`${process.env.REACT_APP_api_link}/delete/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Deleted Successfully");
            refetch();
          }
        });
    }
  };

  const handleSendEmail = () => {
    if (selectValue.length > 0) {
      const confirm = window.confirm("Do you want to send Email?");
      if (confirm) {
        fetch(`${process.env.REACT_APP_api_link}/sendMail`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(selectValue),
        })
          .then((res) => res.json())
          .then((data) => {
            if(data){
              toast.success(data.status)
            }
          });
      }
    } else {
      toast.error("Please Select atleast one user");
    }
  };

  return (
    <>
      <div className="overflow-x-auto w-full mt-10">
        <table className="table w-full text-center">
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Hobbies</th>
              <th>Update/Delete</th>
            </tr>
          </thead>
          <tbody>
            {usersCollection?.map((user, i) => (
              <tr key={user._id}>
                <th>
                  <label onChange={(e) => handleSelectBox(e)}>
                    <input
                      type="checkbox"
                      className="checkbox"
                      value={user._id}
                    />
                  </label>
                </th>
                <td>
                  <div>
                    <div>
                      <p>{i + 1}</p>
                    </div>
                  </div>
                </td>
                <td>{user?.name}</td>
                <td>{user?.number}</td>
                <td>{user?.email}</td>
                <td>{user?.hobbies}</td>
                <td className="flex flex-col gap-2">
                  <label onClick={()=>handleSetUser(user)} htmlFor="update-modal" className="btn btn-xs">
                    Update
                  </label>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(user._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalStatus && (
        <>
          <Form refetch={refetch} setModalStatus={setModalStatus} />
        </>
      )}
      {user && updateModal && <UpdatableForm
            user={user}
            refetch={refetch}
            setUpdateModal={setUpdateModal}
          ></UpdatableForm>}
      <div className="bg-[#F2F2F2] rounded py-2 text-center">
        <label
          htmlFor="modal-user"
          className="btn"
          onClick={() => setModalStatus("Active")}
        >
          Add New Data
        </label>
        <button className="btn mx-5" onClick={() => handleSendEmail()}>
          Send
        </button>
      </div>
    </>
  );
};

export default Table;
