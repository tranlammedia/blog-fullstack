import React, { FC } from "react";
import { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";

interface CustomUndoProps {}
const CustomUndo: FC<CustomUndoProps> = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

interface CustomRedoProps {}
const CustomRedo: FC<CustomRedoProps> = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

function undoChange(this: { quill: any }) {
  this.quill.history.undo();
}
function redoChange(this: { quill: any }) {
  this.quill.history.redo();
}

// const Size = Quill.import("attributors/style/size");
// Size.whitelist = ["0.8rem", "1rem", "1.5rem", "2rem"];
// Quill.register(Size, true);

const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);
Quill.register("modules/imageResize", ImageResize);

export const modules = {
  toolbar: {
    
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
    header: [1, 2, 3, 4, false]
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize", "Toolbar"],
    handleStyles: {
      backgroundColor: "black",
      border: "none",
      color: "white",
      // other camelCase styles for size display
    },
    displayStyles: {
      backgroundColor: "black",
      border: "none",
      color: "white",
      // other camelCase styles for size display
    },
    toolbarStyles: {
      backgroundColor: "black",
      border: "none",
      color: "white",
      // other camelCase styles for size display
    },
  },
};

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

interface QuillToolbarProps {}
export const EditorToolbar: FC<QuillToolbarProps> = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>
      {/* <select className="ql-size" defaultValue="1rem">
        <option value="0.8rem">Small</option>
        <option value="1rem" >Normal</option>
        <option value="1.5rem" >Medium</option>
        <option value="2rem" >Large</option>
      </select> */}
      <select className="ql-header" defaultValue="3">
        <option value="3">Normal</option>
      <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="4">Heading 4</option>

      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>
    <span className="ql-formats">
      <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" />
      <button className="ql-blockquote" />
      <button className="ql-direction" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </span>
    <span className="ql-formats">
      <button className="ql-formula" />
      <button className="ql-code-block" />
      <button className="ql-clean" />
    </span>
    <span className="ql-formats">
      <button className="ql-undo">
        <CustomUndo />
      </button>
      <button className="ql-redo">
        <CustomRedo />
      </button>
    </span>
  </div>
);
