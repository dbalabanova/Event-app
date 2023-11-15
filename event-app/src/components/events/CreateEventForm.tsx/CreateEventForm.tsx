import { ChangeEvent, useState } from "react";
import { Dispatch } from "store";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "utils/validators";
import { getDate, getHour, getDateAYearFromNow, getCurrentDate } from "utils/date";
import { UserEvent } from "models/events";
import CreateFormInputField from "./CreateFormInputField";

type ErrorsField = "title" | "imgLink" | "price" | "genre";

type ErrorsType = {
  [field in ErrorsField]: boolean;
};


const initialErrorState: ErrorsType = {
  title: false,
  imgLink: false,
  price: false,
  genre: false,
};

const CreateEventForm = ():JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const [timeAndDate, setTimeAndDate] = useState(getCurrentDate());

  const initialEventState: UserEvent = {
    date: getDate(timeAndDate),
    hour: getHour(timeAndDate),
    id:'',
    title: "",
    imgLink: "",
    price: 0,
    genre: "",
  };

  const [errors, setErrors] = useState(initialErrorState);
  const [event, setEvent] = useState(initialEventState);

  const handleOnChangeEventInfo = (eventProperty: string, event: ChangeEvent<HTMLInputElement>) => {
    setEvent((prevStyle) => ({
      ...prevStyle,
      [`${eventProperty}`]: event.target?.value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [`${eventProperty}`]: false,
    }));
  };

  const validateField = (eventProperty: string, event: ChangeEvent<HTMLInputElement>) => {
    if (isEmpty(event.target.value) || (eventProperty === "price" && !Number(event.target.value))) {
      setErrors((prevState) => ({
        ...prevState,
        [`${eventProperty}`]: true,
      }));
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let date = e.target.value;
    setTimeAndDate(e.target.value);
    setEvent((prevStyle) => ({
      ...prevStyle,
      date: getDate(date),
      hour: getHour(date),
    }));
  };

  const checkIfAnyErrors:boolean=  Object.entries(event).some(([key, value]) => key!=='id' && !value);

  const handleCreate = () => {
    const id = uuid();
    dispatch.events.createEvent({ ...event, id });
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col items-center font-bold border-2 mt-20 m-auto w-2/3 rounded-2xl">
        <h2 className="mb-10">Create an Event Form</h2>
        {Object.keys(errors).map((field, index) => {
          return (
            <CreateFormInputField
              key={index}
              field={field}
              error={errors[field as keyof ErrorsType]}
              onChangeEventInfo={handleOnChangeEventInfo}
              onValidateField={validateField}
            />
          );
        })}
        <input
          className="input-ghost-primary input input-md mb-10"
          type="datetime-local"
          id="meeting-time"
          name="meeting-time"
          onChange={handleOnChange}
          value={timeAndDate}
          min={getCurrentDate()}
          max={getDateAYearFromNow()}
        />
        <button className="btn-secondary btn" onClick={handleCreate} disabled={checkIfAnyErrors}>
          Create
        </button>
      </div>
    </>
  );
};

export default CreateEventForm;
