import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import styles from "./LoadingIcon.module.scss";
const cx = classNames.bind(styles);
function LoadingIcon({ loading1 = false }) {
  return loading1 ? (
    <div className={cx("ic-Spin-cycle--circles")}>
      <svg
        version="1.1"
        x="0"
        y="0"
        viewBox="0 0 200 79"
        enableBackground="new 0 0 200 79"
      >
        <circle cx="39.5" cy="39.5" r="16" />
        <circle cx="79" cy="39.5" r="16" />
        <circle cx="118.5" cy="39.5" r="16" />
      </svg>
    </div>
  ) : (
    <FontAwesomeIcon className={cx("loading")} icon={faCircleNotch} />
  );
}

export default LoadingIcon;
