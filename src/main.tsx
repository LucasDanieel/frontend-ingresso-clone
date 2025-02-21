import ReactDOM from "react-dom/client";
import "./index.scss";
import Router from "./router/index.tsx";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_URL_BACKEND;

ReactDOM.createRoot(document.getElementById("root")!).render(<Router />);
