import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { colors } from "../theme/theme";

type Props = { puzzle: string | null };

const PuzzleDisplay: React.FC<Props> = ({ puzzle }) => {
  const { width } = useWindowDimensions();
  const isSmall = width < 360;

  const isLocked = !puzzle;

  return (
    <View style={[styles.box, { maxWidth: width * 0.9 }]}>
      <Text style={[styles.label, isSmall && styles.labelSmall]}>
        {isLocked ? "🔒 Password Locked" : "🧩 Encrypted Password"}
      </Text>
      <Text
        selectable={!isLocked}
        style={[styles.code, isSmall && styles.codeSmall, isLocked && styles.lockedCode]}
      >
        {isLocked ? "Day & Hour do not match." : puzzle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.card,
    paddingVertical: 24,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 32,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "500",
  },
  labelSmall: {
    fontSize: 14,
  },
  code: {
    fontSize: 22,
    color: colors.accent,
    fontFamily: "monospace",
    textAlign: "center",
    letterSpacing: 1,
  },
  codeSmall: {
    fontSize: 18,
  },
  lockedCode: {
    color: "#ef4444", // red
    fontStyle: "italic",
  },
});

export default PuzzleDisplay;
