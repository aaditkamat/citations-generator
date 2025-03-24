import { useRef, FormEvent } from "react";
import {FileInput} from "flowbite-react";

const App = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = async (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try{
            if (inputRef.current && inputRef.current.files) {
                const file = inputRef.current.files[0];
                const formData = new FormData();
                formData.append("file", file);
                const response = await fetch("http://localhost:5050/files", {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/pdf",
                        "Accept": "application/pdf"
                    },
                    body: formData,
                });
                console.log(response.json());
            }
        } catch (error) {
            reportError(error);
        }
    }
    return (
        <main className="flex flex-col items-center gap-8 py-16 max-w-[1280px] mx-auto">
            <h1 className="text-4xl font-bold">
                Upload your research paper as a PDF here
            </h1>
            <div className="flex flex-row gap-4">
                <FileInput id="file-upload" ref={inputRef}/>
                <button
                    type="submit"
                    className="px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleClick}
                >
                    Submit
                </button>
            </div>
        </main>
    );
};

export default App;
