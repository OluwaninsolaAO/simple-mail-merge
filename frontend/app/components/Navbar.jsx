import Link from "next/link";
import Image from "next/image";
import ToggleMenu from "./ToggleMenu";

function Navbar() {
  return (
    <nav className="flex justify-between mx-5 md:mx-12 my-5 items-center">
      <div className="">
        <Link
          href="/"
          className="text-xl md:text-2xl font-semibold text-content fixed top-0 left-0 text-amber-600 hover:text-amber-500"
        >
          <Image src="/LockUps/VerticalLockUp.png" alt="Mail Merge Logo" width={200} height={200} />
          {/* Mail Merge */}
        </Link>
      </div>
      <div className="h-12 mb-8"><ToggleMenu /></div>
      <div className="text-amber-500 hidden sm:block fixed ml-auto mr-8 mt-5 top-0 right-0">
        <Link href="/signup" className="btn">
          Sign Up
        </Link>
        <Link href="/signin" className="btn ml-2">
          Sign In
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
