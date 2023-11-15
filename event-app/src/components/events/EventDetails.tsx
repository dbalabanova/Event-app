import { Dispatch, RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "components/shared/Loader";

const EventDetails = ():JSX.Element => {
  const [numberOfTickets, setNumberOfTiskets] = useState(0);
  const [addedToPurchase, setAddedToPurchase] = useState(false);

  const dispatch = useDispatch<Dispatch>();
  const email = useSelector((state: RootState) => state.auth.isAuthenticated);
  const event = useSelector((state: RootState) => state.events.currentEvent);
  const id = useParams().id as string;

  useEffect(() => {
    dispatch.events.getEventDetails(id);
  }, []);

  useEffect(() => {
    if (addedToPurchase) setNumberOfTiskets(0);
  }, [addedToPurchase]);

  const category = event?.classifications.find((obj) => obj.segment)?.segment.name;
  const image =
    event?.images.find((image) => image.ratio === "4_3")?.url || event?.images.find((image) => image.url)?.url;

  const handleBuyClick = () => {
    dispatch.user.addToPurchases({
      tickets: numberOfTickets,
      event: event,
      email,
    });
    setAddedToPurchase(true);
  };

  const handleTicketNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberOfTiskets(parseInt(e.target.value));
  };

  if (!event) return <Loader />;

  return (
    <>
      <div className="card card-image-cover m-auto mt-20">
        <div className="card-body">
          <h2 className="card-header">{event?.name}</h2>
          <p className="text-content2">{category}</p>
          <h2>Date: {event?.dates?.start?.localDate}</h2>
          <h2>Hour: {event?.dates?.start?.localTime}</h2>
          <h2>Ticket price: {event?.priceRanges?.[0]?.min || "--"} EUR</h2>
          <div className="card-footer">
            <div className="flex align-end">
              <div className="relative" data-te-input-wrapper-init>
                <p className="text-slate-400">Number of tickets</p>
                <input
                  type="number"
                  className="border-2 border-current peer block min-h-[auto] w-4/5 rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInputNumber"
                  placeholder="Example label"
                  onChange={handleTicketNumber}
                  value={numberOfTickets}
                />
              </div>
              <button
                className={addedToPurchase ? "btn btn-success self-end" : "btn-secondary btn self-end"}
                onClick={handleBuyClick}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
        <img src={image} alt="" />
      </div>
    </>
  );
};

export default EventDetails;
