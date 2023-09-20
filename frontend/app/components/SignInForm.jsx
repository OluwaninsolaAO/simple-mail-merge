"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const formData = {email, password};
      const response = await axios.post('http://0.0.0.0:5000/api/v1/login', formData);
      console.log(response);
      setSuccess("Sign in successful!");
      setTimeout(() => {
        router.push('/smtp-config');
      }, 3000);
    } catch(err) {
      console.log(err);
      err.response?.status === 404 && setError("User does not exist");
      err.response?.status === 401 && setError(err.response?.data.message);
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded mx-auto overflow-hidden">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center">
          <Image
            src="/signin-mail-merge-img.svg"
            alt="An illustration of a person sitting on a chair with a laptop sending mail."
            width={500}
            height={500}
          />
        </div>
        <div className="w-full lg:w-1/2 py-16 px-12">
        {error && <ErrorAlert message={error} setError={setError} />}
          {success && <SuccessAlert message={success} setSuccess={setSuccess}/>}
          <h2 className="text-3xl mb-4">Log In</h2>
          <p className="mb-4">Log in to your account.</p>
          <form onSubmit={handleSubmit} className="">
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
              <button className="w-full bg-blue py-3 text-center text-white hover:bg-white hover:text-blue border hover:border-blue transition ease-out duration-300">
                Log In
              </button>
            </div>
          </form>
          <p className="mt-3">
            Forgot your password?{" "}
            <Link className="text-blue hover:underline" href="/forgot-password">
              Reset it here.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
