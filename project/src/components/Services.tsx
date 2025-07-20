import React from 'react';
import { Cpu, Zap, Cog, Settings, Code, Wrench } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "Electronics Design",
      description: "Custom PCB design, circuit analysis, and embedded systems development for industrial applications.",
      features: ["PCB Design", "Circuit Analysis", "Component Selection", "Testing & Validation"]
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Software Development",
      description: "Embedded software, automation programming, and control system software solutions.",
      features: ["Embedded C/C++", "PLC Programming", "HMI Development", "SCADA Systems"]
    },
    {
      icon: <Cog className="h-8 w-8" />,
      title: "Automation Systems",
      description: "Industrial automation, process control, and robotic system integration.",
      features: ["Process Automation", "Robotic Systems", "Sensor Integration", "Control Algorithms"]
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "System Integration",
      description: "Complete mechatronic system design combining mechanical, electrical, and software components.",
      features: ["System Design", "Component Integration", "Performance Optimization", "Maintenance"]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Power Electronics",
      description: "Motor drives, power supplies, and energy management systems for industrial equipment.",
      features: ["Motor Control", "Power Supplies", "Energy Systems", "Efficiency Optimization"]
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Consulting & Support",
      description: "Technical consulting, troubleshooting, and ongoing support for your engineering projects.",
      features: ["Technical Consulting", "Troubleshooting", "System Upgrades", "Training"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Engineering Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive mechatronics solutions from concept to implementation, 
            delivering innovative engineering excellence for your projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 ml-4">{service.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;