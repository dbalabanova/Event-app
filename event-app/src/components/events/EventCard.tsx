import { Event } from "models/events";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dispatch, RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import HeartIcon from "components/shared/Icons/HeartIcon";
import ColredHeartIcon from "components/shared/Icons/ColoredHeartIcon";

const EventCard = ({ event }: { event: Event }):JSX.Element => {
  const dispatch = useDispatch<Dispatch>();
  const userEmail = useSelector((state: RootState) => state.auth.isAuthenticated);
  const users = useSelector((state: RootState) => state.user.users);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const currentUser = users.find((user) => user.email === userEmail);

  useEffect(() => {

    currentUser?.wishlist?.some((item: string) => item === event.id)
      ? setAddedToWishlist(true)
      : setAddedToWishlist(false);
  }, [event,currentUser]);


  const category = event.classifications.find((obj) => obj.segment)?.segment.name;
  const image =
    event.images.find((image) => image.ratio === "4_3")?.url || event.images.find((image) => image.url)?.url;

  const handleAddToWishlist = () => {
    if (!addedToWishlist) {
      setAddedToWishlist(true);
      dispatch.user.addToWishList({ email: userEmail, event });
    } else {
      setAddedToWishlist(false);
      dispatch.user.removeFromWishlist({ email: userEmail, event });
    }
  };

  return (
    <div className="card card-image-cover ml-8 mr-8 mb-16">
      <div className="card-body">
        <h2 className="card-header">{event.name}</h2>
        <p className="text-content2">{category}</p>
        <div className="card-footer">
          <NavLink to={`/event/${event.id}`}>
            <button className="btn-secondary btn">Details</button>
          </NavLink>
          {userEmail && (
            <button className={addedToWishlist ? "btn btn-success" : "btn-secondary btn"} onClick={handleAddToWishlist}>
              Add to wish list {addedToWishlist ? <ColredHeartIcon /> : <HeartIcon />}
            </button>
          )}
        </div>
      </div>
      <img src={image} alt="" />
    </div>
  );
};

export default EventCard;
