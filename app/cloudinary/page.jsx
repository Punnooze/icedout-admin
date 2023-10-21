'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FileUploadPage() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

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
        const timestamp = response.data.data[1];
        const signature = response.data.data[0];

        let Resources = [];

        for (let i = 0; i < images.length; i++) {
          const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
          const formData = {
            file: images[0],
            api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            timestamp: timestamp,
            signature: signature,
          };
          console.log('formData', formData);
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };

          const { data } = await axios.post(url, formData, config);
          Resources.push({
            ResourceName: images[i].name,
            ResourceLink: data.secure_url,
          });
        }

        // Handle the Resources array as needed
        console.log('Uploaded resources:', Resources);
      } else {
        console.error('Error: Unable to obtain timestamp and signature');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Reset the file input and uploading state
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
