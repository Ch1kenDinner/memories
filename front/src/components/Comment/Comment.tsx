import dayjs from "dayjs";
import { IComment } from "back/models/types";
import { DetailedDivProps } from "../../common/types";
import "./Comment.scss";

export interface CommentProps extends DetailedDivProps {
  comment: IComment;
}

export const Comment = ({ comment, ...props }: CommentProps): JSX.Element => {
  return (
    <div className="comment">
      <span className="username">{comment.createdBy.name}</span>
      <p>{comment.description}</p>
      <time dateTime={comment.createdAt.toString()} />
      <span className="date">
        {dayjs(comment.createdAt).format("YYYY-MM-DD")}
      </span>
    </div>
  );
};
