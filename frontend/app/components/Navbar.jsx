"use client";

import Link from "next/link";
import Image from "next/image";
import ToggleMenu from "./ToggleMenu";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

function Navbar() {
  const currentPath = usePathname();
  const router = useRouter();
  const token = sessionStorage.token && sessionStorage.getItem("token");

  async function handleLogout() {
    const response = await axios.delete("http://0.0.0.0:5000/api/v1/logout", {
      headers: {
        "auth-token": sessionStorage.getItem("token").replace(/["']/g, ""),
      },
    });
    console.log(response);
    sessionStorage.clear();
    router.push("/signin");
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-white">
      <nav className="flex justify-between mx-5 md:mx-12 my-5 items-center w-full">
        <div className="">
          <Link
            href="/"
            className="text-xl md:text-2xl font-semibold text-content text-blue hover:text-blue"
          >
            <Image
              src="/LockUps/VerticalLockUp.png"
              alt="Mail Merge Logo"
              width={200}
              height={200}
            />
            {/* Mail Merge */}
          </Link>
        </div>
        <ToggleMenu />
        <div className="text-blue hidden sm:block mr-20">
          {!token ? (
            <>
              <Link href="/signup" className="btn mr-2">
                Sign Up
              </Link>
              <Link href="/signin" className="btn ml-2 mr-12">
                Log In
              </Link>
            </>
          ) : (
            <>
              {(currentPath === "/smtp-config" || currentPath === "/") && (
                <button
                  className="btn ml-2"
                  onClick={() => router.push("/sendmail")}
                >
                  Send Mail
                </button>
              )}
              <button
                className="btn ml-2"
                onClick={() => router.push("/contacts")}
              >
                Contacts
              </button>
              {(currentPath === "/sendmail" || currentPath === "/") && (
                <button
                  className="btn ml-2 mr-2"
                  onClick={() => router.push("/smtp-config")}
                >
                  New SMTP Configuration
                </button>
              )}
              <button className="btn ml-2 mr-12" onClick={handleLogout}>
                Log Out
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
