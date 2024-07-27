const Hero = () => {
  return (
    <div className="relative">
      <img
        src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        className="w-full h-96 object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <h2>HOSTELS ARE EASY TO FIND, ONLY THING YOU NEED IS OUR HELP!!</h2>
      </div>
    </div>
  );
};

export default Hero;
