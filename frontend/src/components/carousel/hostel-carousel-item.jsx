import { IMAGE_URL } from "../../api";

/* eslint-disable react/prop-types */
const HostelCarouselItem = ({ images }) => {
  return (
    <div className="relative flex-shrink-0 flex-grow-0 basis-full min-w-0">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <img src={`${IMAGE_URL}/${images}`} className="rounded-md object-cover w-full h-full" />
    </div>
  );
};

export default HostelCarouselItem;
