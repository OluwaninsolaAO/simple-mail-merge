"use client"

import Link from "next/link";
import Image from "next/image";
import ToggleMenu from "./ToggleMenu";
import { usePathname } from "next/navigation";

function Navbar() {
  const openPaths = ['/', '/signin', '/signup'];
  const currentPath = usePathname();

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
          {openPaths.includes(currentPath) ? (
            <>
              <Link href="/signup" className="btn mr-2">
                Sign Up
              </Link>
              <Link href="/signin" className="btn ml-2 mr-12">
                Log In
              </Link>
            </>
          ) : (
            <Link href="/signin" className="btn ml-2 mr-12">
              Log Out
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
