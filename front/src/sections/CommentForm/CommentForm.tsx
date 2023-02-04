import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { myFetch } from "../../api";
import { DetailedDivProps } from "../../common/types";
import "./CommentForm.scss";

export interface CommentFormProps extends DetailedDivProps {
  postId: string;
  onSubmit?: () => any;
}

export const CommentForm = ({
  postId,
  onSubmit,
  ...props
}: CommentFormProps): JSX.Element => {
  const profile =
    localStorage.getItem("profile") &&
    JSON.parse(localStorage.getItem("profile")!);

  const [text, setText] = useState<string>();

  const handleSubmit = () => {
    if (text) {
      const doc = {
        description: text,
      };
      // api
      //   .post(`/post/${postId}/postComment`, { comment: doc })
      //   .then(() => onSubmit && onSubmit());
      myFetch("postPostComment", { postId: postId }, { comment: doc }).then(
        () => onSubmit && onSubmit()
      );
    }
  };

  return (
    <div {...props} className="commentForm">
      {profile && profile.user && (
        <div className="user">
          <img src={profile.user.image} alt="" />
        </div>
      )}
      <textarea
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit}>
        <IoSendSharp />
      </button>
    </div>
  );
};
