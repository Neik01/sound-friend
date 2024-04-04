import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./PlayIcon.module.scss";
const cx = classNames.bind(styles);

function PlayIcon({ isPlay = false }) {
  return (
    <div className={cx("wrapper")}>
      {!isPlay ? (
        <FontAwesomeIcon icon={faPlay} />
      ) : (
        <FontAwesomeIcon icon={faStop} />
      )}
    </div>
  );
}

export default PlayIcon;
