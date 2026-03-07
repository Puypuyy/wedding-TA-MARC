import { useEffect, useRef, useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PauseIcon from "@mui/icons-material/Pause";

const MUSIC_SRC = `${import.meta.env.BASE_URL}audio/pahintulot-shirebound.mp3`;

const BackgroundMusicControl = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMutedPlayback, setIsMutedPlayback] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.35;
    audio.load();
    audioRef.current = audio;

    const onPause = () => setIsPlaying(false);
    const onCanPlay = () => setHasError(false);
    const onError = () => setHasError(true);

    audio.addEventListener("pause", onPause);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("error", onError);

    const onPlayRequest = async () => {
      try {
        audio.muted = false;
        await audio.play();
        setIsPlaying(true);
        setIsMutedPlayback(false);
        setHasError(false);
      } catch (error) {
        if (error?.name !== "NotAllowedError") {
          setHasError(true);
        }
      }
    };

    window.addEventListener("wedding:music-play-request", onPlayRequest);

    const tryAutoplay = async () => {
      try {
        audio.muted = false;
        await audio.play();
        setIsPlaying(true);
        setIsMutedPlayback(false);
      } catch (error) {
        if (error?.name === "NotAllowedError") {
          try {
            audio.muted = true;
            await audio.play();
            setIsPlaying(true);
            setIsMutedPlayback(true);
            setHasError(false);
          } catch {
            setIsPlaying(false);
          }
        } else {
          setHasError(true);
        }
      }
    };

    tryAutoplay();

    return () => {
      audio.pause();
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("error", onError);
      window.removeEventListener("wedding:music-play-request", onPlayRequest);
      audioRef.current = null;
    };
  }, []);

  const onToggle = async () => {
    if (!audioRef.current) return;

    if (isPlaying && isMutedPlayback) {
      audioRef.current.muted = false;
      setIsMutedPlayback(false);
      setHasError(false);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsMutedPlayback(false);
      return;
    }

    try {
      audioRef.current.muted = false;
      await audioRef.current.play();
      setHasError(false);
      setIsPlaying(true);
      setIsMutedPlayback(false);
    } catch (error) {
      if (error?.name === "NotAllowedError") {
        setHasError(false);
      } else {
        setHasError(true);
      }
      setIsPlaying(false);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 1500,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 0.75,
      }}
    >
      {isMutedPlayback && (
        <Typography
          sx={{
            px: 1.2,
            py: 0.5,
            borderRadius: "999px",
            fontSize: "0.75rem",
            color: "#7A5630",
            backgroundColor: "rgba(255,255,255,0.92)",
            border: "1px solid rgba(156,107,47,0.22)",
          }}
        >
          Tap music button to enable sound
        </Typography>
      )}
      {hasError && (
        <Typography
          sx={{
            px: 1.2,
            py: 0.5,
            borderRadius: "999px",
            fontSize: "0.75rem",
            color: "#7A5630",
            backgroundColor: "rgba(255,255,255,0.92)",
            border: "1px solid rgba(156,107,47,0.22)",
          }}
        >
          Audio error. Check: {MUSIC_SRC}
        </Typography>
      )}
      <Tooltip title={isPlaying ? (isMutedPlayback ? "Enable sound" : "Pause music") : "Play music"}>
        <IconButton
          onClick={onToggle}
          sx={{
            width: 52,
            height: 52,
            border: "1px solid rgba(156,107,47,0.25)",
            backgroundColor: "rgba(255,255,255,0.95)",
            color: "#9C6B2F",
            boxShadow: "0 10px 22px rgba(0,0,0,0.08)",
            "&:hover": {
              backgroundColor: "#FFFFFF",
              transform: "translateY(-1px)",
            },
          }}
          aria-label={isPlaying ? "Pause background music" : "Play background music"}
        >
          {isPlaying ? <PauseIcon /> : <MusicNoteIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default BackgroundMusicControl;
