import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex justify-between mx-12 my-5">
      <div>
        <Link href="/" className="text-xl">
          Mail Merge
        </Link>
      </div>
      <div>
        <Link href="/sign-up">Sign Up</Link> |
        <Link href="/sign-in"> Sign In</Link>
      </div>
    </nav>
  );
}

export default Navbar;
