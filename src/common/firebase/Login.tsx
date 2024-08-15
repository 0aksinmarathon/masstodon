import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getUser } from "../../stores/auth/auth.slice";
import { AppDispatch, RootState } from "../../stores/store";
import { fireauth } from "./firebase";

export const Login = () => {
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((store: RootState) => store.auth.user);
  const onClickLogin = async () => {
    try {
      await signInWithPopup(fireauth, provider).then(async (res) => {
        if (res) {
          if (!res.user.displayName || !res.user.photoURL)
            throw new Error("no display name or photoURL");
          await dispatch(getUser(res.user.uid));

          if (!user) {
            await dispatch(
              addUser(res.user.uid, res.user.displayName, res.user.photoURL)
            );
            await dispatch(getUser(res.user.uid));
            console.log(user);
          }

          // navigate('/');
        }
      });
    } catch {
      console.log("ログインに失敗しました");
    }
  };

  return (
    <>
      <button
        className="drop-shadow-hard1 bg-sky-700 rounded-md px-2 py-1 text-base"
        onClick={onClickLogin}
      >
        Login
      </button>
    </>
  );
};
