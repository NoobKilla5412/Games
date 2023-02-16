interface ElementProps {
  textbox: {
    font?: Font;
    content: string;
    maxWidth?: number;
  };
  image: {
    width: number;
    height: number;
    src: string;
  };
}

class SlideElement<T extends keyof ElementProps> {
  type: T;
  x: number;
  y: number;
  props: ElementProps[T];

  constructor(type: T, x: number, y: number, props: ElementProps[T]) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.props = props;
  }
}

class Font {
  size: number;
  name: string;

  constructor(size: number, name?: string) {
    this.name = name || "Arial";
    this.size = size;
  }

  toString() {
    return `${this.size}px ${this.name}`;
  }
}

function isSlideTextElement(elem: any): elem is SlideElement<"textbox"> {
  return elem.type == "textbox";
}

function isSlideImageElement(elem: any): elem is SlideElement<"image"> {
  return elem.type == "image";
}

const slideData = [[new SlideElement("textbox", 10, 0, { content: "hi", font: new Font(50) })]];
const slidesElem = document.getElementById("slides")!;

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
        if (elem.props.font?.size) tempElem.style.fontSize = elem.props.font.size + "px";
        if (elem.props.font?.name) tempElem.style.fontFamily = elem.props.font.name;
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
