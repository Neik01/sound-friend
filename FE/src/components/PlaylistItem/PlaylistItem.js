import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./PlaylistItem.module.scss";
import PlayIcon from "../PlayIcon/PlayIcon";

const cx = classNames.bind(styles);
function PlaylistItem() {
  return (
    <Link className={cx("wrapper")} to="/playlists/1">
      <div className={cx("item")}>
        <img
          src="https://avatars0.githubusercontent.com/u/22546201?v=4"
          alt="Playlist"
        />
        <strong>Rock dos bons</strong>
        <p>Relaxe enquanto ouve o melhor do rock mundial</p>
      </div>
      <div
        className={cx("play")}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <PlayIcon />
      </div>
    </Link>
  );
}

export default PlaylistItem;
