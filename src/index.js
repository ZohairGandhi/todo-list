import Storage from "./modules/Storage";
import UI from "./modules/UI";
import "./style.css";

const app = Storage.loadData();
UI.setUpAllComponents(app);
