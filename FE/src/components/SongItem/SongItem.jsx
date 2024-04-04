/* eslint-disable react/jsx-no-undef */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { playlistActions } from "../../app/playlistSlice";
import { storageToken } from "../../utils/storage";
import PlayIcon from "../PlayIcon/PlayIcon";
import styles from "./SongItem.module.scss";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function SongItem({ song }) {
  const playlistState = useSelector((state) => state.playlist);
  const [isLogin, setIsLogin] = useState(!!storageToken.get().token);
  const isPlaying = playlistState.isPlaying;
  const music = playlistState.music;
  const dispatch = useDispatch();

  useEffect(() => {
    !!storageToken.get().token && setIsLogin(true);
  }, [isLogin]);

  console.log("images: ", images.imageSong);
  return (
    <Link
      className={"item " + cx("wrapper")}
      to={isLogin && `/music/${song.id}`}
      data-id={song.id}
    >
      <div className={cx("item")}>
        <img src={images.imageSong} alt="Playlist" />
        <strong>
          {song.name.trim().length > 20
            ? song.name.slice(0, 20) + "..."
            : song.name}
        </strong>
        <p>
          {song.description.trim().length > 25
            ? song.description.slice(0, 25) + "..."
            : song.description}
        </p>
      </div>
      <div
        className={cx("play")}
        onClick={(e) => {
          e.preventDefault();
          if (!!music && music.id === song.id) {
            if (isPlaying) dispatch(playlistActions.stopMusic());
            else dispatch(playlistActions.playMusic());
          } else dispatch(playlistActions.addMusicToPlaylist(song));
        }}
      >
        <PlayIcon
          isPlay={!!music && music.id === song.id ? isPlaying : false}
        />
      </div>
    </Link>
  );
}

export default SongItem;
