"use client";

import { useState } from "react";
import type { CustomerDetails } from "@/types";

interface Props {
  disabled: boolean;
  onSubmit: (c: CustomerDetails) => void;
}

const PHONE_RE = /^\+?\d[\d\s\-]{7,}$/;

export default function OrderForm({ disabled, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [touched, setTouched] = useState(false);

  const errors = {
    name: name.trim().length < 2 ? "Please enter your full name" : "",
    phone: !PHONE_RE.test(phone.trim())
      ? "Enter a valid phone number (8+ digits)"
      : "",
    address:
      address.trim().length < 10
        ? "Please enter a delivery address (at least 10 chars)"
        : "",
  };
  const valid = !errors.name && !errors.phone && !errors.address;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setTouched(true);
        if (!valid) return;
        onSubmit({
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
        });
      }}
      className="space-y-4"
    >
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
        label="Delivery address"
        value={address}
        onChange={setAddress}
        placeholder="42/B, Main Street, Negombo"
        error={touched ? errors.address : ""}
        textarea
      />

      <button
        type="submit"
        disabled={disabled}
        className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 text-white font-bold rounded-full py-3.5"
      >
        <span>Place Order via WhatsApp</span>
      </button>
      <p className="text-xs text-slate-500 text-center">
        Your order details open in WhatsApp ready to send to Rich Super.
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
