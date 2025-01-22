import listBox from "../icons/list-box-outline.svg";

export default class UI {
  static renderProjSec(app) {
    const projSec = document.querySelector("#proj-sec");

    app.projectList.forEach((proj) => {
      const projItem = this.createProjItem(proj.title);
      projSec.appendChild(projItem);
    });
  }

  static createProjItem(projTitle) {
    const div = this.createDiv("list-item", null);
    const img = this.createImg(listBox);
    const para = this.createPara(projTitle);

    div.append(img, para);
    return div;
  }

  static createDiv(className = null, idName = null) {
    const div = document.createElement("div");

    if (className) {
      div.classList.add(className);
    }
    if (idName) {
      div.setAttribute("id", idName);
    }

    return div;
  }

  static createImg(source) {
    const img = document.createElement("img");
    img.setAttribute("src", source);
    return img;
  }

  static createPara(text) {
    const para = document.createElement("p");
    para.textContent = text;
    return para;
  }
}
