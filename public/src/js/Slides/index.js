"use strict";
class SlideElement {
    type;
    x;
    y;
    props;
    constructor(type, x, y, props) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.props = props;
    }
}
class Font {
    size;
    name;
    constructor(size, name) {
        this.name = name || "Arial";
        this.size = size;
    }
    toString() {
        return `${this.size}px ${this.name}`;
    }
}
function isSlideTextElement(elem) {
    return elem.type == "textbox";
}
function isSlideImageElement(elem) {
    return elem.type == "image";
}
const slideData = [[new SlideElement("textbox", 10, 0, { content: "hi", font: new Font(50) })]];
const slidesElem = document.getElementById("slides");
function loadView() {
    slidesElem.innerHTML = "";
    slideData.forEach((slide) => {
        const canvas = document.createElement("div");
        canvas.className = "slide";
        slidesElem.append(canvas);
        slide.forEach((elem) => {
            if (isSlideTextElement(elem)) {
                const tempElem = document.createElement("div");
                tempElem.className = "SlideElement";
                if (elem.props.font?.size)
                    tempElem.style.fontSize = elem.props.font.size + "px";
                if (elem.props.font?.name)
                    tempElem.style.fontFamily = elem.props.font.name;
                tempElem.innerHTML = elem.props.content;
                tempElem.style.left = elem.x + "px";
                tempElem.style.top = elem.y + "px";
                if (elem.props.maxWidth) {
                    tempElem.style.width = elem.props.maxWidth + "px";
                }
                canvas.append(tempElem);
            }
        });
    });
}
loadView();
