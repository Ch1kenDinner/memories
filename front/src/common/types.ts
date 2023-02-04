import { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes } from "react";




export interface DetailedDivProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export interface DetailedInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLDivElement
  > {}


export interface IValidateRule {
	rule: RegExp,
	message: string
}

