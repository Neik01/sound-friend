import { useRef, useState } from "react";
import { register } from "../../apiServices/userServices";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { optionToast } from "../../toast/toastOptions";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";

const cx = classNames.bind(styles);

function Register() {
  const userNameRef = useRef("");
  const passwordRef = useRef("");
  const preTypePasswordRef = useRef("");
  const [userNameError, setUserNameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [preTypePasswordError, setPreTypePasswordError] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <div className={cx("wrapper")}>
      <div>
        <header className={cx("header")}>Đăng Ký</header>

        <div className={cx("input-group")}>
          <div className={cx("label")}>Tài khoản:</div>
          <input
            className={cx("input")}
            type={"text"}
            ref={userNameRef}
            placeholder="Tài khoản..."
            onChange={() => setUserNameError()}
            onBlur={(e) => {
              const value = e.target.value;

              if (value.trim().length < 3) {
                setUserNameError("username phải lớn hơn hoặc bằng 3 ký tự!");
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
              const value = e.target.value;
              if (value.trim().length < 6) {
                setPasswordError("password phải lớn hơn hoặc bằng 6 ký tự!");
              } else {
                setPasswordError();
              }
            }}
          />
          {passwordError && <p className={cx("text-error")}>{passwordError}</p>}
        </div>
        <div className={cx("input-group")}>
          <div className={cx("label")}>Nhập lại mật khẩu:</div>
          <input
            className={cx("input")}
            type={"password"}
            ref={preTypePasswordRef}
            placeholder="Mật khẩu..."
            onChange={() => setPreTypePasswordError()}
            onBlur={(e) => {
              const value = e.target.value;
              if (value !== passwordRef.current.value) {
                setPreTypePasswordError(
                  "password phải giống với các kí tự trong re-enter password!"
                );
              } else {
                setPreTypePasswordError();
              }
            }}
          />
          {preTypePasswordError && (
            <p className={cx("text-error")}>{preTypePasswordError}</p>
          )}
        </div>
        <div className={cx("input-group")}>
          <button
            className={cx("btn-submit")}
            disabled={loading}
            onClick={() => {
              if (!userNameError && !passwordError && !preTypePasswordError) {
                setLoading(true);
                const data = {
                  username: userNameRef.current.value,
                  password: preTypePasswordRef.current.value,
                };

                register(data)
                  .then((res) => {
                    toast.success("Đăng ký thành công!", optionToast);
                  })
                  .catch((e) => {
                    if (e.response.status === 409) {
                      console.log(e.response.status);

                      toast.warning("Tài khoản đã tồn tại!", optionToast);
                    }
                  })
                  .finally((res) => {
                    setLoading(false);
                  });
              } else {
                toast.error(
                  "Dữ liệu nhập chưa đầy đủ hoặc không hợp lệ!",
                  optionToast
                );
              }
            }}
          >
            {loading ? <LoadingIcon /> : "ĐĂNG KÝ"}
          </button>
        </div>
        <div className={cx("input-group", "support")}>
          <div className={cx("hr")}></div>
          <h3 className={cx("support-title")}>Bạn đã có tài khoản?</h3>
          <Link className={cx("btl-link")} to="/login">
            ĐĂNG NHẬP NGAY
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
