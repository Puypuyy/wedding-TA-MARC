import { Box, Typography, Button, Divider } from "@mui/material";
import { motion } from "framer-motion";
import paperbg from "../../assets/bgs/paper-bg.png";
import tamarc from "../../assets/bgs/tamarc2.jpg";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const Invitation = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",

        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(0,0,0,0.65) 0%,
            rgba(0,0,0,0.35) 15%,
            rgba(0,0,0,0.1) 30%,
            rgba(0,0,0,0) 100%
          ),
          url(${tamarc})
        `,
        backgroundSize: "cover",
        backgroundPosition: "50% center",
        backgroundRepeat: "no-repeat",

        display: "flex",
        alignItems: "center",
        justifyContent: {
          xs: "center",
          md: "flex-start",
        },

        px: { xs: 4, md: 12 },
      }}
    >
      {/* Invitation Card */}
      <MotionBox
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        sx={{
          maxWidth: 700,
          width: "100%",

          backgroundImage: `url(${paperbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

          borderRadius: 1,
          p: { xs: 4, md: 6 },
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        {/* Header */}
        <MotionTypography
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          sx={{
            fontFamily: "Playfair Display, serif",
            letterSpacing: 3,
            color: "#9c7c38",
            mb: 1,
          }}
        >
          YOU ARE INVITED
        </MotionTypography>

        <Divider sx={{ my: 2 }} />

        {/* Names */}
        <MotionTypography
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          sx={{
            fontFamily: "Playfair Display, serif",
            fontSize: { xs: "2.3rem", md: "3rem" },
            fontWeight: 600,
          }}
        >
          John & Maria
        </MotionTypography>

        <Typography sx={{ mt: 1, mb: 3, color: "text.secondary" }}>
          are getting married
        </Typography>

        {/* Animated Divider */}
        <MotionBox
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          sx={{
            height: 2,
            backgroundColor: "#9c7c38",
            mx: "auto",
            mb: 3,
          }}
        />

        {/* Details */}
        <Typography sx={{ fontSize: "1.1rem", mb: 1 }}>
          Saturday, the 20th of July 2026
        </Typography>
        <Typography sx={{ fontSize: "1.1rem", mb: 3 }}>
          at 3:00 in the afternoon
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 4 }}>
          The Grand Garden Hall
          <br />
          Tagaytay City, Philippines
        </Typography>

        {/* RSVP Button */}
        <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#9c7c38",
              px: 5,
              py: 1.5,
              borderRadius: 50,
              fontSize: "1rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#8b6e30",
              },
            }}
          >
            RSVP Now
          </Button>
        </MotionBox>

        {/* Footer */}
        <Typography
          sx={{
            mt: 5,
            fontSize: "0.85rem",
            color: "text.secondary",
          }}
        >
          We look forward to celebrating with you
        </Typography>
      </MotionBox>
    </Box>
  );
};

export default Invitation;
