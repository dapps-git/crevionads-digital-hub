import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, Plus, Edit, Trash2, Search, X, 
  FileText, Briefcase, Settings, Menu 
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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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

  const navItems = [
    { id: "services", label: "Services", icon: Settings },
    { id: "blogs", label: "Blogs", icon: FileText },
    { id: "works", label: "Portfolio", icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-40">
        <h2 className="text-lg font-display font-bold gradient-text">CrevionAds Admin</h2>
        <button 
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 text-zinc-400 hover:text-white"
        >
          {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed md:relative inset-y-0 left-0 w-64 border-r border-white/5 bg-zinc-950 p-6 flex flex-col z-50 transition-transform duration-300 transform
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="mb-10 hidden md:block">
          <h2 className="text-xl font-display font-bold gradient-text">CrevionAds Admin</h2>
        </div>

        <nav className="space-y-2 flex-grow">
          {navItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsMobileSidebarOpen(false);
              }}
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
      <main className="flex-grow p-4 md:p-10 overflow-x-hidden">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold capitalize">{activeTab} Management</h1>
            <p className="text-zinc-500 text-sm mt-1">Manage your website's dynamic content</p>
          </div>
          
          <button 
            onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
            className="btn-primary flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl"
          >
            <Plus size={20} /> Add New {activeTab.slice(0, -1)}
          </button>
        </header>

        {/* Content Table Container */}
        <div className="glass-card overflow-x-auto border border-white/5 shadow-2xl rounded-2xl">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {getActiveData()?.map((item: any) => (
                <tr key={item._id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <img src={item.image} className="w-10 h-10 rounded-lg object-cover bg-zinc-800 shrink-0" alt="" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-600 shrink-0">
                          <FileText size={18} />
                        </div>
                      )}
                      <span className="font-medium text-sm text-zinc-200 line-clamp-1">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-500 text-xs">
                    <span className="px-2 py-1 rounded-md bg-white/5 border border-white/5">
                      {item.slug || item.category || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500 text-xs whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                        className="p-2 hover:bg-white/10 rounded-lg text-zinc-500 hover:text-brand-primary transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="p-2 hover:bg-white/10 rounded-lg text-zinc-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!getActiveData() || getActiveData()?.length === 0) && (
            <div className="py-20 text-center text-zinc-500 flex flex-col items-center gap-3">
              <div className="p-4 rounded-full bg-white/5">
                <Search size={32} className="opacity-20" />
              </div>
              <p>No items found. Click "Add New" to create one.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal Container */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-3xl p-5 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8 sticky top-0 bg-zinc-950 pt-1 pb-4 z-10 border-b border-white/5">
                <h2 className="text-xl md:text-2xl font-bold font-display">
                  {editingItem ? `Edit ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white/5 rounded-full text-zinc-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <AdminForm 
                type={activeTab} 
                initialData={editingItem}
                onClose={() => { setIsModalOpen(false); setEditingItem(null); }} 
                onSuccess={() => {
                  queryClient.invalidateQueries({ queryKey: [activeTab] });
                  setEditingItem(null);
                }}
                token={admin?.token || ""}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
