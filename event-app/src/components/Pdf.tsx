import NotFound from "components/shared/NotFound";
import { Event } from "models/events";

type EventInfo = {
  tickets: number;
  event: Event;
}

const Pdf = ({data}:{data:EventInfo[] | undefined}):JSX.Element => {

  if(!data) return <NotFound/>

  return (
    <div>
      <div className="font-bold mt-12 mb-12 flex justify-center text-2xl">PURSHASES LIST</div>
      <div className="flex w-full overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Category</th>
              <th>Date</th>
              <th>Hour</th>
              <th>Tickets</th>
              <th>Price per Ticket</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((eventInfo: EventInfo) => {
              return (
                <tr>

                  <th>{eventInfo?.event?.name}</th>
                  <td>{eventInfo?.event?.classifications?.[0]?.segment?.name}</td>
                  <td>{eventInfo?.event?.dates?.start?.localDate}</td>
                  <td>{eventInfo?.event?.dates?.start?.localTime}</td>
                  <td>{eventInfo?.tickets}</td>
                  <td>{eventInfo?.event?.priceRanges?.[0]?.min || "--"}</td>
                  <td>{`${eventInfo?.event?.priceRanges?.[0]?.min * eventInfo.tickets || "--"} EUR`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pdf;
