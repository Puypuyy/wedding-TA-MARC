import { Box } from "@mui/material";
import flowerBg from "../../assets/bgs/flower-bg.png";
import paperBg from "../../assets/bgs/paper-bg.png";

const RomanticBackdrop = () => {
  return (
    <Box sx={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(135deg, rgba(250,247,244,0.98) 0%, rgba(245,235,224,0.96) 50%, rgba(237,228,216,0.98) 100%), url(${paperBg})`,
          backgroundSize: "cover, 900px",
          backgroundPosition: "center",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.16,
          backgroundImage: `url(${flowerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "multiply",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 10% 12%, rgba(201,160,117,0.12) 0%, transparent 38%), radial-gradient(circle at 88% 82%, rgba(143,175,154,0.1) 0%, transparent 40%)",
        }}
      />
    </Box>
  );
};

export default RomanticBackdrop;
