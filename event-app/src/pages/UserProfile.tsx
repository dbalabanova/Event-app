import { RootState } from "store";
import { useSelector } from "react-redux";
import { useState } from "react";
import Navigation from "components/Navigation";
import EventList from "components/events/EventList";
import { getPdf } from "services/pdfService";

const UserProfile = ():JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const email = useSelector((state: RootState) => state.auth.isAuthenticated);
  const users = useSelector((state: RootState) => state.user.users);

  const currentUserPurchases = users.find((user) => user.email === email)?.purchases;
  const events = currentUserPurchases?.map((purchase) => purchase.event) || [];
  console.log(users)

  const handlePDFDownload = async () => {
    if (currentUserPurchases) {
      setIsLoading(true);
      try {
        const blob = await getPdf(currentUserPurchases);
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${email}-puchases-list.pdf`;
        link.click();
      } catch(e) {
        console.log();
        setIsLoading(false);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      {events.length ? (
        <button className="btn btn-solid-primary flex m-auto mt-20" onClick={handlePDFDownload}>
          {isLoading ? "Generating PDF" : "Download PDF"}
          {isLoading && (
            <svg className="ml-6 spinner-ring spinner-success spinner-sm" viewBox="25 25 50 50" strokeWidth="5">
              <circle cx="50" cy="50" r="20" />
            </svg>
          )}
        </button>
      ) : null}
      <EventList events={events} />
    </>
  );
};

export default UserProfile;
