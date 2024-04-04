import ClockIcon from "../../assets/images/clock.svg";
import PlusIcon from "../../assets/images/plus.svg";
import classNames from "classnames/bind";
import styles from "./Playlist.module.scss";

const cx = classNames.bind(styles);

function Playlist() {
  return (
    <div className={cx("wrapper")}>
      <header className={cx("header")}>
        <img
          src="https://avatars0.githubusercontent.com/u/22546201?v=4"
          alt="Playlist"
        />
        <div>
          <span>Danh sách phát</span>
          <h1>RocK Forever</h1>
          <p>13 bài hát</p>

          <button>PHÁT</button>
        </div>
      </header>

      <table className={cx("songList")}>
        <thead>
          <th></th>
          <th>Tiêu đề</th>
          <th>Mô tả</th>

          <th>
            <img src={ClockIcon} alt="clock_img" />
          </th>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={PlusIcon} alt="Adicionar" />
            </td>
            <td>PaperCut</td>
            <td>Linkpart</td>
            <td>3:26</td>
          </tr>
          <tr>
            <td>
              <img src={PlusIcon} alt="Adicionar" />
            </td>
            <td>PaperCut</td>
            <td>Linkpart</td>
            <td>3:26</td>
          </tr>
          <tr>
            <td>
              <img src={PlusIcon} alt="Adicionar" />
            </td>
            <td>PaperCut</td>
            <td>Linkpart</td>
            <td>3:26</td>
          </tr>
          <tr>
            <td>
              <img src={PlusIcon} alt="Adicionar" />
            </td>
            <td>PaperCut</td>
            <td>Linkpart</td>

            <td>3:26</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Playlist;
