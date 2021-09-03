import React, { useRef } from 'react'

export default function Editor({ renewContent }: { renewContent: (content: string) => void }) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = () => {
        if (textareaRef.current)
            renewContent(textareaRef.current.value);
    }

    // NEEDS WORK
    function openFile() {
        let inp: HTMLInputElement = document?.getElementById("file-input") as HTMLInputElement;

        let file;
        if (inp.files)
            file = inp?.files[0];

        console.log(file);
    }

    function exportFile() {
        var fileContents = (textareaRef.current) ? textareaRef.current.value : '';
        var filename = "your-markdown.md";

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContents));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    return (
        <div id="Editor" className="col-md-6 d-flex flex-column p-3">
            <h1 className="mb-3 text-center">MARKDOWN EDITOR</h1>
            <div className="form-floating h-100">
                <textarea ref={textareaRef} onInput={handleChange} className="form-control h-100" placeholder="Write your markdown here" id="markdownTextArea" />
                <label htmlFor="markdownTextArea">Your markdown</label>
            </div>
            <div className="d-flex justify-content-end py-3">
                <input type="file" id="file-input" className="invisible" />
                <button onClick={openFile} className="btn btn-primary mx-3">Open file</button>
                <button onClick={exportFile} className="btn btn-primary">Export file</button>
            </div>
        </div>
    )
}
