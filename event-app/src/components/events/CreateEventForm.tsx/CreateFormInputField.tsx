import { ChangeEvent } from "react";

type CreateFormInputFieldProps = {
  field: string;
  error: boolean;
  onChangeEventInfo: (field: string, event: ChangeEvent<HTMLInputElement>) => void;
  onValidateField: (field: string, event: ChangeEvent<HTMLInputElement>) => void;
};

const CreateFormInputField = (props: CreateFormInputFieldProps):JSX.Element => {
  const errorMessage = (): string => {
    if (props.field === "price" && props.error) return "Field must not be empty and must be a number";
    if (props.field !== "price" && props.error) return "Field must not be empty";
    return "";
  };

  return (
    <div className="form-control flex flex-col">
      <input
        className="input-ghost-primary input input-md mt-2"
        onChange={(event) => props.onChangeEventInfo(props.field, event)}
        onBlur={(event) => props.onValidateField(props.field, event)}
        placeholder={props.field}
      />
      <label className="form-label mb-10 h-3">
        <span className="form-label-alt text-red-600">{errorMessage()}</span>
      </label>
    </div>
  );
};

export default CreateFormInputField;
