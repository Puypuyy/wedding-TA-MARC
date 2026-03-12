const DEFAULT_RSVP_API_URL =
  "https://script.google.com/macros/s/AKfycbwJUSwi7KjUYFGgXIna7YA7Z4gk8RZ1DHGWUc87rvf2uIxgS-D45DV15u7PNktdxPAV7A/exec";
const RSVP_API_URL = (import.meta.env.VITE_RSVP_API_URL || DEFAULT_RSVP_API_URL).trim();

const assertApiConfigured = () => {
  if (!RSVP_API_URL) {
    throw new Error("RSVP API is not configured. Set VITE_RSVP_API_URL in your .env file.");
  }
};

const toNumber = (value, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const readJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const hasRsvpPayload = (data) => {
  if (!data || typeof data !== "object") return false;
  return Boolean(
    data.rsvp_code ||
      data.rsvpCode ||
      data.guest_name ||
      data.guestName ||
      data.name ||
      data.max_seats_allowed ||
      data.reserved_seats ||
      data.reservedSeats ||
      data.seats_reserved ||
      data.seat_count ||
      data.seats ||
      data.seats_confirmed ||
      data.confirmed_seats ||
      data.confirmedSeats ||
      data.attendance_status ||
      data.attendanceStatus ||
      data.status ||
      data.is_confirmed ||
      data.isConfirmed ||
      data.confirmed ||
      data.already_confirmed,
  );
};

const normalizeRsvp = (data) => {
  const reservedSeats = toNumber(
    data?.max_seats_allowed ??
    data?.reserved_seats ??
    data?.reservedSeats ??
    data?.seats_reserved ??
    data?.seat_count ??
    data?.seats ??
      0,
  );
  const confirmedSeats = toNumber(
    data?.seats_confirmed ??
    data?.confirmed_seats ??
    data?.confirmedSeats ??
    0,
  );
  const rawConfirmed = data?.is_confirmed ?? data?.isConfirmed ?? data?.confirmed ?? data?.already_confirmed;
  const attendanceStatus = String(data?.attendance_status ?? data?.attendanceStatus ?? data?.status ?? "")
    .trim();
  const normalizedStatus = attendanceStatus.toLowerCase();
  const isConfirmed =
    rawConfirmed === true ||
    rawConfirmed === 1 ||
    rawConfirmed === "1" ||
    rawConfirmed === "true" ||
    normalizedStatus === "confirmed" ||
    normalizedStatus === "attending" ||
    confirmedSeats > 0;

  return {
    ...data,
    rsvpCode: data?.rsvp_code || data?.rsvpCode || "",
    guestName: data?.guest_name || data?.guestName || data?.name || "",
    reservedSeats,
    confirmedSeats,
    availableSeats: Math.max(reservedSeats - confirmedSeats, 0),
    attendanceStatus: attendanceStatus || "Pending",
    status: attendanceStatus || data?.status || "",
    specialNotes: data?.special_notes ?? data?.specialNotes ?? "",
    guestNamesList: data?.guest_names_list ?? data?.guestNamesList ?? "",
    isConfirmed,
  };
};

const postRsvp = async (payload) => {
  assertApiConfigured();
  const response = await fetch(RSVP_API_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  console.log(response)

  const data = await readJson(response);

  if (!response.ok || data?.ok === false) {
    const message = data?.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return normalizeRsvp(data);
};

export const fetchRsvp = async (code) => {
  assertApiConfigured();
  const trimmedCode = String(code || "").trim();
  const response = await fetch(`${RSVP_API_URL}?rsvp_code=${encodeURIComponent(trimmedCode)}`);
  const data = await readJson(response);
  console.log(data)

  if (!response.ok || data?.ok === false) {
    const message = data?.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  if (!hasRsvpPayload(data)) {
    throw new Error("RSVP code not found. Please check and try again.");
  }

  return normalizeRsvp(data);
};

export const submitRsvp = async ({ code, attendingSeats, note = "", isConfirmed = 1 }) => {
  return postRsvp({
    rsvp_code: String(code || "").trim(),
    seats_confirmed: Number(attendingSeats),
    special_notes: String(note || "").trim(),
    is_confirmed: Number(isConfirmed),
  });
};
