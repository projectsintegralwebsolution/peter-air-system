"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Package,
  Image as ImageIcon,
  FolderTree,
  Settings,
  LogOut,
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  Eye,
  Check,
  Copy,
  UploadCloud,
  Globe,
  KeyRound,
  Save,
  RefreshCw,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Shield,
  Layers,
  ArrowRight,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Table as TableIcon,
  Link2,
  Mail,
  Phone,
  Inbox,
  Download,
  Filter,
  CheckCircle,
  Clock,
  Briefcase,
  Factory,
  HelpCircle,
} from "lucide-react";

type TabType =
  | "dashboard"
  | "hero"
  | "products"
  | "product-editor"
  | "product-categories"
  | "industries"
  | "services"
  | "blogs"
  | "blog-editor"
  | "enquiries"
  | "media"
  | "content"
  | "redirects"
  | "settings";

export default function AdminCMSPage() {
  // Auth state
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("admin@peterairs.com");
  const [loginPassword, setLoginPassword] = useState("admin");
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Navigation
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  // Notifications
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Stats
  const [stats, setStats] = useState<any>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  // ----------------------------------------------------
  // Hero Slider State
  // ----------------------------------------------------
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [heroLoading, setHeroLoading] = useState(false);
  const [editingSlide, setEditingSlide] = useState<any | null>(null);
  const [slideSaving, setSlideSaving] = useState(false);

  // ----------------------------------------------------
  // Products State
  // ----------------------------------------------------
  const [productsList, setProductsList] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [productCatFilter, setProductCatFilter] = useState("all");
  const [productPage, setProductPage] = useState(1);
  const [productTotalPages, setProductTotalPages] = useState(1);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingProductOriginalSlug, setEditingProductOriginalSlug] = useState("");
  const [prodForm, setProdForm] = useState<any>({
    title: "",
    slug: "",
    categorySlug: "hvac-products",
    categoryName: "Air Handling & HVAC Systems",
    image: "/images/AHU.jpeg",
    bannerImage: "/images/ahu_banner.png",
    overview: "",
    fullContent: "",
    seoTitle: "",
    metaDescription: "",
    canonical: "",
    isPublished: true,
    isFeatured: false,
    displayOrder: 1,
  });
  const [productSaving, setProductSaving] = useState(false);

  // ----------------------------------------------------
  // Product Categories State
  // ----------------------------------------------------
  const [prodCategories, setProdCategories] = useState<any[]>([]);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [categorySaving, setCategorySaving] = useState(false);
  const [industrySaving, setIndustrySaving] = useState(false);
  const [serviceSaving, setServiceSaving] = useState(false);
  const [newProdCatName, setNewProdCatName] = useState("");
  const [newProdCatSlug, setNewProdCatSlug] = useState("");
  const [newProdCatDesc, setNewProdCatDesc] = useState("");

  // ----------------------------------------------------
  // Industries State
  // ----------------------------------------------------
  const [industriesList, setIndustriesList] = useState<any[]>([]);
  const [editingIndustry, setEditingIndustry] = useState<any | null>(null);

  // ----------------------------------------------------
  // Services State
  // ----------------------------------------------------
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [editingService, setEditingService] = useState<any | null>(null);

  // ----------------------------------------------------
  // Blogs State
  // ----------------------------------------------------
  const [blogs, setBlogs] = useState<any[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogFilterStatus, setBlogFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [blogFilterCategory, setBlogFilterCategory] = useState("All");
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [blogPage, setBlogPage] = useState(1);
  const [blogTotalPages, setBlogTotalPages] = useState(1);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editorOriginalSlug, setEditorOriginalSlug] = useState("");
  const [blogForm, setBlogForm] = useState<any>({
    title: "",
    slug: "",
    category: "Cleanroom Components",
    author: "Peter Air Systems Engineering Team",
    excerpt: "",
    content: "",
    featuredImage: "/images/AHU.jpeg",
    imageAlt: "",
    tags: "Cleanroom, HVAC, Engineering",
    isDraft: false,
    seoTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    ogImage: "",
  });
  const [editorSaving, setEditorSaving] = useState(false);
  const [editorPreviewMode, setEditorPreviewMode] = useState(false);

  // ----------------------------------------------------
  // Enquiries State
  // ----------------------------------------------------
  const [enquiriesList, setEnquiriesList] = useState<any[]>([]);
  const [enquiriesLoading, setEnquiriesLoading] = useState(false);
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState("all");
  const [enquirySearch, setEnquirySearch] = useState("");
  const [enquiryPage, setEnquiryPage] = useState(1);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);

  // ----------------------------------------------------
  // Media State
  // ----------------------------------------------------
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [copiedMediaUrl, setCopiedMediaUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ----------------------------------------------------
  // Content & Redirects & Settings State
  // ----------------------------------------------------
  const [contentList, setContentList] = useState<any[]>([]);
  const [contentSaving, setContentSaving] = useState(false);
  const [redirectsList, setRedirectsList] = useState<any[]>([]);
  const [newRedirSource, setNewRedirSource] = useState("");
  const [newRedirDest, setNewRedirDest] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passUpdating, setPassUpdating] = useState(false);

  // Toast
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Check initial session
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    setAuthLoading(true);
    try {
      const res = await fetch("/api/admin/auth/me/");
      const data = await res.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
      } else {
        setCurrentUser(null);
      }
    } catch {
      setCurrentUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  // Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginSubmitting(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
        showToast(`Welcome back, ${data.user.name}!`);
        loadDashboardStats();
      } else {
        setLoginError(data.error || "Login failed. Please check credentials.");
      }
    } catch {
      setLoginError("Network connection error.");
    } finally {
      setLoginSubmitting(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout/", { method: "POST" });
      setCurrentUser(null);
      setActiveTab("dashboard");
      showToast("Signed out successfully.");
    } catch (err) {
      console.error(err);
    }
  };

  // Load Dashboard Data
  const loadDashboardStats = async () => {
    setStatsLoading(true);
    try {
      const res = await fetch("/api/admin/stats/");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setStatsLoading(false);
    }
  };

  // Load Hero Slides
  const loadHeroSlides = async () => {
    setHeroLoading(true);
    try {
      const res = await fetch("/api/admin/hero-slides/");
      const data = await res.json();
      if (data.success) {
        setHeroSlides(data.slides || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setHeroLoading(false);
    }
  };

  // Load Products
  const loadProducts = async () => {
    setProductsLoading(true);
    try {
      const params = new URLSearchParams();
      if (productSearch) params.set("query", productSearch);
      if (productCatFilter !== "all") params.set("category", productCatFilter);
      params.set("page", productPage.toString());
      params.set("limit", "12");

      const res = await fetch(`/api/admin/products/?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProductsList(data.products || []);
        setProductTotalPages(data.totalPages || 1);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setProductsLoading(false);
    }
  };

  // Load Product Categories
  const loadProductCategories = async () => {
    try {
      const res = await fetch("/api/admin/product-categories/");
      const data = await res.json();
      if (data.success) setProdCategories(data.categories || []);
    } catch (e) {
      console.error(e);
    }
  };

  // Load Industries
  const loadIndustries = async () => {
    try {
      const res = await fetch("/api/admin/industries/");
      const data = await res.json();
      if (data.success) setIndustriesList(data.industries || []);
    } catch (e) {
      console.error(e);
    }
  };

  // Load Services
  const loadServices = async () => {
    try {
      const res = await fetch("/api/admin/services/");
      const data = await res.json();
      if (data.success) setServicesList(data.services || []);
    } catch (e) {
      console.error(e);
    }
  };

  // Load Blogs List
  const loadBlogs = async () => {
    setBlogsLoading(true);
    try {
      const params = new URLSearchParams();
      if (blogSearchQuery) params.set("query", blogSearchQuery);
      if (blogFilterCategory !== "All") params.set("category", blogFilterCategory);
      if (blogFilterStatus !== "all") params.set("status", blogFilterStatus);
      params.set("page", blogPage.toString());
      params.set("limit", "10");

      const res = await fetch(`/api/admin/blogs/?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setBlogs(data.posts || []);
        setBlogTotalPages(data.totalPages || 1);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setBlogsLoading(false);
    }
  };

  // Load Enquiries
  const loadEnquiries = async () => {
    setEnquiriesLoading(true);
    try {
      const params = new URLSearchParams();
      if (enquiryStatusFilter !== "all") params.set("status", enquiryStatusFilter);
      if (enquirySearch) params.set("search", enquirySearch);
      params.set("page", enquiryPage.toString());
      params.set("limit", "20");

      const res = await fetch(`/api/admin/enquiries/?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setEnquiriesList(data.enquiries || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setEnquiriesLoading(false);
    }
  };

  // Load Media
  const loadMedia = async () => {
    setMediaLoading(true);
    try {
      const res = await fetch("/api/admin/media/");
      const data = await res.json();
      if (data.success) setMediaList(data.assets || []);
    } catch (e) {
      console.error(e);
    } finally {
      setMediaLoading(false);
    }
  };

  // Load Content
  const loadContent = async () => {
    try {
      const res = await fetch("/api/admin/content/");
      const data = await res.json();
      if (data.success) setContentList(data.content || []);
    } catch (e) {
      console.error(e);
    }
  };

  // Load Redirects
  const loadRedirects = async () => {
    try {
      const res = await fetch("/api/admin/redirects/");
      const data = await res.json();
      if (data.success) setRedirectsList(data.redirects || []);
    } catch (e) {
      console.error(e);
    }
  };

  // Dispatch data loading on tab switch
  useEffect(() => {
    if (!currentUser) return;
    if (activeTab === "dashboard") loadDashboardStats();
    if (activeTab === "hero") loadHeroSlides();
    if (activeTab === "products") {
      loadProducts();
      loadProductCategories();
    }
    if (activeTab === "product-categories") loadProductCategories();
    if (activeTab === "industries") loadIndustries();
    if (activeTab === "services") loadServices();
    if (activeTab === "blogs") loadBlogs();
    if (activeTab === "enquiries") loadEnquiries();
    if (activeTab === "media") loadMedia();
    if (activeTab === "content") loadContent();
    if (activeTab === "redirects") loadRedirects();
  }, [activeTab, currentUser, blogPage, productPage, enquiryPage, blogFilterStatus, enquiryStatusFilter]);

  // ----------------------------------------------------
  // Product Categories Handlers
  // ----------------------------------------------------
  const handleSaveCategory = async () => {
    if (!editingCategory?.name?.trim() || !editingCategory?.slug?.trim()) {
      showToast("Category name and slug are required", "error");
      return;
    }
    setCategorySaving(true);
    try {
      const url = editingCategory.id ? `/api/admin/product-categories/${editingCategory.id}/` : "/api/admin/product-categories/";
      const method = editingCategory.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCategory),
      });
      const data = await res.json();
      if (data.success) {
        showToast(editingCategory.id ? "Category updated successfully!" : "Category created successfully!");
        setEditingCategory(null);
        loadProductCategories();
      } else {
        showToast(data.error || "Failed to save category", "error");
      }
    } catch {
      showToast("Network error saving category", "error");
    } finally {
      setCategorySaving(false);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete category "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/product-categories/${id}/`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("Category deleted successfully");
        loadProductCategories();
      } else {
        showToast(data.error || "Failed to delete category", "error");
      }
    } catch {
      showToast("Error deleting category", "error");
    }
  };

  // ----------------------------------------------------
  // Industries Handlers
  // ----------------------------------------------------
  const handleSaveIndustry = async () => {
    if (!editingIndustry?.name?.trim() || !editingIndustry?.slug?.trim()) {
      showToast("Industry name and slug are required", "error");
      return;
    }
    setIndustrySaving(true);
    try {
      const url = editingIndustry.id ? `/api/admin/industries/${editingIndustry.id}/` : "/api/admin/industries/";
      const method = editingIndustry.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingIndustry,
          challenges: typeof editingIndustry.challenges === "string" ? editingIndustry.challenges.split("\n").filter(Boolean) : editingIndustry.challenges,
          solutions: typeof editingIndustry.solutions === "string" ? editingIndustry.solutions.split("\n").filter(Boolean) : editingIndustry.solutions,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(editingIndustry.id ? "Industry updated successfully!" : "Industry created successfully!");
        setEditingIndustry(null);
        loadIndustries();
      } else {
        showToast(data.error || "Failed to save industry", "error");
      }
    } catch {
      showToast("Network error saving industry", "error");
    } finally {
      setIndustrySaving(false);
    }
  };

  const handleDeleteIndustry = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete industry sector "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/industries/${id}/`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("Industry sector deleted successfully");
        loadIndustries();
      } else {
        showToast(data.error || "Failed to delete industry", "error");
      }
    } catch {
      showToast("Error deleting industry", "error");
    }
  };

  // ----------------------------------------------------
  // Services Handlers
  // ----------------------------------------------------
  const handleSaveService = async () => {
    if (!editingService?.name?.trim() || !editingService?.slug?.trim()) {
      showToast("Service name and slug are required", "error");
      return;
    }
    setServiceSaving(true);
    try {
      const url = editingService.id ? `/api/admin/services/${editingService.id}/` : "/api/admin/services/";
      const method = editingService.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingService,
          deliverables: typeof editingService.deliverables === "string" ? editingService.deliverables.split("\n").filter(Boolean) : editingService.deliverables,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(editingService.id ? "Service updated successfully!" : "Service created successfully!");
        setEditingService(null);
        loadServices();
      } else {
        showToast(data.error || "Failed to save service", "error");
      }
    } catch {
      showToast("Network error saving service", "error");
    } finally {
      setServiceSaving(false);
    }
  };

  const handleDeleteService = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete service "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/services/${id}/`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("Service deleted successfully");
        loadServices();
      } else {
        showToast(data.error || "Failed to delete service", "error");
      }
    } catch {
      showToast("Error deleting service", "error");
    }
  };

  // Product Save
  const handleSaveProduct = async () => {
    if (!prodForm.title.trim()) {
      showToast("Product title is required", "error");
      return;
    }
    setProductSaving(true);
    try {
      const url = editingProductId ? `/api/admin/products/${editingProductId}/` : "/api/admin/products/";
      const method = editingProductId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prodForm),
      });

      const data = await res.json();
      if (data.success) {
        showToast(editingProductId ? "Product updated successfully!" : "Product created successfully!");
        setActiveTab("products");
        loadProducts();
      } else {
        showToast(data.error || "Failed to save product", "error");
      }
    } catch {
      showToast("Network error saving product", "error");
    } finally {
      setProductSaving(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: string, title: string) => {
    if (!window.confirm(`Permanently delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/products/${id}/`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("Product deleted successfully");
        loadProducts();
      }
    } catch {
      showToast("Network error deleting product", "error");
    }
  };

  // Slide Save
  const handleSaveSlide = async (slide: any) => {
    setSlideSaving(true);
    try {
      const url = slide.id ? `/api/admin/hero-slides/${slide.id}/` : "/api/admin/hero-slides/";
      const method = slide.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slide),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Hero slide saved!");
        setEditingSlide(null);
        loadHeroSlides();
      } else {
        showToast(data.error || "Failed to save slide", "error");
      }
    } catch {
      showToast("Network error saving slide", "error");
    } finally {
      setSlideSaving(false);
    }
  };

  // Delete Slide
  const handleDeleteSlide = async (id: string) => {
    if (!window.confirm("Delete this hero slide?")) return;
    try {
      const res = await fetch(`/api/admin/hero-slides/${id}/`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast("Slide removed");
        loadHeroSlides();
      }
    } catch {
      showToast("Error deleting slide", "error");
    }
  };

  // Enquiry Status Update
  const handleUpdateEnquiryStatus = async (id: string, newStatus: string, notes?: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, notes }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Status updated");
        loadEnquiries();
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus, notes });
        }
      }
    } catch {
      showToast("Failed to update status", "error");
    }
  };

  // Export Enquiries CSV
  const handleExportEnquiriesCSV = () => {
    if (enquiriesList.length === 0) {
      showToast("No enquiries to export", "error");
      return;
    }
    const headers = ["ID", "Date", "Name", "Company", "Email", "Phone", "Product", "City", "Status", "Message"];
    const rows = enquiriesList.map((e) => [
      e.id,
      new Date(e.createdAt).toLocaleDateString(),
      `"${(e.name || "").replace(/"/g, '""')}"`,
      `"${(e.companyName || "").replace(/"/g, '""')}"`,
      e.email,
      e.phone,
      `"${(e.productOrService || "").replace(/"/g, '""')}"`,
      `"${(e.city || "").replace(/"/g, '""')}"`,
      e.status,
      `"${(e.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `peter-air-enquiries-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Enquiries exported as CSV");
  };

  // File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("altText", file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));

    try {
      const res = await fetch("/api/admin/media/", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        showToast("Image uploaded successfully!");
        loadMedia();
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        showToast(data.error || "Upload failed", "error");
      }
    } catch {
      showToast("Error uploading file", "error");
    } finally {
      setUploadingFile(false);
    }
  };

  // Copy Media URL
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedMediaUrl(url);
    showToast("URL copied to clipboard!");
    setTimeout(() => setCopiedMediaUrl(null), 2500);
  };

  // ----------------------------------------------------
  // Authentication & Gate
  // ----------------------------------------------------
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 animate-spin text-cyan-400" />
          <p className="text-sm font-medium text-slate-300">Checking Peter Air Systems Security Session...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#063B5C] via-[#092B42] to-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
          <div className="bg-[#063B5C] p-8 text-white text-center relative overflow-hidden">
            <div className="w-14 h-14 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Peter Air Systems</h1>
            <p className="text-xs text-brand-100/90 mt-1 uppercase tracking-wider font-semibold">
              Complete Website CMS & Control Center
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {loginError && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <span className="font-bold">Error:</span> {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                Admin Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#063B5C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#063B5C]"
              />
            </div>

            <button
              type="submit"
              disabled={loginSubmitting}
              className="w-full py-3 bg-[#063B5C] hover:bg-[#084973] text-white font-semibold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              {loginSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  Sign In to Enterprise CMS <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
              <span className="inline-block px-2.5 py-1 bg-slate-100 rounded text-[11px] font-mono text-slate-600">
                Default: admin@peterairs.com / admin
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Main CMS Dashboard UI
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-2.5 transition-all ${
            toast.type === "error" ? "bg-red-600 text-white" : "bg-emerald-700 text-white"
          }`}
        >
          {toast.type === "error" ? <Shield className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          {toast.message}
        </div>
      )}

      {/* Top Header */}
      <header className="bg-[#063B5C] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-bold leading-none tracking-tight">Peter Air Systems</div>
              <div className="text-[11px] text-cyan-200 uppercase tracking-wider font-semibold">
                Complete Website Backend & CMS
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-slate-100 hover:text-white transition flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Live Site
            </Link>

            <div className="h-5 w-px bg-white/20" />

            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium text-slate-200">{currentUser.name}</span>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Workspace with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col md:flex-row gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-sm space-y-1 sticky top-24">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "dashboard"
                  ? "bg-[#063B5C] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </button>

            <button
              onClick={() => setActiveTab("hero")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "hero"
                  ? "bg-[#063B5C] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Layers className="w-4 h-4" /> Hero Slider & Banners
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "products" || activeTab === "product-editor"
                  ? "bg-[#063B5C] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Package className="w-4 h-4" /> Products & Equipment
            </button>

            <button
              onClick={() => setActiveTab("product-categories")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "product-categories"
                  ? "bg-[#063B5C] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <FolderTree className="w-4 h-4" /> Product Categories
            </button>

            <button
              onClick={() => setActiveTab("industries")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "industries"
                  ? "bg-[#063B5C] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Factory className="w-4 h-4" /> Industries We Serve
            </button>

            <button
              onClick={() => setActiveTab("services")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "services"
                  ? "bg-[#063B5C] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Briefcase className="w-4 h-4" /> Services & Solutions
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "blogs" || activeTab === "blog-editor"
                  ? "bg-[#063B5C] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <FileText className="w-4 h-4" /> Technical Blog
            </button>

            <button
              onClick={() => setActiveTab("enquiries")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "enquiries"
                  ? "bg-[#063B5C] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Inbox className="w-4 h-4" /> Customer Enquiries
              {stats?.newEnquiries > 0 && (
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-red-500 text-white font-bold">
                  {stats.newEnquiries}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("media")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "media"
                  ? "bg-[#063B5C] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <ImageIcon className="w-4 h-4" /> Central Media Library
            </button>

            <button
              onClick={() => setActiveTab("content")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "content"
                  ? "bg-[#063B5C] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Sliders className="w-4 h-4" /> Website Pages Content
            </button>

            <button
              onClick={() => setActiveTab("redirects")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "redirects"
                  ? "bg-[#063B5C] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Globe className="w-4 h-4" /> 301 URL Redirects
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "settings"
                  ? "bg-[#063B5C] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Settings className="w-4 h-4" /> Company & Security
            </button>
          </nav>
        </aside>

        {/* Dynamic Center Work Area */}
        <main className="flex-1 min-w-0">
          {/* 1. DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Enterprise Control Center</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage products, hero banners, engineering blogs, customer leads, and technical specifications.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingProductId(null);
                      setEditingProductOriginalSlug("");
                      setProdForm({
                        title: "",
                        slug: "",
                        categorySlug: "hvac-products",
                        categoryName: "Air Handling & HVAC Systems",
                        image: "/images/AHU.jpeg",
                        bannerImage: "/images/ahu_banner.png",
                        overview: "",
                        fullContent: "",
                        seoTitle: "",
                        metaDescription: "",
                        canonical: "",
                        isPublished: true,
                        isFeatured: false,
                        displayOrder: 1,
                      });
                      setActiveTab("product-editor");
                    }}
                    className="px-3.5 py-2 bg-[#063B5C] hover:bg-[#084973] text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-4 h-4" /> Upload Media
                  </button>
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Products Live</div>
                  <div className="text-2xl font-bold text-slate-900 mt-2">{stats?.totalProducts ?? "—"}</div>
                  <div className="text-[11px] text-emerald-600 mt-1">{stats?.publishedProducts ?? 0} published</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer Enquiries</div>
                  <div className="text-2xl font-bold text-[#063B5C] mt-2">{stats?.totalEnquiries ?? "—"}</div>
                  <div className="text-[11px] text-red-600 font-semibold mt-1">{stats?.newEnquiries ?? 0} new leads</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Technical Articles</div>
                  <div className="text-2xl font-bold text-slate-900 mt-2">{stats?.totalBlogs ?? "—"}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{stats?.publishedBlogs ?? 0} live publications</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Impressions</div>
                  <div className="text-2xl font-bold text-emerald-700 mt-2">{stats?.totalViews ?? "—"}</div>
                  <div className="text-[11px] text-slate-400 mt-1">Reader engagements</div>
                </div>
              </div>

              {/* Recent Enquiries Strip */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-[#063B5C]" />
                    <h3 className="text-sm font-bold text-slate-900">Latest Customer Enquiries</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab("enquiries")}
                    className="text-xs text-[#063B5C] hover:underline font-semibold flex items-center gap-1"
                  >
                    View All Enquiries <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {stats?.recentEnquiries?.length === 0 ? (
                    <div className="p-6 text-center text-slate-400">No enquiries submitted yet.</div>
                  ) : (
                    stats?.recentEnquiries?.map((e: any) => (
                      <div key={e.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60">
                        <div>
                          <div className="font-semibold text-slate-900 flex items-center gap-2">
                            <span>{e.name}</span>
                            {e.companyName && (
                              <span className="text-[11px] text-slate-500 font-normal">({e.companyName})</span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Looking for: <strong className="text-slate-700">{e.productOrService}</strong> • {e.email} • {e.phone}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                            e.status === "new" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"
                          }`}>
                            {e.status}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {new Date(e.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. HERO SLIDER */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Hero Slider & Banner Management</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Controls headings, background images, technical badges, button labels, and destination links on the homepage.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingSlide({
                      slideNumber: `0${heroSlides.length + 1}`,
                      badge: "CUSTOM CLEANROOM SYSTEMS",
                      heading: "High-Integrity Cleanroom Solutions",
                      highlightWord: "Cleanroom Solutions",
                      supportingText: "Custom engineered HVAC and containment equipment.",
                      primaryBtnText: "Explore Products",
                      primaryBtnLink: "/air-handling-unit-ahu/",
                      secondaryBtnText: "Request Technical Quote",
                      secondaryBtnAction: "modal",
                      image: "/images/hero-banner-1.png",
                      technicalSpecs: ["ISO 14644 Compliant", "SS 304 Construction"],
                      order: heroSlides.length + 1,
                      isActive: true,
                    })
                  }
                  className="px-4 py-2 bg-[#063B5C] hover:bg-[#084973] text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Slide
                </button>
              </div>

              {/* Slide Edit Modal / Drawer */}
              {editingSlide && (
                <div className="bg-white p-6 rounded-2xl border-2 border-[#063B5C] shadow-lg space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-900">
                      {editingSlide.id ? "Edit Hero Slide" : "New Hero Slide"}
                    </h3>
                    <button
                      onClick={() => setEditingSlide(null)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Badge Title</label>
                      <input
                        type="text"
                        value={editingSlide.badge}
                        onChange={(e) => setEditingSlide({ ...editingSlide, badge: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Slide Number</label>
                      <input
                        type="text"
                        value={editingSlide.slideNumber}
                        onChange={(e) => setEditingSlide({ ...editingSlide, slideNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">Main Heading</label>
                      <input
                        type="text"
                        value={editingSlide.heading}
                        onChange={(e) => setEditingSlide({ ...editingSlide, heading: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">Supporting Text</label>
                      <textarea
                        rows={2}
                        value={editingSlide.supportingText}
                        onChange={(e) => setEditingSlide({ ...editingSlide, supportingText: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Primary Button Text</label>
                      <input
                        type="text"
                        value={editingSlide.primaryBtnText}
                        onChange={(e) => setEditingSlide({ ...editingSlide, primaryBtnText: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Primary Button Link</label>
                      <input
                        type="text"
                        value={editingSlide.primaryBtnLink}
                        onChange={(e) => setEditingSlide({ ...editingSlide, primaryBtnLink: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Secondary Button Text</label>
                      <input
                        type="text"
                        value={editingSlide.secondaryBtnText}
                        onChange={(e) => setEditingSlide({ ...editingSlide, secondaryBtnText: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Background Image URL</label>
                      <input
                        type="text"
                        value={editingSlide.image}
                        onChange={(e) => setEditingSlide({ ...editingSlide, image: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setEditingSlide(null)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveSlide(editingSlide)}
                      disabled={slideSaving}
                      className="px-4 py-2 bg-[#063B5C] hover:bg-[#084973] text-white text-xs font-semibold rounded-xl shadow-sm"
                    >
                      {slideSaving ? "Saving..." : "Save Slide"}
                    </button>
                  </div>
                </div>
              )}

              {/* Slides List */}
              <div className="grid grid-cols-1 gap-4">
                {heroSlides.map((s, index) => (
                  <div
                    key={s.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center font-bold text-slate-700">
                        {s.slideNumber || index + 1}
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-cyan-800 uppercase tracking-wide">
                          {s.badge}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mt-0.5">{s.heading}</h4>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-1">{s.supportingText}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                      <button
                        onClick={() => setEditingSlide(s)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSlide(s.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. PRODUCTS & EQUIPMENT */}
          {activeTab === "products" && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#063B5C]"
                    />
                  </div>

                  <select
                    value={productCatFilter}
                    onChange={(e) => setProductCatFilter(e.target.value)}
                    className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700"
                  >
                    <option value="all">All Categories</option>
                    {prodCategories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => {
                    setEditingProductId(null);
                    setEditingProductOriginalSlug("");
                    setProdForm({
                      title: "",
                      slug: "",
                      categorySlug: prodCategories[0]?.slug || "hvac-products",
                      categoryName: prodCategories[0]?.name || "Air Handling & HVAC Systems",
                      image: "/images/AHU.jpeg",
                      bannerImage: "/images/ahu_banner.png",
                      overview: "",
                      fullContent: "",
                      seoTitle: "",
                      metaDescription: "",
                      canonical: "",
                      isPublished: true,
                      isFeatured: false,
                      displayOrder: 1,
                    });
                    setActiveTab("product-editor");
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-[#063B5C] hover:bg-[#084973] text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add New Product
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 uppercase font-semibold">
                      <tr>
                        <th className="py-3 px-4">Product Name</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Order</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {productsLoading ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate-400">
                            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#063B5C]" />
                            Loading products...
                          </td>
                        </tr>
                      ) : productsList.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate-400">
                            No products found matching filters.
                          </td>
                        </tr>
                      ) : (
                        productsList.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50/60">
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-900">{p.title}</div>
                              <div className="text-[11px] text-slate-400 font-mono mt-0.5">/{p.slug}/</div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-600">{p.categoryName}</td>
                            <td className="py-3.5 px-4 text-slate-500 font-mono">{p.displayOrder}</td>
                            <td className="py-3.5 px-4">
                              {p.isPublished ? (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  Live
                                </span>
                              ) : (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                  Unpublished
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right space-x-2">
                              <Link
                                href={`/${p.slug}/`}
                                target="_blank"
                                className="inline-flex items-center p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                                title="View on site"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => {
                                  setEditingProductId(p.id);
                                  setEditingProductOriginalSlug(p.slug);
                                  setProdForm({ ...p });
                                  setActiveTab("product-editor");
                                }}
                                className="inline-flex items-center p-1.5 text-[#063B5C] hover:bg-cyan-50 rounded-lg transition"
                                title="Edit product"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.title)}
                                className="inline-flex items-center p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                                title="Delete product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 4. PRODUCT EDITOR */}
          {activeTab === "product-editor" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {editingProductId ? "Edit Industrial Product" : "Add Industrial Product"}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Modifying existing slugs will automatically maintain 301 redirects to preserve Google rankings.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab("products")}
                    className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProduct}
                    disabled={productSaving}
                    className="px-4 py-2 bg-[#063B5C] hover:bg-[#084973] text-white text-xs font-semibold rounded-xl shadow-sm flex items-center gap-1.5"
                  >
                    {productSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Product
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Product Title *</label>
                    <input
                      type="text"
                      value={prodForm.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = !editingProductId
                          ? title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "")
                          : prodForm.slug;
                        setProdForm({ ...prodForm, title, slug });
                      }}
                      className="w-full px-4 py-2.5 text-sm font-semibold rounded-xl border border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug *</label>
                    <div className="flex items-center">
                      <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl text-xs text-slate-500 font-mono">
                        /
                      </span>
                      <input
                        type="text"
                        value={prodForm.slug}
                        onChange={(e) => setProdForm({ ...prodForm, slug: e.target.value })}
                        className="w-full px-3 py-2 text-xs font-mono rounded-r-xl border border-slate-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Short Overview</label>
                    <textarea
                      rows={3}
                      value={prodForm.overview}
                      onChange={(e) => setProdForm({ ...prodForm, overview: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Technical Description / Content
                    </label>
                    <textarea
                      rows={12}
                      value={prodForm.fullContent}
                      onChange={(e) => setProdForm({ ...prodForm, fullContent: e.target.value })}
                      className="w-full p-3 text-xs font-mono rounded-xl border border-slate-300"
                    />
                  </div>
                </div>

                {/* Right Metadata */}
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
                    <h3 className="text-xs font-bold text-slate-800 uppercase">Product Configuration</h3>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Category</label>
                      <select
                        value={prodForm.categorySlug}
                        onChange={(e) => {
                          const cat = prodCategories.find((c) => c.slug === e.target.value);
                          setProdForm({
                            ...prodForm,
                            categorySlug: e.target.value,
                            categoryName: cat?.name || prodForm.categoryName,
                          });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                      >
                        {prodCategories.map((c) => (
                          <option key={c.id} value={c.slug}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={prodForm.image}
                        onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                      />
                    </div>

                    <div className="flex items-center gap-4 text-xs pt-1">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={prodForm.isPublished}
                          onChange={(e) => setProdForm({ ...prodForm, isPublished: e.target.checked })}
                        />
                        <span className="font-semibold text-emerald-700">Published Live</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={prodForm.isFeatured}
                          onChange={(e) => setProdForm({ ...prodForm, isFeatured: e.target.checked })}
                        />
                        <span className="font-semibold text-blue-700">Featured on Home</span>
                      </label>
                    </div>
                  </div>

                  {/* SEO Box */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
                    <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#063B5C]" /> Search Engine SEO
                    </h3>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">SEO Title</label>
                      <input
                        type="text"
                        value={prodForm.seoTitle}
                        onChange={(e) => setProdForm({ ...prodForm, seoTitle: e.target.value })}
                        placeholder={`${prodForm.title} | Peter Air Systems`}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Meta Description</label>
                      <textarea
                        rows={2}
                        value={prodForm.metaDescription}
                        onChange={(e) => setProdForm({ ...prodForm, metaDescription: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. CUSTOMER ENQUIRIES */}
          {activeTab === "enquiries" && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search enquiries by name, company, email..."
                      value={enquirySearch}
                      onChange={(e) => setEnquirySearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                    />
                  </div>

                  <select
                    value={enquiryStatusFilter}
                    onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                    className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New Leads</option>
                    <option value="contacted">Contacted</option>
                    <option value="resolved">Resolved</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <button
                  onClick={handleExportEnquiriesCSV}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Export CSV
                </button>
              </div>

              {/* Enquiries Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 uppercase font-semibold">
                      <tr>
                        <th className="py-3 px-4">Customer / Company</th>
                        <th className="py-3 px-4">Contact Info</th>
                        <th className="py-3 px-4">Product of Interest</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {enquiriesLoading ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400">
                            Loading inquiries...
                          </td>
                        </tr>
                      ) : enquiriesList.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400">
                            No enquiries found.
                          </td>
                        </tr>
                      ) : (
                        enquiriesList.map((e) => (
                          <tr key={e.id} className="hover:bg-slate-50/60">
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-900">{e.name}</div>
                              {e.companyName && (
                                <div className="text-[11px] text-slate-500">{e.companyName}</div>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-slate-600">
                              <div>{e.phone}</div>
                              <div className="text-[11px] text-slate-400">{e.email}</div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-700 font-medium">
                              {e.productOrService}
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={e.status}
                                onChange={(evt) => handleUpdateEnquiryStatus(e.id, evt.target.value)}
                                className={`text-[11px] font-semibold px-2 py-1 rounded-lg border ${
                                  e.status === "new"
                                    ? "bg-red-50 text-red-700 border-red-200"
                                    : e.status === "contacted"
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                }`}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="resolved">Resolved</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                              {new Date(e.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => setSelectedEnquiry(e)}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[11px] font-semibold text-slate-700"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Enquiry Detail Drawer */}
              {selectedEnquiry && (
                <div className="bg-white p-6 rounded-2xl border-2 border-[#063B5C] shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-900">Enquiry Lead Details</h3>
                    <button
                      onClick={() => setSelectedEnquiry(null)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Close
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block">Customer Name</span>
                      <strong className="text-slate-900 text-sm">{selectedEnquiry.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Company</span>
                      <span className="text-slate-800">{selectedEnquiry.companyName || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Phone</span>
                      <a href={`tel:${selectedEnquiry.phone}`} className="text-blue-600 font-semibold underline">
                        {selectedEnquiry.phone}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Email</span>
                      <a href={`mailto:${selectedEnquiry.email}`} className="text-blue-600 font-semibold underline">
                        {selectedEnquiry.email}
                      </a>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block">Requirement / Message</span>
                      <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 mt-1">
                        {selectedEnquiry.message || selectedEnquiry.requirement || "No detailed message provided."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 6. BLOG ARTICLES */}
          {activeTab === "blogs" && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={blogSearchQuery}
                      onChange={(e) => setBlogSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                    />
                  </div>
                  <select
                    value={blogFilterStatus}
                    onChange={(e: any) => setBlogFilterStatus(e.target.value)}
                    className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Drafts</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setEditingPostId(null);
                    setEditorOriginalSlug("");
                    setBlogForm({
                      title: "",
                      slug: "",
                      category: "Cleanroom Components",
                      author: "Peter Air Systems Engineering Team",
                      excerpt: "",
                      content: "",
                      featuredImage: "/images/AHU.jpeg",
                      imageAlt: "",
                      tags: "Cleanroom, HVAC, Engineering",
                      isDraft: false,
                      seoTitle: "",
                      metaDescription: "",
                      canonicalUrl: "",
                      ogImage: "",
                    });
                    setActiveTab("blog-editor");
                  }}
                  className="px-4 py-2 bg-[#063B5C] hover:bg-[#084973] text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Create Article
                </button>
              </div>

              {/* Blogs Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 uppercase font-semibold">
                      <tr>
                        <th className="py-3 px-4">Article</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Views</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {blogsLoading ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate-400">
                            Loading articles...
                          </td>
                        </tr>
                      ) : (
                        blogs.map((b) => (
                          <tr key={b.id} className="hover:bg-slate-50/60">
                            <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-sm truncate">{b.title}</td>
                            <td className="py-3.5 px-4 text-slate-600">{b.category}</td>
                            <td className="py-3.5 px-4">
                              {b.isDraft ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700">
                                  Draft
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                                  Live
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-slate-500">{b.views || 0}</td>
                            <td className="py-3.5 px-4 text-right space-x-2">
                              <Link
                                href={`/blog/${b.slug}/${b.isDraft ? "?preview=true" : ""}`}
                                target="_blank"
                                className="inline-flex p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => {
                                  setEditingPostId(b.id);
                                  setEditorOriginalSlug(b.slug);
                                  setBlogForm({ ...b });
                                  setActiveTab("blog-editor");
                                }}
                                className="inline-flex p-1.5 text-[#063B5C] hover:bg-cyan-50 rounded-lg"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 7. BLOG EDITOR */}
          {activeTab === "blog-editor" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">
                  {editingPostId ? "Edit Technical Article" : "Compose Article"}
                </h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => setActiveTab("blogs")} className="px-3.5 py-1.5 text-xs text-slate-600">
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      setEditorSaving(true);
                      try {
                        const url = editingPostId ? `/api/admin/blogs/${editingPostId}/` : "/api/admin/blogs/";
                        const method = editingPostId ? "PUT" : "POST";
                        const res = await fetch(url, {
                          method,
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(blogForm),
                        });
                        const data = await res.json();
                        if (data.success) {
                          showToast("Article saved successfully!");
                          setActiveTab("blogs");
                          loadBlogs();
                        } else {
                          showToast(data.error || "Failed to save", "error");
                        }
                      } catch {
                        showToast("Error saving article", "error");
                      } finally {
                        setEditorSaving(false);
                      }
                    }}
                    disabled={editorSaving}
                    className="px-4 py-2 bg-[#063B5C] text-white text-xs font-semibold rounded-xl"
                  >
                    {editorSaving ? "Saving..." : "Save Article"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Article Title</label>
                    <input
                      type="text"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="w-full px-4 py-2 text-sm font-semibold rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug</label>
                    <input
                      type="text"
                      value={blogForm.slug}
                      onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Content Body</label>
                    <textarea
                      rows={14}
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      className="w-full p-4 text-xs font-mono rounded-xl border border-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Featured Image URL</label>
                    <input
                      type="text"
                      value={blogForm.featuredImage}
                      onChange={(e) => setBlogForm({ ...blogForm, featuredImage: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">SEO Title</label>
                    <input
                      type="text"
                      value={blogForm.seoTitle}
                      onChange={(e) => setBlogForm({ ...blogForm, seoTitle: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 8. MEDIA LIBRARY */}
          {activeTab === "media" && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Central Media Library</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Images are stored persistently in <code className="text-slate-700 font-mono">public/uploads/</code> and reusable across the website.
                  </p>
                </div>

                <div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingFile}
                    className="px-4 py-2 bg-[#063B5C] hover:bg-[#084973] text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center gap-1.5"
                  >
                    {uploadingFile ? "Uploading..." : "Upload New Image"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {mediaList.map((m) => (
                  <div key={m.id} className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm">
                    <div className="h-32 bg-slate-100 flex items-center justify-center overflow-hidden">
                      <img src={m.url} alt={m.filename} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-3 text-xs">
                      <div className="font-semibold text-slate-800 truncate">{m.filename}</div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                        <button onClick={() => handleCopyUrl(m.url)} className="text-[#063B5C] font-semibold flex items-center gap-1">
                          {copiedMediaUrl === m.url ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />} Copy URL
                        </button>
                        <button
                          onClick={async () => {
                            if (!window.confirm("Delete this image?")) return;
                            await fetch(`/api/admin/media/?id=${m.id}`, { method: "DELETE" });
                            loadMedia();
                          }}
                          className="text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. WEBSITE PAGES CONTENT */}
          {activeTab === "content" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Website Content Strings & Key-Values</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live editable text blocks across homepage, about section, and global contact parameters.
                  </p>
                </div>
                <button
                  onClick={async () => {
                    setContentSaving(true);
                    try {
                      await fetch("/api/admin/content/", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(contentList),
                      });
                      showToast("All text content updated live!");
                    } catch {
                      showToast("Error updating content", "error");
                    } finally {
                      setContentSaving(false);
                    }
                  }}
                  disabled={contentSaving}
                  className="px-4 py-2 bg-[#063B5C] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save Content
                </button>
              </div>

              <div className="space-y-4">
                {contentList.map((item, index) => (
                  <div key={item.key} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-800">{item.label || item.key}</span>
                      <span className="text-[10px] font-mono text-slate-400">{item.key}</span>
                    </div>
                    {item.value.length > 80 ? (
                      <textarea
                        rows={3}
                        value={item.value}
                        onChange={(e) => {
                          const updated = [...contentList];
                          updated[index].value = e.target.value;
                          setContentList(updated);
                        }}
                        className="w-full px-3 py-2 text-xs text-slate-800 bg-white rounded-lg border border-slate-300"
                      />
                    ) : (
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => {
                          const updated = [...contentList];
                          updated[index].value = e.target.value;
                          setContentList(updated);
                        }}
                        className="w-full px-3 py-2 text-xs text-slate-800 bg-white rounded-lg border border-slate-300"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. 301 URL REDIRECTS */}
          {activeTab === "redirects" && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Add Manual 301 Redirect</h3>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newRedirSource || !newRedirDest) return;
                    await fetch("/api/admin/redirects/", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        sourcePath: newRedirSource.startsWith("/") ? newRedirSource : `/${newRedirSource}`,
                        destinationPath: newRedirDest.startsWith("/") ? newRedirDest : `/${newRedirDest}`,
                        statusCode: 301,
                      }),
                    });
                    setNewRedirSource("");
                    setNewRedirDest("");
                    loadRedirects();
                    showToast("Redirect rule added!");
                  }}
                  className="flex flex-col sm:flex-row gap-3 mt-3"
                >
                  <input
                    type="text"
                    value={newRedirSource}
                    onChange={(e) => setNewRedirSource(e.target.value)}
                    placeholder="Source Path (e.g. /old-product)"
                    required
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono"
                  />
                  <input
                    type="text"
                    value={newRedirDest}
                    onChange={(e) => setNewRedirDest(e.target.value)}
                    placeholder="Destination Path (e.g. /air-handling-unit-ahu/)"
                    required
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono"
                  />
                  <button type="submit" className="px-5 py-2 bg-[#063B5C] text-white text-xs font-semibold rounded-xl">
                    Add Rule
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-800">
                  Active Redirect Rules ({redirectsList.length})
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {redirectsList.map((r) => (
                    <div key={r.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200 text-[11px]">
                          {r.sourcePath}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                          {r.destinationPath}
                        </span>
                      </div>
                      <button
                        onClick={async () => {
                          await fetch(`/api/admin/redirects/?id=${r.id}`, { method: "DELETE" });
                          loadRedirects();
                        }}
                        className="text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 11. SETTINGS & SECURITY */}
          {activeTab === "settings" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#063B5C]" />
                  <h3 className="text-sm font-bold text-slate-900">Change Admin Password</h3>
                </div>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (newPassword !== confirmPassword) {
                      showToast("Passwords do not match", "error");
                      return;
                    }
                    setPassUpdating(true);
                    try {
                      const res = await fetch("/api/admin/auth/change-password/", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ currentPassword: currPassword, newPassword }),
                      });
                      const data = await res.json();
                      if (data.success) {
                        showToast("Password updated!");
                        setCurrPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                      } else {
                        showToast(data.error || "Failed", "error");
                      }
                    } catch {
                      showToast("Error updating password", "error");
                    } finally {
                      setPassUpdating(false);
                    }
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Current Password</label>
                    <input
                      type="password"
                      value={currPassword}
                      onChange={(e) => setCurrPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={passUpdating}
                    className="w-full py-2.5 bg-[#063B5C] text-white text-xs font-semibold rounded-xl"
                  >
                    {passUpdating ? "Updating..." : "Update Password"}
                  </button>
                </form>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#063B5C]" />
                  <h3 className="text-sm font-bold text-slate-900">System Information</h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Database Engine</span>
                    <span className="font-semibold text-slate-900 font-mono">SQLite (Prisma 5.22.0)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Database File</span>
                    <span className="font-mono text-slate-700">prisma/dev.db</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Media Storage Engine</span>
                    <span className="font-mono text-slate-700">public/uploads/</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Security Architecture</span>
                    <span className="font-semibold text-slate-900">Bcrypt + JWT (HTTP-Only)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-500">Automatic 301 Redirects</span>
                    <span className="font-semibold text-emerald-700">Active on Product & Blog Slugs</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
