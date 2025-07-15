import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { colors } from "../theme/theme";
import { msUntilNextUnlock } from "../utils/timeHelper";

export const CountdownTimer = () => {
  const [remaining, setRemaining] = useState(msUntilNextUnlock());

  // update every second
  useEffect(() => {
    const id = setInterval(() => setRemaining(msUntilNextUnlock()), 1000);
    return () => clearInterval(id);
  }, []);

  if (remaining === 0) {
    return <Text style={styles.timer}>🟢 Puzzle unlocked now!</Text>;
  }

  const totalSec = Math.floor(remaining / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  return (
    <Text style={styles.timer}>
      ⏳ Next unlock in: {days}d {hours}h {minutes}m {seconds}s
    </Text>
  );
};

const styles = StyleSheet.create({
  timer: {
    marginTop: 16,
    color: colors.textSecondary,
    fontSize: 14,
  },
});
