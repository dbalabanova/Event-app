import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "routes/router";
import store from "store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
    </Provider>
  );
}

export default App;
