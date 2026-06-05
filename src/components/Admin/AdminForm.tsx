import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

interface AdminFormProps {
  type: string;
  initialData?: any;
  onClose: () => void;
  onSuccess: () => void;
  token: string;
}

const AdminForm = ({ type, initialData, onClose, onSuccess, token }: AdminFormProps) => {
  const isEditing = !!initialData?._id;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    desc: initialData?.desc || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    image: initialData?.image || "",
    mobileImage: initialData?.mobileImage || "",
    laptopImage: initialData?.laptopImage || "",
    content: initialData?.content || "",
    detailedContent: initialData?.detailedContent || "",
    icon: initialData?.icon || "Smartphone",
    link: initialData?.link || "",
    author: initialData?.author || "",
    tags: initialData?.tags?.join(", ") || "",
    // Testimonial fields
    name: initialData?.name || "",
    role: initialData?.role || "",
    company: initialData?.company || "",
    quote: initialData?.quote || "",
    rating: initialData?.rating || 5,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string = 'image') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev: any) => ({ ...prev, [fieldName]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Convert comma-separated tags string back to array for blogs
    const payload = { ...formData };
    if (type === "blogs" && typeof payload.tags === "string") {
      payload.tags = payload.tags.split(",").map((t: string) => t.trim()).filter(Boolean);
    }

    try {
      const url = isEditing
        ? `${API_BASE_URL}/${type}/${initialData._id}`
        : `${API_BASE_URL}/${type}`;
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(`${type.slice(0, -1)} ${isEditing ? "updated" : "added"} successfully!`);
        onSuccess();
        onClose();
      } else {
        const data = await response.json();
        toast.error(data.message || `Failed to ${isEditing ? "update" : "add"} item`);
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

      {/* ──────────────── TESTIMONIALS FORM ──────────────── */}
      {type === "testimonials" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-zinc-500 uppercase tracking-wider">Client Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                placeholder="e.g. Arjun Menon"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-500 uppercase tracking-wider">Role / Title</label>
              <input
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                placeholder="e.g. CEO"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-zinc-500 uppercase tracking-wider">Company</label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                placeholder="e.g. NovaTech Solutions"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-500 uppercase tracking-wider">Rating (1–5)</label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>{r} Star{r !== 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500 uppercase tracking-wider">Testimonial Quote</label>
            <textarea
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              required
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none resize-none"
              placeholder="What did the client say?"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500 uppercase tracking-wider">Client Photo (URL or Upload, optional)</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                placeholder="Photo URL or upload..."
              />
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'image')} className="hidden" id="testimonial-img-upload" />
              <label htmlFor="testimonial-img-upload" className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm cursor-pointer transition-colors flex items-center justify-center whitespace-nowrap">
                Choose File
              </label>
            </div>
            {formData.image && formData.image.startsWith('data:image') && (
              <div className="mt-2 h-24 w-24 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </>
      )}

      {/* ──────────────── ALL OTHER TYPES ──────────────── */}
      {type !== "testimonials" && (
        <>
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
              {type === "works" ? (
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Branding">Branding</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="App Development">App Development</option>
                </select>
              ) : (
                <input
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                  placeholder="e-commerce-app"
                  required
                />
              )}
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
                onChange={(e) => handleImageUpload(e, 'image')}
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

          {type === "works" && (
            <>
              <div className="space-y-1">
                <label className="text-xs text-zinc-500 uppercase tracking-wider">Mobile View Image</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    name="mobileImage"
                    value={formData.mobileImage || ""}
                    onChange={handleChange}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                    placeholder="Mobile Image URL or upload..."
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'mobileImage')}
                    className="hidden"
                    id="mobile-image-upload"
                  />
                  <label
                    htmlFor="mobile-image-upload"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm cursor-pointer transition-colors flex items-center justify-center whitespace-nowrap"
                  >
                    Choose File
                  </label>
                </div>
                {formData.mobileImage && formData.mobileImage.startsWith('data:image') && (
                  <div className="mt-2 h-24 w-32 rounded-lg bg-white/5 border border-white/10 overflow-hidden relative">
                    <img src={formData.mobileImage} alt="Mobile Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-500 uppercase tracking-wider">Laptop View Image</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    name="laptopImage"
                    value={formData.laptopImage || ""}
                    onChange={handleChange}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                    placeholder="Laptop Image URL or upload..."
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'laptopImage')}
                    className="hidden"
                    id="laptop-image-upload"
                  />
                  <label
                    htmlFor="laptop-image-upload"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm cursor-pointer transition-colors flex items-center justify-center whitespace-nowrap"
                  >
                    Choose File
                  </label>
                </div>
                {formData.laptopImage && formData.laptopImage.startsWith('data:image') && (
                  <div className="mt-2 h-24 w-32 rounded-lg bg-white/5 border border-white/10 overflow-hidden relative">
                    <img src={formData.laptopImage} alt="Laptop Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </>
          )}

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

          {type === "blogs" && (
            <div className="space-y-1">
              <label className="text-xs text-zinc-500 uppercase tracking-wider">Author</label>
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                placeholder="Author name"
              />
            </div>
          )}

          {type === "blogs" && (
            <div className="space-y-1">
              <label className="text-xs text-zinc-500 uppercase tracking-wider">Tags (comma-separated)</label>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                placeholder="seo, marketing, web"
              />
            </div>
          )}
        </>
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
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isEditing ? `Update ${type.slice(0, -1)}` : `Create ${type.slice(0, -1)}`)}
        </button>
      </div>

    </form>
  );
};




export default AdminForm;
