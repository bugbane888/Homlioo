import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react";
import Button from "../common/Button";

const PricingCard = ({ pg, onEnquiry }) => {
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [isOpen, setIsOpen] = useState(null);

  const rooms = [
    { label: "Single Bed", rent: pg.price, sub: "Private Sanctuary" },
    {
      label: "Double Sharing",
      rent: Math.round(pg.price * 0.75),
      sub: "Social Living",
    },
    {
      label: "Triple Sharing",
      rent: Math.round(pg.price * 0.6),
      sub: "Budget Friendly",
    },
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl sticky top-24">
      <div className="mb-6">
        <span className="text-[10px] font-black text-brand-purple uppercase tracking-widest">
          Select Room Type
        </span>
      </div>

      <div className="space-y-3 mb-8">
        {rooms.map((room, i) => (
          <div
            key={i}
            className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${selectedRoom === i ? "border-brand-purple bg-purple-50/30" : "border-slate-50"}`}
            onClick={() => {
              setSelectedRoom(i);
              setIsOpen(isOpen === i ? null : i);
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-brand-navy text-sm">
                  {room.label}
                </h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {room.sub}
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-brand-navy">
                  ₹{room.rent.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 ml-1">/mo</span>
              </div>
            </div>

            {isOpen === i && (
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs space-y-2 animate-in slide-in-from-top-2 duration-300">
                <div className="flex justify-between text-slate-500">
                  <span>Base Rent</span>
                  <span className="font-bold text-brand-navy">
                    ₹{room.rent}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Brokerage Fee</span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Electricity (Estimated)</span>
                  <span className="font-bold text-brand-navy">
                    ₹{pg.electricity || 500}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between text-sm">
                  <span className="font-black">Total / Month</span>
                  <span className="font-black text-brand-purple">
                    ₹{(room.rent + (pg.electricity || 500)).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <Button onClick={onEnquiry} className="w-full" variant="primary">
          <Send size={18} /> Send Enquiry
        </Button>
        <Button className="w-full" variant="secondary">
          <MessageCircle size={18} /> WhatsApp
        </Button>
      </div>

      <p className="text-[10px] text-slate-400 text-center mt-4 font-medium">
        Mention <b>HOMLiOO</b> to get the best price guarantee.
      </p>
    </div>
  );
};

export default PricingCard;
