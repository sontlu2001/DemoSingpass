import { Link } from "react-router-dom";
import { Fragment} from "react";

export default function Header() {

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo")) ;

  return (
    <header className="bg-gradient-quaternary">
      <div className="flex justify-between item-center relative py-2 border-b-[1px] border-gray-400 z-50 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center md:gap-x-12">
          <Link to={"/"} className="flex items-center md:gap-x-12">
            <img className="h-[40px]" src="/logo.png" alt="React Logo" />
          </Link>
        </div>

        {/* User info */}
          {userInfo && (
            <Fragment>
              <div className="flex gap-x-4 items-center">
                <span className="w-25 flex text-md font-semibold text-white">
                  Xin chào, {userInfo?.username}
                </span>
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOfjjDPZUEtzONTet2RjwoKaecpTJbC-j7qIqr-bSSDw&s"
                  alt=""
                />
              </div>
            </Fragment>
          )}
      </div>
    </header>
  );
}
