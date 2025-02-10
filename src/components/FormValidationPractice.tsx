"use client";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
}

const FormValidationPractice = () => {
  const SERVICE_ID = "service_tay6gaz";
  const TEMPLATE_ID = "template_nd92fqi";
  const USER_ID = "ACFWkn8tsi2tt71D6";

  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
  });

  const [tableData, setTableData] = useState<FormData[]>([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userTableData") || "[]");
    setTableData(storedData);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newData = [...tableData, formData];
    setTableData(newData);
    localStorage.setItem("userTableData", JSON.stringify(newData));

    const emailParams = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phonenumber: formData.phonenumber,
    };

    Swal.fire({
      title: "Done",
      text: "Form submitted successfully!",
      icon: "success",
      confirmButtonText: "Good",
    });

    emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams, USER_ID);

    setFormData({ firstname: "", lastname: "", email: "", phonenumber: "" });
  };

  const handleDelete = () => {
    localStorage.removeItem("userTableData");
    setTableData([]);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <form onSubmit={handleSubmit} className="max-w-[500px] mx-auto">
        <label className="text-black">First Name</label>
        <input
          name="firstname"
          value={formData.firstname}
          required
          onChange={handleChange}
          type="text"
          className="placeholder:text-black w-full mb-5 text-black border-black border p-4"
          placeholder="First Name"
        />

        <label className="text-black">Last Name</label>
        <input
          name="lastname"
          value={formData.lastname}
          required
          onChange={handleChange}
          type="text"
          className="placeholder:text-black w-full mb-5 text-black border-black border p-4"
          placeholder="Last Name"
        />

        <label className="text-black">Email</label>
        <input
          name="email"
          value={formData.email}
          required
          onChange={handleChange}
          type="email"
          className="placeholder:text-black w-full mb-5 text-black border-black border p-4"
          placeholder="Email"
        />

        <label className="text-black">Phone Number</label>
        <input
          name="phonenumber"
          value={formData.phonenumber}
          required
          onChange={handleChange}
          type="tel"
          className="placeholder:text-black w-full mb-5 text-black border-black border p-4"
          placeholder="Phone Number"
        />

        <div className="flex gap-7 mt-5">
          <button
            type="submit"
            className="flex mx-auto text-center items-center justify-center bg-blue-500 text-black border-black border w-44 py-3 rounded-lg hover:bg-black hover:text-white transition-all duration-300 ease-linear"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex mx-auto text-center items-center justify-center bg-blue-500 text-black border-black border w-44 py-3 rounded-lg hover:bg-black hover:text-white transition-all duration-300 ease-linear"
          >
            Clear
          </button>
        </div>
      </form>
      {tableData.length > 0 && (
        <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl text-black font-semibold mb-4">User Data Table</h3>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black text-black p-2">First Name</th>
                <th className="border border-black text-black p-2">Last Name</th>
                <th className="border border-black text-black p-2">Email</th>
                <th className="border border-black text-black p-2">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-black text-black p-2">{data.firstname}</td>
                  <td className="border border-black text-black p-2">{data.lastname}</td>
                  <td className="border border-black text-black p-2">{data.email}</td>
                  <td className="border border-black text-black p-2">{data.phonenumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FormValidationPractice;
