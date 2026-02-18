const RSVP_API_URL = import.meta.env.VITE_RSVP_API_URL;

const assertApiConfigured = () => {
  if (!RSVP_API_URL) {
    throw new Error("RSVP API is not configured. Set VITE_RSVP_API_URL in your .env file.");
  }
};

const postRsvp = async (payload) => {
  assertApiConfigured();
  const response = await fetch(RSVP_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok || !data?.ok) {
    const message = data?.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
};

export const validateRsvpCode = async (code) => {
  return postRsvp({
    action: "validate",
    code: String(code || "").trim(),
  });
};

export const submitRsvp = async ({ code, attendingSeats, note = "" }) => {
  return postRsvp({
    action: "submit",
    code: String(code || "").trim(),
    attendingSeats: Number(attendingSeats),
    note: String(note || "").trim(),
  });
};
