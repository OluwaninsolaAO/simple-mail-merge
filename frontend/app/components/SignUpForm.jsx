"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import ErrorAlert from "./ErrorAlert";
import { useRouter } from "next/navigation";
import SuccessAlert from "./SuccessAlert";

export default function SignUpForm() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(false);
  const [created, setCreated] = useState(false);
  const postUrl = "http://epicsprint.tech/api/v1/users";
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setCreated("");

    if (password !== password2) {
      setError("Password Mismatch!");
      return;
    }

    const formData = {
      firstname,
      lastname,
      email,
      phone,
      password,
      address,
    };

    try {
      const response = await axios.post('http://0.0.0.0:5000/api/v1/users', formData);
      console.log(response);
      setCreated("Account created successfully!");
      setTimeout(() => {
        router.push('/signin');
      }, 3000);
    } catch (err) {
      setCreated("");
      console.log(err);
      setError("Error! Please try again...");
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded mx-auto overflow-hidden">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center">
          <Image
            src="/signup-mail-merge-img.svg"
            alt="An illustration of a person with a mail merge."
            width={500}
            height={500}
          />
        </div>
        <div className="w-full lg:w-1/2 py-16 px-12">
          {error && <ErrorAlert message={error} setError={setError} />}
          {created && <SuccessAlert message={created} setSuccess={setCreated}/>}
          <h2 className="text-3xl mb-4">Sign Up</h2>
          <p className="mb-4">Create an account to get started.</p>
          <form onSubmit={handleSubmit} className="">
            <div className="flex flex-col lg:flex-row">
              <input
                type="text"
                placeholder="First Name"
                id="firstName"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="border border-blue py-1 px-2 mr-2 mb-2"
              />
              <input
                type="text"
                placeholder="Last Name"
                id="lastName"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="border border-blue py-1 px-2"
              />
            </div>
            <div className="mt-5">
              <input
                type="text"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-blue py-1 px-2 w-full"
              />
            </div>
            <div className="mt-5">
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-blue py-1 px-2 w-full"
              />
            </div>
            <div className="mt-5">
              <input
                type="password"
                placeholder="Confirm Password"
                id="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
                className="border border-blue py-1 px-2 w-full"
              />
            </div>
            <div className="mt-5">
              <input
                type="phone"
                placeholder="Phone No"
                id="phone"
                maxLength={15}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="border border-blue py-1 px-2 w-full"
              />
            </div>
            <div className="mt-5">
              <input
                type="text"
                placeholder="Address"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="border border-blue py-1 px-2 w-full"
              />
            </div>
            <div className="mt-5">
              <button className="w-full bg-blue py-3 text-center text-white hover:bg-white hover:text-blue border hover:border-blue transition ease-out duration-300">
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-3">
            Already have an account?{" "}
            <Link className="text-blue hover:underline" href="/signin">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
