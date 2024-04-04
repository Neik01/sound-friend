import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import Dots from "../../assets/images/three-dots.svg";
import PlusIcon from "../../assets/images/plus.svg";
import AddPlayList from "../../assets/images/add_playlist.svg";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListMusic } from "../../apiServices/musicServices";
import Pagination from "../../components/Pagination/Pagination";
import images from "../../assets/images";
const cx = classNames.bind(styles);

function Search() {
  const [response, setResponse] = useState({});

  const [searchParams] = useSearchParams();
  const paramsSearch = searchParams.get("q");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    // effect
    getListMusic({
      query: {
        name: paramsSearch,
      },
      page,
      page_size: limit,
    }).then((res) => {
      setResponse(res);
    });

    return () => {
      // cleanup
    };
  }, [paramsSearch]);
  return (
    <div className={cx("wrapper")}>
      <h2>Kết quả tìm kiếm: {paramsSearch}</h2>
      {Object.keys(response).length > 0 && (
        <>
          <table className={cx("songList")}>
            <tbody>
              {response?.data.map((item, index) => {
                //
                //
                //Làm thêm một nút mở menu để thêm danh sách phát nhạc(thêm song vào listmusic)
                //
                //
                return (
                  <tr key={index}>
                    <td>
                      <img
                        className={cx("image")}
                        src={images.imageSong}
                        alt="Avatar"
                      />
                    </td>
                    <td className={cx("infoSong")}>
                      <Link className={cx("name")} to={`/music/${item.id}`}>
                        {item.name}
                      </Link>
                    </td>
                    <td className={cx("action-icon")}>
                      <img
                        className={cx("action-icon-img")}
                        src={AddPlayList}
                        alt="Add Playlist"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            page={page}
            setPage={setPage}
            totalPage={response?.total_page}
          />
        </>
      )}
    </div>
  );
}

export default Search;
