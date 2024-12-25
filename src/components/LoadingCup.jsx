function LoadingCupGif() {
  return (
    <div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <img className="h-[90%]" src="/loading_cup.gif" alt="Loading..." />
        <div>Loading...</div>
      </div>
    </div>
  );
}

export default LoadingCupGif;
