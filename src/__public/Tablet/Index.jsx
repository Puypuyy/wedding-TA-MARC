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
  borderRadius: "22px",
  backgroundColor: "rgba(255,255,255,0.94)",
  boxShadow: "0 10px 24px rgba(0,0,0,0.05)",
  border: "1px solid rgba(156,107,47,0.15)",
  p: 3,
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
          maxWidth: 700,
          mx: "auto",
          px: 3,
          py: 8,
          textAlign: "center",
        }}
      >
        <Box sx={{ ...cardSx, mb: 3 }}>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', letterSpacing: 3, color: "#A79C8E", textTransform: "uppercase", fontSize: "0.76rem", mb: 2 }}>
            Together with their families
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "3.3rem", color: "#9C6B2F", lineHeight: 1 }}>
            {c.names.first}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.2rem", color: "#7A5630", my: 1 }}>
            {c.names.conjunction}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "3.3rem", color: "#9C6B2F", lineHeight: 1 }}>
            {c.names.second}
          </Typography>
          <Typography sx={{ mt: 2.2, fontFamily: '"Cormorant Garamond", serif', color: "#7A5630" }}>
            {c.header}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.08rem", color: "#7A5630" }}>
            {c.tagline}
          </Typography>
        </Box>

        <Box sx={{ ...cardSx, mb: 3 }}>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', letterSpacing: 1.6, color: "#7A5630", fontSize: "1.4rem" }}>
            {c.date}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', color: "#7A5630", fontSize: "1.08rem", mb: 2.2 }}>
            {c.time}
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1 }}>
            {countItems.map((item) => (
              <Box key={item.label} sx={{ borderRadius: "12px", p: 1, backgroundColor: "#fff", border: "1px solid rgba(156,107,47,0.14)" }}>
                <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.15rem", color: "#9C6B2F" }}>{item.value}</Typography>
                <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "0.74rem", color: "#A79C8E", letterSpacing: 1 }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ ...cardSx, mb: 3 }}>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.3rem", color: "#7A5630", mb: 1 }}>
            {c.venue.name}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', color: "#A79C8E", mb: 1.3 }}>
            {c.venue.note}
          </Typography>
          <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', color: "#7A5630", fontStyle: "italic" }}>
            {c.footer}
          </Typography>
        </Box>

        <Button
          onClick={onRsvpClick}
          variant="contained"
          sx={{
            px: 4,
            py: 1.25,
            borderRadius: "999px",
            backgroundColor: "#9C6B2F",
            color: "#fff",
            fontFamily: '"Cormorant Garamond", serif',
            letterSpacing: 2,
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
