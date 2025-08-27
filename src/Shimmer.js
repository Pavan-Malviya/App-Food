const Shimmer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section Shimmer */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Image Shimmer */}
            <div className="lg:col-span-1">
              <div className="w-full h-80 bg-gray-300 rounded-2xl animate-pulse"></div>
            </div>
            
            {/* Content Shimmer */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                <div className="flex space-x-4">
                  <div className="h-8 w-20 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="h-8 w-32 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
                <div className="h-6 w-48 bg-gray-300 rounded animate-pulse"></div>
                <div className="flex flex-wrap gap-2">
                  {Array(4).fill("").map((_, index) => (
                    <div key={index} className="h-8 w-24 bg-gray-300 rounded-full animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu Section Shimmer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="h-10 w-32 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-12 w-40 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6).fill("").map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Cart Shimmer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 w-32 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-6 w-20 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-48 bg-gray-300 rounded mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-300 rounded mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
