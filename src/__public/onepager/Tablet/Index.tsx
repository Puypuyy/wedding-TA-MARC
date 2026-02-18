import SharedOnepager from "../SharedOnepager";

const OnepagerTablet = ({ onBackToInvitation }: { onBackToInvitation: () => void }) => {
  return <SharedOnepager onBackToInvitation={onBackToInvitation} variant="tablet" />;
};

export default OnepagerTablet;
