import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex justify-between mx-5 md:mx-12 my-5 items-center">
      <div>
        <Link href="/" className="text-xl md:text-2xl font-semibold text-amber-600 hover:text-amber-500">
          Mail Merge
        </Link>
      </div>
      <div className="text-amber-500">
        <Link href="/signup" className="btn">Sign Up</Link>
        <Link href="/signin" className="btn ml-2">Sign In</Link>
      </div>
    </nav>
  );
}

export default Navbar;
