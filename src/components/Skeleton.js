import { Menu } from 'lucide-react';

const SkeletonLayout = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left section */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="hidden md:block ml-6">
                <div className="flex space-x-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Menu className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>
      </nav>

      {/* Banner */}
      <div className="w-full bg-white mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-4">
            {/* Banner title */}
            <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse"></div>
            
            {/* Banner description */}
            <div className="space-y-3">
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Banner action button */}
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse mt-6"></div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="space-y-3">
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SkeletonLayout;