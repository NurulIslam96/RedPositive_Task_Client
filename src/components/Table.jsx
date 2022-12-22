import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Form from "./Form";

const Table = () => {
  const [modalStatus, setModalStatus] = useState(null);

  const {
    data: usersCollection = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["usersCollection"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/entries");
      const data = await res.json();
      return data;
    },
  });


  const handleDelete = (id) => {
    const confirm = window.confirm("Do you Really want to delete?");
    if (confirm) {
      fetch(`http://localhost:5000/delete/${id}`, {
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
                  <label>
                    <input type="checkbox" className="checkbox" />
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
                  <button className="btn btn-xs">Update</button>
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
        <Form refetch={refetch}
        setModalStatus={setModalStatus}
        />
      )}
      <div className="bg-[#F2F2F2] rounded py-2 text-center">
        <label htmlFor="modal-user" className="btn" onClick={()=>setModalStatus("Active")}>
          Add New Data
        </label>
        <button className="btn mx-5">Send</button>
      </div>
    </>
  );
};

export default Table;
