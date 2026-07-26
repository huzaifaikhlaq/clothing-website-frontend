export const uploadImage = async (file) => {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);


    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || "Image upload failed");
    }

    return data.secure_url;
};

// Uploads several files in parallel, preserving input order in the output array.
export const uploadImages = async (files) => {
    const uploads = files.filter(Boolean).map((file) => uploadImage(file));
    return Promise.all(uploads);
};