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

const cardSx = {
  borderRadius: "24px",
  backgroundColor: "rgba(255,255,255,0.92)",
  boxShadow: "0 14px 32px rgba(0,0,0,0.06)",
  border: "1px solid rgba(156,107,47,0.16)",
  p: 4,
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
        transition={{ duration: 0.8 }}
        sx={{
          position: "relative",
          maxWidth: 860,
          mx: "auto",
          px: 4,
          py: 10,
          textAlign: "center",
        }}
      >
        <Box sx={{ ...cardSx, mb: 4 }}>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', letterSpacing: 4, color: "#A79C8E", textTransform: "uppercase", fontSize: "0.82rem", mb: 3 }}>
            Together with their families
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: { xs: "3rem", md: "4.2rem" }, color: "#9C6B2F", lineHeight: 1 }}>
            {c.names.first}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.4rem", color: "#7A5630", my: 1.2 }}>
            {c.names.conjunction}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: { xs: "3rem", md: "4.2rem" }, color: "#9C6B2F", lineHeight: 1 }}>
            {c.names.second}
          </Typography>
          <Typography sx={{ mt: 3, fontFamily: '"Cormorant Garamond", serif', fontSize: "1.15rem", color: "#7A5630" }}>
            {c.header}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.2rem", color: "#7A5630" }}>
            {c.tagline}
          </Typography>
        </Box>

        <Box sx={{ ...cardSx, mb: 4 }}>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', letterSpacing: 2, color: "#7A5630", fontSize: "1.8rem", mb: 1 }}>
            {c.date}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', color: "#7A5630", fontSize: "1.2rem", mb: 3 }}>
            {c.time}
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1.5 }}>
            {countItems.map((item) => (
              <Box key={item.label} sx={{ borderRadius: "14px", p: 1.3, backgroundColor: "#FFFFFF", border: "1px solid rgba(156,107,47,0.14)" }}>
                <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.4rem", color: "#9C6B2F" }}>{item.value}</Typography>
                <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "0.86rem", color: "#A79C8E", letterSpacing: 1 }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ ...cardSx, mb: 4 }}>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.6rem", color: "#7A5630", mb: 1.2 }}>
            {c.venue.name}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.1rem", color: "#A79C8E", mb: 2 }}>
            {c.venue.note}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.25rem", color: "#7A5630", fontStyle: "italic", maxWidth: 620, mx: "auto" }}>
            {c.footer}
          </Typography>
        </Box>

        <Button
          onClick={onRsvpClick}
          variant="contained"
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: "999px",
            backgroundColor: "#9C6B2F",
            color: "#fff",
            fontFamily: '"Cormorant Garamond", serif',
            letterSpacing: 2,
            fontSize: "0.95rem",
            textTransform: "uppercase",
            "&:hover": { backgroundColor: "#7A5630", transform: "translateY(-2px)" },
          }}
        >
          {c.cta}
        </Button>
      </MotionBox>
    </Box>
  );
};

export default Invitation;
