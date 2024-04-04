import classNames from "classnames/bind";
import styles from "./MusicManager.module.scss";
import { getMyMusic, removeMusic } from "../../apiServices/musicServices";
import storage from "../../utils/storage";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ModelNotifi from "../../components/ModelNotifi/ModelNotifi";
import { toast } from "react-toastify";
import { optionToast } from "../../toast/toastOptions";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
const cx = classNames.bind(styles);

function MusicManager() {
  const [response, setResponse] = useState({});
  const [isModalNotifi, setIsModalNotifi] = useState(false);
  const [isRemove, setIsRemove] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleDelete = () => {
    if (!!isRemove) {
      removeMusic(isRemove).then((res) => {
        toast.success("Xóa nhạc thành công!", optionToast);
        fetchApi();
      });
      setIsModalNotifi(false);
    }
  };
  const fetchApi = () => {
    getMyMusic({
      query: {
        createdById: storage("userCurrent").get().id,
      },
      page,
      page_size: limit,
    }).then((res) => {
      setResponse(res);
    });
  };
  useEffect(() => {
    // effect
    fetchApi();
    return () => {
      // cleanup
    };
  }, []);

  useEffect(() => {
    // effect
    !isModalNotifi && setIsRemove();
    return () => {
      // cleanup
    };
  }, [isModalNotifi]);

  return (
    <div className={cx("wrapper")}>
      <h2>Nhạc của tôi</h2>
      <table className={cx("song-list")}>
        <thead>
          <tr>
            <th>Tên nhạc</th>
            <th>Mô tả</th>
            <th>Ngày cập nhật</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {response?.data?.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  {item.name.trim().length > 15
                    ? item.name.slice(0, 15) + "..."
                    : item.name}
                </td>
                <td>
                  {item.description.trim().length > 37
                    ? item.description.slice(0, 37) + "..."
                    : item.description}
                </td>
                <td>{item.updatedAt}</td>
                <td>
                  <Link className={cx("edit")} to={`/managerMusic/edit/${item.id}`} title="sửa">
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <button
                    className={cx("delete")}
                    title="xóa"
                    onClick={() => {
                      setIsModalNotifi(true);
                      setIsRemove(item.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isModalNotifi && (
        <ModelNotifi
          title="Bạn có chắc chắn muốn xóa bản nhạc này?"
          show={isModalNotifi}
          setShow={setIsModalNotifi}
          handleOkeOnclick={handleDelete}
        />
      )}
      <Pagination
        page={page}
        setPage={setPage}
        totalPage={response.total_page}
      />
    </div>
  );
}

export default MusicManager;
