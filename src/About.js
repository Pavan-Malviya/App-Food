import Profile from "./Profile";

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">About FoodApp</h1>
                    <p className="text-xl opacity-90">Connecting food lovers with their favorite restaurants since 2023</p>
                </div>
            </div>

            {/* Story Section */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-4">
                            Founded in 2023, FoodApp was born from a simple idea: making great food accessible to everyone. 
                            We connect hungry customers with their favorite local restaurants.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Today, we're proud to serve thousands of customers and partner with hundreds of restaurants 
                            to deliver delicious meals right to your doorstep.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="grid grid-cols-2 gap-6 text-center">
                            <div>
                                <div className="text-3xl font-bold text-orange-500 mb-2">500+</div>
                                <div className="text-gray-600">Restaurants</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-orange-500 mb-2">10K+</div>
                                <div className="text-gray-600">Happy Customers</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-orange-500 mb-2">50K+</div>
                                <div className="text-gray-600">Orders Delivered</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-orange-500 mb-2">25+</div>
                                <div className="text-gray-600">Cities</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose FoodApp?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                            <p className="text-gray-600">Quick and reliable delivery to your doorstep</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
                            <p className="text-gray-600">Fresh ingredients from trusted restaurants</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                            <p className="text-gray-600">Competitive pricing with great deals</p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet Our Team</h2>
                    <Profile />
                </div>
            </div>
        </div>
    );
};

export default About;