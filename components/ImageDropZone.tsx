import {FC, useCallback, useState} from 'react';
import { useDropzone } from 'react-dropzone';

const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes

interface ImageDropZoneProps {
    onFileChange: (file: File | null) => void;
    acceptedFileTypes?: Record<string, string[]>;
    maxFileSize?: number;
    multiple?: boolean;
}

const ImageDropZone: FC<ImageDropZoneProps> = ({
  onFileChange,
  acceptedFileTypes = {'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png']},
  maxFileSize = MAX_FILE_SIZE,
  multiple = false
  }) => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
        if (rejectedFiles.length > 0) {
            const rejectedFile = rejectedFiles[0];
            if (rejectedFile.file.size > maxFileSize) {
                setError(`File is too large. Maximum size is ${maxFileSize / 1024 / 1024}MB.`);
            } else {
                setError("Please upload only accepted file types.");
            }
        } else if (acceptedFiles.length > 0) {
            const newFile = acceptedFiles[0];
            setFile(newFile);
            setError(null);
            onFileChange(newFile);
        }
    }, [maxFileSize, onFileChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedFileTypes,
        maxSize: maxFileSize,
        multiple
    });

    return (
        <>
            <div
                {...getRootProps()}
                className={`p-10 border-2 border-dashed rounded-md text-center cursor-pointer ${
                    isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
            >
                <input {...getInputProps()} />
                {file ? (
                    <p>Selected file: {file.name}</p>
                ) : isDragActive ? (
                    <p>Drop the file here ...</p>
                ) : (
                    <p>Drop your file here, or click to select a file</p>
                )}
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
    );
};

export default ImageDropZone;