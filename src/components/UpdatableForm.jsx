import React, { useState } from "react";
import { toast } from "react-hot-toast";
import CreatableSelect from "react-select/creatable";

const UpdatableForm = ({ refetch, setUpdateModal, user }) => {
  const [hobbyCollection, setHobbyCollection] = useState([]);
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    if (hobbyCollection.length !== 0) {
      const userInfo = {
        name: form.name.value,
        number: form.number.value,
        email: form.email.value,
        hobbies: hobbyCollection.toString(),
      };
      fetch(`${process.env.REACT_APP_api_link}/updateEntry/${user._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            toast.success(data.status);
            setUpdateModal(null);
            refetch();
          } else {
            toast.error(data.status);
          }
        });
    }
  };

  const handleNewHobbies = (values) => {
    let hobbiesValue = [];
    values.map((value) => hobbiesValue.push(value.value));
    setHobbyCollection(hobbiesValue);
  };
  return (
    <>
      <input type="checkbox" id="update-modal" className="modal-toggle" />
      <div className="modal h-full">
        <div className="modal-box relative">
          <label
            htmlFor="update-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Update Entries</h3>
          <form
            onSubmit={(e) => handleUpdate(e)}
            className="form-control w-full"
          >
            <div>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                required
                className="border border-gray-300 w-full p-[6px] rounded"
                placeholder={user.name}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="number"
                required
                name="number"
                className="border border-slate-300 w-full p-[6px] rounded"
                placeholder={user.number}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                required
                className="border border-slate-300 w-full p-[6px] rounded"
                placeholder={user.email}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Hobbies</span>
              </label>
              <CreatableSelect
                closeMenuOnSelect={false}
                isMulti
                onChange={(e) => handleNewHobbies(e)}
              />
            </div>
            <div className="text-center mt-5 ">
              <button className="btn w-full" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatableForm;
