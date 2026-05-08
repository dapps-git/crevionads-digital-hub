import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

interface AdminFormProps {
  type: string;
  onClose: () => void;
  onSuccess: () => void;
  token: string;
}

const AdminForm = ({ type, onClose, onSuccess, token }: AdminFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: "",
    slug: "",
    desc: "",
    description: "",
    category: "",
    image: "",
    content: "",
    icon: "Smartphone",
    link: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(`${type.slice(0, -1)} added successfully!`);
        onSuccess();
        onClose();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to add item");
      }
    } catch (error) {
      toast.error("Error connecting to server");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs text-zinc-500 uppercase tracking-wider">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
            placeholder="Enter title"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-zinc-500 uppercase tracking-wider">
            {type === "works" ? "Category" : "Slug"}
          </label>
          <input
            name={type === "works" ? "category" : "slug"}
            value={type === "works" ? formData.category : formData.slug}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
            placeholder={type === "works" ? "e.g. SEO" : "e-commerce-app"}
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-zinc-500 uppercase tracking-wider">Image (URL or Upload)</label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
            placeholder="Image URL or click upload..."
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm cursor-pointer transition-colors flex items-center justify-center whitespace-nowrap"
          >
            Choose File
          </label>
        </div>
        {formData.image && formData.image.startsWith('data:image') && (
          <div className="mt-2 h-24 w-32 rounded-lg bg-white/5 border border-white/10 overflow-hidden relative">
             <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {(type === "services" || type === "works") && (
        <div className="space-y-1">
          <label className="text-xs text-zinc-500 uppercase tracking-wider">Short Description</label>
          <input
            name={type === "works" ? "description" : "desc"}
            value={type === "works" ? formData.description : formData.desc}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
            placeholder="Brief overview or description"
          />
        </div>
      )}

      {type === "services" && (
        <>
          <div className="space-y-1">
            <label className="text-xs text-zinc-500 uppercase tracking-wider">Icon</label>
            <select
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
            >
              <option value="Smartphone">Smartphone</option>
              <option value="Globe">Globe</option>
              <option value="Palette">Palette</option>
              <option value="Megaphone">Megaphone</option>
              <option value="Database">Database</option>
              <option value="Bot">Bot</option>
              <option value="ShoppingCart">ShoppingCart</option>
              <option value="Layout">Layout</option>
              <option value="Video">Video</option>
            </select>
          </div>
        </>
      )}

      {(type === "blogs" || type === "services") && (
        <div className="space-y-1">
          <label className="text-xs text-zinc-500 uppercase tracking-wider">
            {type === "blogs" ? "Blog Content" : "Detailed Content"}
          </label>
          <textarea
            name={type === "blogs" ? "content" : "detailedContent"}
            value={type === "blogs" ? formData.content : formData.detailedContent}
            onChange={handleChange}
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none resize-none"
            placeholder="Write your content here..."
          />
        </div>
      )}

      {type === "works" && (
        <div className="space-y-1">
          <label className="text-xs text-zinc-500 uppercase tracking-wider">Project Link (Optional)</label>
          <input
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
            placeholder="https://..."
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="order-2 sm:order-1 flex-1 px-4 py-3 rounded-xl border border-white/10 text-zinc-400 hover:bg-white/5 transition-colors text-sm font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="order-1 sm:order-2 flex-1 btn-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : `Create ${type.slice(0, -1)}`}
        </button>
      </div>
    </form>
  );
};

export default AdminForm;
