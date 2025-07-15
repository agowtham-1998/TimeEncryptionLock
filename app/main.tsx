import React, { useEffect, useState } from "react";
import { Button, Platform, StatusBar, StyleSheet, Text, View } from "react-native";

import { CopyButton } from "@/components/CopyButton";
import { CountdownTimer } from "@/components/CountdownTimer";
import PuzzleDisplay from "@/components/PuzzleDisplay";
import { generatePuzzleCode } from "@/components/PuzzleGenerator";

import { DecoderInput } from "@/components/DecoderInput";
import { useThemeMode } from "@/theme/ThemeContext";
import { darkTheme, lightTheme } from "@/theme/theme";
import LocalAuthentication from "expo-local-authentication";

export default function Main() {
  const { theme, toggleTheme } = useThemeMode();
  const colors = theme === "light" ? lightTheme : darkTheme;

  const [puzzle, setPuzzle] = useState<string | null>(null);

  useEffect(() => {
  let intervalId: ReturnType<typeof setInterval>; // ✅ works in RN & web

  const updatePuzzle = () => setPuzzle(generatePuzzleCode());

  const auth = async () => {
    if (Platform.OS === "android") {
      updatePuzzle();                       // run immediately
      intervalId = setInterval(updatePuzzle, 1000); // refresh each second
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Scan to Unlock Puzzle",
    });

    if (result.success) {
      updatePuzzle();
      intervalId = setInterval(updatePuzzle, 1000);
    } else {
      setPuzzle(null);
    }
  };

  auth();

  // 🧹 cleanup
  return () => clearInterval(intervalId);
}, []);


  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />
      <Text style={[styles.title, { color: colors.textPrimary }]}>🔐 Time Puzzle Lock</Text>
      <PuzzleDisplay puzzle={puzzle} />
      <CountdownTimer />
      {puzzle && <CopyButton text={puzzle} />}
      <DecoderInput/>
      {/* <ChallengeGame /> */}
      <Button
        title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        onPress={toggleTheme}
        color={colors.accent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
});
