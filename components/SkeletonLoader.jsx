export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="w-16 h-16 rounded-full bg-gray-200 mr-3"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
        <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
      </div>
    </div>
  )
}

export function SkeletonServiceDetail() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 mr-4"></div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>

          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <div className="h-5 bg-gray-200 rounded w-32 mb-3"></div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start mb-2">
                  <div className="w-5 h-5 rounded-full bg-gray-200 mr-2 mt-0.5"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
            <div>
              <div className="h-5 bg-gray-200 rounded w-32 mb-3"></div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start mb-2">
                  <div className="w-5 h-5 rounded-full bg-gray-200 mr-2 mt-0.5"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

