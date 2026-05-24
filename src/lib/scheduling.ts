export const SHOP_CLOSE_HOUR = 20; // 8 PM
export const PREP_HOURS = 5;

export interface PickupSlot {
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
  label: string;
}

export const PICKUP_SLOTS: PickupSlot[] = [
  { startHour: 8, startMin: 0, endHour: 10, endMin: 0, label: "8:00 AM – 10:00 AM" },
  { startHour: 10, startMin: 0, endHour: 12, endMin: 0, label: "10:00 AM – 12:00 PM" },
  { startHour: 12, startMin: 30, endHour: 14, endMin: 30, label: "12:30 PM – 2:30 PM" },
  { startHour: 15, startMin: 30, endHour: 17, endMin: 30, label: "3:30 PM – 5:30 PM" },
  { startHour: 18, startMin: 0, endHour: 20, endMin: 0, label: "6:00 PM – 8:00 PM" },
];

const atTime = (date: Date, h: number, m: number): Date => {
  const d = new Date(date);
  d.setHours(h, m, 0, 0);
  return d;
};

export const slotStart = (date: Date, slot: PickupSlot): Date =>
  atTime(date, slot.startHour, slot.startMin);

export const slotEnd = (date: Date, slot: PickupSlot): Date =>
  atTime(date, slot.endHour, slot.endMin);

export interface SlotAvailability {
  slot: PickupSlot;
  available: boolean;
  reason?: string;
}

export const slotAvailabilityForDate = (
  date: Date,
  now: Date = new Date()
): SlotAvailability[] => {
  const prepDeadline = new Date(now.getTime() + PREP_HOURS * 3600 * 1000);
  const close = atTime(date, SHOP_CLOSE_HOUR, 0);
  return PICKUP_SLOTS.map((slot) => {
    const start = slotStart(date, slot);
    const end = slotEnd(date, slot);
    if (end > close) return { slot, available: false, reason: "After closing" };
    if (start < prepDeadline)
      return { slot, available: false, reason: "Needs 5 hr prep" };
    return { slot, available: true };
  });
};

export const availableSlotsForDate = (
  date: Date,
  now: Date = new Date()
): PickupSlot[] =>
  slotAvailabilityForDate(date, now)
    .filter((s) => s.available)
    .map((s) => s.slot);

export const earliestPickupDate = (now: Date = new Date()): Date => {
  let probe = new Date(now);
  probe.setHours(0, 0, 0, 0);
  for (let i = 0; i < 14; i++) {
    if (availableSlotsForDate(probe, now).length > 0) return probe;
    probe = new Date(probe.getTime() + 24 * 3600 * 1000);
  }
  return probe;
};

export const earliestDeliveryDate = (now: Date = new Date()): Date => {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  // Same-day delivery allowed if there's still operating time; otherwise tomorrow.
  const close = atTime(d, SHOP_CLOSE_HOUR, 0);
  if (now >= close) {
    return new Date(d.getTime() + 24 * 3600 * 1000);
  }
  return d;
};

export const formatDateInput = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const parseDateInput = (s: string): Date => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const formatDateLong = (s: string): string => {
  const d = parseDateInput(s);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
