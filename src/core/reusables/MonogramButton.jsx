import { IconButton, Box } from "@mui/material";
import { motion } from "framer-motion";
import initialsPng from "../../assets/bgs/amicon.png"

const MotionIconButton = motion(IconButton);

const MonogramImageButton = ({ onClick }) => {
  return (
    <MotionIconButton
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      sx={{
        width: 76,
        height: 76,
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,0.92)",
        boxShadow: "0 10px 24px rgba(0,0,0,0.25)",
        border: "1.5px solid",
        borderColor: "primary.main",
        p: 0,
        "&:hover": {
          backgroundColor: "rgba(255,255,255,1)",
        },
      }}
    >
      <Box
        component="img"
        src={initialsPng}
        alt="RSVP"
        sx={{
          width: "55%",
          height: "55%",
          objectFit: "contain",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </MotionIconButton>
  );
};

export default MonogramImageButton;
