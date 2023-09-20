"use client";

const FileUpload = ({ onFileUpload }) => {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        onFileUpload(file);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 13a2 2 0 100-4 2 2 0 000 4zM9 7a2 2 0 114 0 2 2 0 01-4 0zm8 6a2 2 0 100-4 2 2 0 000 4zM9 15a2 2 0 114 0 2 2 0 01-4 0z"
                        clipRule="evenodd"
                    />
                </svg>
                <span className="mt-2 text-base leading-normal">
                    Select a file
                </span>
                <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                />
            </label>
        </div>
    );
};

export default FileUpload;
