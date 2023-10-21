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
        const timestamp = response.data.data[0];
        const signature = response.data.data[1];

        let Resources = [];

        for (let i = 0; i < images.length; i++) {
          const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
          const formData= new FormData();
          formData.append('file', images[i]);
          formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
          formData.append('timestamp', timestamp);
          formData.append('signature', signature);
          const { data } = await axios.post(url, formData);
          console.log(data.secure_url)
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

// // NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dvpputlkr"
// // NEXT_PUBLIC_CLOUDINARY_API_KEY = "917638462844496"
// // NEXT_PUBLIC_CLOUDINARY_API_SECRET="fTvWHFLgIWvvtLyb2q7LB4aFWAg"

// // // src/components/ImageUpload.js
// // import { useState } from 'react';
// // import { generateSignature } from '@/utils/generateSignature';
// // export default function ImageUpload() {
// //   const [isImagUploaded, setIsImageUploaded] = useState(false);

// //   async function handleWidgetClick() {
// //     const widget = window.cloudinary.createUploadWidget(
// //       {
// //         cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
// //         apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
// //         uploadSignature: generateSignature,
// //         resourceType: 'image',
// //       },
// //       (error, result) => {
// //         if (!error && result && result.event === 'success') {
// //           console.log('Uploaded', result.info);
// //           setIsImageUploaded(true);
// //         } else if (error) {
// //           console.log(error);
// //         }
// //       }
// //     );
// //     widget.open();
// //   }

// //   return (
// //     <div className="tw-ml-[70px] tw-h-[100vh]">
// //       <button type="button" onClick={handleWidgetClick}>
// //         Upload Image
// //       </button>
// //       {isImagUploaded ? (
// //         <>
// //           <div>Successfully uploaded</div>
// //         </>
// //       ) : null}
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from 'react';
// import { CldImage, CldUploadButton } from 'next-cloudinary';
// import cloudinary from 'cloudinary-core';

// export default function Cloudinary() {
//   const [imgUrls, setImgUrls] = useState([]);
//   const handleUpload = (result) => {
//     const imageUrl = result.info.secure_url;
//     const parts = imageUrl.split('/');
//     const publicIdWithExtension = parts[parts.length - 1];
//     const publicId = publicIdWithExtension.split('.')[0];
//     console.log(result, publicId);

//     const newUrls = [
//       ...imgUrls,
//       { url: result.info.secure_url, public_id: publicId },
//     ];
//     setImgUrls(newUrls);
//   };

//   const handleFilesSubmit = async (e) => {
//     setUploading(true);
//     e.preventDefault();
//     const res = await axios.get('/api/sign');
//     const timestamp = res.data.data[0];
//     const signature = res.data.data[1];
//     let Resources = [];

//     for (let i = 0; i < images.length; i++) {
//       var fileSize = Math.round(images[i].size / 1024);
//       if (
//         images[i].type == 'image/png' ||
//         images[i].type == 'image/jpeg' ||
//         images[i].type == 'image/jpg' ||
//         images[i].type == 'image/webp'
//       ) {
//         if (fileSize >= 10 * 1024) {
//           alert(`Error! File: ${images[i].name} too large`);
//         } else {
//           const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
//           const formData = new FormData();
//           formData.append('file', images[i]);
//           formData.append(
//             'api_key',
//             process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
//           );
//           formData.append('timestamp', timestamp);
//           formData.append('signature', signature);
//           const { data } = await axios.post(url, formData);
//           Resources.push({
//             ResourceName: images[i].name,
//             ResourceLink: data.secure_url,
//           });
//         }
//       }
//     }
//   };

//   const handleDelete = async (publicId) => {
//     try {
//       const res = await fetch('/api/cloudinary', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ public_id: publicId }),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         if (data.message == 'Successfully Deleted') {
//           const updatedUrls = imgUrls.filter(
//             (img) => img.public_id !== publicId
//           );
//           setImgUrls(updatedUrls);
//         } else alert(data.message);
//       } else {
//         console.log('Error:', res.statusText);
//       }
//     } catch (error) {
//       console.log('Error', error);
//     }
//     // cloudinary.v2.uploader.destroy(publicId, function (error, result) {
//     //   if (error) {
//     //     console.log('Error deleting image:', error);
//     //   } else {
//     //     console.log('Image deleted successfully:', result);
//     //     // After successful deletion, you can remove the image from the state
//     //     const updatedUrls = imgUrls.filter((img) => img.public_id !== publicId);
//     //     setImgUrls(updatedUrls);
//     //   }
//     // });
//   };

//   return (
//     <div className="tw-ml-[70x] tw-h-[100vh] tw-flex tw-justify-center tw-items-center">
//       <input type="file" onChange={handleFilesSubmit}>
//         input file
//       </input>
//       <CldUploadButton uploadPreset="ti9avygr" onUpload={handleUpload} />
//       <div className="tw-flex">
//         {imgUrls.map((img, index) => (
//           <div key={index} className="tw-w-[200px] tw-h-[200px] tw-mx-2">
//             <CldImage
//               width="200"
//               height="200"
//               src={img.url}
//               sizes="100vw"
//               alt={`Image ${index}`}
//             />
//             <button onClick={() => handleDelete(img.public_id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // // 'use client';
// // // import React, { useState, useEffect } from 'react';
// // // import { CldImage, CldUploadButton, CldUploadWidget } from 'next-cloudinary';
// // // import { generateSignature } from '@/lib/generateSignature';

// // // export default function Cloudinary() {
// // //   const [imgUrls, setImgUrls] = useState([]);

// // //   const handleUpload = (result) => {
// // //     const newUrls = [
// // //       ...imgUrls,
// // //       { url: result.info.secure_url, public_id: result.info.public_id },
// // //     ];
// // //     setImgUrls(newUrls);
// // //   };

// // //   const handleDelete = async (publicId) => {
// // //     try {
// // //       const res = await fetch('/api/cloudinary', {
// // //         method: 'DELETE',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({ public_id: publicId }),
// // //       });

// // //       if (res.ok) {
// // //         const data = await res.json();
// // //         if (data.message === 'Successfully Deleted') {
// // //           const updatedUrls = imgUrls.filter(
// // //             (img) => img.public_id !== publicId
// // //           );
// // //           setImgUrls(updatedUrls);
// // //         } else {
// // //           alert(data.message);
// // //         }
// // //       } else {
// // //         console.log('Error:', res.statusText);
// // //       }
// // //     } catch (error) {
// // //       console.log('Error', error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="tw-ml-[70x] tw-h-[100vh] tw-flex tw-justify-center tw-items-center">
// // //       {/* <CldUploadWidget
// // //         signatureEndpoint={generateSignature}
// // //         uploadPreset="ti9avygr" // Replace with your actual signed preset
// // //       >
// // //         {({ open }) => {
// // //           function handleOnClick(e) {
// // //             e.preventDefault();
// // //             open();
// // //           }
// // //           return (
// // //             <button className="button" onClick={handleOnClick}>
// // //               Upload an Image
// // //             </button>
// // //           );
// // //         }}
// // //       </CldUploadWidget> */}

// // //       <CldUploadWidget signatureEndpoint="/api/sign" uploadPreset="ti9avygr">
// // //         {({ open }) => {
// // //           function handleOnClick(e) {
// // //             e.preventDefault();
// // //             open();
// // //           }
// // //           return (
// // //             <button className="button" onClick={handleOnClick}>
// // //               Upload
// // //             </button>
// // //           );
// // //         }}
// // //       </CldUploadWidget>
// // //       <div className="tw-flex">
// // //         {imgUrls.map((img, index) => (
// // //           <div key={index} className="tw-w-[200px] tw-h-[200px] tw-mx-2">
// // //             <CldImage
// // //               width="200"
// // //               height="200"
// // //               src={img.url}
// // //               sizes="100vw"
// // //               alt={`Image ${index}`}
// // //             />
// // //             <button onClick={() => handleDelete(img.public_id)}>Delete</button>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // pages/index.js
// // 'use client';
// // import React, { useState } from 'react';
// // import { CldImage, CldUploadWidget } from 'next-cloudinary';
// // // import { generateSignature } from '../lib/generateSignature';

// // export default function Cloudinary() {
// //   const [imgUrls, setImgUrls] = useState([]);

// //   const handleUpload = (result) => {
// //     const newUrls = [
// //       ...imgUrls,
// //       { url: result.info.secure_url, public_id: result.info.public_id },
// //     ];
// //     setImgUrls(newUrls);
// //   };

// //   const handleDelete = async (publicId) => {
// //     try {
// //       const res = await fetch('/api/cloudinary', {
// //         method: 'DELETE',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ public_id: publicId }),
// //       });

// //       if (res.ok) {
// //         const data = await res.json();
// //         if (data.message === 'Successfully Deleted') {
// //           const updatedUrls = imgUrls.filter(
// //             (img) => img.public_id !== publicId
// //           );
// //           setImgUrls(updatedUrls);
// //         } else {
// //           alert(data.message);
// //         }
// //       } else {
// //         console.error('Error:', res.statusText);
// //       }
// //     } catch (error) {
// //       console.error('Error', error);
// //     }
// //   };

// //   return (
// //     <div className="tw-ml-[70x] tw-h-[100vh] tw-flex tw-justify-center tw-items-center">
// //       <CldUploadWidget
// //         signatureEndpoint="/api/sign"
// //         uploadPreset="ti9avygr"
// //       >
// //         {({ open }) => {
// //           function handleOnClick(e) {
// //             e.preventDefault();
// //             open();
// //           }
// //           return (
// //             <button className="button" onClick={handleOnClick}>
// //               Upload
// //             </button>
// //           );
// //         }}
// //       </CldUploadWidget>
// //       <div className="tw-flex">
// //         {imgUrls.map((img, index) => (
// //           <div key={index} className="tw-w-[200px] tw-h-[200px] tw-mx-2">
// //             <CldImage
// //               width="200"
// //               height="200"
// //               src={img.url}
// //               sizes="100vw"
// //               alt={`Image ${index}`}
// //             />
// //             <button onClick={() => handleDelete(img.public_id)}>Delete</button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
