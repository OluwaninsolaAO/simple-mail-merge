export default function SignInForm() {
  return (
    <div className="md:grid grid-cols-2 text-center h-screen items-center">
      <div className="">
        <h1 className="text-3xl">Simple Mail Merge</h1>
      </div>
      <div className="">
        <form className="text-center">
          <div className="mb-2">
            <label>Email</label>
            <input className="w-3/5 h-9 border-2 border-black rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email" type="email" />
          </div>
          <div className="">
            <label>Password </label>
            <input type="password" className="w-3/5 h-9 border-2 border-black rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </form>
      </div>
    </div>
  );
}
