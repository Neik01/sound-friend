import classNames from "classnames/bind";

import styles from "./ModelNotifi.module.scss";

const cx = classNames.bind(styles);

function ModelNotifi({
  show,
  setShow,
  handleOkeOnclick = () => {},
  title = "test Cái",
}) {
  return (
    <div
      className={cx("wrapper", {
        show,
      })}
      onClick={() => setShow(false)}
    >
      <div
        className={cx("model")}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p className={cx("title")}>{title}</p>
        <div className={cx("btn-group")}>
          <button className={cx("btn-close")} onClick={() => setShow(false)}>
            Đóng
          </button>
          <button className={cx("btn-oke")} onClick={handleOkeOnclick}>
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModelNotifi;
