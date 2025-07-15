import * as Clipboard from "expo-clipboard";
import React from "react";
import { Button } from "react-native";

type Props = { text: string };

export const CopyButton: React.FC<Props> = ({ text }) => (
  <Button title="Copy Code" onPress={() => Clipboard.setStringAsync(text)} />
);