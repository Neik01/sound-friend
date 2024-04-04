import {
  faAngleLeft,
  faAngleRight,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import styles from "./Pagination.module.scss";
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(styles);

function Pagination({
  totalPage,
  page,
  setPage,
  setLimit = () => {},
  className,
}) {
  const paginationRef = useRef();
  const [toPage, setToPage] = useState(page);
  const [renderOne, setRenderOne] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const arr = [];
  for (let i = 0; i < totalPage; i++) {
    arr.push(i);
  }

  useEffect(() => {
    document.documentElement.scrollTo({
      top: renderOne ? 0 : paginationRef.current.parentElement.offsetTop - 175,
      left: 0,
    });
    setRenderOne(false);
    setToPage(page);
  }, [page]);

  function handleOnclickPage(index) {
    setPage(index);
  }

  function handleOnclickPageNext() {
    setPage(page + 1);
  }
  function handleOnclickPagePre() {
    setPage(page - 1);
  }

  function handleOnclickToPage() {
    if (toPage < totalPage + 1 && toPage > 0) {
      setPage(toPage);
    }
  }

  function handleInputOnchange(e) {
    setToPage(Number(e.target.value));
  }

  //   return window.innerWidth > 740 ? (
  return totalPage > 1 ? (
    <div ref={paginationRef} className={cx("wrapper", className)}>
      <div className={cx("pagination")}>
        <button
          className={cx("btn-page")}
          disabled={page === 1}
          onClick={handleOnclickPagePre}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        {totalPage > 9
          ? arr.map((item, index) => {
              if (page < 3) {
                if (index === 5) {
                  return (
                    <button
                      className={cx("btn-page", {
                        active: page - 1 === index,
                      })}
                      key={index}
                      onClick={() => handleOnclickPage(index + 1)}
                    >
                      ...
                    </button>
                  );
                }

                if (index < 3) {
                  return (
                    <button
                      className={cx("btn-page", {
                        active: page - 1 === index,
                      })}
                      key={index}
                      onClick={() => handleOnclickPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  );
                } else {
                  if (index > totalPage - 3) {
                    return (
                      <button
                        className={cx("btn-page", {
                          active: page - 1 === index,
                        })}
                        key={index}
                        onClick={() => handleOnclickPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    );
                  }
                }
              } else {
                if (page > 2 && page < 5) {
                  if (index === page + 3) {
                    return (
                      <button
                        className={cx("btn-page", {
                          active: page - 1 === index,
                        })}
                        key={index}
                        onClick={() => handleOnclickPage(index + 1)}
                      >
                        ...
                      </button>
                    );
                  }

                  if (index < page + 2) {
                    return (
                      <button
                        className={cx("btn-page", {
                          active: page - 1 === index,
                        })}
                        key={index}
                        onClick={() => handleOnclickPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    );
                  } else {
                    if (index > totalPage - 3) {
                      return (
                        <button
                          className={cx("btn-page", {
                            active: page - 1 === index,
                          })}
                          key={index}
                          onClick={() => handleOnclickPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      );
                    }
                  }
                } else {
                  if (page > 4 && page < totalPage - 3) {
                    if (index === 1 || index === totalPage - 3) {
                      return (
                        <button
                          className={cx("btn-page", {
                            active: page - 1 === index,
                          })}
                          key={index}
                        >
                          ...
                        </button>
                      );
                    }

                    if (index < 2) {
                      return (
                        <button
                          className={cx("btn-page", {
                            active: page - 1 === index,
                          })}
                          key={index}
                          onClick={() => handleOnclickPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      );
                    } else {
                      if (index > page - 3 && index < page + 1) {
                        return (
                          <button
                            className={cx("btn-page", {
                              active: page - 1 === index,
                            })}
                            key={index}
                            onClick={() => handleOnclickPage(index + 1)}
                          >
                            {index + 1}
                          </button>
                        );
                      } else {
                        if (index > totalPage - 3) {
                          return (
                            <button
                              className={cx("btn-page", {
                                active: page - 1 === index,
                              })}
                              key={index}
                              onClick={() => handleOnclickPage(index + 1)}
                            >
                              {index + 1}
                            </button>
                          );
                        }
                      }
                    }
                  } else {
                    if (index === 2) {
                      return (
                        <button
                          className={cx("btn-page", {
                            active: page - 1 === index,
                          })}
                          key={index}
                        >
                          ...
                        </button>
                      );
                    }

                    if (index < 2) {
                      return (
                        <button
                          className={cx("btn-page", {
                            active: page - 1 === index,
                          })}
                          key={index}
                          onClick={() => handleOnclickPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      );
                    } else {
                      if (index > totalPage - 6) {
                        return (
                          <button
                            className={cx("btn-page", {
                              active: page - 1 === index,
                            })}
                            key={index}
                            onClick={() => handleOnclickPage(index + 1)}
                          >
                            {index + 1}
                          </button>
                        );
                      }
                    }
                  }
                }
              }
            })
          : arr.map((item, index) => {
              return (
                <button
                  className={cx("btn-page", {
                    active: page - 1 === index,
                  })}
                  key={index}
                  onClick={() => handleOnclickPage(index + 1)}
                >
                  {index + 1}
                </button>
              );
            })}

        <button
          className={cx("btn-page")}
          disabled={page === totalPage}
          onClick={handleOnclickPageNext}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
      <div className={cx("input-to-page")}>
        <input
          className={cx("input")}
          type="Number"
          onChange={handleInputOnchange}
          value={toPage}
        />
        <button className={cx("btn-to-page")} onClick={handleOnclickToPage}>
          Go
        </button>
      </div>
    </div>
  ) : null;
  //   ) : (
  //     totalPage > 1 && (
  //       <div ref={paginationRef} className={cx('wrapper', 'mobile')}>
  //         <div className={cx('pagination')}>
  //           <button className={cx('btn-page')} disabled={page === 1} onClick={handleOnclickPagePre}>
  //             <FontAwesomeIcon icon={faAngleLeft} />
  //           </button>
  //           {totalPage > 5
  //             ? arr.map((item, index) => {
  //                 if (page < 2) {
  //                   if (index === 5) {
  //                     return (
  //                       <button
  //                         className={cx('btn-page', {
  //                           active: page - 1 === index,
  //                         })}
  //                         key={index}
  //                         onClick={() => handleOnclickPage(index + 1)}
  //                       >
  //                         ...
  //                       </button>
  //                     );
  //                   }

  //                   if (index < 2) {
  //                     return (
  //                       <button
  //                         className={cx('btn-page', {
  //                           active: page - 1 === index,
  //                         })}
  //                         key={index}
  //                         onClick={() => handleOnclickPage(index + 1)}
  //                       >
  //                         {index + 1}
  //                       </button>
  //                     );
  //                   } else {
  //                     if (index > totalPage - 2) {
  //                       return (
  //                         <button
  //                           className={cx('btn-page', {
  //                             active: page - 1 === index,
  //                           })}
  //                           key={index}
  //                           onClick={() => handleOnclickPage(index + 1)}
  //                         >
  //                           {index + 1}
  //                         </button>
  //                       );
  //                     }
  //                   }
  //                 } else {
  //                   if (page > 1 && page < totalPage - 2) {
  //                     if (index === 1 || index === totalPage - 2) {
  //                       return (
  //                         <button
  //                           className={cx('btn-page', {
  //                             active: page - 1 === index,
  //                           })}
  //                           key={index}
  //                         >
  //                           ...
  //                         </button>
  //                       );
  //                     }

  //                     if (index < 1) {
  //                       return (
  //                         <button
  //                           className={cx('btn-page', {
  //                             active: page - 1 === index,
  //                           })}
  //                           key={index}
  //                           onClick={() => handleOnclickPage(index + 1)}
  //                         >
  //                           {index + 1}
  //                         </button>
  //                       );
  //                     } else {
  //                       if (index === page) {
  //                         return (
  //                           <button
  //                             className={cx('btn-page', {
  //                               active: page - 1 === index,
  //                             })}
  //                             key={index}
  //                             onClick={() => handleOnclickPage(index + 1)}
  //                           >
  //                             {index + 1}
  //                           </button>
  //                         );
  //                       } else {
  //                         if (index > totalPage - 2) {
  //                           return (
  //                             <button
  //                               className={cx('btn-page', {
  //                                 active: page - 1 === index,
  //                               })}
  //                               key={index}
  //                               onClick={() => handleOnclickPage(index + 1)}
  //                             >
  //                               {index + 1}
  //                             </button>
  //                           );
  //                         }
  //                       }
  //                     }
  //                   } else {
  //                     if (index === 2) {
  //                       return (
  //                         <button
  //                           className={cx('btn-page', {
  //                             active: page - 1 === index,
  //                           })}
  //                           key={index}
  //                         >
  //                           ...
  //                         </button>
  //                       );
  //                     }

  //                     if (index < 1) {
  //                       return (
  //                         <button
  //                           className={cx('btn-page', {
  //                             active: page - 1 === index,
  //                           })}
  //                           key={index}
  //                           onClick={() => handleOnclickPage(index + 1)}
  //                         >
  //                           {index + 1}
  //                         </button>
  //                       );
  //                     } else {
  //                       if (index > totalPage - 3) {
  //                         return (
  //                           <button
  //                             className={cx('btn-page', {
  //                               active: page - 1 === index,
  //                             })}
  //                             key={index}
  //                             onClick={() => handleOnclickPage(index + 1)}
  //                           >
  //                             {index + 1}
  //                           </button>
  //                         );
  //                       }
  //                     }
  //                   }
  //                 }
  //               })
  //             : arr.map((item, index) => {
  //                 return (
  //                   <button
  //                     className={cx('btn-page', {
  //                       active: page - 1 === index,
  //                     })}
  //                     key={index}
  //                     onClick={() => handleOnclickPage(index + 1)}
  //                   >
  //                     {index + 1}
  //                   </button>
  //                 );
  //               })}

  //           <button className={cx('btn-page')} disabled={page === totalPage} onClick={handleOnclickPageNext}>
  //             <FontAwesomeIcon icon={faAngleRight} />
  //           </button>
  //         </div>
  //         <div className={cx('input-to-page')}>
  //           <input className={cx('input')} type="Number" onChange={handleInputOnchange} value={toPage} />
  //           <button className={cx('btn-to-page')} onClick={handleOnclickToPage}>
  //             Go
  //           </button>
  //         </div>
  //       </div>
  //     )
  //   );
}

export default Pagination;
