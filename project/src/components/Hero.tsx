import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative pt-16 min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50"></div>
      
      {/* Geometric background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-orange-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-bounce"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                AMK Electronics
                <span className="text-blue-600"> Engineering</span>
                <br />
                <span className="text-orange-500">Solutions</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Professional electronics design, embedded systems development, and automation solutions. 
                From PCB design to complete mechatronic systems - we bring your ideas to life.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                <span>View Projects</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">100+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">3+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg" 
                alt="Electronics Engineering"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600 rounded-lg opacity-10 rotate-12"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-500 rounded-lg opacity-10 -rotate-12"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;