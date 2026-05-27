import React, { useState, useEffect, useRef } from "react";
import { X, Save, Map as MapIcon, Check, Plus, MapPin, Clock, Lock, Trash2 } from "lucide-react";
import Button from "../common/Button";

const PropertyFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    pgType: "Girls",
    description: "",
    locality: "",
    fullAddress: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    monthlyRent: "",
    securityDeposit: "",
    maintenance: "",
    availableBeds: "1",
    attachedBathroom: false,
    acRoom: false,
    roomPhotos: [],
    amenities: [],
    coverImage: "",
    galleryImages: [],
    videoWalkthrough: "",
    mapUrl: "",
    latitude: "",
    longitude: "",
    gateClosingTime: "10:00 PM",
    smokingAllowed: false,
    guestsAllowed: false,
    noticePeriod: "30 Days",
    lockInPeriod: "6 Months",
    foodTiming: "Breakfast, Lunch, Dinner",
    visitorTiming: "11:00 AM - 08:00 PM",
    nearbyPlaces: [],
    adminNotes: "",
    isVerified: false,
  });

  const coverImageRef = useRef(null);
  const galleryImageRefs = useRef({});

  const availableAmenities = [
    { name: "WiFi", icon: "📡" },
    { name: "AC", icon: "❄️" },
    { name: "Food Included", icon: "🍽️" },
    { name: "CCTV", icon: "📹" },
    { name: "Laundry", icon: "🧺" },
    { name: "Parking", icon: "🚗" },
    { name: "Gym", icon: "💪" },
    { name: "Power Backup", icon: "⚡" },
    { name: "RO Water", icon: "💧" },
    { name: "Refrigerator", icon: "❄️" },
    { name: "Study Table", icon: "📚" },
    { name: "Hot Water", icon: "🔥" },
    { name: "Housekeeping", icon: "🧹" },
    { name: "Lift", icon: "🛗" },
    { name: "Biometric Entry", icon: "🔐" },
  ];

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else
      setFormData({
        name: "",
        pgType: "Girls",
        description: "",
        locality: "",
        fullAddress: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        monthlyRent: "",
        securityDeposit: "",
        maintenance: "",
        availableBeds: "1",
        attachedBathroom: false,
        acRoom: false,
        roomPhotos: [],
        amenities: [],
        coverImage: "",
        galleryImages: [],
        videoWalkthrough: "",
        mapUrl: "",
        latitude: "",
        longitude: "",
        gateClosingTime: "10:00 PM",
        smokingAllowed: false,
        guestsAllowed: false,
        noticePeriod: "30 Days",
        lockInPeriod: "6 Months",
        foodTiming: "Breakfast, Lunch, Dinner",
        visitorTiming: "11:00 AM - 08:00 PM",
        nearbyPlaces: [],
        adminNotes: "",
        isVerified: false,
      });
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const toggleAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleCoverImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, coverImage: event.target?.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImageUpload = (index, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newGalleryImages = [...formData.galleryImages];
        newGalleryImages[index] = event.target?.result;
        setFormData({ ...formData, galleryImages: newGalleryImages });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeGalleryImage = (index) => {
    const newGalleryImages = formData.galleryImages.filter((_, i) => i !== index);
    setFormData({ ...formData, galleryImages: newGalleryImages });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="bg-white dark:bg-slate-800 w-full max-w-3xl rounded-[2.5rem] p-8 lg:p-12 relative z-10 shadow-2xl border border-slate-100 dark:border-slate-700 overflow-y-auto max-h-[90vh] no-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-slate-400 hover:text-brand-navy dark:hover:text-white transition-colors"
        >
          <X />
        </button>

        <h2 className="text-3xl font-black text-brand-navy dark:text-white mb-2 tracking-tighter">
          {initialData ? "Update PG Property" : "Add New PG Property"}
        </h2>
        <p className="text-slate-400 text-sm mb-10 font-medium tracking-tight">
          Fill all the details to list your property and get more bookings.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
          className="space-y-6"
        >
          {/* Section 1: Basic Property Information */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-black text-brand-navy dark:text-white mb-6 flex items-center gap-2">
              <span className="w-6 h-6 bg-brand-purple text-white rounded-full flex items-center justify-center text-[10px]">1</span>
              Basic Property Information
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    Property Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Sunrise Girls PG"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    PG Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.pgType}
                    onChange={(e) =>
                      setFormData({ ...formData, pgType: e.target.value })
                    }
                  >
                    <option>Girls</option>
                    <option>Boys</option>
                    <option>Co-ed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    Property Description <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe your property..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    Locality / Area <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.locality}
                    onChange={(e) =>
                      setFormData({ ...formData, locality: e.target.value })
                    }
                    placeholder="e.g. Knowledge Park II"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.fullAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, fullAddress: e.target.value })
                    }
                    placeholder="House No., Building, Street, Sector..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    Landmark
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.landmark}
                    onChange={(e) =>
                      setFormData({ ...formData, landmark: e.target.value })
                    }
                    placeholder="e.g. Near Metro Station"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  >
                    <option value="">Select City</option>
                    <option>Greater Noida</option>
                    <option>Noida</option>
                    <option>Delhi</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                  >
                    <option value="">Select State</option>
                    <option>Uttar Pradesh</option>
                    <option>Delhi</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value })
                    }
                    placeholder="201310"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Room Types */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-black text-brand-navy dark:text-white mb-6 flex items-center gap-2">
              <span className="w-6 h-6 bg-brand-purple text-white rounded-full flex items-center justify-center text-[10px]">2</span>
              Pricing & Room Types
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    Monthly Rent (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.monthlyRent}
                    onChange={(e) =>
                      setFormData({ ...formData, monthlyRent: e.target.value })
                    }
                    placeholder="6000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    Security Deposit (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.securityDeposit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        securityDeposit: e.target.value,
                      })
                    }
                    placeholder="6000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    Maintenance (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.maintenance}
                    onChange={(e) =>
                      setFormData({ ...formData, maintenance: e.target.value })
                    }
                    placeholder="500"
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 mb-4 uppercase">
                  Single Room - Active
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                      Available Beds
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-lg outline-none font-medium text-sm"
                      value={formData.availableBeds}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          availableBeds: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-end gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.attachedBathroom}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            attachedBathroom: e.target.checked,
                          })
                        }
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                        Attached Bathroom
                      </span>
                    </label>
                  </div>
                  <div className="flex items-end gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.acRoom}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            acRoom: e.target.checked,
                          })
                        }
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                        AC Room
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Amenities */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-black text-brand-navy dark:text-white mb-6 flex items-center gap-2">
              <span className="w-6 h-6 bg-brand-purple text-white rounded-full flex items-center justify-center text-[10px]">3</span>
              Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableAmenities.map((amenity) => (
                <button
                  key={amenity.name}
                  type="button"
                  onClick={() => toggleAmenity(amenity.name)}
                  className={`px-4 py-3 rounded-lg text-[10px] font-bold uppercase tracking-wider border-2 transition-all flex items-center justify-center gap-2 ${
                    formData.amenities.includes(amenity.name)
                      ? "bg-brand-purple border-brand-purple text-white shadow-lg shadow-purple-500/20"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-400"
                  }`}
                >
                  {formData.amenities.includes(amenity.name) && (
                    <Check size={14} />
                  )}
                  {amenity.name}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 text-xs font-bold text-brand-purple hover:text-brand-purple/80 flex items-center gap-1"
            >
              <Plus size={14} /> Add Custom Amenity
            </button>
          </div>

          {/* Section 4: Property Media */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-black text-brand-navy dark:text-white mb-6 flex items-center gap-2">
              <span className="w-6 h-6 bg-brand-purple text-white rounded-full flex items-center justify-center text-[10px]">4</span>
              Property Media
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                  Cover Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  ref={coverImageRef}
                  accept="image/*"
                  onChange={handleCoverImageUpload}
                  className="hidden"
                />
                {formData.coverImage ? (
                  <div className="relative">
                    <img
                      src={formData.coverImage}
                      alt="Cover"
                      className="w-full h-48 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, coverImage: "" });
                        if (coverImageRef.current) coverImageRef.current.value = "";
                      }}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => coverImageRef.current?.click()}
                    className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center bg-white dark:bg-slate-800 hover:border-brand-purple hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-bold text-brand-purple">
                      📸 Click to Upload Cover Image
                    </span>
                    <p className="text-xs text-slate-400 mt-1">
                      Recommended: 1200 x 800px
                    </p>
                  </button>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                  Gallery Images
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i}>
                      <input
                        type="file"
                        ref={(el) => {
                          if (el) galleryImageRefs.current[i] = el;
                        }}
                        accept="image/*"
                        onChange={(e) => handleGalleryImageUpload(i, e)}
                        className="hidden"
                      />
                      {formData.galleryImages[i] ? (
                        <div className="relative group">
                          <img
                            src={formData.galleryImages[i]}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(i)}
                            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity"
                          >
                            <Trash2 size={18} className="text-white" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => galleryImageRefs.current[i]?.click()}
                          className="w-full h-24 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center bg-white dark:bg-slate-800 hover:border-brand-purple hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                        >
                          <Plus size={18} className="text-brand-purple" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {formData.galleryImages.length > 0 && (
                  <p className="text-[10px] text-slate-400 text-right">
                    {formData.galleryImages.length} image(s) uploaded
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                  Video Walkthrough (Optional)
                </label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center bg-white dark:bg-slate-800">
                  <span className="text-xs text-slate-400">
                    🎥 Upload Video (Max size: 100MB)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Location & Map */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-black text-brand-navy dark:text-white mb-6 flex items-center gap-2">
              <span className="w-6 h-6 bg-brand-purple text-white rounded-full flex items-center justify-center text-[10px]">5</span>
              Location & Map
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    Latitude
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.latitude}
                    onChange={(e) =>
                      setFormData({ ...formData, latitude: e.target.value })
                    }
                    placeholder="28.5355"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    Longitude
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.longitude}
                    onChange={(e) =>
                      setFormData({ ...formData, longitude: e.target.value })
                    }
                    placeholder="77.3910"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                  Google Maps Link <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium text-xs"
                  value={formData.mapUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, mapUrl: e.target.value })
                  }
                  placeholder="https://maps.app.goo.gl/..."
                />
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl h-48 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <span className="text-sm text-slate-400">Map Preview</span>
              </div>
            </div>
          </div>

          {/* Section 6: Rules & Policies */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-black text-brand-navy dark:text-white mb-6 flex items-center gap-2">
              <span className="w-6 h-6 bg-brand-purple text-white rounded-full flex items-center justify-center text-[10px]">6</span>
              Rules & Policies
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    Gate Closing Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.gateClosingTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gateClosingTime: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex items-end gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.smokingAllowed}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          smokingAllowed: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      Smoking Allowed
                    </span>
                  </label>
                </div>
                <div className="flex items-end gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.guestsAllowed}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guestsAllowed: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      Guests Allowed
                    </span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    Notice Period <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.noticePeriod}
                    onChange={(e) =>
                      setFormData({ ...formData, noticePeriod: e.target.value })
                    }
                  >
                    <option>30 Days</option>
                    <option>60 Days</option>
                    <option>6 Months</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    Lock-in Period <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.lockInPeriod}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lockInPeriod: e.target.value,
                      })
                    }
                  >
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>12 Months</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    Food Timing <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.foodTiming}
                    onChange={(e) =>
                      setFormData({ ...formData, foodTiming: e.target.value })
                    }
                    placeholder="Breakfast, Lunch, Dinner"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                    Visitor Timing <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium"
                    value={formData.visitorTiming}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        visitorTiming: e.target.value,
                      })
                    }
                    placeholder="11:00 AM - 08:00 PM"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 7: Reviews & Verification */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-black text-brand-navy dark:text-white mb-6 flex items-center gap-2">
              <span className="w-6 h-6 bg-brand-purple text-white rounded-full flex items-center justify-center text-[10px]">7</span>
              Reviews & Verification
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <input
                  type="checkbox"
                  checked={formData.isVerified}
                  onChange={(e) =>
                    setFormData({ ...formData, isVerified: e.target.checked })
                  }
                  className="w-5 h-5 rounded"
                />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  ✓ Verified Property
                </span>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                  Admin Notes
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 ring-brand-purple/20 font-medium resize-none"
                  rows="3"
                  value={formData.adminNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, adminNotes: e.target.value })
                  }
                  placeholder="Add any notes or special instructions about this property..."
                />
                <p className="text-[10px] text-slate-400 text-right">0/500</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 sticky bottom-0 bg-slate-50 dark:bg-slate-900/50 -m-6 p-6 rounded-b-2xl border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Save Draft
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Preview Listing
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1 py-4 shadow-xl shadow-amber-500/20"
            >
              <Save size={18} /> Publish Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyFormModal;
