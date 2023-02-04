import { useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { DetailedInputProps } from "../../common/types";
import { Input, InputProps } from "../Input/Input";
import "./TagsInput.scss";

export interface TagsInputProps extends DetailedInputProps {
  tags?: string[];
  setTag: any;
  removeTag: any,
	errorMessage?: string,
}

export const TagsInput = ({
  tags,
  setTag,
  removeTag,
  errorMessage,
  ...props
}: TagsInputProps): JSX.Element => {
  // const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<string>("");

  const handleAddTag = () => {
    if (value) {
			console.log('value :>> ', value);
      setTag(value);
      setValue("");
    }
  };

  const handleKeydown = (e: any) => {
    if (e.code == "Enter") {
      handleAddTag();
    }
  };
  // const handleAddTag = () => {
  //   if (inputRef.current?.value) {
  //     setTag(inputRef.current.value);
  //     inputRef.current.value = "";
  //   }
  // };

  // const handleKeydown = (e: any) => {
  //   if (e.code == "Enter") {
  //     handleAddTag();
  //   }
  // };

  return (
    <div className="tagsInput">
      {/* <div className={`wrapper input ${errorMessage && "required"}`}>
        <input
          placeholder="Tags"
          type="text"
          ref={inputRef}
          onKeyDown={handleKeydown}
        />
        {errorMessage && <span>{errorMessage}</span>}
        <button onClick={() => handleAddTag()} type="button">
          <GrAddCircle />
        </button>
      </div> */}
      <Input
        value={value}
        setValue={setValue}
        onKeyDown={handleKeydown}
        errorMessage={errorMessage}
        placeholder="Tags"
      >
        <button className="inputButton" onClick={() => handleAddTag()} type="button">
          <GrAddCircle />
        </button>
      </Input>
      <div className="tags">
        {tags &&
          tags.map((el) => (
            <span className="tag">
              {el}
              <span onClick={() => removeTag(el)} className="cross"></span>
            </span>
          ))}
      </div>
    </div>
    // <div className="tagsInput">
    //   <div className={`wrapper input ${errorMessage && "required"}`}>
    //     <input
    //       placeholder="Tags"
    //       type="text"
    //       ref={inputRef}
    //       onKeyDown={handleKeydown}
    //     />
    //     {errorMessage && <span>{errorMessage}</span>}
    //     <button onClick={() => handleAddTag()} type="button">
    //       <GrAddCircle />
    //     </button>
    //   </div>
    //   <div className="tags">
    //     {tags &&
    //       tags.map((el) => (
    //         <span className="tag">
    //           {el}
    //           <span onClick={() => removeTag(el)} className="cross"></span>
    //         </span>
    //       ))}
    //   </div>
    // </div>
  );
};
