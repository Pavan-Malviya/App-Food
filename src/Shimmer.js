const Shimmer = () => {
  return (
    <div className="shimmer-list">

      {Array(15).fill("").map((e, index) => (

        <div key={index} className="shimmer">

        </div>
      ))}
    </div>


  );
};

export default Shimmer;
