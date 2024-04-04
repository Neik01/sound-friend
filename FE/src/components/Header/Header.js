import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storageToken } from "../../utils/storage";
import styles from "./Header.module.scss";
import UserCurrent from "./UserCurrent";

const cx = classNames.bind(styles);

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [isLogin, setIsLogin] = useState(!!storageToken.get().token);
  const navigate = useNavigate();
  useEffect(() => {
    // effect

    !!storageToken.get().token && setIsLogin(true);
    return () => {
      // cleanup
    };
  }, [isLogin]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("search")}>
        <input
          className={cx("inputSearch")}
          type="text"
          placeholder="Search"
          autoFocus
          spellCheck="false"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
              navigate(`/search?q=${searchValue}`);
              setSearchValue("")
            }
          }}
        />
        <button
          className={cx("btn-search")}
          onClick={() => {
            navigate(`/search?q=${searchValue}`);
            setSearchValue("")
          }}
        >
          <FontAwesomeIcon
            className={cx("searchIcon")}
            icon={faMagnifyingGlass}
          />
        </button>
      </div>
      {isLogin ? (
        <UserCurrent setIsLogin={setIsLogin} />
      ) : (
        <div>
          <Link className={cx("btn")} to="/register">
            Đăng ký
          </Link>
          <Link className={cx("btn")} to="/login">
            Đăng nhâp
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
