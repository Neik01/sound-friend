import Header from "../../components/Header";
import Player from "../../components/Player";
import Sidebar from "../../components/Sidebar";
import classNames from "classnames/bind";
import styles from "./components.module.scss";
import { useEffect, useState } from "react";
import { storageSongID, storageToken } from "../../utils/storage";
import { getMusic } from "../../apiServices/musicServices";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const playlistState = useSelector((state) => state.playlist);
  const playList = playlistState.playList;

  return (
    <div className={cx("wrapper")}>
      <Header />
      <Sidebar />

      <div className={cx("container")}>{children}</div>
      {!!playList && playList.length > 0 && <Player />}
    </div>
  );
}

export default DefaultLayout;
