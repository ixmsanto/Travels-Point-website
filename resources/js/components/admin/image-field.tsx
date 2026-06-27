import { ImagePlus, Trash2, UploadCloud } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import MaterialSymbol from '@/components/material-symbol';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { getCroppedFile } from '@/lib/crop-image';
import type { CropArea } from '@/lib/crop-image';

type Props = {
    /** Current stored image URL (form.data.img). */
    img: string;
    /** Currently staged upload (form.data.image_file). */
    file: File | null;
    /** Crop aspect ratio, e.g. 16 / 9. */
    aspect: number;
    error?: string;
    label?: string;
    onUrl: (url: string) => void;
    onFile: (file: File | null) => void;
};

/**
 * Image picker with three sources: upload-and-crop, an external URL, or none
 * (the card gradient is used as a fallback). An uploaded + cropped file is sent
 * to the server as `image_file`; the backend stores it and overwrites `img`.
 */
export default function ImageField({
    img,
    file,
    aspect,
    error,
    label = 'Image',
    onUrl,
    onFile,
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    // Crop dialog state
    const [cropSrc, setCropSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [areaPixels, setAreaPixels] = useState<CropArea | null>(null);

    // Object URL preview for the staged file; revoked when it changes/unmounts.
    const filePreview = useMemo(
        () => (file ? URL.createObjectURL(file) : null),
        [file],
    );

    useEffect(() => {
        return () => {
            if (filePreview) {
                URL.revokeObjectURL(filePreview);
            }
        };
    }, [filePreview]);

    const preview = filePreview ?? (img || null);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];

        if (!selected) {
            return;
        }

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setCropSrc(reader.result as string);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
        });
        reader.readAsDataURL(selected);

        // Allow re-selecting the same file later.
        e.target.value = '';
    };

    const onCropComplete = useCallback((_: CropArea, pixels: CropArea) => {
        setAreaPixels(pixels);
    }, []);

    const applyCrop = async () => {
        if (!cropSrc || !areaPixels) {
            return;
        }

        const cropped = await getCroppedFile(cropSrc, areaPixels);
        onFile(cropped);
        onUrl(''); // a fresh upload supersedes any pasted URL
        setCropSrc(null);
    };

    const remove = () => {
        onFile(null);
        onUrl('');
    };

    return (
        <div className="grid gap-2">
            <span className="text-[13px] font-bold text-soft">{label}</span>

            <div className="flex flex-wrap items-start gap-4">
                <div
                    className="relative w-40 shrink-0 overflow-hidden rounded-[12px] border border-border-strong bg-surface-2"
                    style={{ aspectRatio: aspect }}
                >
                    {preview ? (
                        <img
                            src={preview}
                            alt=""
                            className="size-full object-cover"
                        />
                    ) : (
                        <div className="flex size-full flex-col items-center justify-center gap-1 text-faint">
                            <ImagePlus className="size-6" />
                            <span className="text-[11px]">Gradient</span>
                        </div>
                    )}
                </div>

                <div className="grid flex-1 gap-2.5">
                    <div className="flex flex-wrap gap-2">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => inputRef.current?.click()}
                        >
                            <UploadCloud className="size-4" />
                            {preview ? 'Replace & crop' : 'Upload & crop'}
                        </Button>
                        {preview && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={remove}
                            >
                                <Trash2 className="size-4" />
                                Remove
                            </Button>
                        )}
                    </div>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={onSelectFile}
                    />
                    <Input
                        value={file ? '' : img}
                        disabled={Boolean(file)}
                        onChange={(e) => {
                            onUrl(e.target.value);

                            if (file) {
                                onFile(null);
                            }
                        }}
                        placeholder={
                            file ? 'Using uploaded image…' : '…or paste an image URL'
                        }
                    />
                    <p className="text-[12.5px] text-faint">
                        Upload from your device (crop for a perfect fit), paste a
                        URL, or leave empty to use the card gradient.
                    </p>
                </div>
            </div>

            {error && (
                <p className="flex items-center gap-1 text-[12.5px] font-semibold text-destructive">
                    <MaterialSymbol name="error" size={14} />
                    {error}
                </p>
            )}

            <Dialog
                open={Boolean(cropSrc)}
                onOpenChange={(open) => !open && setCropSrc(null)}
            >
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Crop image</DialogTitle>
                    </DialogHeader>
                    <div className="relative h-[320px] w-full overflow-hidden rounded-lg bg-muted">
                        {cropSrc && (
                            <Cropper
                                image={cropSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={aspect}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[12.5px] text-faint">Zoom</span>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.01}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="flex-1 accent-primary"
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCropSrc(null)}
                        >
                            Cancel
                        </Button>
                        <Button type="button" onClick={applyCrop}>
                            Apply crop
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
