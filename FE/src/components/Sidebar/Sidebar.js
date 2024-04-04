import {
  faBookmark,
  faHouse,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cx("wrapper")}>
      <div>
        <ul className={cx("nav")}>
          <li>
            <Link to="/">
              <img
                src={require("../../assets/images/logo.png")}
                alt="MTP Entertainment"
              />
            </Link>
          </li>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHouse} /> <span>Trang Chủ</span>
            </Link>
          </li>

          <li>
            <Link to="/listPlaylist">
              <FontAwesomeIcon icon={faBookmark} />{" "}
              <span>Playlist Của Tôi</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
