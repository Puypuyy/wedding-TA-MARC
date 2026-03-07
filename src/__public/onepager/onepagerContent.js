/**
 * One-pager wedding details content.
 * Single source for bride/groom, entourage, principals, locations, nav, and sections.
 */

export const navItems = [
  { id: "welcome", label: "Welcome" },
  { id: "story", label: "Story" },
  { id: "schedule", label: "Schedule" },
  { id: "travel", label: "Travel" },
  { id: "qa", label: "Q&A" },
  { id: "wedding-details", label: "Wedding Details" },
  { id: "photos", label: "Photos" },
  { id: "registry", label: "Registry" },
];

export const onepagerContent = {
  title: "Wedding Details",
  subtitle: "Marc Angelic & Anna Marie",
  welcomeTitle: "Welcome",
  welcomeSubtitle: "We can't wait to celebrate with you.",
  story: {
    title: "Our Story",
    paragraphs: [
      "We met and our story began. Every chapter since has led us here—to say yes to forever together.",
      "Thank you for being part of our journey. We are so grateful to share this day with you.",
    ],
  },
  schedule: {
    title: "Schedule",
    events: [
      { time: "3:00 PM", label: "Ceremony", note: "Diocesan Shrine and Parish of Saint Pio of Pietrelcina" },
      { time: "To follow", label: "Reception", note: "Reception Venue" },
    ],
  },
  travel: {
    title: "Travel & Stay",
    intro: "Information for out-of-town guests.",
    tips: ["Venue address and parking details to be shared soon.", "Recommended hotels and directions will be updated here."],
  },
  qa: {
    title: "Q&A",
    items: [
      { q: "What is the dress code?", a: "Semi-formal / cocktail attire." },
      { q: "Can I bring a plus one?", a: "Your invitation will specify. Please RSVP with the names on your envelope." },
      { q: "When is the RSVP deadline?", a: "Please respond by the date indicated on your invitation." },
    ],
  },
  photos: {
    title: "Photos",
    subtitle: "Our favorite moments. More to come after the wedding!",
  },
  registry: {
    title: "Registry",
    intro: "Your presence at our wedding is the greatest gift. For those who wish to give, we are registered at:",
    links: [{ label: "Registry name", href: "#" }],
  },

  // Bride & Groom (images: use tamarc2 = couple/groom, tamarc = bride or vice versa)
  couple: {
    groom: {
      name: "Marc Angelic",
      role: "Groom",
    },
    bride: {
      name: "Anna Marie",
      role: "Bride",
    },
  },

  entourage: {
    title: "Entourage",
    groomsmen: [
      { name: "Best Man", role: "Best Man" },
      { name: "Groomsman 1", role: "Groomsman" },
      { name: "Groomsman 2", role: "Groomsman" },
    ],
    bridesmaids: [
      { name: "Maid of Honor", role: "Maid of Honor" },
      { name: "Bridesmaid 1", role: "Bridesmaid" },
      { name: "Bridesmaid 2", role: "Bridesmaid" },
    ],
  },

  principals: {
    title: "Principal Sponsors",
    list: [
      "Principal 1",
      "Principal 2",
      "Principal 3",
      "Principal 4",
    ],
  },

  locations: {
    title: "Locations",
    ceremony: {
      label: "Ceremony",
      name: "Diocesan Shrine and Parish of Saint Pio of Pietrelcina",
      note: "formerly San Pedro Calungsod Parish",
      time: "3:00 in the afternoon",
      date: "Saturday, April 25, 2026",
    },
    reception: {
      label: "Reception",
      name: "Reception Venue",
      note: "To be announced",
      time: "To follow",
    },
  },

  backToInvitation: "Back to Invitation",
};

