import {useCallback, useEffect, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {useRouter, useSearchParams} from "next/navigation";
import {paymentService} from "@/services/paymentService";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes

const UploadProofDialog = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [bookingId, setBookingId] = useState<string | null>();

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
        if (rejectedFiles.length > 0) {
            const rejectedFile = rejectedFiles[0];
            if (rejectedFile.file.size > MAX_FILE_SIZE) {
                setError("File is too large. Maximum size is 1MB.");
            } else {
                setError("Please upload only JPG, JPEG, or PNG files.");
            }
        } else if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            setError(null);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png']
        },
        maxSize: MAX_FILE_SIZE,
        multiple: false
    });

    const handleUpload = async () => {
        if (!file) {
            setError('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            await paymentService.uploadPayment(bookingId!, formData);
            console.log('File uploaded successfully');
            setError(null);
            router.push("/profile/bookings")
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('An error occurred while uploading the file. Please try again.');
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const id = params.get("id");
        
        setBookingId(id);
    }, [searchParams]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-950">
                    <h1>Upload Payment Proof</h1>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Upload Payment Proof</DialogTitle>
                <DialogDescription>
                    Drop your payment proof image here, or click to select a file.
                    Only JPG, JPEG, or PNG files up to 1MB are allowed.
                </DialogDescription>
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
                        <p>Drop your payment proof here, or click to select a file</p>
                    )}
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="link" className="text-blue-950">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleUpload} disabled={!file || !!error} className="bg-blue-950">
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UploadProofDialog;