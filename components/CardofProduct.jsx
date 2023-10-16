'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
// import Lottie from 'lottie-react';
// import bookmark from '../../public/bookmark.json';
import Image from 'next/image';
// import axios from 'axios';

export default function CardofProduct({ product }) {
  const [hovering, sethovering] = useState(false);
  const bookmarkStyle = {
    width: 50,
    height: 50,
  };
  //   const [check, setCheck] = useState(saved);
  //   const lottieRef = useRef();
  //   const toggleBookmarkAnimation = async () => {
  //     if (check == false) {
  //       lottieRef.current.playSegments([0, 50], true);
  //       setCheck(true);
  //       await axios.post('/api/user/wishlist', { id: product._id });
  //     } else if (check == true) {
  //       lottieRef.current.playSegments([20, 0], true);
  //       setCheck(false);
  //       await axios.delete('/api/user/wishlist', {
  //         data: { id: product._id },
  //       });
  //     }
  //   };

  return (
    <>
      <div
        id="card"
        onMouseEnter={() => {
          sethovering(true);
        }}
        onMouseLeave={() => {
          sethovering(false);
        }}
        className="tw-mx-3 tw-w-[280px]  tw-bg-[#c6c6c6] tw-rounded-2xl tw-shadow-lg hover:tw-shadow-xl tw-transition-all hover:tw-ease-in-out hover:tw-scale-[1.01]"
      >
        {/* <Link href={`/product/${product.slug}`}> */}
        <div
          id="top"
          className="tw-h-[360px] tw-rounded-t-2xl tw-overflow-hidden tw-border-[#bbbbbb] tw-border-l-[2px] tw-border-t-[2px] tw-border-r-[2px]"
        >
          <div className="tw-relative tw-top-4 tw-z-10 tw-h-0 tw-flex tw-justify-between">
            <span className="">
              {product.isFeatured ? (
                <h4 className="special_banner tw-italic tw-font-bold tw-text-neutral-100 tw-text-xs tw-bg-neutral-900 tw-p-1 tw-rounded-r-md">
                  {product.featuremsg}
                </h4>
              ) : (
                <h4 className="special_banner tw-italic tw-font-bold tw-text-neutral-100 tw-text-xs tw-bg-neutral-900  tw-rounded-r-md"></h4>
              )}
            </span>
            <button
              type="submit"
              className={`tw-mr-3 ${hovering ? 'tw-visible' : 'tw-invisible'}`}
            >
              <svg
                className="tw-fill-almostBlack tw-w-[25px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="#58B6C3"
              >
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>
            </button>
          </div>
          <Link href={`/product/${product.slug}`} className="tw-block">
            {/* <Image
              src={product.images[0]}
              className="tw-w-[100%] tw-h-[100%] hover:tw-scale-[1.12] tw-transition-all hover:tw-ease-in-out "
              width={500}
              height={500}
              alt={product.name} 
              /> */}
          </Link>
        </div>
        <div
          id="bottom"
          className="tw-pl-2 tw-py-2 tw-bg-[#f5f4ffa5] tw-rounded-b-2xl tw-border-[#f5f4ff00] tw-border-[2px]"
        >
          <div className="tw-flex tw-justify-between tw-h-min">
            <Link href={`/product/${product.slug}`}>
              <p className="tw-text-[0.95rem] tw-font-bold">{product.name}</p>
              <p className="tw-text-footer-xl tw-text-grey">
                {product.category}
              </p>
            </Link>
            <div className="tw-relative tw-top-[-12px] tw-right-[-10px]">
              {/* <Lottie
                onClick={toggleBookmarkAnimation}
                lottieRef={lottieRef}
                animationData={bookmark}
                autoplay={false}
                loop={false}
                style={bookmarkStyle}
              /> */}
            </div>
          </div>

          {product.discount != 0 ? (
            <Link
              href={`/product/${product.slug}`}
              className="tw-w-full tw-block  tw-italic tw-font-bold  tw-text-md tw-text-[#ff4646de] tw-mr-2"
            >
              <span className="tw-line-through tw-mr-2 tw-text-almostBlack">
                ₹{product.price}
              </span>
              ₹{product.price - product.discount}
            </Link>
          ) : (
            <Link
              href={`/product/${product.slug}`}
              className="tw-italic tw-font-bold  tw-text-md tw-text-almostBlack tw-mr-2"
            >
              ₹{product.price}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
