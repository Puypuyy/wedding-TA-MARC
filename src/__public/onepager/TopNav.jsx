import { Box, Button } from "@mui/material";
import { navItems } from "./onepagerContent";

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const TopNav = ({ onBackToInvitation, backToInvitationLabel, isMobile }) => {
  return (
    <Box
      component="nav"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        width: "100%",
        background: "rgba(253, 251, 251, 0.98)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid",
        borderColor: "primary.light",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1,
        py: 1,
        px: isMobile ? 1.5 : 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          overflowX: "auto",
          flex: 1,
          minWidth: 0,
          "&::-webkit-scrollbar": { height: 4 },
        }}
      >
        {navItems.map(({ id, label }) => (
          <Button
            key={id}
            onClick={() => scrollToSection(id)}
            sx={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: isMobile ? "0.8rem" : "0.9rem",
              fontWeight: 500,
              color: "text.primary",
              textTransform: "none",
              minWidth: "auto",
              px: isMobile ? 1 : 1.5,
              py: 0.75,
              whiteSpace: "nowrap",
              "&:hover": {
                color: "primary.main",
                backgroundColor: "primary.light",
              },
            }}
          >
            {label}
          </Button>
        ))}
      </Box>
      <Button
        variant="outlined"
        size="small"
        onClick={onBackToInvitation}
        sx={{
          borderColor: "primary.main",
          color: "primary.main",
          textTransform: "none",
          borderRadius: 50,
          fontSize: isMobile ? "0.75rem" : "0.85rem",
          flexShrink: 0,
          "&:hover": { borderColor: "primary.dark", backgroundColor: "primary.light" },
        }}
      >
        {backToInvitationLabel}
      </Button>
    </Box>
  );
};
