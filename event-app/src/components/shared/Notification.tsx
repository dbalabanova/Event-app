import ErrorSign from "components/shared/Icons/ErrorSign";
import SuccessSign from "components/shared/Icons/SuccessSign";

export type NotificationState = 'success' | 'error' | undefined

type NotificationProps = { state: NotificationState; title: string; message: string };

const Notification = ({ state, title, message }: NotificationProps):JSX.Element => {
  let notificationColorClass = state === "success" ? "alert-success" : "alert-error";
  return (
    <div className={`alert ${notificationColorClass}`}>
      {state === "success" ? <SuccessSign/> : <ErrorSign/>}
      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <span>{title}</span>
          <span className="text-content2">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Notification;
