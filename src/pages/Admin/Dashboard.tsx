import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, Plus, Edit, Trash2, Search, X, 
  FileText, Briefcase, Settings 
} from "lucide-react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchServices, fetchBlogs, fetchWorks, API_BASE_URL } from "@/lib/api";
import AdminForm from "@/components/Admin/AdminForm";

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("services");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Queries
  const { data: services } = useQuery({ queryKey: ["services"], queryFn: fetchServices });
  const { data: blogs } = useQuery({ queryKey: ["blogs"], queryFn: fetchBlogs });
  const { data: works } = useQuery({ queryKey: ["works"], queryFn: fetchWorks });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async ({ id, type }: { id: string, type: string }) => {
      const response = await fetch(`${API_BASE_URL}/${type}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${admin?.token}`
        }
      });
      if (!response.ok) throw new Error("Delete failed");
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [variables.type] });
      toast.success(`${variables.type.slice(0, -1)} deleted successfully`);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteMutation.mutate({ id, type: activeTab });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
    toast.success("Logged out successfully");
  };

  const getActiveData = () => {
    switch (activeTab) {
      case "services": return services;
      case "blogs": return blogs;
      case "works": return works;
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-zinc-950/50 p-6 flex flex-col">
        <div className="mb-10">
          <h2 className="text-xl font-display font-bold gradient-text">CrevionAds Admin</h2>
        </div>

        <nav className="space-y-2 flex-grow">
          {[
            { id: "services", label: "Services", icon: Settings },
            { id: "blogs", label: "Blogs", icon: FileText },
            { id: "works", label: "Portfolio", icon: Briefcase },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id ? "bg-brand-primary/10 text-brand-primary" : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
              }`}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:bg-red-500/10 hover:text-red-500 transition-all mt-auto"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-auto">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-display font-bold capitalize">{activeTab} Management</h1>
            <p className="text-zinc-500 mt-1">Manage your website's dynamic content</p>
          </div>
          
          <button 
            onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} /> Add New {activeTab.slice(0, -1)}
          </button>
        </header>

        {/* Content Table */}
        <div className="glass-card overflow-hidden border border-white/5 shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 text-sm font-semibold text-zinc-400">Title</th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-400">Slug / Category</th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-400">Created At</th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {getActiveData()?.map((item: any) => (
                <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img src={item.image} className="w-10 h-10 rounded-lg object-cover bg-zinc-800" alt="" />
                      )}
                      <span className="font-medium">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-500 text-sm">
                    {item.slug || item.category}
                  </td>
                  <td className="px-6 py-4 text-zinc-500 text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-brand-primary transition-colors">
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!getActiveData() || getActiveData()?.length === 0) && (
            <div className="py-20 text-center text-zinc-500">
              No items found. Click "Add New" to create one.
            </div>
          )}
        </div>
      </main>

      {/* Simple Modal Placeholder */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-display">Add New {activeTab.slice(0, -1)}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <AdminForm 
                  type={activeTab} 
                  onClose={() => setIsModalOpen(false)} 
                  onSuccess={() => {
                    queryClient.invalidateQueries({ queryKey: [activeTab] });
                  }}
                  token={admin?.token}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
