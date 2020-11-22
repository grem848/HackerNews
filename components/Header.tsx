import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PrimaryBackgroundColor, Title } from "../constants";

interface Props {
  title: string;
}

const Header: FC<Props> = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};

Header.defaultProps = {
  title: Title,
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: PrimaryBackgroundColor,
  },
  text: {
    color: "white",
    fontSize: 23,
    textAlign: "center",
  },
});

export default Header;
