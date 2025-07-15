import { colors } from "@/theme/theme";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { verifyManualCode } from "./PuzzleGenerator";

export const DecoderInput = () => {
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const handleDecode = () => {
    setResult(verifyManualCode(day, hour));
  };

  return (
    <View style={styles.box}>
      <Text style={styles.label}>Try to Decode Manually</Text>
      <TextInput
        placeholder="Day (1-31)"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={(v) => setDay(parseInt(v) || 0)}
      />
      <TextInput
        placeholder="Hour (0-23)"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={(v) => setHour(parseInt(v) || 0)}
      />
      <Button title="Decode" onPress={handleDecode} />
      {result && <Text style={styles.result}>✅ Code: {result}</Text>}
      {!result && <Text style={styles.locked}>🔒 No Match</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.card,
    width: "90%",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 6,
    padding: 8,
    color: colors.textPrimary,
    marginVertical: 6,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.textPrimary,
  },
  result: {
    color: colors.accent,
    fontSize: 14,
    marginTop: 10,
  },
  locked: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 10,
  },
});
