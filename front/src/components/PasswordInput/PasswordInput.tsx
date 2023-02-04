import { Input, InputProps } from "../Input/Input";
import {useState} from 'react'
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import './PasswordInput.scss'

// export interface PasswordInputProps extends InputProps {
// 	type: "text" | 'password'
// }

export const PasswordInput = (props: InputProps): JSX.Element => {

	const [textVisibility, setTextVisibility] = useState<boolean>(false)

  return (
    <Input {...props} type={textVisibility ? "text" : "password"}>
      <button className="inputButton" onClick={() => setTextVisibility((prev) => !prev)}>
        {textVisibility ? <BsEyeSlashFill /> : <BsEyeFill />}
      </button>
    </Input>
  );
};
