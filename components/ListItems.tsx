import React, { FC } from "react";
import { Text, StyleSheet, Linking, View } from "react-native";
import { Card, Button as ButtonElements, Icon } from "react-native-elements";
import IStory from "../interfaces/IStory";
import {
  StoryScore,
  StoryAuthor,
  StoryAuthorKarma,
  Language,
} from "../constants";

interface Props {
  story: IStory;
}

export const StoryListItem: FC<Props> = (props) => {
  // convert unix time date to localeString
  const time: string = new Date(
    Number.parseInt(props.story.time) * 1000
  ).toLocaleString(Language);

  return (
    <Card containerStyle={styles.card}>
      <Card.Title>{props.story.title}</Card.Title>
      <Card.Divider />
      <Text style={styles.cardText}>{StoryAuthor + props.story.by}</Text>
      {props.story.authorKarma && (
        <Text style={styles.cardText}>
          {StoryAuthorKarma + props.story.authorKarma}
        </Text>
      )}
      {props.story.url && (
        <View>
          <Text
            style={[styles.cardText, styles.marginBottom]}
            onPress={() => Linking.openURL(props.story.url)}
          >
            {props.story.url}
          </Text>
          <ButtonElements
            type="clear"
            onPress={() => Linking.openURL(props.story.url)}
            icon={<Icon name="open-in-browser" size={40} color="#2089DC" />}
          />
        </View>
      )}
      <Card.Divider />
      <Text style={styles.cardText}>{StoryScore + props.story.score}</Text>
      <Text style={styles.cardText}>{time}</Text>
    </Card>
  );
};

export const LoadingIcon: FC = () => {
  return <ButtonElements type="clear" title="Loading button" loading />;
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  marginBottom: {
    paddingTop: 8,
  },
  cardText: {
    marginBottom: 10,
    textAlign: "center",
  },
});
