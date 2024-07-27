import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const HostelCard = ({ image, name, features, price }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <ul className="list-disc">
          {features.map((feature, index) => (
            <li key={index} className="text-gray-700 text-base mb-2">
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-4">
        <span className="text-gray-700 text-base">{`$${price} / night`}</span>
        <Link to="/bookings">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HostelCard;
