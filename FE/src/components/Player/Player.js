import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useRef, useState } from "react";
import TimeConverter from "../../utils/TimeConverter";
import styles from "./Player.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { playlistActions } from "../../app/playlistSlice";
import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  ShuffleIcon,
  VolumeIcon,
} from "../Icon";

const cx = classNames.bind(styles);
function Player() {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const playlistState = useSelector((state) => state.playlist);
  const isPlaying = playlistState.isPlaying;
  const music = playlistState.music;
  const navigate = useNavigate();

  const [duration, setDuration] = useState();
  const [time, setTime] = useState();
  const [progress, setProgress] = useState(0);
  const [nextSong, setNextSong] = useState(false);
  const [preSong, setPreSong] = useState(false);
  const [volume, setVolume] = useState(100);

  const audioRef = useRef();
  const timeRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    // effect
    audioRef.current.volume = volume / 100;

    return () => {
      // cleanup
    };
  }, [volume]);

  useEffect(() => {
    // effect

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    if (nextSong || preSong) {
      !isPlaying && audioRef.current.load();
    }
    if (nextSong) {
      dispatch(playlistActions.nextPlay());
      setNextSong(false);
    }

    if (preSong) {
      dispatch(playlistActions.prePlay());
      setPreSong(false);
    }
    return () => {
      // cleanup
    };
  }, [isPlaying, music, nextSong, preSong]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("current")}>
        <img
          src="https://avatars0.githubusercontent.com/u/22546201?v=4"
          alt="Cover"
        />

        <div>
          <span style={{cursor:"pointer"}} onClick={()=>navigate(`/music/${music.id}`)}>{music.name}</span>
          <small>{music.description}</small>
          <audio
            ref={audioRef}
            onLoadedMetadata={(e) => {
              setDuration(TimeConverter(e.target.duration));
            }}
            onTimeUpdate={(e) => {
              setTime(TimeConverter(e.target.currentTime));
              setProgress(
                Math.floor((e.target.currentTime / e.target.duration) * 100)
              );
            }}
            onEnded={() => {
              dispatch(playlistActions.stopMusic());
              setNextSong(true);
            }}
            src={music.file.url && `${baseURL}public/files/${music.file.url}`}
          ></audio>
        </div>
        <div
          onClick={() => {
            fetch(`${baseURL}public/files/${music?.file?.url}`)
              .then((response) => response.blob())
              .then((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = music?.file?.url;
                document.body.appendChild(a); // thêm thẻ <a> vào DOM
                a.click();
                URL.revokeObjectURL(url); // giải phóng URL khi không sử dụng nữa
              });
          }}
        >
          <FontAwesomeIcon
            className={cx("downloadBtn")}
            title="Tải xuống"
            icon={faCircleArrowDown}
          />
        </div>
      </div>

      <div className={cx("progress")}>
        <div className={cx("controls")}>
          <button>
            <ShuffleIcon />
          </button>
          <button
            onClick={() => {
              dispatch(playlistActions.stopMusic());
              setPreSong(true);
            }}
          >
            <BackwardIcon />
          </button>
          <button
            onClick={() => {
              if (isPlaying) dispatch(playlistActions.stopMusic());
              else dispatch(playlistActions.playMusic());
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            onClick={() => {
              dispatch(playlistActions.stopMusic());
              setNextSong(true);
            }}
          >
            <ForwardIcon />
          </button>
          <button>
            <RepeatIcon />
          </button>
        </div>
        <div className={cx("time")}>
          <span ref={timeRef}>{time || "0:00"}</span>
          <div className={cx("progressSlider")}>
            <Slider
              railStyle={{ background: "#404040", borderRadius: 10 }}
              trackStyle={{ background: "#1ed760" }}
              handleStyle={{ border: 0 }}
              value={progress}
              onChange={(e) => {
                audioRef.current.currentTime =
                  (e / 100) * audioRef.current.duration;
              }}
            />
          </div>
          <span>{duration}</span>
        </div>
      </div>

      <div className={cx("volume")}>
        <VolumeIcon />
        <Slider
          railStyle={{ background: "#404040", borderRadius: 10 }}
          trackStyle={{ background: "#fff" }}
          handleStyle={{ border: 0 }}
          value={volume}
          onChange={(e) => {
            setVolume(e);
          }}
        />
      </div>
    </div>
  );
}

export default Player;
