export type CropArea = {
    x: number;
    y: number;
    width: number;
    height: number;
};

function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.crossOrigin = 'anonymous';
        image.src = url;
    });
}

/**
 * Crop a source image (data URL or object URL) to the given pixel area and
 * return a JPEG `File` ready to attach to an Inertia form.
 */
export async function getCroppedFile(
    imageSrc: string,
    pixelCrop: CropArea,
    fileName = 'upload.jpg',
): Promise<File> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get a 2D canvas context.');
    }

    canvas.width = Math.round(pixelCrop.width);
    canvas.height = Math.round(pixelCrop.height);

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
    );

    const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.92),
    );

    if (!blob) {
        throw new Error('Cropping failed — empty canvas.');
    }

    return new File([blob], fileName, { type: 'image/jpeg' });
}
