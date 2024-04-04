import classNames from "classnames/bind";
import PlaylistItem from "../../components/PlaylistItem";
import styles from "./Home.module.scss";
import SongItem from "../../components/SongItem/SongItem";
import { useEffect, useState } from "react";
import { getMyMusic } from "../../apiServices/musicServices";
import Pagination from "../../components/Pagination/Pagination";

const cx = classNames.bind(styles);
function Home() {
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [response, setResponse] = useState();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    getMyMusic({
      query: {},
      page,
      page_size: limit,
    }).then((data) => {
      setTrendingSongs(data.data);
      setResponse(data);
    });
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("section")}>
        <h2 className={cx("title")}>Bài hát mới</h2>
        <div className="grid">
          <div className="row">
            {trendingSongs.map((song, index) => (
              <div key={index} className="col l-2 m-3 c-6">
                <SongItem song={song} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalPage={response?.total_page}
      />
    </div>
  );
}

export default Home;
