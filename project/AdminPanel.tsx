import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, Package, Users, BarChart3 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import AddProjectModal from './AdminAddProjectModal'

interface Project {
  id: number
  title: string
  description: string
  image: string
  category: string
  date: string
  technologies: string[]
  details: string
  price: number | null
  created_at: string
}

interface Order {
  id: number
  user_id: string
  project_id: number
  status: string
  message: string
  created_at: string
  projects: {
    title: string
  }
}

const AdminPanel: React.FC = () => {
  const { user, isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    if (isAdmin) {
      fetchProjects()
      fetchOrders()
    }
  }, [isAdmin])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          projects (title)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)

      if (error) throw error
      fetchOrders()
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage your projects and orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter(order => order.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('projects')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'projects'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'orders'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Orders
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Manage Projects</h2>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="grid gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-4">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                            <p className="text-gray-600 mb-2">{project.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>Category: {project.category}</span>
                              <span>Date: {new Date(project.date).toLocaleDateString()}</span>
                              {project.price && <span>Price: ${project.price}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Manage Orders</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Order #{order.id}
                          </h3>
                          <p className="text-gray-600 mb-2">Project: {order.projects?.title}</p>
                          <p className="text-gray-700 mb-2">{order.message}</p>
                          <p className="text-sm text-gray-500">
                            Date: {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : order.status === 'in_progress'
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {order.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <AddProjectModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={() => {
            fetchProjects()
            setIsAddModalOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default AdminPanel