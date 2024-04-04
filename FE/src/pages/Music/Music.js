import classNames from "classnames/bind";
import styles from "./Music.modue.scss";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMusic } from "../../apiServices/musicServices";
import { DateConverter } from "../../utils/DateConverter";
import TimeConverter from "../../utils/TimeConverter";
import { useDispatch, useSelector } from "react-redux";
import { playlistActions } from "../../app/playlistSlice";

const cx = classNames.bind(styles);

function Music() {
  const songID = useParams();
  const playlistState = useSelector((state) => state.playlist);
  const isPlaying = playlistState.isPlaying;
  const music = playlistState.music;

  const [songContext, setSongContext] = useState();
  const [audioFile, setAudioFile] = useState("");
  const [duration, setDuration] = useState("");

  const dispatch = useDispatch();

  const baseURL = process.env.REACT_APP_BASE_URL;
  // Khởi tạo đối tượng Audio
  var audio = new Audio(audioFile);
  // Chờ cho tệp âm thanh được tải xong
  audio.onloadedmetadata = function () {
    setDuration(TimeConverter(audio.duration));
  };

  useEffect(() => {
    getMusic(songID.id).then((music) => {
      setSongContext(music);
      setAudioFile(`${baseURL}public/files/${music.file?.url}`);
    });
  }, []);
  //
  //
  //Làm thêm một nút mở menu để thêm danh sách phát nhạc(thêm song vào listmusic)
  //
  //
  return (
    <div className={cx("wrapper")}>
      <header className={cx("header")}>
        <img
          src="https://avatars0.githubusercontent.com/u/22546201?v=4"
          alt="Playlist"
        />
        <div>
          <span>Bài hát</span>
          <h1>{songContext?.name}</h1>
          {/* <p>Ca sĩ nào đó :v</p> */}
          <p>
            {DateConverter(songContext?.createdAt).split(" ")[3]} • {duration}
          </p>
          <button
            onClick={() => {
              if (!!music && music.id === songContext?.id) {
                if (isPlaying) dispatch(playlistActions.stopMusic());
                else dispatch(playlistActions.playMusic());
              } else dispatch(playlistActions.addMusicToPlaylist(songContext));
            }}
          >
            {!!music && music.id === songContext?.id
              ? isPlaying
                ? "DỪNG"
                : "PHÁT"
              : "PHÁT"}
          </button>
        </div>
      </header>
      <div className="meta">
        <div className="grid">
          <div className="row">
            <div className="col l-8 m-6 c-12">
              <h2>Mô tả</h2>
              <p>{songContext?.description}</p>
            </div>
            {/* <div className="col l-4 m-6 c-12">
              <h2>Bình luận</h2>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Music;
