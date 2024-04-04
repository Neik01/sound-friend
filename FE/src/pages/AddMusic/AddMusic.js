import classNames from "classnames/bind";
import styles from "./AddMusic.module.scss";
import { useRef, useState } from "react";
import { createFile } from "../../apiServices/fileServices";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { optionToast } from "../../toast/toastOptions";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { createMusic } from "../../apiServices/musicServices";
import { useNavigate } from "react-router";

const cx = classNames.bind(styles);

function AddMusic() {
  const [uploadSuccess, setUploadSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);

  const fileUploadRef = useRef();
  const nameMusicRef = useRef();
  const desMusicRef = useRef();
  const navigate = useNavigate();
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Thêm nhạc:</h2>
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
            <p>Chọn file nhạc: </p>
            <input
              ref={fileUploadRef}
              type="file"
              accept="audio/mpeg"
              onChange={() => {
                setUploadSuccess();
              }}
            />
            {loading ? (
              <LoadingIcon />
            ) : !!uploadSuccess ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              <button
                onClick={() => {
                  if (!!fileUploadRef.current.value) {
                    setLoading(true);
                    const formData = new FormData();
                    formData.append("file", fileUploadRef.current.files[0]);

                    createFile(formData).then((res) => {
                      setUploadSuccess(res);
                      setLoading(false);
                    });
                  } else {
                    toast.warning(
                      "Phải chọn file mới tải nhạc lên được!",
                      optionToast
                    );
                  }
                }}
                className={cx("btn")}
              >
                Tải lên bản nhạc
              </button>
            )}
          </div>
          <div className={cx("from-group")}>
            <button
              disabled={loadingPost ||  !!uploadSuccess === false}
              onClick={() => {
                if (
                  !!nameMusicRef.current.value &&
                  !!desMusicRef.current.value
                ) {
                  if (!!uploadSuccess) {
                    setLoadingPost(true);
                    const data = {
                      name: nameMusicRef.current.value,
                      description: desMusicRef.current.value,
                      fileId: uploadSuccess.id,
                      audioTypeIds: [1],
                    };
                    createMusic(data).then(() => {
                      setLoadingPost(false);

                      toast.success("Đăng nhạc thành công", optionToast);
                      navigate("/managerMusic");
                    });
                  } else {
                    toast.error(
                      "Vui lòng tải file lên trước khi tải nhạc",
                      optionToast
                    );
                  }
                } else {
                  toast.error(
                    "Vui lòng không để trống tên và mô tả",
                    optionToast
                  );
                }
              }}
              className={cx("btn")}
            >
              Đăng nhạc
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMusic;
