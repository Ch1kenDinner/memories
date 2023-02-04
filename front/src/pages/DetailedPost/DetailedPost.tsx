import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BsHouse } from "react-icons/bs";
import { NavLink, useParams } from "react-router-dom";
import { IPost } from "../../../../back/models/types";
import { myFetch } from "../../api";
import { ga } from "../../common/helpers";
import { DetailedDivProps } from "../../common/types";
import { Comment } from "../../components/Comment/Comment";
import { Post } from "../../components/Post/Post";
import { Spinner } from "../../components/Spinner/Spinner";
import { User } from "../../components/User/User";
import { CommentForm } from "../../sections/CommentForm/CommentForm";
import "./DetailedPost.scss";

export interface DetailedPostProps extends DetailedDivProps {}

export const DetailedPost = (props: DetailedPostProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<IPost>();
  const [postsRelated, setPostsRelated] = useState<IPost[]>();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      // fetchGetPostDetails(id)
      //   .then(({ data: dataPost }) => {
      //     setPost(dataPost.post);
      //     dataPost.post.tags &&
      //       api
      //         .post("/posts/related", { tags: dataPost.post.tags })
      //         .then(({ data }) =>
      //           setPostsRelated(
      //             data.posts.filter((el) => el._id != dataPost.post?._id)
      //           )
      //         );
      //   })
      //   .finally(() => setLoading(false));
			// console.log("Fetch getPostDetails");
      myFetch("getPostDetails", { postId: id }).then(({ data: data_1 }) => {
        setPost(data_1.post);
        data_1.post.tags &&
          myFetch(
            "postPostsRelatedByTags",
            {},
            { tags: data_1.post.tags }
          ).then(({ data: data_2 }) =>
            setPostsRelated(
              data_2.posts.filter((el) => el._id != data_1.post?._id)
            )
          ).finally(() => setLoading(false));
      });
    }
  }, []);

  if (loading || !post) return <Spinner />;

  return (
    <>
      <div className="detailedPostWrapper">
        <User className="us" style={ga("us")} />
        <div style={ga("po")} className={"detailedPost"}>
          <div className="description">
            <div className="user">
              <img src={post.createdBy?.image} alt="" />
              <p>{post.createdBy?.name}</p>
            </div>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <time
              className="cA"
              style={ga("cA")}
              dateTime={post.createdAt!.toString()}
            >
              {dayjs(post.createdAt).format("DD MMMM, HH:mm")}
            </time>
          </div>
          <div className="img">
            <img src={post.image} alt="post_image" />
          </div>
        </div>
        <NavLink className={"ho"} style={ga("ho")} to={"/"}>
          <BsHouse />
        </NavLink>
        <div className="commentsWrapper">
          {post._id && <CommentForm postId={post._id} />}
          {post.comments?.length ? (
            <div className="comments">
              {post.comments.map((el) => (
                <Comment comment={el} />
              ))}
            </div>
          ) : (
            <h3>No comments yet...</h3>
          )}
        </div>
      </div>
      {!!postsRelated?.length && (
        <div className="relatedPostsWrapper">
          <h1>Related</h1>
          <div className="relatedPosts">
            {postsRelated.map((el) => (
              <Post post={el} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
