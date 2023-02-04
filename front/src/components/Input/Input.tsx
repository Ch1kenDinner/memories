import { DetailedDivProps, DetailedInputProps } from "../../common/types";
import './Input.scss'

export interface InputProps extends DetailedInputProps {
  errorMessage?: string;
  value: string;
  setValue: (value: string) => any;
}

export const Input = ({
  value,
  setValue,
  errorMessage,
  ...props
}: InputProps): JSX.Element => {
  return (
    <div className={`inputWrapper ${errorMessage && "required"}`}>
      <input
				type={props.type}
				placeholder={props.placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
				onKeyDown={props.onKeyDown}
      />
      {errorMessage && <span className="errorMessage">{errorMessage}</span>}
      {props.children}
    </div>
  );
};
