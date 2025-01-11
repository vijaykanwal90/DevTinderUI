import React ,{useState}from 'react'

const Card = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 5); // Loops back to 0 after the last item
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 5) % 5); // Loops to 4 when going back from 0
  };
  return (
    <div className="w-full max-w-xs relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
         {user.map((user)=>{
                return(
                    <div key={user._id} className="w-full">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h1 className="text-xl font-bold">{user.firstName}</h1>
                    <p className="text-gray-500">{user.lastName}</p>
                    </div>
                </div>
                )
         })
         }
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-black text-white rounded-full"
      >
        &lt;
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-black text-white rounded-full"
      >
        &gt;
      </button>
    </div>

  )
}

export default Card
