import React, { useRef } from 'react';
import Dropup from './Dropup';
import { snippets, Snippet } from './snippets';

export default function Editor({ renewContent }: { renewContent: (content: string) => void }) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = () => {
        if (textareaRef.current)
            renewContent(textareaRef.current.value);
    }

    function openFile() {
        // Check for the various File API support.
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            alert('The File APIs are not fully supported in this browser.');
            return;
        }

        // Create an invisible element to serve as a file input
        var element = document.createElement('input');
        element.setAttribute('type', 'file');
        element.setAttribute('accept', '.md');
        element.style.display = 'none';
        document.body.appendChild(element);

        // Click the invisible input to select our file
        element.click();

        // When the file is selected, grab the file object
        element.onchange = function () {
            let file;
            if (element.files)
                file = element.files[0];

            if (file) {
                // Create a new reader
                var reader = new FileReader();

                // Read the file as text
                reader.readAsText(file);

                // When the file is loaded, update the state
                reader.onload = function (e) {
                    if (textareaRef.current) {
                        textareaRef.current.value = reader.result as string;
                        renewContent(textareaRef.current.value);
                    }
                };
            }
        }

        // Remove the element from the DOM
        document.body.removeChild(element);
    }

    function exportFile() {
        var fileContents = (textareaRef.current) ? textareaRef.current.value : '';
        var filename = 'your-markdown.md';

        // Create an invisible element to serve as a link
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContents));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);

        // Click the invisible link to download our file
        element.click();

        // Remove the element from the DOM
        document.body.removeChild(element);
    }

    function addSnippet(val: string): void {
        if (textareaRef.current) {
            textareaRef.current.value += val;
            renewContent(textareaRef.current.value);
        }
    }

    return (
        <div id="Editor" className="col-md-6 d-flex flex-column p-3">
            <h1 className="mb-3 text-center">MARKDOWN EDITOR</h1>
            <div className="form-floating h-100">
                <textarea ref={textareaRef} onInput={handleChange} className="form-control h-100" placeholder="Write your markdown here" id="markdownTextArea" />
                <label htmlFor="markdownTextArea">Your markdown</label>
            </div>
            <div className="d-flex justify-content-end py-3">
                <Dropup items={(snippets as Snippet[])} addSnippet={addSnippet} />
                <button onClick={openFile} className="btn btn-primary mx-3">Open file</button>
                <button onClick={exportFile} className="btn btn-primary">Export file</button>
            </div>
        </div>
    )
}
