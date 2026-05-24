"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin, Store } from "lucide-react";
import type {
  CustomerDetails,
  DeliveryDetails,
  OrderDetails,
  OrderType,
  PickupSchedule,
} from "@/types";
import {
  earliestDeliveryDate,
  earliestPickupDate,
  formatDateInput,
  parseDateInput,
  slotAvailabilityForDate,
  type SlotAvailability,
} from "@/lib/scheduling";

interface Props {
  disabled: boolean;
  onSubmit: (data: {
    customer: CustomerDetails;
    order: OrderDetails;
  }) => void;
}

const PHONE_RE = /^\+?\d[\d\s\-]{7,}$/;

export default function OrderForm({ disabled, onSubmit }: Props) {
  // Customer info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Order type
  const [orderType, setOrderType] = useState<OrderType>("pickup");

  // `now` is captured once on mount so SSR and CSR initial renders agree
  // (empty strings), then the client fills in real dates after hydration.
  const [now, setNow] = useState<Date | null>(null);
  const [pickupDate, setPickupDate] = useState<string>("");
  const [slotLabel, setSlotLabel] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string>("");

  // Delivery state
  const [landmark, setLandmark] = useState("");
  const [notes, setNotes] = useState("");

  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const n = new Date();
    setNow(n);
    setPickupDate(formatDateInput(earliestPickupDate(n)));
    setDeliveryDate(formatDateInput(earliestDeliveryDate(n)));
  }, []);

  // Slot availability for the currently-selected pickup date.
  const slots: SlotAvailability[] = useMemo(() => {
    if (!now || !pickupDate) return [];
    try {
      return slotAvailabilityForDate(parseDateInput(pickupDate), now);
    } catch {
      return [];
    }
  }, [pickupDate, now]);

  const availableCount = slots.filter((s) => s.available).length;

  // If selected slot becomes unavailable after a date change, clear it.
  useEffect(() => {
    if (
      slotLabel &&
      !slots.some((s) => s.slot.label === slotLabel && s.available)
    ) {
      setSlotLabel("");
    }
  }, [slots, slotLabel]);

  const minPickupStr = now ? formatDateInput(earliestPickupDate(now)) : "";
  const minDeliveryStr = now ? formatDateInput(earliestDeliveryDate(now)) : "";

  const errors = {
    name: name.trim().length < 2 ? "Please enter your full name" : "",
    phone: !PHONE_RE.test(phone.trim())
      ? "Enter a valid phone number (8+ digits)"
      : "",
    address:
      address.trim().length < 10
        ? "Please enter your address (at least 10 chars)"
        : "",
    pickupDate:
      orderType === "pickup" && !pickupDate ? "Choose a pickup date" : "",
    slot:
      orderType === "pickup" && !slotLabel ? "Choose a pickup time slot" : "",
    deliveryDate:
      orderType === "delivery" && !deliveryDate
        ? "Choose a delivery date"
        : "",
    landmark:
      orderType === "delivery" && landmark.trim().length < 3
        ? "Add a nearby landmark"
        : "",
  };
  const valid = Object.values(errors).every((e) => !e);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;

    const customer: CustomerDetails = {
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
    };

    const order: OrderDetails =
      orderType === "pickup"
        ? {
            orderType,
            pickup: {
              date: pickupDate,
              slotLabel,
            } satisfies PickupSchedule,
          }
        : {
            orderType,
            delivery: {
              date: deliveryDate,
              landmark: landmark.trim(),
              notes: notes.trim(),
            } satisfies DeliveryDetails,
          };

    onSubmit({ customer, order });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
          Customer information
        </h3>
        <Field
          label="Full name"
          value={name}
          onChange={setName}
          placeholder="e.g. Kasun Perera"
          error={touched ? errors.name : ""}
        />
        <Field
          label="Phone (WhatsApp)"
          value={phone}
          onChange={setPhone}
          placeholder="+94 77 123 4567"
          error={touched ? errors.phone : ""}
        />
        <Field
          label="Address"
          value={address}
          onChange={setAddress}
          placeholder="42/B, Main Street, Negombo"
          error={touched ? errors.address : ""}
          textarea
        />
      </section>

      {/* Order type */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
          Order type
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <TypeOption
            active={orderType === "pickup"}
            onClick={() => setOrderType("pickup")}
            icon={<Store className="w-5 h-5" />}
            title="Pickup"
            subtitle="Collect from store"
          />
          <TypeOption
            active={orderType === "delivery"}
            onClick={() => setOrderType("delivery")}
            icon={<MapPin className="w-5 h-5" />}
            title="Delivery"
            subtitle="Within 6 km"
          />
        </div>
      </section>

      {/* Pickup details */}
      {orderType === "pickup" && (
        <section className="space-y-3 rounded-xl bg-brand-50/60 border border-brand-100 p-4">
          <h3 className="text-sm font-bold text-slate-800">Schedule pickup</h3>
          <p className="text-xs text-slate-600">
            We need <strong>5 hours</strong> to prepare your order. Store closes
            at <strong>8:00 PM</strong>; slots that don't fit are disabled.
          </p>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Pickup date
            </span>
            <input
              type="date"
              value={pickupDate}
              min={minPickupStr}
              onChange={(e) => setPickupDate(e.target.value)}
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                touched && errors.pickupDate
                  ? "border-rose-400"
                  : "border-slate-300"
              }`}
            />
            {touched && errors.pickupDate && (
              <span className="text-xs text-rose-600 mt-1 block">
                {errors.pickupDate}
              </span>
            )}
          </label>

          <div>
            <span className="text-sm font-medium text-slate-700">
              Pickup time slot
            </span>
            {slots.length === 0 ? (
              <p className="mt-2 text-xs text-slate-500">
                Pick a date to see available slots.
              </p>
            ) : (
              <>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {slots.map(({ slot, available, reason }) => {
                    const selected = slotLabel === slot.label;
                    return (
                      <button
                        type="button"
                        key={slot.label}
                        onClick={() => available && setSlotLabel(slot.label)}
                        disabled={!available}
                        title={!available ? reason : undefined}
                        className={`text-sm rounded-lg border px-3 py-2 text-left transition ${
                          !available
                            ? "border-slate-200 bg-slate-100 text-slate-400 line-through cursor-not-allowed"
                            : selected
                              ? "border-brand-600 bg-brand-600 text-white font-semibold"
                              : "border-slate-300 bg-white hover:border-brand-400 text-slate-700"
                        }`}
                      >
                        <span className="block">{slot.label}</span>
                        {!available && reason && (
                          <span className="block text-[10px] uppercase tracking-wide text-slate-500 no-underline mt-0.5">
                            {reason}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {availableCount === 0 && (
                  <p className="mt-2 text-xs text-rose-600">
                    No slots available for this date. Please choose a later
                    date.
                  </p>
                )}
                {touched && errors.slot && availableCount > 0 && (
                  <span className="text-xs text-rose-600 mt-1 block">
                    {errors.slot}
                  </span>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* Delivery details */}
      {orderType === "delivery" && (
        <section className="space-y-3 rounded-xl bg-brand-50/60 border border-brand-100 p-4">
          <h3 className="text-sm font-bold text-slate-800">Delivery details</h3>
          <p className="text-xs text-slate-600">
            Delivery is available only within a <strong>6 km radius</strong>{" "}
            (Valley delivery zone). Orders outside this area cannot be
            delivered.
          </p>
          <p className="text-xs text-slate-600">
            Your <strong>address</strong> from the customer section above will
            be used for delivery.
          </p>
          <Field
            label="Nearest landmark"
            value={landmark}
            onChange={setLandmark}
            placeholder="Near St. Mary's Church"
            error={touched ? errors.landmark : ""}
          />
          <Field
            label="Additional details (optional)"
            value={notes}
            onChange={setNotes}
            placeholder="Gate code, building name, preferred contact, …"
            textarea
          />
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Delivery date
            </span>
            <input
              type="date"
              value={deliveryDate}
              min={minDeliveryStr}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                touched && errors.deliveryDate
                  ? "border-rose-400"
                  : "border-slate-300"
              }`}
            />
            {touched && errors.deliveryDate && (
              <span className="text-xs text-rose-600 mt-1 block">
                {errors.deliveryDate}
              </span>
            )}
            <span className="text-[11px] text-slate-500 mt-1 block">
              Delivery time is not scheduled; we'll deliver during the chosen
              day.
            </span>
          </label>
        </section>
      )}

      <button
        type="submit"
        disabled={disabled || !now}
        className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 text-white font-bold rounded-full py-3.5"
      >
        Order Confirmation
      </button>
      <p className="text-xs text-slate-500 text-center">
        We'll generate a QR receipt next. WhatsApp opens after you confirm it.
      </p>
    </form>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  textarea?: boolean;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  textarea,
}: FieldProps) {
  const cls = `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${
    error ? "border-rose-400" : "border-slate-300"
  }`;
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {textarea ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls + " mt-1 resize-y"}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls + " mt-1"}
        />
      )}
      {error && (
        <span className="text-xs text-rose-600 mt-1 block">{error}</span>
      )}
    </label>
  );
}

interface TypeOptionProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

function TypeOption({
  active,
  onClick,
  icon,
  title,
  subtitle,
}: TypeOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border-2 px-3 py-3 text-left transition ${
        active
          ? "border-brand-600 bg-brand-50"
          : "border-slate-200 bg-white hover:border-brand-300"
      }`}
    >
      <span
        className={`shrink-0 grid place-items-center w-9 h-9 rounded-full ${
          active ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"
        }`}
      >
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-bold text-slate-800">{title}</span>
        <span className="block text-xs text-slate-500">{subtitle}</span>
      </span>
    </button>
  );
}
