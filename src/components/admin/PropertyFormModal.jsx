import React, { useState, useEffect } from "react";
import { X, Save, Map as MapIcon, Check } from "lucide-react";
import Button from "../common/Button";

const PropertyFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    locality: "",
    college: "",
    price: "",
    total: "",
    gender: "Girls",
    description: "",
    mapUrl: "",
    amenities: [],
  });

  const availableAmenities = [
    "WiFi",
    "AC",
    "Food",
    "CCTV",
    "Laundry",
    "Parking",
    "Gym",
    "Power Backup",
  ];

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else
      setFormData({
        name: "",
        locality: "",
        college: "",
        price: "",
        total: "",
        gender: "Girls",
        description: "",
        mapUrl: "",
        amenities: [],
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
          {initialData ? "Update Sanctuary" : "List New Sanctuary"}
        </h2>
        <p className="text-slate-400 text-sm mb-10 font-medium tracking-tight">
          Fill in the professional details for this property.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
          className="space-y-8"
        >
          {/* Core Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                Property Name
              </label>
              <input
                required
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-2xl border-none outline-none focus:ring-4 ring-brand-purple/5 font-bold"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Sunrise Luxury PG"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                Locality / Area
              </label>
              <input
                required
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-2xl border-none outline-none focus:ring-4 ring-brand-purple/5 font-bold"
                value={formData.locality}
                onChange={(e) =>
                  setFormData({ ...formData, locality: e.target.value })
                }
                placeholder="e.g. Knowledge Park II"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                Gender
              </label>
              <select
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-2xl outline-none font-bold"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <option>Girls</option>
                <option>Boys</option>
                <option>Co-ed</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                Base Rent (₹)
              </label>
              <input
                type="number"
                required
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-2xl outline-none font-bold"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                Total / Month (₹)
              </label>
              <input
                type="number"
                required
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-2xl outline-none font-bold"
                value={formData.total}
                onChange={(e) =>
                  setFormData({ ...formData, total: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 flex items-center gap-2">
              <MapIcon size={12} /> Google Maps Link
            </label>
            <input
              className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-2xl outline-none font-bold text-xs"
              value={formData.mapUrl}
              onChange={(e) =>
                setFormData({ ...formData, mapUrl: e.target.value })
              }
              placeholder="Paste https://maps.app.goo.gl/... link here"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableAmenities.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider border-2 transition-all flex items-center justify-center gap-2 ${formData.amenities.includes(amenity) ? "bg-brand-purple border-brand-purple text-white shadow-lg shadow-purple-500/20" : "bg-transparent border-slate-100 text-slate-400"}`}
                >
                  {formData.amenities.includes(amenity) && <Check size={12} />}{" "}
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Discard
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-[2] py-4 shadow-xl shadow-amber-500/20"
            >
              <Save size={18} />{" "}
              {initialData ? "Update Property" : "Publish Property"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyFormModal;
