import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DetailedDivProps } from "../../common/types";
import { useCustomSelector } from "../../redux/store";
import "./Pagination.scss";

const ITEM_SIZE = 30;
let OTHER_ITEMS = 60;

export interface PaginationProps extends DetailedDivProps {}

export const Pagination = ({
  className,
  ...props
}: PaginationProps): JSX.Element => {
  const { pageCount, searchParams } = useCustomSelector((state) => state.main);

  const [pages, setPages] = useState<number[]>();

  const paginationRef = useRef<HTMLDivElement>(null);

  const currentPage = parseInt(searchParams.get("page") ?? "1");

  const handleResize = () => {
    let currentCountItems =
      paginationRef.current &&
      Math.floor(
        (paginationRef.current?.getBoundingClientRect().width - OTHER_ITEMS) /
          ITEM_SIZE
      );

    if (currentCountItems) {
      if (currentCountItems > pageCount) {
        currentCountItems = pageCount!;
      }
      const leftItems = Math.floor(currentCountItems / 2);
      let startIndex;
      if (currentPage - leftItems < 1) {
        startIndex = 1;
      } else if (currentPage + (currentCountItems - leftItems) > pageCount) {
        if (pageCount == currentCountItems) startIndex = 1;
        else startIndex = pageCount - currentCountItems;
      } else {
        startIndex = currentPage - leftItems;
      }
      const newPages = new Array(currentCountItems)
        .fill(0)
        .map((el, i) => i + startIndex);
      setPages(newPages);
    }
  };

  useEffect(() => {
    setPages(new Array(pageCount).fill("").map((el, i) => i + 1));
  }, [pageCount]);

  // const handlePageChange = () => {
  // 	if (currentCountItems) {
  // 		const leftItems = Math.floor(currentCountItems / 2);
  // 		const startIndex = currentPage - leftItems;
  // 		const endIndex = currentPage + (currentCountItems - leftItems);
  // 		if (startIndex <= 3) {
  // 			OTHER_ITEMS = 60;
  // 			setStartMoreVisible(false);
  // 		} else if (endIndex >= pageCount) {
  // 			OTHER_ITEMS = 60;
  // 			setEndMoreVisible(false);
  // 		} else {
  // 			OTHER_ITEMS = 120;
  // 			setStartMoreVisible(true);
  // 			setEndMoreVisible(true);
  // 		}
  // 	}
  // }

  useEffect(() => {
    handleResize();
    // handlePageChange()
  }, [currentPage]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!pages || !pages.length) return <></>;

  return (
    <div ref={paginationRef} className={"pagination " + className}>
      {/* {startMoreVisible && (
        <>
          <CustomLink currentPage={currentPage} pageNum={1} className={"end"} />
          <div className="item dots">...</div>
        </>
      )} */}
      <div {...props} className="items">
        {pages.map((el) => (
          <CustomLink currentPage={currentPage} pageNum={el} />
        ))}
      </div>
      {/* {endMoreVisible && (
        <>
          <div className="item dots">...</div>
          <CustomLink
            currentPage={currentPage}
            pageNum={pageCount - 1}
            className={"end"}
          />
        </>
      )} */}
    </div>
  );
};

const CustomLink = ({
  currentPage,
  pageNum,
  className,
}: Partial<Record<string, any>>) => (
  <Link
    to={`?page=${pageNum}`}
    className={`item ${currentPage === pageNum && "current"} ` + className}
  >
    {pageNum}
  </Link>
);
