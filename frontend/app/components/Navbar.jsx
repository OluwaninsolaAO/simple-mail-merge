import Link from "next/link";
import Image from "next/image";
import ToggleMenu from "./ToggleMenu";

function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full bg-amber-100">
      <nav className="flex justify-between mx-5 md:mx-12 my-5 items-center w-full">
        <div className="">
          <Link
            href="/"
            className="text-xl md:text-2xl font-semibold text-content text-amber-600 hover:text-amber-500"
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
        <div className="text-amber-500 hidden sm:block mr-20">
          <Link href="/signup" className="btn">
            Sign Up
          </Link>
          <Link href="/signin" className="btn ml-2">
            Sign In
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
