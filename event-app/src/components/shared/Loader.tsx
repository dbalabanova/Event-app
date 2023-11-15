
const Loader = ():JSX.Element => {

  return (
    <div className="relative left-2/4 mt-24">
      <div>
        <svg className="spinner-ring spinner-primary spinner-xl" viewBox="25 25 50 50" strokeWidth="5">
          <circle cx="50" cy="50" r="20" />
        </svg>
      </div>
      <div>Loading...</div>
    </div>
  );
};

export default Loader;
