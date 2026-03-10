import { useEffect, useState } from "react";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fetchRsvp, submitRsvp } from "./rsvpApi";

const emptyState = {
  code: "",
  attendingSeats: "",
  note: "",
  validated: null,
  error: "",
  success: "",
  validating: false,
  submitting: false,
};

const RsvpDialog = ({ open, onClose, onViewDetails }) => {
  const [state, setState] = useState(emptyState);
  const isChecked = Boolean(state.validated);
  const isAlreadyConfirmed = Boolean(
    state.validated?.isConfirmed ||
      String(state.validated?.attendanceStatus || "").toLowerCase() === "confirmed" ||
      Number(state.validated?.confirmedSeats || 0) > 0,
  );

  useEffect(() => {
    if (!open) setState(emptyState);
  }, [open]);

  const setField = (field, value) =>
    setState((prev) => ({
      ...prev,
      [field]: value,
      error: "",
      success: "",
      ...(field === "code"
        ? {
            validated: null,
            attendingSeats: "",
            note: "",
          }
        : {}),
    }));

  const handleValidate = async () => {
    if (!state.code.trim()) {
      setState((prev) => ({ ...prev, error: "Please enter your RSVP code." }));
      return;
    }

    try {
      setState((prev) => ({ ...prev, validating: true, error: "", success: "" }));
      const data = await fetchRsvp(state.code);
      const reservedSeats = Number(data.reservedSeats || 0);
      const confirmedSeats = Number(data.confirmedSeats || 0);
      setState((prev) => ({
        ...prev,
        validating: false,
        validated: {
          guestName: data.guestName,
          reservedSeats,
          confirmedSeats,
          availableSeats: Math.max(reservedSeats - confirmedSeats, 0),
          attendanceStatus: data.attendanceStatus,
          status: data.status,
          isConfirmed: Boolean(data.isConfirmed),
        },
        attendingSeats: confirmedSeats > 0 ? String(confirmedSeats) : "",
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        validating: false,
        validated: null,
        error: error.message || "Could not validate RSVP code.",
      }));
    }
  };

  const handleSubmit = async () => {
    if (!state.validated) {
      setState((prev) => ({ ...prev, error: "Validate your RSVP code first." }));
      return;
    }

    const seats = Number(state.attendingSeats);
    if (!Number.isInteger(seats) || seats < 0) {
      setState((prev) => ({ ...prev, error: "Please enter a valid seat count." }));
      return;
    }
    if (seats > state.validated.reservedSeats) {
      setState((prev) => ({ ...prev, error: `Seats to attend must not be more than ${state.validated.reservedSeats}.` }));
      return;
    }

    try {
      setState((prev) => ({ ...prev, submitting: true, error: "", success: "" }));
      const data = await submitRsvp({
        code: state.code,
        attendingSeats: seats,
        note: state.note,
        isConfirmed: 1,
      });
      setState((prev) => ({
        ...prev,
        submitting: false,
        success: data.message || "Your RSVP has been recorded.",
        validated: {
          guestName: data.guestName || prev.validated.guestName,
          reservedSeats: Number(data.reservedSeats || prev.validated.reservedSeats),
          confirmedSeats: Number(data.confirmedSeats ?? seats),
          availableSeats: Math.max(Number(data.reservedSeats || prev.validated.reservedSeats) - Number(data.confirmedSeats ?? seats), 0),
          attendanceStatus: data.attendanceStatus || prev.validated.attendanceStatus,
          status: data.status || prev.validated.status,
          isConfirmed: Boolean(data.isConfirmed || Number(data.confirmedSeats ?? seats) > 0),
        },
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        submitting: false,
        error: error.message || "Failed to submit RSVP.",
      }));
    }
  };

  const handleNotAttending = async () => {
    if (!state.validated) return;
    try {
      setState((prev) => ({ ...prev, submitting: true, error: "", success: "" }));
      const data = await submitRsvp({
        code: state.code,
        attendingSeats: 0,
        note: state.note,
        isConfirmed: 0,
      });
      setState((prev) => ({
        ...prev,
        submitting: false,
        attendingSeats: "0",
        success: data.message || "Your RSVP has been recorded as not attending.",
        validated: {
          guestName: data.guestName || prev.validated.guestName,
          reservedSeats: Number(data.reservedSeats || prev.validated.reservedSeats),
          confirmedSeats: Number(data.confirmedSeats ?? 0),
          availableSeats: Math.max(Number(data.reservedSeats || prev.validated.reservedSeats) - Number(data.confirmedSeats ?? 0), 0),
          attendanceStatus: data.attendanceStatus || "Confirmed",
          status: data.status || prev.validated.status,
          isConfirmed: true,
        },
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        submitting: false,
        error: error.message || "Failed to submit RSVP.",
      }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          color: "#7A5630",
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: "2rem",
          pr: 6,
          position: "relative",
        }}
      >
        RSVP Confirmation
        <IconButton
          onClick={onClose}
          aria-label="Close RSVP dialog"
          sx={{
            position: "absolute",
            right: 12,
            top: 10,
            color: "#7A5630",
            border: "1px solid rgba(122,86,48,0.35)",
            backgroundColor: "rgba(255,255,255,0.9)",
            "&:hover": { backgroundColor: "rgba(122,86,48,0.1)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          {state.error ? <Alert severity="error">{state.error}</Alert> : null}
          {state.success ? <Alert severity="success">{state.success}</Alert> : null}

          <TextField
            label="RSVP Code"
            value={state.code}
            onChange={(e) => setField("code", e.target.value)}
            placeholder="Enter your code"
            fullWidth
          />

          <Button
            onClick={handleValidate}
            variant="outlined"
            disabled={state.validating}
            sx={{ borderColor: "#9C6B2F", color: "#7A5630", "&:hover": { borderColor: "#7A5630" } }}
          >
            {state.validating ? "Checking..." : "Check Code"}
          </Button>

          {isChecked ? (
            <Box sx={{ p: 2, border: "1px solid rgba(156,107,47,0.25)", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.8)" }}>
              <Typography sx={{ color: "#5D4E3C", fontSize: "1.1rem" }}>
                Guest: <strong>{state.validated.guestName}</strong>
              </Typography>
              <Typography sx={{ color: "#8B7355" }}>Reserved seats: {state.validated.reservedSeats}</Typography>
              <Typography sx={{ color: "#8B7355" }}>Seats confirmed: {state.validated.confirmedSeats}</Typography>
              <Typography sx={{ color: "#8B7355" }}>Available seats: {state.validated.availableSeats}</Typography>
              <Typography sx={{ color: "#8B7355" }}>Attendance status: {state.validated.attendanceStatus || "Pending"}</Typography>
              {isAlreadyConfirmed ? (
                <Alert severity="info" sx={{ mt: 1.2 }}>
                  This RSVP is already confirmed. Submission fields are disabled. For modifications, Contact Marc(09190758201) or Anna(09179032870)
                </Alert>
              ) : null}
            </Box>
          ) : null}

          {isChecked && !isAlreadyConfirmed ? (
            <>
              <TextField
                label="How many seats are attending?"
                type="number"
                value={state.attendingSeats}
                onChange={(e) => setField("attendingSeats", e.target.value)}
                inputProps={{ min: 0, max: state.validated?.reservedSeats ?? 0 }}
                disabled={!state.validated}
                fullWidth
              />

              <TextField
                label="Attendees and Message (optional)"
                value={state.note}
                onChange={(e) => setField("note", e.target.value)}
                multiline
                minRows={2}
                fullWidth
              />
            </>
          ) : null}
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          px: 3,
          pb: 2.2,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: { xs: "stretch", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 1, sm: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexDirection: { xs: "column", sm: "row" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Button
            onClick={onViewDetails}
            variant="contained"
            sx={{
              backgroundColor: "#7A5630",
              color: "#FDF8F2",
              fontWeight: 600,
              px: 2.2,
              width: { xs: "100%", sm: "auto" },
              "&:hover": { backgroundColor: "#5D4E3C" },
            }}
          >
            Open Invitation & Wedding Details
          </Button>
          {isChecked && !isAlreadyConfirmed ? (
            <>
              <Button
                onClick={handleNotAttending}
                variant="outlined"
                disabled={state.submitting}
                sx={{
                  borderColor: "#9C6B2F",
                  color: "#7A5630",
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": { borderColor: "#7A5630" },
                }}
              >
                {state.submitting ? "Submitting..." : "Not Attending"}
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={!state.validated || state.submitting}
                sx={{
                  backgroundColor: "#9C6B2F",
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": { backgroundColor: "#7A5630" },
                }}
              >
                {state.submitting ? "Submitting..." : "Confirm RSVP"}
              </Button>
            </>
          ) : null}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default RsvpDialog;
