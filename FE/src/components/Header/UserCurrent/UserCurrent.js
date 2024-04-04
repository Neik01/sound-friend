import classNames from "classnames/bind";
import styles from "./UserCurrent.module.scss";
import { me } from "../../../apiServices/userServices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import storage, { storageToken } from "../../../utils/storage";
const cx = classNames.bind(styles);

function UserCurrent({ setIsLogin }) {
  const [userCurrent, setUserCurrent] = useState();
  const [showDropDownList, setShowDropDownList] = useState(false);
  useEffect(() => {
    // effect
    me().then((res) => {
      storage("userCurrent").set(res);
      setUserCurrent(res);
    });

    document.addEventListener("click", () => {
      setShowDropDownList(false);
    });
    return () => {
      // cleanup
    };
  }, []);

  return (
    <div
      className={cx("user")}
      onClick={(e) => {
        e.stopPropagation();
        setShowDropDownList(!showDropDownList);
      }}
    >
      <span>{userCurrent?.username}</span>
      {showDropDownList && (
        <div
          className={cx("drop-downlist")}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Link to="/managerMusic/add" className={cx("btn-action")} onClick={()=>setShowDropDownList(false)}>
            Tải nhạc lên
          </Link>
          <Link to="/managerMusic" className={cx("btn-action")} onClick={()=>setShowDropDownList(false)}>
            Quản lý nhạc của tôi
          </Link>
          <button
            className={cx("btn-action")}
            onClick={() => {
              setShowDropDownList(false)
              storageToken.set({});
              setIsLogin(false);
            }}
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}

export default UserCurrent;
