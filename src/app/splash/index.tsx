import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import {
  StatusChangeEventPayload,
  useVideoPlayer,
  VideoView,
} from "expo-video";
import { router } from "expo-router";

const videoSource = require("@/assets/clips_voando.mp4");
export default function Splash() {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
    player.muted = true;
    player.addListener("statusChange", (status) => {
      if (status.status === "idle") {
        navegar();
      }
    });
  });

  function navegar() {
    router.replace("/");
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />
      <VideoView player={player} style={styles.clips} nativeControls={false} />
      <Text style={styles.text}>Organizando seus links...</Text>
    </View>
  );
}
