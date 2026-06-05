import React, { useState, useEffect } from "react";
import { X, Save, FileText } from "lucide-react";
import Button from "../common/Button";
import propertyService from "../../services/supabasePropertyService";
import { useToast } from "../../context/ToastContext";

const AdminPropertyForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const { showToast } = useToast();
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedRoomType, setSelectedRoomType] = useState("single");
  const [isUploading, setIsUploading] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState([]);

  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    ownerName: "",
    description: "",
    gender: "Boys",
    locality: "",
    city: "",
    state: "",
    pincode: "",
    mapUrl: "",
    ownerPhone: "",
    
    // Room Configurations (Dynamic)
    rooms: {
      single: {
        label: "Single Bed",
        subtitle: "Private Sanctuary",
        rent: "",
        maintenance: "",
        security: "",
        availableBeds: "1",
        attachedBathroom: false,
        acRoom: false,
      },
      double: {
        label: "Double Sharing",
        subtitle: "Social Living",
        rent: "",
        maintenance: "",
        security: "",
        availableBeds: "2",
        attachedBathroom: false,
        acRoom: false,
      },
      triple: {
        label: "Triple Sharing",
        subtitle: "Budget Friendly",
        rent: "",
        maintenance: "",
        security: "",
        availableBeds: "3",
        attachedBathroom: false,
        acRoom: false,
      },
      quad: {
        label: "Quad Sharing",
        subtitle: "Economy Option",
        rent: "",
        maintenance: "",
        security: "",
        availableBeds: "4",
        attachedBathroom: false,
        acRoom: false,
      },
    },
    
    // Images & Media
    coverImage: "",
    galleryImages: [],
    
    // Amenities
    amenities: [],
    
    // Location Details
    college: "",
    collegeTime: "4 min walk",
    collegeDistance: "350m",
    metro: "",
    metroTime: "12 min walk",
    metroDistance: "1.1km",
    hospital: "",
    hospitalTime: "5 min auto",
    hospitalDistance: "500m",
    
    // House Rules
    gateClosingTime: "10:00 PM",
    smokingAllowed: false,
    guestsAllowed: false,
    noticePeriod: "30 Days",
    lockInPeriod: "6 Months",
    foodTiming: "Breakfast, Lunch, Dinner",
    
    // Verification
    isVerified: true,
    isPremium: false,
  });

  const amenityList = [
    "WiFi",
    "AC",
    "Food",
    "CCTV",
    "Laundry",
    "Parking",
    "Gym",
    "Power Backup",
    "RO Water",
    "Refrigerator",
    "Study Table",
    "Hot Water",
    "Housekeeping",
    "Lift",
    "Biometric Entry",
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        rooms: initialData.rooms || {
          single: { label: "Single Bed", subtitle: "Private Sanctuary", rent: initialData.price || "", maintenance: "", security: "", availableBeds: "1", attachedBathroom: false, acRoom: false },
          double: { label: "Double Sharing", subtitle: "Social Living", rent: "", maintenance: "", security: "", availableBeds: "2", attachedBathroom: false, acRoom: false },
          triple: { label: "Triple Sharing", subtitle: "Budget Friendly", rent: "", maintenance: "", security: "", availableBeds: "3", attachedBathroom: false, acRoom: false },
          quad: { label: "Quad Sharing", subtitle: "Economy Option", rent: "", maintenance: "", security: "", availableBeds: "4", attachedBathroom: false, acRoom: false },
        }
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, coverImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name?.trim()) errors.name = "Property name is required";
    if (!formData.ownerName?.trim()) errors.ownerName = "Owner name is required";
    if (!formData.locality?.trim()) errors.locality = "Locality is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.state) errors.state = "State is required";
    if (!formData.pincode?.trim() || !/^\d{6}$/.test(formData.pincode))
      errors.pincode = "Valid 6-digit pincode required";
    if (!formData.description?.trim()) errors.description = "Description is required";
    if (!formData.coverImage && !coverImageFile) errors.coverImage = "Cover image is required";
    if (!formData.mapUrl?.trim() || !formData.mapUrl?.includes("maps"))
      errors.mapUrl = "Valid Google Maps link required";
    if (!formData.college?.trim()) errors.college = "College name is required";
    
    // Check at least one room type has rent
    const hasAnyRoom = Object.values(formData.rooms).some(r => r.rent);
    if (!hasAnyRoom) errors.rooms = "Add at least one room type with rent";
    
    return errors;
  };

  const toggleAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const updateRoomData = (roomType, field, value) => {
    setFormData((prev) => ({
      ...prev,
      rooms: {
        ...prev.rooms,
        [roomType]: {
          ...prev.rooms[roomType],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setTimeout(() => {
        const firstError = document.querySelector('.border-red-500');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return;
    }
    setValidationErrors({});
    setIsUploading(true);

    try {
      let finalCoverImage = formData.coverImage;
      if (coverImageFile) {
        try {
          finalCoverImage = await propertyService.uploadImage(coverImageFile);
        } catch (uploadError) {
          console.warn("Storage upload failed, falling back to base64", uploadError);
          // keep formData.coverImage which contains the base64 from handleCoverImageUpload
        }
      }

      let finalGalleryImages = [...formData.galleryImages];
      if (galleryImageFiles.length > 0) {
        try {
          const uploadedUrls = await Promise.all(
            galleryImageFiles.map(file => propertyService.uploadImage(file))
          );
          finalGalleryImages = [...finalGalleryImages, ...uploadedUrls].filter(Boolean);
        } catch (uploadError) {
          console.warn("Gallery storage upload failed", uploadError);
        }
      }

      const submittedData = {
        ...formData,
        coverImage: finalCoverImage,
        galleryImages: finalGalleryImages,
        id: initialData?.id || Date.now(),
        price: parseInt(formData.rooms.single.rent || 0),
        total: parseInt(formData.rooms.single.rent || 0),
        reviews: 0,
        roomsLeft: 3,
        tags: ["New Listing"],
        verified: formData.isVerified,
        isPremium: formData.isPremium,
        sharing: formData.rooms.single.label,
        status: "published",
        publishedAt: new Date().toISOString(),
      };

      // Wait for backend submission
      await onSubmit(submittedData);

      // Remove from drafts if it was published from a draft
      const drafts = JSON.parse(localStorage.getItem("homlioo_drafts") || "[]");
      const updatedDrafts = drafts.filter(d => d.id !== submittedData.id);
      localStorage.setItem("homlioo_drafts", JSON.stringify(updatedDrafts));

      showToast("Property published successfully!", "success");
      onClose();
    } catch (error) {
      console.error("Upload error", error);
      showToast("Failed to submit form: " + error.message, "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveDraft = () => {
    const drafts = JSON.parse(localStorage.getItem("homlioo_drafts") || "[]");
    const draftId = initialData?.id || Date.now();
    const existingIndex = drafts.findIndex(d => d.id === draftId);
    
    const draftToSave = { ...formData, id: draftId, savedAt: new Date().toLocaleString() };
    
    if (existingIndex >= 0) {
      drafts[existingIndex] = draftToSave;
    } else {
      drafts.push(draftToSave);
    }
    
    localStorage.setItem("homlioo_drafts", JSON.stringify(drafts));
    showToast("Draft saved successfully!", "success");
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="bg-white dark:bg-slate-800 w-full max-w-4xl rounded-[2.5rem] relative z-10 shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-8 lg:p-12 pb-0 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-2 tracking-tight">
                {initialData ? "Edit PG Property" : "Add New PG"}
              </h2>
              <p className="text-slate-400 text-sm font-medium">
                Professional PG listing form. Fill all sections and publish for students to see.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-brand-navy dark:hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-8 lg:px-12 py-8">
          <div className="space-y-8">
            
            {/* Section 1: Basic Information */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-purple text-white rounded-full flex items-center justify-center text-xs">1</span>
                Basic Information
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">
                      PG Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border outline-none focus:ring-2 ring-brand-purple/20 font-medium ${
                        validationErrors.name ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                      }`}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sunrise Girls PG"
                    />
                    {validationErrors.name && <p className="text-xs text-red-500 font-bold">{validationErrors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">
                      PG Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                      <option>Boys</option>
                      <option>Girls</option>
                      <option>Co-ed</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">
                      Owner Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border outline-none focus:ring-2 ring-brand-purple/20 font-medium ${
                        validationErrors.ownerName ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                      }`}
                      value={formData.ownerName || ""}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                    />
                    {validationErrors.ownerName && <p className="text-xs text-red-500 font-bold">{validationErrors.ownerName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">
                      Owner WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border outline-none focus:ring-2 ring-brand-purple/20 font-medium ${
                        validationErrors.ownerPhone ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                      }`}
                      value={formData.ownerPhone}
                      onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                      placeholder="e.g. 919876543210"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">
                      Visibility Options
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer w-full p-3 bg-brand-amber/10 rounded-xl border border-brand-amber/20">
                      <input
                        type="checkbox"
                        checked={formData.isPremium}
                        onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                        className="w-4 h-4 rounded text-brand-amber"
                      />
                      <span className="text-xs font-black text-brand-navy dark:text-white uppercase tracking-tight">
                        Premium PG (Show on Homepage)
                      </span>
                    </label>
                  </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400">
                    Overview/Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className={`w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border outline-none focus:ring-2 ring-brand-purple/20 font-medium resize-none ${
                      validationErrors.description ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                    }`}
                    rows="4"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your PG - facilities, atmosphere, rules, what students can expect..."
                  />
                  {validationErrors.description && <p className="text-xs text-red-500 font-bold">{validationErrors.description}</p>}
                </div>
              </div>
            </div>

            {/* Section 2: Photos & Media */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-purple text-white rounded-full flex items-center justify-center text-xs">2</span>
                Photos & Media (Visible to Students)
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400">
                    Cover Image <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    className={`w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border outline-none focus:ring-2 ring-brand-purple/20 font-medium ${
                      validationErrors.coverImage ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                    }`}
                    onChange={handleCoverImageUpload}
                  />
                  {formData.coverImage && (
                    <div className="relative mt-2">
                      <img
                        src={formData.coverImage}
                        alt="Cover preview"
                        className="w-full h-48 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                  )}
                  {validationErrors.coverImage && <p className="text-xs text-red-500 font-bold">{validationErrors.coverImage}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400">Gallery Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg, image/png, image/webp"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium text-sm"
                    onChange={(e) => setGalleryImageFiles(Array.from(e.target.files))}
                  />
                  {formData.galleryImages?.length > 0 && galleryImageFiles.length === 0 && (
                    <p className="text-xs text-brand-purple mt-1">Current: {formData.galleryImages.length} images saved.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Location & Map */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-purple text-white rounded-full flex items-center justify-center text-xs">3</span>
                Location & Map (Visible to Students)
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Locality <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border outline-none focus:ring-2 ring-brand-purple/20 font-medium ${
                        validationErrors.locality ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                      }`}
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      placeholder="e.g. Knowledge Park II"
                    />
                    {validationErrors.locality && <p className="text-xs text-red-500 font-bold">{validationErrors.locality}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Google Maps Link <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border outline-none focus:ring-2 ring-brand-purple/20 font-medium ${
                        validationErrors.mapUrl ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                      }`}
                      value={formData.mapUrl}
                      onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                      placeholder="https://maps.app.goo.gl/..."
                    />
                    {validationErrors.mapUrl && <p className="text-xs text-red-500 font-bold">{validationErrors.mapUrl}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">City <span className="text-red-500">*</span></label>
                    <select
                      className={`w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border outline-none focus:ring-2 ring-brand-purple/20 font-medium ${
                        validationErrors.city ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                      }`}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    >
                      <option value="">Select City</option>
                      <option>Greater Noida</option>
                      <option>Noida</option>
                      <option>Delhi</option>
                    </select>
                    {validationErrors.city && <p className="text-xs text-red-500 font-bold">{validationErrors.city}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">State <span className="text-red-500">*</span></label>
                    <select
                      className={`w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border outline-none focus:ring-2 ring-brand-purple/20 font-medium ${
                        validationErrors.state ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                      }`}
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    >
                      <option value="">Select State</option>
                      <option>Uttar Pradesh</option>
                      <option>Delhi</option>
                    </select>
                    {validationErrors.state && <p className="text-xs text-red-500 font-bold">{validationErrors.state}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Pincode <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border outline-none focus:ring-2 ring-brand-purple/20 font-medium ${
                        validationErrors.pincode ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                      }`}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="201310"
                    />
                    {validationErrors.pincode && <p className="text-xs text-red-500 font-bold">{validationErrors.pincode}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Proximity to Colleges/Metro/Hospital */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-purple text-white rounded-full flex items-center justify-center text-xs">4</span>
                Proximity Details (Visible to Students)
              </h3>
              
              {/* College */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-brand-navy dark:text-white mb-4">🎓 College Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">College Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border outline-none focus:ring-2 ring-brand-purple/20 font-medium ${
                        validationErrors.college ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                      }`}
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      placeholder="e.g. NIET"
                    />
                    {validationErrors.college && <p className="text-xs text-red-500 font-bold">{validationErrors.college}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Time to College</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                      value={formData.collegeTime}
                      onChange={(e) => setFormData({ ...formData, collegeTime: e.target.value })}
                      placeholder="e.g. 4 min walk"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Distance to College</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                      value={formData.collegeDistance}
                      onChange={(e) => setFormData({ ...formData, collegeDistance: e.target.value })}
                      placeholder="e.g. 350m"
                    />
                  </div>
                </div>
              </div>

              {/* Metro */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-brand-navy dark:text-white mb-4">🚇 Metro Station</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Metro Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                      value={formData.metro}
                      onChange={(e) => setFormData({ ...formData, metro: e.target.value })}
                      placeholder="e.g. Pari Chowk Metro"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Time to Metro</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                      value={formData.metroTime}
                      onChange={(e) => setFormData({ ...formData, metroTime: e.target.value })}
                      placeholder="e.g. 8 min walk"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Distance to Metro</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                      value={formData.metroDistance}
                      onChange={(e) => setFormData({ ...formData, metroDistance: e.target.value })}
                      placeholder="e.g. 1.1km"
                    />
                  </div>
                </div>
              </div>

              {/* Hospital */}
              <div>
                <h4 className="text-sm font-bold text-brand-navy dark:text-white mb-4">🏥 Nearest Hospital</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Hospital Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                      value={formData.hospital}
                      onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                      placeholder="e.g. Yatharth Hospital"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Time to Hospital</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                      value={formData.hospitalTime}
                      onChange={(e) => setFormData({ ...formData, hospitalTime: e.target.value })}
                      placeholder="e.g. 5 min auto"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Distance to Hospital</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                      value={formData.hospitalDistance}
                      onChange={(e) => setFormData({ ...formData, hospitalDistance: e.target.value })}
                      placeholder="e.g. 500m"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Room Types & Pricing (DYNAMIC) */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-purple text-white rounded-full flex items-center justify-center text-xs">5</span>
                Room Types & Pricing (Visible to Students)
              </h3>
              
              {/* Room Type Selector */}
              <div className="mb-6">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">Select room type to configure:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.keys(formData.rooms).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedRoomType(key)}
                      className={`p-3 rounded-xl font-bold text-xs uppercase tracking-tight transition-all border-2 ${
                        selectedRoomType === key
                          ? "bg-brand-purple border-brand-purple text-white shadow-lg shadow-purple-500/20"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand-purple"
                      }`}
                    >
                      {formData.rooms[key].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Room Configuration */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-bold text-brand-navy dark:text-white mb-4">
                  {formData.rooms[selectedRoomType].label} - {formData.rooms[selectedRoomType].subtitle}
                </h4>
                
                <div className="space-y-4">
                  {/* Pricing Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400">Monthly Rent (₹)</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                        value={formData.rooms[selectedRoomType].rent}
                        onChange={(e) => updateRoomData(selectedRoomType, "rent", e.target.value)}
                        placeholder="6000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400">Maintenance (₹)</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                        value={formData.rooms[selectedRoomType].maintenance}
                        onChange={(e) => updateRoomData(selectedRoomType, "maintenance", e.target.value)}
                        placeholder="500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400">Security Deposit (₹)</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                        value={formData.rooms[selectedRoomType].security}
                        onChange={(e) => updateRoomData(selectedRoomType, "security", e.target.value)}
                        placeholder="6000"
                      />
                    </div>
                  </div>

                  {/* Room Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400">Available Beds</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                        value={formData.rooms[selectedRoomType].availableBeds}
                        onChange={(e) => updateRoomData(selectedRoomType, "availableBeds", e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer w-full">
                        <input
                          type="checkbox"
                          checked={formData.rooms[selectedRoomType].attachedBathroom}
                          onChange={(e) => updateRoomData(selectedRoomType, "attachedBathroom", e.target.checked)}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                          Attached Bathroom
                        </span>
                      </label>
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer w-full">
                        <input
                          type="checkbox"
                          checked={formData.rooms[selectedRoomType].acRoom}
                          onChange={(e) => updateRoomData(selectedRoomType, "acRoom", e.target.checked)}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                          AC Room
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {validationErrors.rooms && <p className="text-xs text-red-500 font-bold mt-4">{validationErrors.rooms}</p>}
            </div>

            {/* Section 6: Amenities */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-purple text-white rounded-full flex items-center justify-center text-xs">6</span>
                Amenities (Visible to Students)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {amenityList.map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-tight border-2 transition-all flex items-center justify-center gap-2 ${
                      formData.amenities.includes(amenity)
                        ? "bg-brand-purple border-brand-purple text-white shadow-lg shadow-purple-500/20"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-400"
                    }`}
                  >
                    {formData.amenities.includes(amenity) && "✓"} {amenity}
                  </button>
                ))}
              </div>
            </div>

            {/* Section 7: House Rules & Policies */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-purple text-white rounded-full flex items-center justify-center text-xs">7</span>
                House Rules & Policies (Visible to Students)
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Gate Closing Time</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                      value={formData.gateClosingTime}
                      onChange={(e) => setFormData({ ...formData, gateClosingTime: e.target.value })}
                      placeholder="10:00 PM"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Food Timing</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                      value={formData.foodTiming}
                      onChange={(e) => setFormData({ ...formData, foodTiming: e.target.value })}
                      placeholder="Breakfast, Lunch, Dinner"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Notice Period</label>
                    <select
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                      value={formData.noticePeriod}
                      onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                    >
                      <option>30 Days</option>
                      <option>60 Days</option>
                      <option>6 Months</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Lock-in Period</label>
                    <select
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                      value={formData.lockInPeriod}
                      onChange={(e) => setFormData({ ...formData, lockInPeriod: e.target.value })}
                    >
                      <option>3 Months</option>
                      <option>6 Months</option>
                      <option>12 Months</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.smokingAllowed}
                      onChange={(e) => setFormData({ ...formData, smokingAllowed: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Smoking Allowed</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.guestsAllowed}
                      onChange={(e) => setFormData({ ...formData, guestsAllowed: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Guests Allowed</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Section 8: Verification */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-purple text-white rounded-full flex items-center justify-center text-xs">8</span>
                Verification
              </h3>
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <input
                  type="checkbox"
                  checked={formData.isVerified}
                  onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                  className="w-5 h-5 rounded"
                />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  ✓ Mark as HOMLiOO Verified
                </span>
              </div>
            </div>
          </div>
        </form>

        {/* Footer Buttons - Fixed at Bottom */}
        <div className="flex gap-4 p-8 lg:p-12 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 shrink-0 flex-wrap justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="min-w-[150px]"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            className="min-w-[150px]"
          >
            <FileText size={18} /> Save Draft
          </Button>
          <Button
            type="button"
            variant="primary"
            className="min-w-[150px] py-3 shadow-xl shadow-amber-500/20"
            disabled={isUploading}
            onClick={handleSubmit}
          >
            {isUploading ? "Uploading..." : <><Save size={18} /> Publish</>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPropertyForm;
