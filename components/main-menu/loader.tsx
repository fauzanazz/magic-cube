export const PixelLoader = () => {
  return (
    <div className="z-50 flex flex-col justify-center items-center absolute h-screen top-0 left-0 w-screen bg-black bg-opacity-70 gap-6">
      <div className="flex relative gap-2 w-32">
        <div
          className="w-8 h-8 bg-blue-500 rounded-full"
          style={{ animation: "bounce 1s infinite" }}
        />
        <div
          className="w-8 h-8 bg-red-500 rounded-full"
          style={{ animation: "bounce 1s 0.1s infinite" }}
        />
        <div
          className="w-8 h-8 bg-green-500 rounded-full"
          style={{ animation: "bounce 1s 0.2s infinite" }}
        />
        <div
          className="w-8 h-8 bg-yellow-500 rounded-full"
          style={{ animation: "bounce 1s 0.3s infinite" }}
        />
        <div
          className="w-8 h-8 bg-cyan-500 rounded-full"
          style={{ animation: "bounce 1s 0.4s infinite" }}
        />
        <div
          className="w-8 h-8 bg-purple-500 rounded-full"
          style={{ animation: "bounce 1s 0.5s infinite" }}
        />
        <div
          className="w-8 h-8 bg-gray-500 rounded-full"
          style={{ animation: "bounce 1s 0.6s infinite" }}
        />
      </div>
      <h1 className="animate-pulse text-2xl font-pixelify text-white">
        Loading...
      </h1>
    </div>
  );
};
