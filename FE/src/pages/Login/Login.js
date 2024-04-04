import { useRef, useState } from "react";
import { login } from "../../apiServices/userServices";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { storageToken } from "../../utils/storage";
import LoadingIcon from "../../components/LoadingIcon";
import { toast } from "react-toastify";
import { optionToast } from "../../toast/toastOptions";
const cx = classNames.bind(styles);

function Login() {
  const userNameRef = useRef("");
  const passwordRef = useRef("");
  const [userNameError, setUserNameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  return (
    <div className={cx("wrapper")}>
      <div>
        <header className={cx("header")}>Đăng Nhập</header>
        <div className={cx("input-group")}>
          <div className={cx("label")}>Tài khoản:</div>
          <input
            className={cx("input")}
            type={"text"}
            ref={userNameRef}
            placeholder="Tài khoản..."
            onChange={() => setUserNameError()}
            onBlur={(e) => {
              const values = e.target.value;
              if (values.trim().length === 0) {
                setUserNameError("Tài khoản không thể để trống");
              } else {
                setUserNameError();
              }
            }}
          />
          {userNameError && <p className={cx("text-error")}>{userNameError}</p>}
        </div>
        <div className={cx("input-group")}>
          <div className={cx("label")}>Mật khẩu:</div>
          <input
            className={cx("input")}
            type={"password"}
            ref={passwordRef}
            placeholder="Mật khẩu..."
            onChange={() => setPasswordError()}
            onBlur={(e) => {
              const values = e.target.value;
              if (values.trim().length === 0) {
                setPasswordError("Mật khẩu không thể để trống");
              } else {
                setPasswordError();
              }
            }}
          />
          {passwordError && <p className={cx("text-error")}>{passwordError}</p>}
        </div>
        <div className={cx("input-group")}>
          <button
            className={cx("btn-submit")}
            disabled={loading}
            onClick={() => {
              if (!userNameError && !passwordError) {
                setLoading(true);
                const data = {
                  username: userNameRef.current.value,
                  password: passwordRef.current.value,
                };
                login(data)
                  .then((res) => {
                    if (res) {
                      console.log(res);
                      storageToken.set(res);
                      navigate("/");
                    }
                  })
                  .catch((e) => {
                    toast.error(
                      "Tài khoản hoặc mật khẩu không chính xác!",
                      optionToast
                    );
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }
            }}
          >
            {loading ? <LoadingIcon /> : "ĐĂNG NHẬP"}
          </button>
        </div>
        <div className={cx("input-group", "support")}>
          <div className={cx("hr")}></div>
          <h3 className={cx("support-title")}>Bạn chưa có tài khoản?</h3>
          <Link className={cx("btl-link")} to="/register">
            ĐĂNG KÝ TÀI KHOẢN
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
