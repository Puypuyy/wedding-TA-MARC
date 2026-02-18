import { useEffect, useState } from "react";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { submitRsvp, validateRsvpCode } from "./rsvpApi";

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

  useEffect(() => {
    if (!open) setState(emptyState);
  }, [open]);

  const setField = (field, value) => setState((prev) => ({ ...prev, [field]: value, error: "", success: "" }));

  const handleValidate = async () => {
    if (!state.code.trim()) {
      setState((prev) => ({ ...prev, error: "Please enter your RSVP code." }));
      return;
    }

    try {
      setState((prev) => ({ ...prev, validating: true, error: "", success: "" }));
      const data = await validateRsvpCode(state.code);
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
          status: data.status,
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
      setState((prev) => ({ ...prev, error: `You can only confirm up to ${state.validated.reservedSeats} seats.` }));
      return;
    }

    try {
      setState((prev) => ({ ...prev, submitting: true, error: "", success: "" }));
      const data = await submitRsvp({
        code: state.code,
        attendingSeats: seats,
        note: state.note,
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
          status: data.status || prev.validated.status,
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
      <DialogTitle sx={{ color: "#7A5630", fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "2rem" }}>
        RSVP Confirmation
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

          {state.validated ? (
            <Box sx={{ p: 2, border: "1px solid rgba(156,107,47,0.25)", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.8)" }}>
              <Typography sx={{ color: "#5D4E3C", fontSize: "1.1rem" }}>
                Guest: <strong>{state.validated.guestName}</strong>
              </Typography>
              <Typography sx={{ color: "#8B7355" }}>Reserved seats: {state.validated.reservedSeats}</Typography>
              <Typography sx={{ color: "#8B7355" }}>Already confirmed: {state.validated.confirmedSeats}</Typography>
            </Box>
          ) : null}

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
            label="Message (optional)"
            value={state.note}
            onChange={(e) => setField("note", e.target.value)}
            multiline
            minRows={2}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.2, display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onClose} sx={{ color: "#7A5630" }}>
          Close
        </Button>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            onClick={onViewDetails}
            variant="text"
            sx={{ color: "#7A5630" }}
          >
            View Details
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!state.validated || state.submitting}
            sx={{ backgroundColor: "#9C6B2F", "&:hover": { backgroundColor: "#7A5630" } }}
          >
            {state.submitting ? "Submitting..." : "Confirm RSVP"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default RsvpDialog;

