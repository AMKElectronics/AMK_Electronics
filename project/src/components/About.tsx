import React from 'react';
import { Award, Users, Lightbulb, Target } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "Constantly pushing the boundaries of what's possible in mechatronics engineering."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Precision",
      description: "Delivering exact solutions that meet the highest standards of quality and performance."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaboration",
      description: "Working closely with clients to understand their needs and deliver custom solutions."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "Committed to delivering exceptional engineering solutions that exceed expectations."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About AMK Engineering
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                With over 5 years of experience in mechatronics engineering, AMK specializes in 
                creating innovative solutions that bridge the gap between mechanical systems, 
                electronics, and software.
              </p>
              <p>
                Our expertise spans across industrial automation, robotics, embedded systems, 
                and process control. We pride ourselves on delivering cutting-edge engineering 
                solutions that improve efficiency, reduce costs, and drive innovation.
              </p>
              <p>
                From concept design to full implementation, we work closely with our clients 
                to understand their unique challenges and develop custom solutions that exceed 
                their expectations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">25+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">5+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">15+</div>
                <div className="text-gray-600">Technologies</div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg" 
                alt="Engineering workspace"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-2xl opacity-10"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-blue-600 mb-3">{value.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;