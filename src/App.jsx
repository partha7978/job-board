import "./App.css";
import Home from "./Home/Home";
import { Provider } from "react-redux";
import JobStore from "./Store/JobStore";
function App() {
  return (
    <>
      <Provider store={JobStore}>
        <Home />
      </Provider>
    </>
  );
}

export default App;
