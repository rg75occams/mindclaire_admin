import { useState, useRef, useEffect } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';

const FileUploadInput = ({
    onFileSelect, acceptedFileTypes = 'image/*', maxFileSizeInBytes = 5 * 1024 * 1024, selectedFile, error,
}) => {
    const [dragActive, setDragActive] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const handleFiles = (files) => {
        const file = files[0];
        if (file.size > maxFileSizeInBytes) {
            alert(`File size should be less than ${maxFileSizeInBytes / (1024 * 1024)}MB`);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        onFileSelect(file);
    };

    const onButtonClick = () => {
        inputRef.current?.click();
    };

    const clearFile = (e) => {
        e.stopPropagation();
        onFileSelect(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className={`relative w-full border-2 border-dashed rounded-lg cursor-pointer transition-colors ease-in-out
            ${dragActive ? 'border-blue-700' : error ? 'border-[#FF0000]' : 'border-[#A3A3A3]'} duration-300 p-4`}
            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag}
            onDrop={handleDrop} onClick={onButtonClick}
        >
            <input ref={inputRef} type="file" className="hidden" accept={acceptedFileTypes}
                onChange={handleChange}
            />

            {selectedFile ? (
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center justify-between gap-4">
                        {previewUrl && (
                            <img src={previewUrl} alt="Preview" className="w-16 h-16 object-cover rounded-md" />
                        )}
                        <span className="text-sm text-gray-600">{selectedFile.name}</span>
                    </div>

                    <button onClick={clearFile} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                        <FiX className="w-6 h-6 cursor-pointer" />
                    </button>
                </div>
            ) : (
                <div className="flex gap-4 items-center justify-center h-full text-center">
                    <FiUpload className="w-8 h-8 text-[#3C0A6D]" />

                    <div>
                        <p className="text-sm text-gray-600 inter">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-1 inter">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUploadInput