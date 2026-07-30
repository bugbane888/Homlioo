import React, { useState } from "react";
import {
  MessageCircle,
  Send,
  BarChart3,
  Zap,
} from "lucide-react";
import Button from "../common/Button";

// ─── Build room list from actual stored data ────────────────────────────────
// Bug 2 fix: use the property's `rooms` JSONB field when available.
// Bug 3 fix: electricity comes from the room's electricityBill field only — no `|| 500` fallback.
const buildRoomList = (pg) => {
  // If the property has full rooms data (from AdminPropertyForm), use it directly
  if (pg.rooms && typeof pg.rooms === "object") {
    return Object.entries(pg.rooms)
      .filter(([, room]) => room.rent && String(room.rent).trim() !== "")
      .map(([, room]) => ({
        label: room.label,
        sub: room.subtitle,
        rent: parseInt(room.rent, 10) || 0,
        maintenance: parseInt(room.maintenance, 10) || 0,
        security: parseInt(room.security, 10) || 0,
        // Bug 3 fix: only use electricityBill if explicitly entered — null means not specified
        electricityBill: room.electricityBill && String(room.electricityBill).trim() !== ""
          ? parseInt(room.electricityBill, 10)
          : null,
        attachedBathroom: room.attachedBathroom || false,
        acRoom: room.acRoom || false,
        availableBeds: room.availableBeds,
      }));
  }

  // Fallback for legacy properties (no rooms JSONB) — use pg.price for single only, no fake calculations
  if (pg.price) {
    return [
      {
        label: "Single Bed",
        sub: "Private Sanctuary",
        rent: pg.price,
        maintenance: 0,
        security: 0,
        electricityBill: null,  // Bug 3 fix: no default
        attachedBathroom: false,
        acRoom: false,
        availableBeds: null,
      },
    ];
  }

  return [];
};

const PricingCard = ({ pg, onEnquiry, isInCompare, onCompareToggle, onWhatsAppClick }) => {
  const rooms = buildRoomList(pg);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [isOpen, setIsOpen] = useState(null);
  const [showContact, setShowContact] = useState(false);

  if (rooms.length === 0) {
    return (
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl">
        <p className="text-sm text-slate-400 text-center font-medium py-8">
          Pricing details not available. Please contact the owner.
        </p>
        <div className="space-y-3 mt-4">
          <Button onClick={onEnquiry} className="w-full" variant="primary">
            <Send size={18} /> Send Enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl sticky top-24">
      <div className="mb-6">
        <span className="text-xs font-black text-brand-purple uppercase tracking-widest">
          Select Room Type
        </span>
        {rooms.length > 1 && (
          <span className="ml-2 text-xs text-slate-400 font-medium">
            ({rooms.length} options available)
          </span>
        )}
      </div>

      <div className="space-y-3 mb-8">
        {rooms.map((room, i) => (
          <div
            key={i}
            className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
              selectedRoom === i
                ? "border-brand-purple bg-purple-50/30"
                : "border-slate-100 hover:border-slate-200"
            }`}
            onClick={() => {
              setSelectedRoom(i);
              setIsOpen(isOpen === i ? null : i);
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-brand-navy text-base">{room.label}</h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">{room.sub}</p>
                {(room.attachedBathroom || room.acRoom) && (
                  <div className="flex gap-1.5 mt-1">
                    {room.attachedBathroom && (
                      <span className="text-[9px] bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded font-bold uppercase">
                        Attached Bath
                      </span>
                    )}
                    {room.acRoom && (
                      <span className="text-[9px] bg-cyan-50 text-cyan-500 px-1.5 py-0.5 rounded font-bold uppercase">
                        AC
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-brand-navy">
                  ₹{room.rent.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 ml-1">/mo</span>
              </div>
            </div>

            {/* Expanded breakdown */}
            {isOpen === i && (
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs space-y-2 animate-in slide-in-from-top-2 duration-300">
                <div className="flex justify-between text-slate-500">
                  <span>Base Rent</span>
                  <span className="font-bold text-brand-navy">₹{room.rent.toLocaleString()}</span>
                </div>

                {room.maintenance > 0 && (
                  <div className="flex justify-between text-slate-500">
                    <span>Maintenance</span>
                    <span className="font-bold text-brand-navy">₹{room.maintenance.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Brokerage Fee</span>
                  <span>₹0 (Zero Brokerage)</span>
                </div>

                {/* Bug 3 fix: show electricity only if explicitly entered by admin */}
                <div className="flex justify-between text-slate-500">
                  <span className="flex items-center gap-1">
                    <Zap size={10} className="text-yellow-500" />
                    Electricity
                  </span>
                  <span className="font-bold text-brand-navy">
                    {room.electricityBill !== null
                      ? `₹${room.electricityBill.toLocaleString()}/mo`
                      : "As per actual usage"}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-between text-sm">
                  <span className="font-black">Approx. Total / Month</span>
                  <span className="font-black text-brand-purple">
                    ₹{(room.rent + (room.maintenance || 0) + (room.electricityBill || 0)).toLocaleString()}
                    {room.electricityBill === null && "*"}
                  </span>
                </div>
                {room.electricityBill === null && (
                  <p className="text-[9px] text-slate-400 text-right">* Electricity not included in total</p>
                )}

                {room.security > 0 && (
                  <div className="flex justify-between text-slate-400 pt-1">
                    <span>Security Deposit (one-time)</span>
                    <span className="font-bold">₹{room.security.toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <Button onClick={onEnquiry} className="w-full" variant="primary">
          <Send size={18} /> Send Enquiry
        </Button>

        <div className="border border-[#25D366]/30 rounded-xl overflow-hidden bg-white shadow-sm">
          <button
            onClick={() => setShowContact(!showContact)}
            className="w-full py-3 px-4 font-bold text-sm bg-[#25D366] text-white hover:bg-[#20bd5a] flex items-center justify-center gap-2 transition-all"
          >
            <MessageCircle size={18} fill="currentColor" />
            {showContact ? "Hide Contact Details" : "Contact Owner"}
          </button>

          {showContact && (
            <div className="p-4 bg-emerald-50/50 animate-in slide-in-from-top-2 duration-300 border-t border-[#25D366]/20">
              <div className="space-y-3 mb-4 text-center">
                <div className="w-12 h-12 bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center mx-auto text-xl">
                  👤
                </div>
                <div>
                  <h4 className="font-black text-brand-navy text-sm">{pg.ownerName || "Property Owner"}</h4>
                  <p className="text-xs font-bold text-slate-500 tracking-wider mt-1">
                    {pg.ownerPhone ? `+${pg.ownerPhone.replace(/^\+/, "")}` : "Contact via Enquiry"}
                  </p>
                </div>
              </div>
              <button
                onClick={onWhatsAppClick}
                className="w-full py-2.5 rounded-lg font-black text-xs uppercase tracking-widest bg-[#25D366] text-white hover:bg-[#20bd5a] flex items-center justify-center gap-2 transition-all shadow-md shadow-[#25D366]/30"
              >
                Message on WhatsApp
              </button>
            </div>
          )}
        </div>

        <button
          onClick={onCompareToggle}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
            isInCompare
              ? "bg-brand-purple text-white shadow-lg shadow-purple-500/20 hover:bg-brand-purple/90"
              : "bg-slate-50 dark:bg-slate-700 text-brand-navy dark:text-white border-2 border-slate-200 dark:border-slate-600 hover:border-brand-purple hover:bg-slate-100 dark:hover:bg-slate-600"
          }`}
        >
          <BarChart3 size={18} strokeWidth={2} />
          {isInCompare ? "Remove from Compare" : "Add to Compare"}
        </button>
      </div>

      <p className="text-xs text-slate-400 text-center mt-4 font-medium">
        Mention <b>HOMLiOO</b> to get the best price guarantee.
      </p>
    </div>
  );
};

export default PricingCard;
