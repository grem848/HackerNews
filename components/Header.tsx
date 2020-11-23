import React, { FC } from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { Header as HeaderElements } from "react-native-elements";
import { PrimaryBackgroundColor, Title } from "../constants";

interface Props {
  title: string;
  reloadFunc: (event: GestureResponderEvent) => void;
}

const Header: FC<Props> = (props) => {
  return (
    <HeaderElements
      backgroundColor={PrimaryBackgroundColor}
      centerComponent={{
        text: props.title,
        style: styles.centerComponent,
      }}
      rightComponent={{
        icon: "sync",
        size: 30,
        color: "#fff",
        onPress: props.reloadFunc,
      }}
    />
  );
};

Header.defaultProps = {
  title: Title,
};

const styles = StyleSheet.create({
  centerComponent: {
    color: "#fff",
    fontSize: 25,
  },
});

export default Header;
