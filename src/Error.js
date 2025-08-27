import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          {/* Error Content */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-2">We're sorry, but something unexpected happened.</p>
          
          {err && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-700 font-medium mb-1">Error Details:</p>
              <p className="text-sm text-red-600">{err.statusText || err.message}</p>
              {err.status && <p className="text-sm text-gray-500">Status: {err.status}</p>}
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <Link 
              to="/" 
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 inline-block"
            >
              Go Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
