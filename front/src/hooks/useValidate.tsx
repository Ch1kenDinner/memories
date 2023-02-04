import { useEffect, useState } from "react";
import { IValidateRule } from "../common/types";

export const useValidate = <T extends Record<any, any>>(
  fieldsRules: Record<keyof T, IValidateRule[]>,
  initFields: T
) => {
  const [fields, setFields] = useState<T>(initFields);
  const [errorMessageFields, setErrorMessageFields] =
    useState<Record<keyof T, string | undefined>>();
  const [validating, setValidating] = useState<boolean>(false);

  const setField = (field: keyof T, value: string | string[]) =>
    setFields((prev) => ({ ...prev, [field]: value }));

  const clearFields = () => setFields(initFields);

  const isValid = (validateFields?: Array<keyof T>) => {
		if (!errorMessageFields) return false;
    if (validateFields) {
      return !validateFields.some((el) => !!errorMessageFields![el]?.length);
    }
    return !Object.values(errorMessageFields ?? {}).some((value) => !!value);
  };

  useEffect(() => {
    Object.entries(fieldsRules).forEach(([field, rules]) => {
      const unvalidRule = rules.findIndex((el) => {
        if (Array.isArray(fields[field])) {
          return !fields[field].join(" ").match(el.rule)?.length;
        } else {
          return !fields[field].match(el.rule)?.length;
        }
      });
      if (unvalidRule !== -1) {
        // if (validating)
          setErrorMessageFields((prev): any =>
            prev
              ? {
                  ...prev,
                  [field]: rules[unvalidRule].message,
                }
              : { [field]: rules[unvalidRule].message }
          );
      } else {
        // if (validating)
          setErrorMessageFields((prev): any =>
            prev ? { ...prev, [field]: undefined } : { [field]: undefined }
          );
      }
    });
  }, [fields, validating]);

  return {
    fields,
    setField,
    setFields,
    clearFields,
		validating,
    setValidating,
    isValid,
    errorMessageFields,
  };
};
