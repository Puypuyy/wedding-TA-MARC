import { useEffect, useMemo, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { invitationContent } from "../invitationContent";

const MotionBox = motion(Box);
const targetDate = new Date("2026-04-24T13:30:00");

const getCountdown = () => {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0) return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
};

const Invitation = ({ onRsvpClick }) => {
  const c = invitationContent;
  const [countdown, setCountdown] = useState(getCountdown);
  const countItems = useMemo(
    () => [
      { label: "Days", value: countdown.days },
      { label: "Hours", value: countdown.hours },
      { label: "Minutes", value: countdown.minutes },
      { label: "Seconds", value: countdown.seconds },
    ],
    [countdown],
  );

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        sx={{
          position: "relative",
          px: 2,
          py: 6,
          textAlign: "center",
        }}
      >
        <Box sx={{ borderRadius: "20px", p: 2.5, mb: 2.5, backgroundColor: "rgba(255,255,255,0.94)", border: "1px solid rgba(156,107,47,0.16)", boxShadow: "0 8px 18px rgba(0,0,0,0.05)" }}>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', letterSpacing: 2.5, color: "#A79C8E", textTransform: "uppercase", fontSize: "0.7rem", mb: 1.5 }}>
            Together with their families
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "2.55rem", color: "#9C6B2F", lineHeight: 1 }}>
            {c.names.first}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.05rem", color: "#7A5630", my: 0.6 }}>
            {c.names.conjunction}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "2.55rem", color: "#9C6B2F", lineHeight: 1 }}>
            {c.names.second}
          </Typography>
          <Typography sx={{ mt: 1.5, fontFamily: '"Cormorant Garamond", serif', color: "#7A5630", fontSize: "0.95rem" }}>
            {c.header}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', color: "#7A5630", fontSize: "1rem" }}>
            {c.tagline}
          </Typography>
        </Box>

        <Box sx={{ borderRadius: "20px", p: 2.2, mb: 2.5, backgroundColor: "rgba(255,255,255,0.94)", border: "1px solid rgba(156,107,47,0.16)", boxShadow: "0 8px 18px rgba(0,0,0,0.05)" }}>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', letterSpacing: 1.1, color: "#7A5630", fontSize: "1.08rem", mb: 0.3 }}>
            {c.date}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', color: "#7A5630", fontSize: "0.98rem", mb: 1.6 }}>
            {c.time}
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0.7 }}>
            {countItems.map((item) => (
              <Box key={item.label} sx={{ borderRadius: "10px", p: 0.7, backgroundColor: "#fff", border: "1px solid rgba(156,107,47,0.14)" }}>
                <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "0.95rem", color: "#9C6B2F" }}>{item.value}</Typography>
                <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "0.68rem", color: "#A79C8E", letterSpacing: 0.6 }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ borderRadius: "20px", p: 2.2, mb: 2.5, backgroundColor: "rgba(255,255,255,0.94)", border: "1px solid rgba(156,107,47,0.16)", boxShadow: "0 8px 18px rgba(0,0,0,0.05)" }}>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.1rem", color: "#7A5630", mb: 0.8 }}>
            {c.venue.name}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', color: "#A79C8E", mb: 1 }}>
            {c.venue.note}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', color: "#7A5630", fontStyle: "italic", fontSize: "1.02rem" }}>
            {c.footer}
          </Typography>
        </Box>

        <Button
          fullWidth
          onClick={onRsvpClick}
          variant="contained"
          sx={{
            py: 1.2,
            borderRadius: "999px",
            backgroundColor: "#9C6B2F",
            color: "#fff",
            fontFamily: '"Cormorant Garamond", serif',
            letterSpacing: 1.6,
            textTransform: "uppercase",
            "&:hover": { backgroundColor: "#7A5630" },
          }}
        >
          {c.cta}
        </Button>
      </MotionBox>
    </Box>
  );
};

export default Invitation;
