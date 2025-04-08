import App from "./modules/App";
import UI from "./modules/UI";
import "./style.css";

const app = new App();

UI.renderProjSec(app);
UI.setUpFilterSec(app);
UI.setUpProjDialog(app);
UI.setUpTaskDialog(app);
UI.setUpEditTaskDialog(app);
