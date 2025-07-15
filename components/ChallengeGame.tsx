import { verifyManualCode } from "@/components/PuzzleGenerator";
import { useThemeMode } from "@/theme/ThemeContext";
import { darkTheme, lightTheme } from "@/theme/theme";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export const ChallengeGame: React.FC = () => {
  const { theme } = useThemeMode();
  const colors = theme === "light" ? lightTheme : darkTheme;

  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleSolve = () => {
    const d = parseInt(day);
    const h = parseInt(hour);
    const code = verifyManualCode(d, h);

    if (code) {
      setResult(code);
      setError("");
    } else {
      setResult(null);
      setError("❌ Incorrect. Day and Hour do not satisfy puzzle rule.");
    }
  };

  return (
    <View style={[styles.box, { backgroundColor: colors.card }]}>
      <Text style={[styles.label, { color: colors.textPrimary }]}>🧠 Challenge Game Mode</Text>

      <TextInput
        placeholder="Enter Day (1–31)"
        value={day}
        onChangeText={setDay}
        keyboardType="numeric"
        style={[styles.input, { color: colors.textPrimary, borderColor: colors.accent }]}
        placeholderTextColor={colors.textSecondary}
      />

      <TextInput
        placeholder="Enter Hour (0–23)"
        value={hour}
        onChangeText={setHour}
        keyboardType="numeric"
        style={[styles.input, { color: colors.textPrimary, borderColor: colors.accent }]}
        placeholderTextColor={colors.textSecondary}
      />

      <Button title="Try to Solve" onPress={handleSolve} color={colors.accent} />

      {result && (
        <Text selectable style={[styles.result, { color: colors.accent }]}>
          ✅ Puzzle Code: {result}
        </Text>
      )}

      {error && (
        <Text style={[styles.error, { color: "#ef4444" }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    marginTop: 28,
    padding: 18,
    borderRadius: 14,
    width: "90%",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  result: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "500",
  },
  error: {
    marginTop: 12,
    fontSize: 14,
    fontStyle: "italic",
  },
});
