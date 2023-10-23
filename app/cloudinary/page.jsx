'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FileUploadPage() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formValues, setFormValues] = useState({
    images: [null],
  });

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const newImages = Array.from(selectedFiles);
    setImages(newImages);
  };

  useEffect(() => {
    console.log('images', images);
  }, [images]);

  const handleFilesSubmit = async (e) => {
    setUploading(true);
    e.preventDefault();

    try {
      const response = await axios.get('/api/sign');
      if (response.data && response.data.data) {
        const timestamp = response.data.data[0];
        const signature = response.data.data[1];

        let Resources = [];

        for (let i = 0; i < images.length; i++) {
          const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
          const formData = new FormData();
          formData.append('file', images[i]);
          formData.append(
            'api_key',
            process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
          );
          formData.append('timestamp', timestamp);
          formData.append('signature', signature);
          const { data } = await axios.post(url, formData);
          console.log(data.secure_url);
          Resources.push({
            ResourceName: images[i].name,
            ResourceLink: data.secure_url,
          });
        }

        Resources.map((item) => {
          formValues.images.push(item.ResourceLink);
        });

        console.log('formvalues', formValues);
      } else {
        console.error('Error: Unable to obtain timestamp and signature');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setImages([]);
      setUploading(false);
    }
  };

  return (
    <div className="tw-ml-[70px]">
      <h2>File Upload</h2>
      <form onSubmit={handleFilesSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
