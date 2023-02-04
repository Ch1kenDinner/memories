/* eslint-disable react-hooks/rules-of-hooks */
import FileBase64 from "react-file-base64";
import { GrDocumentUpload } from "react-icons/gr";
import { myFetch } from "../../api";
import { defaultValidationRules } from "../../common/const";
import { DetailedDivProps, IValidateRule } from "../../common/types";
import { Input } from "../../components/Input/Input";
import { TagsInput } from "../../components/TagsInput/TagsInput";
import { useValidate } from "../../hooks/useValidate";
import {useState} from 'react'
// import { usePostPostMutation } from "../../redux/api_old";
import "./PostForm.scss";

export interface IPostForm extends DetailedDivProps {}

export interface IPostFormFields {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export const initPostFormFields: IPostFormFields = {
  title: "",
  description: "",
  image: "",
  tags: [],
};

const postFormFieldsRules: Record<string, IValidateRule[]> = {
  title: [defaultValidationRules.notBeEmpty],
  description: [],
  image: [defaultValidationRules.notBeEmpty],
  tags: [defaultValidationRules.notBeEmpty],
};

export const PostForm = ({
  style,
  className,
  ...props
}: IPostForm): JSX.Element => {
  // const [postPost, response] = usePostPostMutation();

	const [loading, setLoading] = useState<boolean>(false)

  const {
    fields,
    setField,
    setFields,
    clearFields,
		validating,
    setValidating,
    isValid,
    errorMessageFields,
  } = useValidate(postFormFieldsRules, initPostFormFields);

  const handleSubmit = () => {
    setValidating(true);
    if (isValid()) {
      // postPost(fields).then(() => {
      //   clearFields();
      //   setValidating(false);
      // });
			setLoading(true)
			myFetch("postPost", {}, {post: fields}).then(() => {
				clearFields();
				setValidating(false)
			}).finally(() => setLoading(false))
    }
  };

  return (
    <div style={style} className={`postForm`}>
      {/* <div className={`wrapper ${errorMessageFields?.title && "required"}`}>
        <input
          value={fields.title}
          onChange={(e) => setField("title", e.target.value)}
          type="text"
          placeholder="Title*"
        />
        {errorMessageFields?.title && <span>{errorMessageFields.title}</span>}
      </div> */}
      <Input
        value={fields.title}
        setValue={(value) => setField("title", value)}
        errorMessage={validating ? errorMessageFields?.title : ""}
        placeholder="Title*"
      />
      {/* <div
        className={`wrapper ${errorMessageFields?.description && "required"}`}
      >
        <input
          value={fields.description}
          onChange={(e) => setField("description", e.target.value)}
          type="text"
          placeholder="Description"
        />
        {errorMessageFields?.description && (
          <span>{errorMessageFields.description}</span>
        )}
      </div> */}
      <Input
        value={fields.description}
        setValue={(value) => setField("description", value)}
        errorMessage={validating ? errorMessageFields?.description : ""}
        placeholder="Description"
      />
      {/* <TagsInput
        tags={fields.tags}
        setTag={(value: string) =>
          setFields((prev) => ({
            ...prev,
            tags: prev.tags ? [...prev.tags, value] : [value],
          }))
        }
        removeTag={(value: string) =>
          setFields((prev) => ({
            ...prev,
            tags: prev.tags.filter((el) => el !== value),
          }))
        }
        errorMessage={errorMessageFields?.tags}
      /> */}
      <TagsInput
        tags={fields.tags}
        setTag={(value) =>
          setFields((prev) => ({ ...prev, tags: [...prev.tags, value] }))
        }
        removeTag={(value: string) =>
          setFields((prev) => ({
            ...prev,
            tags: prev.tags.filter((el) => el !== value),
          }))
        }
        errorMessage={validating ? errorMessageFields?.tags : ""}
      />
      <label className={`file ${validating && errorMessageFields?.image && "required"}`}>
        <FileBase64
          multiple={false}
          onDone={({ base64 }) => setField("image", base64)}
        />
        {!fields.image ? (
          <>
            <span>Click to upload</span>
            <GrDocumentUpload />
          </>
        ) : (
          <>
            <span>Uploaded!</span>
            <img src={fields.image} alt="" />
          </>
        )}
      </label>
      <button disabled={loading} onClick={() => handleSubmit()} type="submit">
        Submit
      </button>
      <button onClick={() => clearFields()} disabled={loading} type="submit">
        Clear
      </button>
    </div>
  );
};
