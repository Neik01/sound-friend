import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import classNames from "classnames/bind";
import styles from "./EditMusic.module.scss";
import { getMusic, updateMusic } from "../../../apiServices/musicServices";
import { optionToast } from "../../../toast/toastOptions";
const cx = classNames.bind(styles);
function EditMusic() {
  const [loading, setLoading] = useState(false);
  const nameMusicRef = useRef();
  const desMusicRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // effect
    getMusic(id).then((res) => {
      nameMusicRef.current.value = res.name;
      desMusicRef.current.value = res.description;
    });
    return () => {
      // cleanup
    };
  }, []);
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Cập nhật thông tin nhạc</h2>
      <div className={cx("form")}>
        <div>
          <div className={cx("from-group")}>
            <p>Tên bài hát:</p>
            <input
              ref={nameMusicRef}
              className={cx("input")}
              type="text"
              placeholder="Tên bài hát"
            />
          </div>
          <div className={cx("from-group")}>
            <p>Mô tải bài hát:</p>
            <textarea
              ref={desMusicRef}
              className={cx("input")}
              placeholder="Mô tả bài hát"
              rows={15}
            ></textarea>
          </div>

          <div className={cx("from-group")}>
            <button
            className={cx("update")}
              disabled={loading}
              onClick={() => {
                if (
                  !!nameMusicRef.current.value &&
                  !!desMusicRef.current.value
                ) {
                  setLoading(true);
                  const data = {
                    id: id,
                    description: desMusicRef.current.value,
                    name: nameMusicRef.current.value,
                  };
                  updateMusic(data).then(() => {
                    navigate("/managerMusic");
                    setLoading(false);
                  });
                } else {
                  toast.error("Thông tin không thể để trống!", optionToast);
                }
              }}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMusic;
