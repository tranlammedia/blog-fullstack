import React, { useEffect, useRef, useState } from "react";
import { Jodit } from "jodit/esm/index.js";
import "jodit/es2021/jodit.min.css";
import './styles.css'

// import "jodit/esm/plugins/add-new-line/add-new-line";
// import "jodit/esm/plugins/backspace/backspace";
// import "jodit/esm/plugins/class-span/class-span"
import "jodit/esm/plugins/clean-html/clean-html";
// import "jodit/esm/plugins/clipboard/clipboard"
import "jodit/esm/plugins/color/color";
import "jodit/esm/plugins/copy-format/copy-format";
import "jodit/esm/plugins/dtd/dtd";
// import "jodit/esm/plugins/drag-and-drop/drag-and-drop";
// import "jodit/esm/plugins/drag-and-drop-element/drag-and-drop-element";
import "jodit/esm/plugins/file/file";
import "jodit/esm/plugins/fullsize/fullsize";
// import "jodit/esm/plugins/hotkeys/hotkeys"
import "jodit/esm/plugins/image-processor/image-processor";
import "jodit/esm/plugins/image-properties/image-properties";
import "jodit/esm/plugins/indent/indent";
// import "jodit/esm/plugins/inline-popup/inline-popup"
import "jodit/esm/plugins/justify/justify";
import "jodit/esm/plugins/line-height/line-height";
import "jodit/esm/plugins/preview/preview";
import "jodit/esm/plugins/resize-cells/resize-cells";
import "jodit/esm/plugins/resize-handler/resize-handler";
import "jodit/esm/plugins/search/search";
import "jodit/esm/plugins/select/select";
import "jodit/esm/plugins/select-cells/select-cells";
import "jodit/esm/plugins/size/size";
import "jodit/esm/plugins/source/source";
import "jodit/esm/plugins/spellcheck/spellcheck";
// import "jodit/esm/plugins/speech-recognize/speech-recognize"
import "jodit/esm/plugins/stat/stat";
import "jodit/esm/plugins/sticky/sticky";
import "jodit/esm/plugins/symbols/symbols";
import "jodit/esm/plugins/tab/tab";
import "jodit/esm/plugins/table/table";
import "jodit/esm/plugins/table-keyboard-navigation/table-keyboard-navigation";
import "jodit/esm/plugins/video/video";
import "jodit/esm/plugins/wrap-nodes/wrap-nodes";
import "jodit/esm/plugins/xpath/xpath";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { postSelect, updatePostState } from "../../redux/modules/postSlice";
import {
    API_CLOUDINARY_URL,
    API_SERVER_URL,
    CLOUDINARY_PRESET,
} from "../../config/constants";
import { getToken } from "../../helpers/storage";

const JoditEditor = () => {
    const dispatch = useAppDispatch();
    const post = useAppSelector(postSelect);
    const token = getToken();
    useEffect(() => {
        const uploadToCloudinary = async (file) => {
            try {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", CLOUDINARY_PRESET);
                formData.append("folder", "blog-fullstack");

                const response = await fetch(API_CLOUDINARY_URL, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Upload failed");
                }

                const data = await response.json();
                console.log(data.secure_url);
                return data.secure_url;
            } catch (error) {
                console.error("Error uploading image:", error);
                throw error;
            }
        };

        const editor = Jodit.make("#editor", {
            zIndex: 0,
            readonly: false,
            activeButtonsInReadOnly: [
                "source",
                "fullsize",
                "print",
                "about",
                "dots",
            ],
            toolbarButtonSize: "middle",
            theme: "default",
            saveModeInCookie: false,
            spellcheck: true,
            editorCssClass: false,
            triggerChangeEvent: true,
            width: "auto",
            height: "auto",
            minHeight: 600,
            direction: "",
            language: "auto",
            debugLanguage: false,
            i18n: "en",
            tabIndex: -1,
            toolbar: true,
            enter: "P",
            defaultMode: 1,
            placeholder: "Nội dung ...",
            hidePoweredByJodit: true,
            useSplitMode: true,
            colors: {
                greyscale: [
                    "#000000",
                    "#434343",
                    "#666666",
                    "#999999",
                    "#B7B7B7",
                    "#CCCCCC",
                    "#D9D9D9",
                    "#EFEFEF",
                    "#F3F3F3",
                    "#FFFFFF",
                ],
                palette: [
                    "#980000",
                    "#FF0000",
                    "#FF9900",
                    "#FFFF00",
                    "#00F0F0",
                    "#00FFFF",
                    "#4A86E8",
                    "#0000FF",
                    "#9900FF",
                    "#FF00FF",
                ],
                full: [
                    "#E6B8AF",
                    "#F4CCCC",
                    "#FCE5CD",
                    "#FFF2CC",
                    "#D9EAD3",
                    "#D0E0E3",
                    "#C9DAF8",
                    "#CFE2F3",
                    "#D9D2E9",
                    "#EAD1DC",
                    "#DD7E6B",
                    "#EA9999",
                    "#F9CB9C",
                    "#FFE599",
                    "#B6D7A8",
                    "#A2C4C9",
                    "#A4C2F4",
                    "#9FC5E8",
                    "#B4A7D6",
                    "#D5A6BD",
                    "#CC4125",
                    "#E06666",
                    "#F6B26B",
                    "#FFD966",
                    "#93C47D",
                    "#76A5AF",
                    "#6D9EEB",
                    "#6FA8DC",
                    "#8E7CC3",
                    "#C27BA0",
                    "#A61C00",
                    "#CC0000",
                    "#E69138",
                    "#F1C232",
                    "#6AA84F",
                    "#45818E",
                    "#3C78D8",
                    "#3D85C6",
                    "#674EA7",
                    "#A64D79",
                    "#85200C",
                    "#990000",
                    "#B45F06",
                    "#BF9000",
                    "#38761D",
                    "#134F5C",
                    "#1155CC",
                    "#0B5394",
                    "#351C75",
                    "#733554",
                    "#5B0F00",
                    "#660000",
                    "#783F04",
                    "#7F6000",
                    "#274E13",
                    "#0C343D",
                    "#1C4587",
                    "#073763",
                    "#20124D",
                    "#4C1130",
                ],
            },
            colorPickerDefaultTab: "text",
            imageDefaultWidth: 300,
            removeButtons: ["about"],
            disablePlugins: [],
            extraButtons: [
                {
                    name: "insertDate",
                    iconURL:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3HcKh0V_ETrvYS1sEk-dljpTOlrTOsmEsEQ&usqp=CAU",
                    exec: function (editor) {
                        editor.s.insertHTML(new Date().toDateString());
                        editor.synchronizeValues(); // For history saving
                    },
                },
            ],
            sizeLG: 900,
            sizeMD: 700,
            sizeSM: 400,
            buttons: [
                "source",
                "|",
                "paragraph",
                "font",
                "fontsize",
                "|",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "|",
                "brush",
                "ul",
                "ol",
                "|",
                "outdent",
                "indent",
                "align",
                "|",
                "symbols",
                "table",
                "link",
                "image",
                "video",
                "file",
                "|",
                "copyformat",
                "eraser",
                "undo",
                "redo",
                "|",
                "preview",
                "fullsize",
                "about",

            ],
            // allowCommandsInReadOnly: ['selectall', 'preview', 'print'],
            buttonsMD: ["bold", "italic"],
            buttonsXS: [
                'bold',
                'image', '|',
                'brush',
                'paragraph', '|',
                'align', '|',
                'undo', 'redo', '|',
                'eraser',
                'dots'
            ],
            events: {},
            textIcons: false,
            // allowTabNavigation: true,
            saveModeInStorage: true,
            // className: "some_my_class",
            statusbar: true,
            showTooltip: true,
            useNativeTooltip: true,
            imageProcessor: {
                replaceDataURIToBlobIdInView: true,
            },
            tab: {
                tabInsideLiInsertNewList: true,
            },
            toolbarSticky: true,
            toolbarInline: true,
            toolbarInlineForSelection: true,
            defaultLineHeight: 1.2,
            toolbarAdaptive: true,
            tableAllowCellResize: true,
            tableAllowCellSelection: true,
            allowResizeX: true,
            allowResizeY: true,
            uploader: {
                url: "https://xdsoft.net/jodit/finder/?action=fileUpload", //API_SERVER_URL+'/post/upload',
            },
            filebrowser: {
                ajax: {
                    url: "https://xdsoft.net/jodit/finder/",
                },
            },
            // controls: {
            //     insertDate: {
            //         name: "insertDate",
            //         iconURL: "https://xdsoft.net/jodit/logo.png",
            //         exec: function (editor) {
            //             editor.s.insertHTML(new Date().toDateString());
            //         },
            //     },
            // },

            allowResizeTags: ["img", "iframe", "table", "jodit"],
            resizer: {
                showSize: true,
                useAspectRatio: true,
                forImageChangeAttributes: true,
                min_width: 100,
                min_height: 100,
            },
            useSearch: true,
            speechRecognize: {
                lang: "en",
                sound: true,
            },
        });

        editor.value = post.value[0]?.content || "";

        editor.events.on("change", (newContent) => {
            dispatch(updatePostState({ content: newContent }));
        });

        return () => {
            editor.destruct();
        };
    }, [post.value[0]?.content !== undefined]);

    return (
        <>
            <textarea id="editor" name="editor"></textarea>
        </>
    );
};

export default JoditEditor;
