import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import ChurchOutlinedIcon from "@mui/icons-material/ChurchOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const MotionBox = motion(Box);

const weddingStatic = {
  couple: "Rendon ~ Nepomuceno Nuptial",
  date: "Saturday, April 25, 2026",
  backToInvitation: "Back to Invitation",
  pages: {
    welcome: {
      title: "Welcome",
      preview: "A graceful beginning to our celebration.",
      icon: SpaOutlinedIcon,
      quote: "Nine years of love, captured in a few moments. Here’s a look at Marc and Anna’s story, shared with the friends and family who have been there since the beginning. 🩷",
      hero: "An Evening of Vows, Elegance, and Celebration",
      venue: "Garden Estate, Tuscany",
      details: [
        "Ceremony and reception crafted as one flowing experience.",
        "A classic formal ambiance inspired by old-world romance.",
        "Every moment designed to honor love, family, and tradition.",
      ],
      gallery: [
        { caption: "First Date", image: "/images/welcome-photos/MCP-2.jpg", tone: "linear-gradient(135deg, #c9b8a8 0%, #a89080 100%)" },
        { caption: "Adventure Together", image: "/images/welcome-photos/MCP-6.jpg", tone: "linear-gradient(135deg, #d4c4b4 0%, #b8a898 100%)" },
        { caption: "The Proposal", image: "/images/welcome-photos/MCP-15.jpg", tone: "linear-gradient(135deg, #bfaf9f 0%, #9f8f7f 100%)" },
        { caption: "Sunset Walk", image: "/images/welcome-photos/MCP-34.jpg", tone: "linear-gradient(135deg, #cdbfaf 0%, #ad9f8f 100%)" },
        { caption: "Our Engagement", image: "/images/welcome-photos/MCP-49 (2).jpg", tone: "linear-gradient(135deg, #c4b4a4 0%, #a49484 100%)" },
        { caption: "Forever Begins", image: "/images/welcome-photos/MCP-2.jpg", tone: "linear-gradient(135deg, #d9c9b9 0%, #b9a999 100%)" },
      ],
    },
    schedule: {
      title: "Schedule of Events",
      preview: "A curated flow from vows to afterglow.",
      icon: EventOutlinedIcon,
      hero: "Timeline of the Celebration",
      items: [
        { time: "12:30 PM", event: "Guests arrival at church", note: "" },
        { time: "12:45 PM", event: "Lining up of entourage and sponsors", note: "" },
        { time: "1:00 PM", event: "Start of procession", note: "" },
        { time: "1:30 PM", event: "Start of ceremony", note: "" },
        { time: "2:30 PM", event: "Photoshoot inside the church", note: "" },
        { time: "3:00 PM", event: "Postnup of couple and entourage at church", note: "" },
        { time: "4:00 PM", event: "Start of cocktail hour", note: "" },
        { time: "5:00 PM", event: "Reception time", note: "Quick program and dinner." },
      ],
    },
    // travel: {
    //   title: "Travel",
    //   preview: "Arrive comfortably, celebrate fully.",
    //   icon: FlightTakeoffOutlinedIcon,
    //   hero: "Travel and Stay",
    //   details: [
    //     "Luxury hotel blocks are arranged near the venue district.",
    //     "Shuttle transfer windows will be shared with confirmed guests.",
    //     "Private parking and valet services are available on-site.",
    //   ],
    //   cards: [
    //     { title: "Airport Transfer", note: "Dedicated premium transfer options available." },
    //     { title: "Hotel Partners", note: "Curated accommodations with wedding guest rates." },
    //     { title: "Guest Concierge", note: "Personal assistance for itinerary coordination." },
    //   ],
    // },
    details: {
      title: "Wedding Details",
      preview: "Refined dress, etiquette, and celebration notes.",
      icon: ChurchOutlinedIcon,
      hero: "Together with their loving parents",
      parents: [
        "Mr. Alex Realuyo Rendon",
        "Mrs. Marissa De Vera Rendon",
        "Mr. Angelito De Jesus Nepomuceno",
        "Mrs. Rebecca Estella Nepomuceno",
      ],
      principalSponsors: [
        "Mr. Ronnel C. Gacula",
        "Mr. Eliel Josiah J. Villegas",
        "Mr. Roderick R. Villanueva",
        "Mr. Napoleon V. Aquino Sr.",
        "Mr. Hadji M. Tejada",
        "Mr. Sergio L. Haveria",
        "Mr. Joselito M. Francisco",
        "Mr. James D. Bernardo",
        "Mr. Agustin C. Soriano",
        "Mrs. Charlete Karl T. Labrador",
        "Mrs. Sarrah Joy Magadalene G. Villegas",
        "Mrs. Maria Cristina S. Dematera",
        "Mrs. Lanie S. Aquino",
        "Mrs. Michelle S. Tejada",
        "Mrs. Lilia D. Haveria",
        "Mrs. Celeste A. Marco",
        "Mrs. Jocelyn F. Lejano",
        "Mrs. Emelita R. Soriano",
      ],
      entourage: {
        maidOfHonor: "Ms. Angelica Mae E. Nepomuceno",
        matronOfHonor: "Mrs. Contessa P. Borja",
        bestMan: "Mr. Czaremar Y. Apit",
      },
      secondarySponsors: {
        Candle: ["Ms. Hariam Dorenna Z. Lijauco", "Mr. John Patrick Oblina"],
        Cord: ["Ms. Katrina Angela O. Yabut", "Mr. Joseph Russel Clemente"],
        Arrhae: ["Ms. Carmina Ann Felix", "Mr. Patrick Edison Uy"],
        Veil: ["Ms. Erica Mae G. Capatayan", "Mr. Arvin Cayabyab"],
        Bible: ["Ms. Akemi Inabayashi", "Mr. Joseph Jongko"],
        "Ring Bearer": ["Ms. Viona Mariz Joy D. Rendon", "Mr. Alexis Mari D. Rendon", "ft. Roshi"],
      },
      bridesmaids: [
        "Ms. Joefcelyn C. Parejo",
        "Ms. Jessy Ruth Caballero",
        "Ms. Angelica B. Quioyo",
        "Ms. Mary Cathlene Nicole Poniado",
      ],
      groomsmen: [
        "Mr. Mike Lawrence Malapajo",
        "Mr. Napoleon Aquino Jr.",
        "Mr. Jasper Jay T. Bumatay",
      ],
      guestGuide: {
        dressCode: [
          "We kindly request our guests to attend in formal evening attire.",
          "Gentlemen: Any suit with an inner shirt in a shade from the color palette.",
          "Ladies: Floor-length gown from the color palette. Floral gowns are welcome!",
        ],
        paletteGuests: ["#056385", "#b1ddf1", "#d1edfb", "#e9c50e", "#b0bf81"],
        paletteSponsors: ["#f6e7d7", "#d6c7b5", "#c9c9c9"],
        notes: [
          "We adore your little ones, but we kindly ask that our wedding be an adult-only celebration. We completely understand if you're unable to join us should no one be available to look after them - we'll be celebrating with you in spirit.",
          "UNPLUGGED CEREMONY\nWe've hired some amazing photographers to capture our best angles - so sit back, relax, and enjoy the moment with us! Kindly refrain from taking photos during the ceremony and let the professionals work their magic.",
          "GIFTS\nYour love, prayers, and presence on our special day mean the world to us. We already feel so blessed to be celebrating our dream wedding with you. Should you wish to give a gift, we would deeply appreciate a monetary one to help us begin our new journey together.",
        ],
      },
      howToGetThere: [
        {
          label: "Church",
          venue: "Diocesan Shrine and Parish of Saint Pio of Pietrelcina (formerly known as San Pedro Calungsod Parish)",
          address: "106 Sumulong Hwy, Antipolo, 1870 Rizal",
          pinLocation: "J49X+9F Antipolo, Rizal",
          image: "/images/map/parish.jpg",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Diocesan+Shrine+and+Parish+of+Saint+Pio+of+Pietrelcina+Antipolo",
          embedUrl: "https://www.google.com/maps?q=Diocesan%20Shrine%20and%20Parish%20of%20Saint%20Pio%20of%20Pietrelcina%20Antipolo&output=embed",
        },
        {
          label: "Reception",
          venue: "Fernwood Gardens Antipolo",
          address: "106 Sumulong Hwy, Antipolo, 1870 Rizal",
          pinLocation: "J49X+9F Antipolo, Rizal",
          image: "/images/map/fernwood.jpg",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Fernwood+Gardens+Antipolo",
          embedUrl: "https://www.google.com/maps?q=Fernwood%20Gardens%20Antipolo&output=embed",
        },
      ],
    },
    photos: {
      title: "Prenup Photos",
      preview: "Portraits, memories, and after-wedding gallery.",
      icon: PhotoCameraOutlinedIcon,
      hero: "Moments We Will Treasure",
      details: [
        "A professional gallery link will be delivered after the wedding.",
        "A live portrait wall will be available during the reception.",
        "Couple and family portraits follow immediately after the ceremony.",
      ],
      cards: [
        {
          title: "Engagement Portraits",
          note: "Signature portraits from our pre-wedding session.",
          image: "/images/photos/MCP-1.jpg",
          tone: "linear-gradient(135deg, #cbb8a7 0%, #ab9583 100%)",
        },
        {
          title: "Ceremony Frames",
          note: "The aisle, vows, and ring exchange highlights.",
          image: "/images/photos/MCP-11.jpg",
          tone: "linear-gradient(135deg, #cbb8a7 0%, #ab9583 100%)",
        },
        {
          title: "Reception Highlights",
          note: "Toasts, dances, and evening celebration moments.",
          image: "/images/photos/MCP-13.jpg",
          tone: "linear-gradient(135deg, #cbb8a7 0%, #ab9583 100%)",
        },
      ],
    },
  },
};

const desktopPositions = [
  { top: "6%", left: "4%", rotate: "-6deg", zIndex: 6 },
  { top: "2%", left: "36%", rotate: "3deg", zIndex: 7 },
  { top: "8%", right: "4%", rotate: "-4deg", zIndex: 5 },
  { bottom: "8%", left: "8%", rotate: "5deg", zIndex: 3 },
  { bottom: "5%", left: "38%", rotate: "-2deg", zIndex: 8 },
  { bottom: "10%", right: "6%", rotate: "6deg", zIndex: 4 },
];

const tabletPositions = [
  { top: "6%", left: "4%", rotate: "-4deg", zIndex: 6 },
  { top: "3%", left: "36%", rotate: "2deg", zIndex: 7 },
  { top: "8%", right: "4%", rotate: "-3deg", zIndex: 5 },
  { bottom: "10%", left: "8%", rotate: "4deg", zIndex: 3 },
  { bottom: "7%", left: "38%", rotate: "-2deg", zIndex: 8 },
  { bottom: "11%", right: "6%", rotate: "5deg", zIndex: 4 },
];

const sparkleStyles = [
  { top: "10%", left: "15%", delay: 0 },
  { top: "18%", right: "16%", delay: 0.45 },
  { top: "62%", left: "8%", delay: 0.95 },
  { bottom: "30%", right: "14%", delay: 1.45 },
  { bottom: "14%", left: "26%", delay: 1.95 },
];

const paperSx = {
  background: "linear-gradient(145deg, #FFFFFF 0%, #FAF7F3 100%)",
  border: "1px solid rgba(201,160,117,0.3)",
  borderRadius: "8px",
  boxShadow: "0 16px 35px rgba(0,0,0,0.11)",
};

const slugFromHash = () => {
  const slug = window.location.hash.replace("#", "");
  return weddingStatic.pages[slug] ? slug : null;
};

const uploadedPhotos = Object.entries(
  import.meta.glob("../../../public/images/photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}", {
    eager: true,
    import: "default",
  }),
)
  .filter(([filePath]) => {
    const fileName = (filePath.split("/").pop() || "").toLowerCase();
    return !fileName.startsWith("churchbg.");
  })
  .map(([filePath, assetUrl]) => {
    const fileName = filePath.split("/").pop() || "Photo";
    const title = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ").trim();
    return {
      title,
      image: assetUrl,
      note: "Uploaded photo",
      tone: "linear-gradient(135deg, #cbb8a7 0%, #ab9583 100%)",
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: "base" }));

const uploadedWelcomePhotoGroups = (() => {
  const byFolder = new Map();
  const entries = Object.entries(
    import.meta.glob("../../../public/images/welcome-photos/**/*.{jpg,jpeg,png,webp,avif,heic,JPG,JPEG,PNG,WEBP,AVIF,HEIC}", {
      eager: true,
      import: "default",
    }),
  );

  entries.forEach(([filePath, assetUrl]) => {
    const normalizedPath = filePath.replace(/\\/g, "/");
    const marker = "public/images/welcome-photos/";
    const markerIndex = normalizedPath.indexOf(marker);
    if (markerIndex < 0) return;

    const relativePath = normalizedPath.slice(markerIndex + marker.length);
    const pathParts = relativePath.split("/").filter(Boolean);
    if (pathParts.length < 2) return;

    const folderName = pathParts[0];
    const fileName = pathParts[pathParts.length - 1];
    const photoTitle = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ").trim() || "Photo";
    if (!byFolder.has(folderName)) {
      byFolder.set(folderName, []);
    }

    byFolder.get(folderName).push({
      title: photoTitle,
      image: assetUrl,
      tone: "linear-gradient(135deg, #c9b8a8 0%, #a89080 100%)",
    });
  });

  const sortedFolders = [...byFolder.entries()]
    .map(([folderName, photos]) => {
      const sortedPhotos = photos.sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: "base" }));
      return {
        folderName,
        caption: folderName,
        tone: "linear-gradient(135deg, #c9b8a8 0%, #a89080 100%)",
        coverImage: sortedPhotos[0]?.image || null,
        photos: sortedPhotos,
      };
    })
    .sort((a, b) => {
      const aIsGettingToKnow = a.folderName.trim().toLowerCase() === "getting to know";
      const bIsGettingToKnow = b.folderName.trim().toLowerCase() === "getting to know";
      if (aIsGettingToKnow && !bIsGettingToKnow) return -1;
      if (!aIsGettingToKnow && bIsGettingToKnow) return 1;

      const aYear = Number.parseInt(a.folderName, 10);
      const bYear = Number.parseInt(b.folderName, 10);
      const aIsYear = Number.isInteger(aYear) && String(aYear) === a.folderName;
      const bIsYear = Number.isInteger(bYear) && String(bYear) === b.folderName;
      if (aIsYear && bIsYear) return aYear - bYear;
      if (aIsYear) return -1;
      if (bIsYear) return 1;
      return a.folderName.localeCompare(b.folderName, undefined, { numeric: true, sensitivity: "base" });
    });

  return sortedFolders;
})();

const resolvePublicImage = (path) => {
  if (!path) return null;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
};

const PageCard = ({ page, isMobile, isTablet, styleSx, onClick }) => {
  const IconComp = page.icon;
  return (
    <MotionBox whileHover={{ y: -6, scale: 1.02 }} onClick={onClick} sx={{ ...paperSx, cursor: "pointer", ...styleSx }}>
      <Box sx={{ color: "#C9A075", mb: 0.8, lineHeight: 1 }}>
        <IconComp sx={{ fontSize: isMobile ? "1.8rem" : isTablet ? "2rem" : "2.3rem" }} />
      </Box>
      <Typography sx={{ color: "#5D4E3C", fontSize: isMobile ? "1.35rem" : isTablet ? "1.5rem" : "1.8rem", mb: 0.8 }}>
        {page.title}
      </Typography>
      <Typography sx={{ color: "#8B7355", fontSize: isMobile ? "0.9rem" : isTablet ? "0.92rem" : "1rem", lineHeight: 1.35 }}>
        {page.preview}
      </Typography>
    </MotionBox>
  );
};

const WelcomeDetailPage = ({ page, onBackToCards }) => {
  const [activeFolder, setActiveFolder] = useState(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const preloadedWelcomeImagesRef = useRef(new Set());
  const desktopFolderLayout = [
    { left: "2%", top: "2%", rotate: "-6deg", zIndex: 5 },
    { left: "22%", top: "0%", rotate: "4deg", zIndex: 6 },
    { left: "42%", top: "4%", rotate: "-3deg", zIndex: 4 },
    { right: "14%", top: "2%", rotate: "5deg", zIndex: 7 },
    { right: "1%", top: "8%", rotate: "-4deg", zIndex: 5 },
    { left: "8%", top: "43%", rotate: "5deg", zIndex: 7 },
    { left: "30%", top: "40%", rotate: "-2deg", zIndex: 5 },
    { left: "52%", top: "47%", rotate: "3deg", zIndex: 6 },
    { right: "18%", top: "43%", rotate: "-5deg", zIndex: 4 },
    { right: "2%", top: "50%", rotate: "4deg", zIndex: 6 },
  ];
  const folderCards = useMemo(() => {
    if (uploadedWelcomePhotoGroups.length) return uploadedWelcomePhotoGroups;
    return (page.gallery || []).map((photo) => ({
      folderName: photo.caption,
      caption: photo.caption,
      tone: photo.tone,
      coverImage: photo.image ? resolvePublicImage(photo.image) : null,
      photos: [
        {
          title: photo.caption,
          image: photo.image ? resolvePublicImage(photo.image) : null,
          tone: photo.tone,
        },
      ],
    }));
  }, [page.gallery]);
  const activeFolderPhotos = activeFolder === null ? [] : folderCards[activeFolder]?.photos || [];
  const canUseDesktopScatter = folderCards.length > 0 && folderCards.length <= desktopFolderLayout.length;

  const movePhoto = (direction) => {
    if (!activeFolderPhotos.length) return;
    setActivePhoto((prev) => (prev + direction + activeFolderPhotos.length) % activeFolderPhotos.length);
  };

  useEffect(() => {
    if (!activeFolderPhotos.length) return;
    const wrapIndex = (idx) => (idx + activeFolderPhotos.length) % activeFolderPhotos.length;
    const preloadIndices = [activePhoto, wrapIndex(activePhoto - 1), wrapIndex(activePhoto + 1), wrapIndex(activePhoto + 2)];

    preloadIndices.forEach((idx) => {
      const src = activeFolderPhotos[idx]?.image;
      if (!src || preloadedWelcomeImagesRef.current.has(src)) return;
      const img = new Image();
      img.src = src;
      preloadedWelcomeImagesRef.current.add(src);
    });
  }, [activeFolderPhotos, activePhoto]);

  return (
    <MotionBox initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} sx={{ minHeight: "100vh", px: { xs: 2, md: 4 }, py: 3 }}>
      <Box sx={{ maxWidth: 1120, mx: "auto" }}>
        <Box sx={{ ...paperSx, p: { xs: 2.2, md: 4 }, border: "1.5px solid rgba(201,160,117,0.35)" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Button onClick={onBackToCards} startIcon={<KeyboardBackspaceOutlinedIcon />} sx={{ color: "#7A5630" }}>
              Back to Pages
            </Button>
            <Typography sx={{ color: "#8B7355", letterSpacing: 1.3, fontSize: "0.8rem", textTransform: "uppercase" }}>
              {weddingStatic.date}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography sx={{ color: "#5D4E3C", fontSize: { xs: "2.2rem", md: "4rem" }, fontStyle: "italic", lineHeight: 1 }}>
              {weddingStatic.couple}
            </Typography>
            <Typography sx={{ color: "#8B7355", fontSize: { xs: "1rem", md: "1.25rem" }, mt: 0.4 }}>{page.venue}</Typography>
            <Divider sx={{ maxWidth: 180, mx: "auto", mt: 2, borderColor: "rgba(201,160,117,0.45)" }} />
            <Typography sx={{ color: "#7A5630", fontSize: { xs: "1.05rem", md: "1.25rem" }, mt: 2, fontStyle: "italic" }}>
              {page.quote}
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "grid", md: "none" }, gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
            {folderCards.map((folder, idx) => (
              <MotionBox
                key={folder.folderName}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => {
                  setActiveFolder(idx);
                  setActivePhoto(0);
                }}
                sx={{
                  ...paperSx,
                  p: "10px 10px 30px",
                  cursor: "pointer",
                  transform: `rotate(${idx % 2 === 0 ? -2 : 2}deg)`,
                }}
              >
                <Box
                  sx={{
                    aspectRatio: "1 / 1",
                    borderRadius: "2px",
                    background: folder.tone,
                    backgroundImage: folder.coverImage ? `url("${folder.coverImage}")` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <Typography sx={{ textAlign: "center", mt: 1, color: "#6F4E37", fontSize: "0.95rem" }}>{folder.caption}</Typography>
                <Typography sx={{ textAlign: "center", color: "#8B7355", fontSize: "0.8rem" }}>{folder.photos.length} photos</Typography>
              </MotionBox>
            ))}
          </Box>

          {canUseDesktopScatter ? (
            <Box sx={{ display: { xs: "none", md: "block" }, position: "relative", height: "760px" }}>
              {folderCards.map((folder, idx) => (
                <MotionBox
                  key={folder.folderName}
                  whileHover={{ y: -8, scale: 1.04, rotate: "0deg" }}
                  onClick={() => {
                    setActiveFolder(idx);
                    setActivePhoto(0);
                  }}
                  sx={{
                    ...paperSx,
                    position: "absolute",
                    width: "190px",
                    p: "12px 12px 34px",
                    cursor: "pointer",
                    transform: `rotate(${desktopFolderLayout[idx].rotate})`,
                    zIndex: desktopFolderLayout[idx].zIndex,
                    ...desktopFolderLayout[idx],
                  }}
                >
                  <Box
                    sx={{
                      aspectRatio: "1 / 1",
                      borderRadius: "2px",
                      background: folder.tone,
                      backgroundImage: folder.coverImage ? `url("${folder.coverImage}")` : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <Typography sx={{ textAlign: "center", mt: 1, color: "#6F4E37", fontSize: "1rem" }}>{folder.caption}</Typography>
                  <Typography sx={{ textAlign: "center", color: "#8B7355", fontSize: "0.8rem" }}>{folder.photos.length} photos</Typography>
                </MotionBox>
              ))}
            </Box>
          ) : (
            <Box sx={{ display: { xs: "none", md: "grid" }, gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 2 }}>
              {folderCards.map((folder, idx) => (
                <MotionBox
                  key={folder.folderName}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => {
                    setActiveFolder(idx);
                    setActivePhoto(0);
                  }}
                  sx={{
                    ...paperSx,
                    p: "10px 10px 30px",
                    cursor: "pointer",
                    transform: `rotate(${(idx % 4) - 1.5}deg)`,
                  }}
                >
                  <Box
                    sx={{
                      aspectRatio: "1 / 1",
                      borderRadius: "2px",
                      background: folder.tone,
                      backgroundImage: folder.coverImage ? `url("${folder.coverImage}")` : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <Typography sx={{ textAlign: "center", mt: 1, color: "#6F4E37", fontSize: "1.05rem" }}>{folder.caption}</Typography>
                  <Typography sx={{ textAlign: "center", color: "#8B7355", fontSize: "0.8rem" }}>{folder.photos.length} photos</Typography>
                </MotionBox>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {activeFolder !== null && (
        <Box
          onClick={() => setActiveFolder(null)}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 1700,
            background: "rgba(111,78,55,0.84)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
          }}
        >
          {activeFolderPhotos.length > 1 && (
            <Button onClick={(e) => { e.stopPropagation(); movePhoto(-1); }} sx={{ minWidth: 0, position: "absolute", left: { xs: 4, md: 18 }, color: "#fff" }}>
              <ChevronLeftRoundedIcon sx={{ fontSize: 38 }} />
            </Button>
          )}
          {activeFolderPhotos.length > 1 && (
            <Button onClick={(e) => { e.stopPropagation(); movePhoto(1); }} sx={{ minWidth: 0, position: "absolute", right: { xs: 4, md: 18 }, color: "#fff" }}>
              <ChevronRightRoundedIcon sx={{ fontSize: 38 }} />
            </Button>
          )}
          <Button onClick={(e) => { e.stopPropagation(); setActiveFolder(null); }} sx={{ minWidth: 0, position: "absolute", top: 16, right: 16, color: "#fff" }}>
            <CloseRoundedIcon />
          </Button>
          <Box onClick={(e) => e.stopPropagation()} sx={{ ...paperSx, width: "min(560px, 94vw)", p: "14px 14px 20px" }}>
            <Box
              sx={{
                aspectRatio: "1 / 1",
                borderRadius: "2px",
                background: activeFolderPhotos[activePhoto]?.tone || "linear-gradient(135deg, #c9b8a8 0%, #a89080 100%)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {activeFolderPhotos[activePhoto]?.image && (
                <Box
                  component="img"
                  src={activeFolderPhotos[activePhoto].image}
                  alt={activeFolderPhotos[activePhoto]?.title || "Photo"}
                  loading="eager"
                  decoding="async"
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
              )}
            </Box>
            <Typography sx={{ textAlign: "center", mt: 1.2, color: "#6F4E37", fontSize: "1.25rem" }}>{folderCards[activeFolder]?.caption}</Typography>
            <Typography sx={{ textAlign: "center", color: "#8B7355", fontSize: "0.9rem" }}>
              {activePhoto + 1} / {activeFolderPhotos.length}
            </Typography>

            {activeFolderPhotos.length > 1 && (
              <Box sx={{ mt: 1.1, display: "flex", gap: 0.8, overflowX: "auto", pb: 0.2 }}>
                {activeFolderPhotos.map((photo, idx) => (
                  <Box
                    key={`${photo.title}-${idx}`}
                    onClick={() => setActivePhoto(idx)}
                    sx={{
                      width: 64,
                      height: 78,
                      flex: "0 0 auto",
                      borderRadius: "3px",
                      cursor: "pointer",
                      border: idx === activePhoto ? "2px solid #C9A075" : "1px solid rgba(201,160,117,0.35)",
                      background: photo.tone || "linear-gradient(135deg, #c9b8a8 0%, #a89080 100%)",
                      overflow: "hidden",
                    }}
                  >
                    {photo.image && (
                      <Box
                        component="img"
                        src={photo.image}
                        alt={photo.title || `Photo ${idx + 1}`}
                        loading="lazy"
                        decoding="async"
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "block",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </MotionBox>
  );
};

const DetailShell = ({ page, onBackToCards, children }) => {
  const IconComp = page.icon;
  return (
    <MotionBox initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} sx={{ minHeight: "100vh", px: { xs: 2, md: 4 }, py: 3 }}>
      <Box sx={{ maxWidth: 1080, mx: "auto" }}>
        <Box sx={{ ...paperSx, p: { xs: 2.2, md: 4 }, border: "1.5px solid rgba(201,160,117,0.35)" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Button onClick={onBackToCards} startIcon={<KeyboardBackspaceOutlinedIcon />} sx={{ color: "#7A5630" }}>
              Back to Pages
            </Button>
            <Typography sx={{ color: "#8B7355", letterSpacing: 1.3, fontSize: "0.8rem", textTransform: "uppercase" }}>
              {weddingStatic.date}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Box sx={{ color: "#C9A075", mb: 1 }}>
              <IconComp sx={{ fontSize: "2.8rem" }} />
            </Box>
            <Typography sx={{ color: "#5D4E3C", fontSize: { xs: "2rem", md: "2.8rem" }, fontStyle: "italic", lineHeight: 1.1 }}>
              {page.title}
            </Typography>
            <Typography sx={{ color: "#8B7355", fontSize: { xs: "1rem", md: "1.2rem" }, mt: 0.8 }}>
              {page.hero}
            </Typography>
            <Divider sx={{ maxWidth: 180, mx: "auto", mt: 2, borderColor: "rgba(201,160,117,0.45)" }} />
          </Box>

          {children}
        </Box>
      </Box>
    </MotionBox>
  );
};

const ScheduleDetailPage = ({ page, onBackToCards }) => (
  <DetailShell page={page} onBackToCards={onBackToCards}>
    <Box sx={{ maxWidth: 780, mx: "auto", p: 2, borderRadius: "8px", border: "1px solid rgba(201,160,117,0.28)", backgroundColor: "rgba(255,255,255,0.9)" }}>
      {page.items?.map((item, idx) => (
        <Box key={item.time} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "140px 1fr" }, gap: 1.2, pb: 1.5, mb: 1.5, borderBottom: idx === page.items.length - 1 ? "none" : "1px solid rgba(201,160,117,0.22)" }}>
          <Typography sx={{ color: "#9C6B2F", fontSize: "1.05rem", fontWeight: 600 }}>{item.time}</Typography>
          <Box>
            <Typography sx={{ color: "#5D4E3C", fontSize: "1.1rem" }}>{item.event}</Typography>
            <Typography sx={{ color: "#8B7355", fontSize: "0.95rem" }}>{item.note}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </DetailShell>
);

const TravelDetailPage = ({ page, onBackToCards }) => (
  <DetailShell page={page} onBackToCards={onBackToCards}>
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
      <Box sx={{ p: 2, borderRadius: "8px", border: "1px solid rgba(201,160,117,0.28)", backgroundColor: "rgba(255,255,255,0.9)" }}>
        <Typography sx={{ color: "#5D4E3C", fontSize: "1.45rem", mb: 1 }}>Guest Logistics</Typography>
        {page.details?.map((item, idx) => (
          <Typography key={idx} sx={{ color: "#8B7355", fontSize: "1rem", lineHeight: 1.5, mb: 1 }}>
            {item}
          </Typography>
        ))}
      </Box>
      <Box sx={{ p: 2, borderRadius: "8px", border: "1px solid rgba(201,160,117,0.28)", backgroundColor: "rgba(255,255,255,0.9)" }}>
        <Typography sx={{ color: "#5D4E3C", fontSize: "1.45rem", mb: 1 }}>Premium Support</Typography>
        {page.cards?.map((item) => (
          <Box key={item.title} sx={{ pb: 1.2, mb: 1.2, borderBottom: "1px solid rgba(201,160,117,0.22)" }}>
            <Typography sx={{ color: "#5D4E3C", fontSize: "1.05rem" }}>{item.title}</Typography>
            <Typography sx={{ color: "#8B7355", fontSize: "0.95rem" }}>{item.note}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  </DetailShell>
);

const DetailsDetailPage = ({ page, onBackToCards }) => {
  const [activeSection, setActiveSection] = useState("parents");
  const sections = [
    { id: "parents", label: "Parents" },
    { id: "principal", label: "Principal Sponsors" },
    { id: "entourage", label: "Entourage" },
    { id: "secondary", label: "Secondary Sponsors" },
    { id: "roles", label: "Wedding Roles" },
    { id: "guide", label: "Guest Guide" },
    { id: "how-to-get-there", label: "How to Get There" },
  ];
  const panelSx = {
    p: { xs: 2.1, md: 2.3 },
    borderRadius: "12px",
    border: "1px solid rgba(201,160,117,0.28)",
    backgroundColor: "rgba(255,255,255,0.94)",
  };
  const principalSponsors = page.principalSponsors || [];
  const principalSplitAt = Math.ceil(principalSponsors.length / 2);
  const principalLeft = principalSponsors.slice(0, principalSplitAt);
  const principalRight = principalSponsors.slice(principalSplitAt);
  const principalRows = Array.from({ length: Math.max(principalLeft.length, principalRight.length) }, (_, idx) => ({
    left: principalLeft[idx] || "",
    right: principalRight[idx] || "",
  }));

  return (
    <DetailShell page={page} onBackToCards={onBackToCards}>
      <Box
        sx={{
          position: "sticky",
          top: { xs: 8, md: 14 },
          zIndex: 5,
          mb: 2.1,
          borderRadius: "14px",
          border: "1px solid rgba(201,160,117,0.26)",
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(8px)",
          p: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: 0.8, overflowX: "auto", pb: 0.2, justifyContent: "center", flexWrap: "wrap" }}>
          {sections.map((section) => (
            <Button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              variant={activeSection === section.id ? "contained" : "outlined"}
              sx={{
                flex: "0 0 auto",
                borderRadius: "999px",
                px: 1.45,
                py: 0.55,
                borderColor: "rgba(156,107,47,0.35)",
                color: activeSection === section.id ? "#fff" : "#7A5630",
                backgroundColor: activeSection === section.id ? "#9C6B2F" : "transparent",
                "&:hover": {
                  borderColor: "#9C6B2F",
                  backgroundColor: activeSection === section.id ? "#8A5C2A" : "rgba(201,160,117,0.12)",
                },
              }}
            >
              {section.label}
            </Button>
          ))}
        </Box>
      </Box>

      <Box sx={{ maxWidth: 980, mx: "auto", textAlign: "center" }}>
      {activeSection === "parents" && (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
          <Box sx={{ ...panelSx, background: "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(250,245,238,0.95) 100%)" }}>
            <Typography sx={{ color: "#9C6B2F", letterSpacing: 1.2, textTransform: "uppercase", fontSize: "0.78rem", mb: 0.8 }}>Bride's Parents</Typography>
            <Typography sx={{ color: "#5D4E3C", fontSize: "1.06rem", lineHeight: 1.52 }}>{page.parents?.[2]}</Typography>
            <Typography sx={{ color: "#5D4E3C", fontSize: "1.06rem", lineHeight: 1.52 }}>{page.parents?.[3]}</Typography>
          </Box>
          <Box sx={{ ...panelSx, background: "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(250,245,238,0.95) 100%)" }}>
            <Typography sx={{ color: "#9C6B2F", letterSpacing: 1.2, textTransform: "uppercase", fontSize: "0.78rem", mb: 0.8 }}>Groom's Parents</Typography>
            <Typography sx={{ color: "#5D4E3C", fontSize: "1.06rem", lineHeight: 1.52 }}>{page.parents?.[0]}</Typography>
            <Typography sx={{ color: "#5D4E3C", fontSize: "1.06rem", lineHeight: 1.52 }}>{page.parents?.[1]}</Typography>
          </Box>
        </Box>
      )}

      {activeSection === "principal" && (
        <Box sx={panelSx}>
          <Typography sx={{ color: "#5D4E3C", fontSize: "1.45rem", mb: 1 }}>Principal Sponsors</Typography>
          <TableContainer
            sx={{
              border: "1px solid rgba(201,160,117,0.26)",
              borderRadius: "10px",
              overflow: "hidden",
              background: "rgba(255,255,255,0.82)",
            }}
          >
            <Table size="small" sx={{ tableLayout: "fixed" }}>
              <TableBody>
                {principalRows.map((row, idx) => (
                  <TableRow
                    key={`${row.left}-${row.right}-${idx}`}
                    sx={{
                      "&:last-child td": { borderBottom: "none" },
                      backgroundColor: idx % 2 === 0 ? "rgba(250,246,239,0.78)" : "rgba(255,255,255,0.86)",
                    }}
                  >
                    <TableCell
                      sx={{
                        width: "50%",
                        verticalAlign: "top",
                        textAlign: "center",
                        borderColor: "rgba(201,160,117,0.2)",
                        borderRight: "1px solid rgba(201,160,117,0.18)",
                        px: { xs: 0.8, md: 1.5 },
                        py: { xs: 0.8, md: 1.1 },
                      }}
                    >
                      <Typography sx={{ color: "#6F4E37", fontSize: { xs: "0.86rem", md: "0.98rem" }, lineHeight: 1.34, wordBreak: "break-word" }}>{row.left}</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "50%",
                        verticalAlign: "top",
                        textAlign: "center",
                        borderColor: "rgba(201,160,117,0.2)",
                        px: { xs: 0.8, md: 1.5 },
                        py: { xs: 0.8, md: 1.1 },
                      }}
                    >
                      <Typography sx={{ color: "#6F4E37", fontSize: { xs: "0.86rem", md: "0.98rem" }, lineHeight: 1.34, wordBreak: "break-word" }}>{row.right}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {activeSection === "entourage" && (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 2 }}>
          <Box sx={panelSx}>
            <Typography sx={{ color: "#5D4E3C", fontSize: "1.2rem", mb: 0.45 }}>Maid of Honor</Typography>
            <Typography sx={{ color: "#8B7355", fontSize: "1.02rem" }}>{page.entourage?.maidOfHonor}</Typography>
          </Box>
          <Box sx={panelSx}>
            <Typography sx={{ color: "#5D4E3C", fontSize: "1.2rem", mb: 0.45 }}>Matron of Honor</Typography>
            <Typography sx={{ color: "#8B7355", fontSize: "1.02rem" }}>{page.entourage?.matronOfHonor}</Typography>
          </Box>
          <Box sx={panelSx}>
            <Typography sx={{ color: "#5D4E3C", fontSize: "1.2rem", mb: 0.45 }}>Best Man</Typography>
            <Typography sx={{ color: "#8B7355", fontSize: "1.02rem" }}>{page.entourage?.bestMan}</Typography>
          </Box>
        </Box>
      )}

      {activeSection === "secondary" && (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 1.4 }}>
          {Object.entries(page.secondarySponsors || {}).map(([group, names]) => (
            <Box
              key={group}
              sx={{
                ...panelSx,
                background: "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(248,241,232,0.94) 100%)",
                boxShadow: "0 6px 18px rgba(156,107,47,0.08)",
              }}
            >
              <Typography sx={{ color: "#5D4E3C", fontSize: "1.05rem", mb: 0.65 }}>{group}</Typography>
              {names.map((n) => (
                <Typography key={n} sx={{ color: "#8B7355", fontSize: "0.98rem", lineHeight: 1.45 }}>
                  {n}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      )}

      {activeSection === "roles" && (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
          <Box sx={panelSx}>
            <Typography sx={{ color: "#5D4E3C", fontSize: "1.2rem", mb: 0.4 }}>Bridesmaids</Typography>
            {page.bridesmaids?.map((n) => <Typography key={n} sx={{ color: "#8B7355", fontSize: "0.98rem" }}>{n}</Typography>)}
          </Box>
          <Box sx={panelSx}>
            <Typography sx={{ color: "#5D4E3C", fontSize: "1.2rem", mb: 0.4 }}>Groomsmen</Typography>
            {page.groomsmen?.map((n) => <Typography key={n} sx={{ color: "#8B7355", fontSize: "0.98rem" }}>{n}</Typography>)}
          </Box>
        </Box>
      )}

      {activeSection === "guide" && (
        <Box sx={panelSx}>
          <Typography sx={{ color: "#5D4E3C", fontSize: "1.35rem", mb: 1.1 }}>Guest Guide</Typography>

          <Box sx={{ mb: 2.2 }}>
            <Typography sx={{ color: "#5D4E3C", fontSize: "1.08rem", mb: 0.65, letterSpacing: 0.6, textTransform: "uppercase" }}>Dress Code</Typography>
            {page.guestGuide?.dressCode?.map((line, idx) => (
              <Typography key={idx} sx={{ color: "#8B7355", fontSize: "1rem", lineHeight: 1.55, mb: 0.75 }}>{line}</Typography>
            ))}
          </Box>

          <Box sx={{ mb: 2.2 }}>
            <Typography sx={{ color: "#5D4E3C", fontSize: "1.08rem", mb: 0.65, letterSpacing: 0.6, textTransform: "uppercase" }}>Color Palette - Guests</Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
              {page.guestGuide?.paletteGuests?.map((hex) => (
                <Box key={hex} sx={{ display: "flex", alignItems: "center", pr: 0.25 }}>
                  <Box sx={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: hex, border: "1px solid rgba(0,0,0,0.15)" }} />
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ mb: 2.2 }}>
            <Typography sx={{ color: "#5D4E3C", fontSize: "1.08rem", mb: 0.65, letterSpacing: 0.6, textTransform: "uppercase" }}>Color Palette - Principal Sponsors</Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
              {page.guestGuide?.paletteSponsors?.map((hex) => (
                <Box key={hex} sx={{ display: "flex", alignItems: "center", pr: 0.25 }}>
                  <Box sx={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: hex, border: "1px solid rgba(0,0,0,0.15)" }} />
                </Box>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography sx={{ color: "#5D4E3C", fontSize: "1.08rem", mb: 0.65, letterSpacing: 0.6, textTransform: "uppercase" }}>Important Notes</Typography>
            {page.guestGuide?.notes?.map((note, idx) => {
              const [title, ...bodyParts] = String(note).split("\n");
              const hasTitle = bodyParts.length > 0;
              const body = bodyParts.join("\n");

              return (
                <Box key={idx} sx={{ mb: 1.05 }}>
                  {hasTitle ? (
                    <>
                      <Typography sx={{ color: "#5D4E3C", fontSize: "1.08rem", mb: 0.45, letterSpacing: 0.6, textTransform: "uppercase" }}>
                        {title}
                      </Typography>
                      <Typography sx={{ color: "#8B7355", fontSize: "0.98rem", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                        {body}
                      </Typography>
                    </>
                  ) : (
                    <Typography sx={{ color: "#8B7355", fontSize: "0.98rem", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                      {note}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
      {activeSection === "how-to-get-there" && (
        <Box sx={panelSx}>
          <Typography sx={{ color: "#5D4E3C", fontSize: "1.35rem", mb: 1.1 }}>How to Get There</Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 1.5 }}>
            {page.howToGetThere?.map((place) => (
              <Box
                key={place.label}
                sx={{
                  p: 1.7,
                  borderRadius: "10px",
                  border: "1px solid rgba(201,160,117,0.28)",
                  backgroundColor: "rgba(255,255,255,0.88)",
                }}
              >
                <Typography sx={{ color: "#5D4E3C", fontSize: "1.1rem", mb: 0.55 }}>{place.label}</Typography>
                <Typography sx={{ color: "#6F4E37", fontSize: "0.98rem", lineHeight: 1.5, mb: 0.65 }}>
                  {place.venue}
                </Typography>
                <Typography sx={{ color: "#8B7355", fontSize: "0.98rem", lineHeight: 1.5, mb: 1 }}>
                  Address: {place.address}
                </Typography>
                <Typography sx={{ color: "#8B7355", fontSize: "0.95rem", lineHeight: 1.5, mb: 1 }}>
                  Pin Location: {place.pinLocation}
                </Typography>
                {place.image ? (
                  <Box
                    component="img"
                    src={resolvePublicImage(place.image)}
                    alt={`${place.label} location`}
                    sx={{
                      width: "100%",
                      height: { xs: 165, md: 200 },
                      objectFit: "cover",
                      borderRadius: "10px",
                      border: "1px solid rgba(201,160,117,0.24)",
                      mb: 1.1,
                    }}
                  />
                ) : null}
                <Button
                  component="a"
                  href={place.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  sx={{
                    borderRadius: "999px",
                    borderColor: "rgba(156,107,47,0.38)",
                    color: "#7A5630",
                    px: 1.4,
                    textTransform: "none",
                    "&:hover": { borderColor: "#9C6B2F", backgroundColor: "rgba(201,160,117,0.12)" },
                  }}
                >
                  Open in Google Maps
                </Button>
                <Box
                  sx={{
                    mt: 1.15,
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: "1px solid rgba(201,160,117,0.24)",
                    backgroundColor: "#f4efe8",
                    height: { xs: 180, md: 220 },
                  }}
                >
                  <Box
                    component="iframe"
                    title={`${place.label} map`}
                    src={place.embedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    sx={{
                      width: "100%",
                      height: "100%",
                      border: 0,
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
      </Box>
    </DetailShell>
  );
};

const PhotosDetailPage = ({ page, onBackToCards }) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const photos = useMemo(
    () =>
      uploadedPhotos.length
        ? uploadedPhotos
        : (page.cards || []).map((item) => ({
            ...item,
            image: item.image ? resolvePublicImage(item.image) : null,
          })),
    [page.cards],
  );
  const [activePhoto, setActivePhoto] = useState(0);

  const movePhoto = (direction) => {
    if (!photos.length) return;
    setActivePhoto((prev) => (prev + direction + photos.length) % photos.length);
  };

  const currentIndex = photos.length ? ((activePhoto % photos.length) + photos.length) % photos.length : 0;
  const wrappedIndex = (idx) => (idx + photos.length) % photos.length;
  const current = photos[currentIndex];
  const left = photos[wrappedIndex(currentIndex - 1)];
  const right = photos[wrappedIndex(currentIndex + 1)];

  return (
    <DetailShell page={page} onBackToCards={onBackToCards}>
      {!photos.length ? (
        <Typography sx={{ color: "#8B7355", textAlign: "center" }}>
          Upload photos to public/images/photos to display them here.
        </Typography>
      ) : isDesktop ? (
        <Box sx={{ maxWidth: 940, mx: "auto" }}>
          <Box sx={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1.25fr 1fr", gap: 1.2, alignItems: "center" }}>
            {photos.length > 1 ? (
              <MotionBox
                onClick={() => setActivePhoto(wrappedIndex(activePhoto - 1))}
                whileHover={{ scale: 1.01 }}
                sx={{ ...paperSx, p: "8px 8px 12px", cursor: "pointer", opacity: 0.82 }}
              >
                <Box
                  sx={{
                    aspectRatio: "4 / 5",
                    borderRadius: "2px",
                    background: left?.tone || "linear-gradient(135deg, #cbb8a7 0%, #ab9583 100%)",
                    backgroundImage: left?.image ? `url("${left.image}")` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </MotionBox>
            ) : (
              <Box />
            )}

            <Box sx={{ ...paperSx, p: "9px 9px 14px", transform: "scale(1.02)" }}>
              <Box
                sx={{
                  aspectRatio: "4 / 5",
                  borderRadius: "2px",
                  background: current?.tone || "linear-gradient(135deg, #cbb8a7 0%, #ab9583 100%)",
                  backgroundImage: current?.image ? `url("${current.image}")` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <Typography sx={{ textAlign: "center", mt: 0.8, color: "#5D4E3C", fontSize: "1.02rem" }}>{current?.title}</Typography>
              <Typography sx={{ textAlign: "center", color: "#8B7355", fontSize: "0.86rem" }}>
                {currentIndex + 1} / {photos.length}
              </Typography>
            </Box>

            {photos.length > 1 ? (
              <MotionBox
                onClick={() => setActivePhoto(wrappedIndex(activePhoto + 1))}
                whileHover={{ scale: 1.01 }}
                sx={{ ...paperSx, p: "8px 8px 12px", cursor: "pointer", opacity: 0.82 }}
              >
                <Box
                  sx={{
                    aspectRatio: "4 / 5",
                    borderRadius: "2px",
                    background: right?.tone || "linear-gradient(135deg, #cbb8a7 0%, #ab9583 100%)",
                    backgroundImage: right?.image ? `url("${right.image}")` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </MotionBox>
            ) : (
              <Box />
            )}

            {photos.length > 1 && (
              <>
                <Button
                  onClick={() => movePhoto(-1)}
                  sx={{
                    minWidth: 0,
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    position: "absolute",
                    left: -12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.92)",
                    color: "#7A5630",
                    "&:hover": { background: "rgba(255,255,255,1)" },
                  }}
                >
                  <ChevronLeftRoundedIcon />
                </Button>
                <Button
                  onClick={() => movePhoto(1)}
                  sx={{
                    minWidth: 0,
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    position: "absolute",
                    right: -12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.92)",
                    color: "#7A5630",
                    "&:hover": { background: "rgba(255,255,255,1)" },
                  }}
                >
                  <ChevronRightRoundedIcon />
                </Button>
              </>
            )}
          </Box>
        </Box>
      ) : (
        <Box>
          <Box sx={{ position: "relative", ...paperSx, p: { xs: "10px 10px 18px", md: "12px 12px 20px" }, maxWidth: 760, mx: "auto" }}>
            <Box
              sx={{
                aspectRatio: "4 / 5",
                borderRadius: "2px",
                background: current?.tone || "linear-gradient(135deg, #cbb8a7 0%, #ab9583 100%)",
                backgroundImage: current?.image ? `url("${current.image}")` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <Typography sx={{ textAlign: "center", mt: 1, color: "#5D4E3C", fontSize: "1.1rem" }}>{current?.title}</Typography>
            <Typography sx={{ textAlign: "center", color: "#8B7355", fontSize: "0.9rem" }}>
              {currentIndex + 1} / {photos.length}
            </Typography>

            {photos.length > 1 && (
              <>
                <Button
                  onClick={() => movePhoto(-1)}
                  sx={{
                    minWidth: 0,
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    position: "absolute",
                    left: { xs: 12, md: 18 },
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.9)",
                    color: "#7A5630",
                    "&:hover": { background: "rgba(255,255,255,1)" },
                  }}
                >
                  <ChevronLeftRoundedIcon />
                </Button>
                <Button
                  onClick={() => movePhoto(1)}
                  sx={{
                    minWidth: 0,
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    position: "absolute",
                    right: { xs: 12, md: 18 },
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.9)",
                    color: "#7A5630",
                    "&:hover": { background: "rgba(255,255,255,1)" },
                  }}
                >
                  <ChevronRightRoundedIcon />
                </Button>
              </>
            )}
          </Box>

          {photos.length > 1 && (
            <Box sx={{ mt: 1.5, display: "flex", gap: 1, overflowX: "auto", pb: 0.6, justifyContent: { xs: "flex-start", md: "center" } }}>
              {photos.map((item, idx) => (
                <Box
                  key={`${item.title}-${idx}`}
                  onClick={() => setActivePhoto(idx)}
                  sx={{
                    width: 72,
                    height: 90,
                    flex: "0 0 auto",
                    borderRadius: "3px",
                    cursor: "pointer",
                    border: idx === currentIndex ? "2px solid #C9A075" : "1px solid rgba(201,160,117,0.35)",
                    background: item.tone || "linear-gradient(135deg, #cbb8a7 0%, #ab9583 100%)",
                    backgroundImage: item.image ? `url("${item.image}")` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      )}
    </DetailShell>
  );
};

const DetailPage = ({ pageKey, page, onBackToCards }) => {
  if (pageKey === "welcome") return <WelcomeDetailPage page={page} onBackToCards={onBackToCards} />;
  if (pageKey === "schedule") return <ScheduleDetailPage page={page} onBackToCards={onBackToCards} />;
  if (pageKey === "travel") return <TravelDetailPage page={page} onBackToCards={onBackToCards} />;
  if (pageKey === "details") return <DetailsDetailPage page={page} onBackToCards={onBackToCards} />;
  if (pageKey === "photos") return <PhotosDetailPage page={page} onBackToCards={onBackToCards} />;
  return null;
};

export const SharedOnepager = ({ onBackToInvitation, variant = "desktop" }) => {
  const [opened, setOpened] = useState(() => (typeof window !== "undefined" ? Boolean(slugFromHash()) : false));
  const [activePage, setActivePage] = useState(() => (typeof window !== "undefined" ? slugFromHash() : null));
  const isMobile = variant === "mobile";
  const isTablet = variant === "tablet";
  const positions = isTablet ? tabletPositions : desktopPositions;
  const pages = weddingStatic.pages;

  const cards = useMemo(
    () =>
      Object.keys(pages).map((key) => ({
        id: key,
        ...pages[key],
      })),
    [pages],
  );
  const isFourCardLayout = !isMobile && cards.length === 4;
  const useScatteredLayout = !isMobile && cards.length === positions.length;

  useEffect(() => {
    const onHashChange = () => {
      const slug = slugFromHash();
      if (slug) {
        setOpened(true);
        setActivePage(slug);
      } else {
        setActivePage(null);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const openCardPage = (id) => {
    setActivePage(id);
    window.history.pushState(null, "", `#${id}`);
  };

  const backToCards = () => {
    setActivePage(null);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        background: "transparent",
      }}
    >
      {sparkleStyles.map((s, idx) => (
        <MotionBox
          key={idx}
          sx={{ position: "absolute", width: 5, height: 5, borderRadius: "50%", backgroundColor: "#C9A075", ...s }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        />
      ))}

      {!opened && (
        <Box sx={{ position: "absolute", inset: 0, zIndex: 40, display: "flex", alignItems: "center", justifyContent: "center", px: 2 }}>
          <MotionBox
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpened(true)}
            sx={{
              ...paperSx,
              backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.62) 100%), url("${resolvePublicImage("/images/photos/ChurchBG.png")}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: isMobile ? "100%" : isTablet ? 460 : 520,
              maxWidth: "100%",
              height: isMobile ? 300 : 330,
              cursor: "pointer",
              p: 4,
              position: "relative",
              textAlign: "center",
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Button
              onClick={(e) => { e.stopPropagation(); onBackToInvitation(); }}
              variant="text"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "#3F2D1E",
                fontSize: "0.8rem",
                fontWeight: 700,
                textShadow: "0 1px 2px rgba(255,255,255,0.45)",
              }}
            >
              {weddingStatic.backToInvitation}
            </Button>
            <Box sx={{ color: "#4C3117", lineHeight: 1 }}>
              <ChurchOutlinedIcon sx={{ fontSize: "3rem", filter: "drop-shadow(0 1px 2px rgba(255,255,255,0.45))" }} />
            </Box>
            <Typography
              sx={{
                fontSize: isMobile ? "2rem" : "2.6rem",
                color: "#2A1A0F",
                fontStyle: "italic",
                fontWeight: 700,
                textShadow: "0 1px 2px rgba(255,255,255,0.45)",
              }}
            >
              {weddingStatic.couple}
            </Typography>
            <Typography
              sx={{
                color: "#2F2116",
                letterSpacing: 1.8,
                fontSize: "0.9rem",
                fontWeight: 700,
                textShadow: "0 1px 2px rgba(255,255,255,0.45)",
              }}
            >
              {weddingStatic.date}
            </Typography>
            <Typography
              sx={{
                color: "#352315",
                textTransform: "uppercase",
                letterSpacing: 2,
                fontSize: "0.75rem",
                fontWeight: 800,
                textShadow: "0 1px 2px rgba(255,255,255,0.4)",
              }}
            >
              Click to open
            </Typography>
          </MotionBox>
        </Box>
      )}

      {opened && !activePage && (
        <Box sx={{ position: "relative", minHeight: "100vh", pt: 2, px: 2, pb: 2, display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
            <Box>
              <Typography sx={{ color: "#5D4E3C", fontSize: isMobile ? "1.5rem" : "2.1rem", fontStyle: "italic", lineHeight: 1 }}>
                {weddingStatic.couple}
              </Typography>
              <Typography sx={{ color: "#8B7355", fontSize: "0.85rem", letterSpacing: 1.5 }}>{weddingStatic.date}</Typography>
            </Box>
            <Button
              onClick={onBackToInvitation}
              variant="outlined"
              sx={{ borderColor: "#C9A075", color: "#7A5630", fontFamily: '"Cormorant Garamond", Georgia, serif', "&:hover": { borderColor: "#9C6B2F", backgroundColor: "rgba(201,160,117,0.1)" } }}
            >
              {weddingStatic.backToInvitation}
            </Button>
          </Box>

          <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {useScatteredLayout ? (
              <Box sx={{ position: "relative", height: isTablet ? "70vh" : "72vh", width: "100%" }}>
                {cards.map((card, idx) => (
                  <PageCard
                    key={card.id}
                    page={card}
                    isTablet={isTablet}
                    styleSx={{
                      width: isTablet ? "30%" : "28%",
                      height: isTablet ? "43%" : "45%",
                      position: "absolute",
                      p: 3,
                      transform: `rotate(${positions[idx].rotate})`,
                      zIndex: positions[idx].zIndex,
                      ...positions[idx],
                    }}
                    onClick={() => openCardPage(card.id)}
                  />
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  display: isFourCardLayout ? "grid" : "flex",
                  gridTemplateColumns: isFourCardLayout ? "repeat(2, minmax(0, 1fr))" : undefined,
                  maxWidth: isFourCardLayout ? 900 : "100%",
                  mx: "auto",
                  flexWrap: isMobile ? "nowrap" : "wrap",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  gap: isFourCardLayout ? 2.1 : 1.5,
                  py: 1,
                  width: "100%",
                }}
              >
                {cards.map((card, idx) => (
                  <PageCard
                    key={card.id}
                    page={card}
                    isMobile={isMobile}
                    isTablet={isTablet}
                    styleSx={{
                      minHeight: isMobile ? 168 : 220,
                      p: isMobile ? 1.8 : isFourCardLayout ? 2.8 : 2.4,
                      width: isMobile ? "min(100%, 420px)" : isFourCardLayout ? "100%" : "calc(33.333% - 12px)",
                      minWidth: isMobile ? 148 : isTablet ? 190 : 220,
                      maxWidth: isMobile ? 420 : isFourCardLayout ? 420 : 300,
                      justifySelf: isFourCardLayout ? "center" : undefined,
                      transform: isFourCardLayout ? `rotate(${idx % 2 === 0 ? -1.2 : 1.2}deg)` : `rotate(${idx % 2 === 0 ? -2 : 2}deg)`,
                    }}
                    onClick={() => openCardPage(card.id)}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      )}

      {opened && activePage && <DetailPage pageKey={activePage} page={pages[activePage]} onBackToCards={backToCards} />}
    </Box>
  );
};

export default SharedOnepager;
