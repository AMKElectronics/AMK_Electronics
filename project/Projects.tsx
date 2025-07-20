import React, { useState } from 'react';
import { Plus, Eye, ExternalLink, Calendar, Tag, ShoppingCart, DollarSign } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  technologies: string[];
  details: string;
  price: number | null;
  created_at: string;
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { user, isAdmin } = useAuth();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Automated Assembly Line",
      description: "Complete automation system for electronics manufacturing with robotic arms and quality control.",
      image: "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg",
      category: "Automation",
      date: "2024-01-15",
      technologies: ["PLC", "HMI", "Robotics", "Vision Systems"],
      details: "Developed a fully automated assembly line system that increased production efficiency by 300%. The system includes robotic pick-and-place operations, quality inspection using computer vision, and real-time monitoring dashboard.",
      price: 15000,
      created_at: "2024-01-15T00:00:00Z"
    },
    {
      id: 2,
      title: "Smart Motor Controller",
      description: "Intelligent motor control system with IoT connectivity and predictive maintenance features.",
      image: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg",
      category: "Electronics",
      date: "2024-02-10",
      technologies: ["STM32", "IoT", "Motor Control", "Machine Learning"],
      details: "Created an advanced motor controller with built-in sensors for temperature, vibration, and current monitoring. Features predictive maintenance algorithms and remote monitoring capabilities.",
      price: 8500,
      created_at: "2024-02-10T00:00:00Z"
    },
    {
      id: 3,
      title: "Robotic Inspection System",
      description: "Autonomous robot for industrial equipment inspection using computer vision and AI.",
      image: "https://images.pexels.com/photos/3861457/pexels-photo-3861457.jpeg",
      category: "Robotics",
      date: "2024-03-05",
      technologies: ["ROS", "Computer Vision", "AI/ML", "Sensors"],
      details: "Developed an autonomous mobile robot capable of performing detailed inspections of industrial equipment. Uses advanced computer vision algorithms for defect detection and generates comprehensive inspection reports.",
      price: 25000,
      created_at: "2024-03-05T00:00:00Z"
    },
    {
      id: 4,
      title: "Process Control Dashboard",
      description: "Real-time monitoring and control system for chemical processing plant operations.",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
      category: "Software",
      date: "2024-03-20",
      technologies: ["SCADA", "HMI", "Database", "Real-time Systems"],
      details: "Built a comprehensive process control dashboard for monitoring and controlling chemical processing operations. Features real-time data visualization, alarm management, and historical data analysis.",
      price: 12000,
      created_at: "2024-03-20T00:00:00Z"
    },
    {
      id: 5,
      title: "Energy Management System",
      description: "Smart grid integration system for renewable energy sources with battery management.",
      image: "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg",
      category: "Power Electronics",
      date: "2024-04-12",
      technologies: ["Power Electronics", "Battery Management", "Grid Integration", "IoT"],
      details: "Designed and implemented an intelligent energy management system that optimizes renewable energy usage and battery storage. Includes grid-tie capabilities and remote monitoring through IoT connectivity.",
      price: 18000,
      created_at: "2024-04-12T00:00:00Z"
    },
    {
      id: 6,
      title: "Precision Servo System",
      description: "High-precision servo control system for CNC machining applications with nanometer accuracy.",
      image: "https://images.pexels.com/photos/3861940/pexels-photo-3861940.jpeg",
      category: "Control Systems",
      date: "2024-05-08",
      technologies: ["Servo Control", "Encoders", "Real-time Control", "CNC"],
      details: "Developed a high-precision servo control system achieving nanometer-level accuracy for CNC machining applications. Features advanced control algorithms and real-time feedback systems.",
      price: 22000,
      created_at: "2024-05-08T00:00:00Z"
    }
  ]);

  const categories = ["All", "Automation", "Electronics", "Robotics", "Software", "Power Electronics", "Control Systems"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleOrderProject = async (project: Project) => {
    if (!user) {
      alert('Please sign in to place an order');
      return;
    }

    const message = `I would like to order a similar project to "${project.title}". Please contact me with more details about pricing and timeline.`;
    
    try {
      const { error } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          project_id: project.id,
          message: message,
          status: 'pending'
        }]);

      if (error) throw error;
      
      alert('Order request submitted successfully! We will contact you soon.');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error submitting order. Please try again.');
    }
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our portfolio of successful mechatronics engineering projects, 
            showcasing innovation and technical excellence across various industries. Click on any project to request a similar solution.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center space-x-1 bg-white/90 text-gray-900 px-3 py-1 rounded-lg text-sm font-medium hover:bg-white transition-colors duration-200"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                    <button 
                      onClick={() => handleOrderProject(project)}
                      className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Order</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Tag className="h-3 w-3 mr-1" />
                    {project.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(project.date).toLocaleDateString()}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {project.price && (
                  <div className="flex items-center mb-4 text-green-600 font-semibold">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>Starting from ${project.price.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleOrderProject(project)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Request Similar Project</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          onOrder={handleOrderProject}
        />
      )}
    </section>
  );
};

export default Projects;