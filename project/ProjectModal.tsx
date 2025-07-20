import React from 'react';
import { X, Calendar, Tag, ShoppingCart, DollarSign } from 'lucide-react';

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

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onOrder: (project: Project) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOrder }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="relative">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 text-gray-900 p-2 rounded-full hover:bg-white transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <Tag className="h-4 w-4 mr-1" />
                  {project.category}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(project.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              <button 
                onClick={() => onOrder(project)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Order Similar</span>
              </button>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {project.title}
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {project.description}
            </p>

            {project.price && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center text-green-800">
                  <DollarSign className="h-5 w-5 mr-2" />
                  <span className="font-semibold text-lg">Starting Price: ${project.price.toLocaleString()}</span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  Final pricing may vary based on specific requirements and customizations.
                </p>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Project Details</h3>
              <p className="text-gray-700 leading-relaxed">
                {project.details}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Close
              </button>
              <button 
                onClick={() => onOrder(project)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Order Similar Project</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;