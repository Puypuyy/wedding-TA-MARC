import { useMediaQuery } from "@mui/material";
import OnepagerDesktop from "./Desktop/Index";
import OnepagerTablet from "./Tablet/Index";
import OnepagerMobile from "./Mobile/Index";

/**
 * Responsive one-pager: Desktop (md+), Tablet (sm-md), Mobile (xs).
 */
const OnepagerResponsive = ({ onBackToInvitation }) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isTablet = useMediaQuery((theme) => theme.breakpoints.between("sm", "md"));

  if (isDesktop) return <OnepagerDesktop onBackToInvitation={onBackToInvitation} />;
  if (isTablet) return <OnepagerTablet onBackToInvitation={onBackToInvitation} />;
  return <OnepagerMobile onBackToInvitation={onBackToInvitation} />;
};

export default OnepagerResponsive;
