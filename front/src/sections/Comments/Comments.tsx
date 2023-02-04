import { IComment } from "../../../../back/models/types";
import { DetailedDivProps } from "../../common/types";
import { Comment } from "../../components/Comment/Comment";
import { Spinner } from "../../components/Spinner/Spinner";

export interface CommentsProps extends DetailedDivProps {
  comments: IComment[];
}

export const Comments = ({
  className,
  comments,
  ...props
}: CommentsProps): JSX.Element => {
  if (!comments) return <Spinner />;

  return (
    <div className="comments">
      {comments.map((el) => (
        <Comment comment={el} />
      ))}
    </div>
  );
};
