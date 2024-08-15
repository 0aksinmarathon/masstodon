import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Login } from "../common/firebase/Login";
import { fireauth } from "../common/firebase/firebase";
import { RootState } from "../stores/store";

const Header = () => {
  const user = useSelector((store: RootState) => store.auth.user);
  const onClickDocument = () => {
    console.log("mousedown");
    setShowDropdown(false);
  };
  const navigate = useNavigate();
  const onClickLogout = () => {
    console.log("sign out");
    fireauth.signOut();
    setShowDropdown(false);
    navigate(0);
  };
  useEffect(() => {
    console.log(123);
    document.addEventListener("click", onClickDocument);
    return () => {
      document.removeEventListener("click", onClickDocument);
      console.log("cleanup");
    };
  }, []);

  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="h-[50px] bg-sky-800 flex items-center px-4 justify-between drop-shadow-hard2 w-full">
      <div className="font-[1000]">MassToDon</div>
      <div className="flex items-center gap-x-8">
        <div className="rounded-full bg-white w-8 h-8 flex items-center justify-center ">
          <NotificationsNoneIcon color="primary" />
        </div>
        {user ? (
          <>
            <div
              className="rounded-full w-10 h-10  cursor-pointer flex items-center"
              onClick={(e) => {
                setShowDropdown(true);
                e.stopPropagation();
              }}
            >
              <div>
                <img
                  src={user.picture}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                {showDropdown && (
                  <div className="text-base bg-sky-700 drop-shadow-hard1 rounded-md p-1 w-fit absolute right-2.5">
                    <ul>
                      <li onClick={onClickLogout}>Logout</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export default Header;
