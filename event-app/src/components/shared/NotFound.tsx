import { Link } from "react-router-dom";

const NotFound = ():JSX.Element => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div id="error-page">
          <h1 className="lg:text-6xl font-bold text-2xl text-white">Oops!</h1>
          <p className="text-xl text-black">
            Sorry, page does not exist.
          </p>
          <div className="flex justify-center mt-4">
            <Link
              to="/"
              className="px-5 py-2 bg-purple-200 rounded-md hover:bg-gray-100"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound