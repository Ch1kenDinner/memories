import { useCallback, useEffect, useState } from "react";
import { IPost } from "../../../../back/models/types";
import { myFetch } from "../../api";
// import { fetchGetPosts, fetchGetPostsBySearch } from "../../api";
import { debounce } from "../../common/helpers";
import { DetailedDivProps } from "../../common/types";
import { Post } from "../../components/Post/Post";
import { Spinner } from "../../components/Spinner/Spinner";
import { mainActions } from "../../redux/mainSlice";
import { useCustomDispatch, useCustomSelector } from "../../redux/store";
import "./Posts.scss";

export interface IPosts extends DetailedDivProps {}

export const Posts = ({ className, ...props }: IPosts): JSX.Element => {
  const dispatch = useCustomDispatch();
  const { searchParams } = useCustomSelector((state) => state.main);

  const pageParam = searchParams.get("page") ?? "1";
  const searchParam = searchParams.get("search");

  const [posts, setPosts] = useState<IPost[]>();
  // const { posts } = useCustomSelector((state) => state.main);

  const [loading, setLoading] = useState<boolean>(false);

  const debouncedFetch = useCallback(
    debounce((searchParam) => {
      setLoading(true);
      myFetch("getPostsBySearch", {
        limit: "6",
        page: pageParam,
        searchQuery: searchParam,
      })
        .then(({ data }) => setPosts(data.posts))
        .finally(() => setLoading(false));
    }, 1000),
    []
    // debounce(
    //   (searchParam) =>
    //     fetchGetPostsBySearch(searchParam)
    //       .then(({ data }) => setPosts(data.posts))
    //       .finally(() => setIsLoading(false)),
    //   1000
    // ),
    // []
  );

  useEffect(() => {
    // if (pageParam) {
      // fetchGetPosts({ limit: "6", page: pageParam }).then(({ data }) => {
      // 		dispatch(mainActions.setPosts(data.posts));
      // 		dispatch(mainActions.setPageCount(data.pageCount));
      // 	}
      // );
      // setIsLoading(true);
      // fetchGetPosts(parseInt(pageParam))
      //   .then(({ data }) => {
      //     setPosts(data.posts);
      //     dispatch(mainActions.setPageCount(data.pageCount));
      //   })
      //   .finally(() => setIsLoading(false));
			// if (searchParam) return debouncedFetch(searchParam);
      // setLoading(true);
      // myFetch("getPosts", { limit: "6", page: pageParam })
      //   .then(({ data }) => {
      //     setPosts(data.posts);
      //     dispatch(mainActions.setPageCount(data.pageCount));
      //   })
      //   .finally(() => setLoading(false));
    // }
		if (searchParam) return debouncedFetch(searchParam);
		setLoading(true);
		myFetch("getPosts", { limit: "6", page: pageParam })
			.then(({ data }) => {
				setPosts(data.posts);
				dispatch(mainActions.setPageCount(data.pageCount));
			})
			.finally(() => setLoading(false));
  }, [pageParam, searchParam]);

  // useEffect(() => {
	// 	if (!searchParam) return myFetch("getPosts", {limit: '6', page: pageParam}).then(({data}) => {
	// 		setPost(data.posts);
	// 		di
	// 	})
	// 	debouncedFetch(searchParam);
  // }, [searchParam]);

  return (
    <div {...props} className={`posts hide-scrollbar ${className}`}>
      {loading ? (
        <Spinner />
      ) : posts ? (
        <>
          {posts.map((el) => (
            <Post post={el} />
          ))}
        </>
      ) : (
        <p>Not found</p>
      )}
    </div>
  );
};
