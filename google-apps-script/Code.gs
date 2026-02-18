/**
 * Google Apps Script RSVP API
 *
 * Sheet name: Guests
 * Required header columns (row 1):
 * code | guest_name | reserved_seats | confirmed_seats | status | submitted_at | note
 */

const SHEET_NAME = "Guests";

function doGet() {
  return jsonResponse({
    ok: true,
    message: "RSVP API is running.",
    date: new Date().toISOString(),
  });
}

function doPost(e) {
  try {
    const payload = parsePayload(e);
    const action = String(payload.action || "").trim().toLowerCase();

    if (action === "validate") {
      return handleValidate(payload);
    }
    if (action === "submit") {
      return handleSubmit(payload);
    }

    return jsonResponse({ ok: false, error: "Unsupported action." });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: error && error.message ? error.message : "Unexpected server error.",
    });
  }
}

function handleValidate(payload) {
  const code = normalizeCode(payload.code);
  if (!code) return jsonResponse({ ok: false, error: "RSVP code is required." });

  const { rowIndex, record } = findByCode(code);
  if (!rowIndex) return jsonResponse({ ok: false, error: "Invalid RSVP code." });

  return jsonResponse({
    ok: true,
    guestName: record.guest_name,
    reservedSeats: Number(record.reserved_seats || 0),
    confirmedSeats: Number(record.confirmed_seats || 0),
    status: record.status || "pending",
  });
}

function handleSubmit(payload) {
  const code = normalizeCode(payload.code);
  const attendingSeats = Number(payload.attendingSeats);
  const note = String(payload.note || "").trim();

  if (!code) return jsonResponse({ ok: false, error: "RSVP code is required." });
  if (!Number.isInteger(attendingSeats) || attendingSeats < 0) {
    return jsonResponse({ ok: false, error: "Invalid attending seat count." });
  }

  const { rowIndex, record, sheet, headerMap } = findByCode(code);
  if (!rowIndex) return jsonResponse({ ok: false, error: "Invalid RSVP code." });

  const reservedSeats = Number(record.reserved_seats || 0);
  if (attendingSeats > reservedSeats) {
    return jsonResponse({
      ok: false,
      error: "Attending seats cannot exceed reserved seats.",
    });
  }

  const status = attendingSeats === 0 ? "declined" : attendingSeats === reservedSeats ? "confirmed" : "partial";
  const submittedAt = new Date();

  // +1 because sheet columns are 1-based.
  sheet.getRange(rowIndex, headerMap.confirmed_seats + 1).setValue(attendingSeats);
  sheet.getRange(rowIndex, headerMap.status + 1).setValue(status);
  sheet.getRange(rowIndex, headerMap.submitted_at + 1).setValue(submittedAt);
  sheet.getRange(rowIndex, headerMap.note + 1).setValue(note);

  return jsonResponse({
    ok: true,
    message: "RSVP saved successfully.",
    guestName: record.guest_name,
    reservedSeats: reservedSeats,
    confirmedSeats: attendingSeats,
    status: status,
  });
}

function findByCode(code) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Sheet "' + SHEET_NAME + '" was not found.');

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) throw new Error("Sheet has no guest rows.");

  const headers = values[0].map(function (h) {
    return String(h || "").trim().toLowerCase();
  });

  const required = ["code", "guest_name", "reserved_seats", "confirmed_seats", "status", "submitted_at", "note"];
  required.forEach(function (key) {
    if (headers.indexOf(key) === -1) {
      throw new Error("Missing required column: " + key);
    }
  });

  const headerMap = {};
  headers.forEach(function (key, idx) {
    headerMap[key] = idx;
  });

  for (var i = 1; i < values.length; i += 1) {
    var row = values[i];
    var rowCode = normalizeCode(row[headerMap.code]);
    if (rowCode === code) {
      return {
        rowIndex: i + 1,
        sheet: sheet,
        headerMap: headerMap,
        record: {
          code: row[headerMap.code],
          guest_name: row[headerMap.guest_name],
          reserved_seats: row[headerMap.reserved_seats],
          confirmed_seats: row[headerMap.confirmed_seats],
          status: row[headerMap.status],
          submitted_at: row[headerMap.submitted_at],
          note: row[headerMap.note],
        },
      };
    }
  }

  return { rowIndex: 0, record: null, sheet: sheet, headerMap: headerMap };
}

function parsePayload(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("Missing request body.");
  }
  return JSON.parse(e.postData.contents);
}

function normalizeCode(value) {
  return String(value || "").trim().toUpperCase();
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

