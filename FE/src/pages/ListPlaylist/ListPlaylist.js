import classNames from "classnames/bind";
import styles from "./ListPlaylist.module.scss";
import PlaylistItem from "../../components/PlaylistItem/PlaylistItem";

const cx = classNames.bind(styles);

function ListPlaylist() {
  return (
    <div className={cx("wrapper")}>
      <h2>Danh sách playlist của tôi</h2>
      <div className="grid">
        <div className="row">
          <div className="col l-2 m-3 c-6">
            <PlaylistItem />
          </div>
          <div className="col l-2 m-3 c-6">
            <PlaylistItem />
          </div>
          <div className="col l-2 m-3 c-6">
            <PlaylistItem />
          </div>
          <div className="col l-2 m-3 c-6">
            <PlaylistItem />
          </div>
          <div className="col l-2 m-3 c-6">
            <PlaylistItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPlaylist;
