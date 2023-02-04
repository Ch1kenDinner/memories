import classNames from "classnames";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { TbHandClick } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { IPost } from "../../../../back/models/types";
import { myFetch } from "../../api";
import { ga } from "../../common/helpers";
import { mainActions } from "../../redux/mainSlice";
import { useCustomDispatch, useCustomSelector } from "../../redux/store";
import "./Post.scss";

export interface PostProps {
  post: IPost;
}

export const Post = ({ post: postInit, ...props }: PostProps): JSX.Element => {
  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [post, setPost] = useState<IPost>(postInit);
  const [editingPost, setEditingPost] = useState<Partial<IPost>>();

  const { editingPostId } = useCustomSelector((state) => state.main);
  const dispatch = useCustomDispatch();
  // const [patchPost, patchResponse] = usePatchPostMutation();
  // const [deletePost] = useDeletePostMutation();
  // const [likePost, likeResponse] = useLikePostMutation();
  const navigate = useNavigate();

  const user =
    localStorage.getItem("profile") &&
    JSON.parse(localStorage.getItem("profile")!).user;

  const toggleEditing = () => {
    if (editing) {
      if (editingPost && editingPost?._id) {
        setLoading(true);
        // patchPost({ postId: editingPost._id, post: editingPost }).finally(() =>
        //   setLoading(false)
        // );
        myFetch("patchPost", { postId: editingPost._id }, { post: editingPost })
          .then(({ data }) => {
            setPost(data.post);
            setEditing(false);
          })
          .finally(() => setLoading(false));
      }
    } else {
      dispatch(mainActions.setEditingPostId(post._id!));
      setEditingPost(post);
      setEditing((prev) => !prev);
    }
  };

  const handleDelete = () => {
    myFetch("deletePost", { postId: post._id });
  };

  const handleLike = () => {
    // api
    //   .patch(ApiRoutes.likePost(post._id!))
    //   .then(({ data }) => setPost(data.post));
    myFetch("patchLikePost", { postId: post._id }).then(({ data }) =>
      setPost(data.post)
    );
  };

  // useEffect(() => {
  //   if (likeResponse.data) {
  //     setPost(likeResponse.data.post);
  //   }
  // }, [likeResponse.data]);

  // useEffect(() => {
  //   if (patchResponse.data) {
  //     setPost(patchResponse.data);
  //     setEditingPost(undefined);
  //     setEditing((prev) => !prev);
  //     setLoading(false);
  //   }
  // }, [patchResponse.data]);

  // можно редактировать максимум один пост
  useEffect(() => {
    if (editingPostId !== post._id) {
      setEditing(false);
      setEditingPost(undefined);
    }
  }, [editingPostId]);

  return (
    <div className="post">
      <div className="im" style={ga("im")}>
        {editing ? (
          <>
            <label>
              <TbHandClick />
              <img src={editingPost!.image} alt="postImage" />
              <FileBase64
                multiple={false}
                onDone={({ base64 }) =>
                  setEditingPost((prev) => ({ ...prev, image: base64 }))
                }
              />
            </label>
          </>
        ) : (
          <Link className="imgLink" to={`/post/${post._id}`}>
            <img src={post.image} alt="postImage" />
          </Link>
        )}
      </div>
      <div className="cB" style={ga("cB")}>
        {post.createdBy?.name}
      </div>
      <time
        className="cA"
        style={ga("cA")}
        dateTime={post.createdAt!.toString()}
      >
        {dayjs(post.createdAt).format("DD.MM, HH:mm")}
      </time>
      <div className="ti" style={ga("ti")}>
        {editing ? (
          <input
            value={editingPost?.title}
            onChange={(e) =>
              setEditingPost((prev) => ({ ...prev, title: e.target.value }))
            }
            type="text"
          />
        ) : (
          post.title
        )}
      </div>
      <div className="de" style={ga("de")}>
        {editing ? (
          <input
            value={editingPost?.description}
            onChange={(e) =>
              setEditingPost((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            type="text"
          />
        ) : (
          post.description
        )}
      </div>
      <div className="taWrapper" style={ga("ta")}>
        {post.tags?.map((el) => (
          <span className="ta">{el}</span>
        ))}
      </div>
      <button
        disabled={loading}
        onClick={() => handleLike()}
        className="li"
        style={ga("li")}
      >
        {user && post.likes?.includes(user.id) ? (
          <MdOutlineFavorite />
        ) : (
          <MdOutlineFavoriteBorder />
        )}
        {post.likes?.length}
      </button>
      {user?.id == post.createdBy?._id && (
        <>
          <button
            disabled={loading}
            onClick={() => toggleEditing()}
            className={classNames("ed", {
              active: editing,
            })}
            style={ga("ed")}
          >
            <AiOutlineEdit />
            Edit
          </button>
          <button
            disabled={loading}
            onClick={() => handleDelete()}
            className="del"
            style={ga("del")}
          >
            <AiOutlineDelete />
            Delete
          </button>
        </>
      )}
    </div>
  );
};
