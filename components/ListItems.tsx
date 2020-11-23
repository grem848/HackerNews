import React, { FC } from "react";
import { Text, StyleSheet } from "react-native";
import { Card, ListItem } from "react-native-elements";
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
      <Text style={styles.cardText}>
        {StoryAuthorKarma + props.story.authorKarma}
      </Text>
      <Text style={[styles.cardText, styles.marginBottom]}>
        {props.story.url}
      </Text>
      <Card.Divider />
      <Text style={styles.cardText}>{StoryScore + props.story.score}</Text>
      <Text style={styles.cardText}>{time}</Text>
    </Card>
  );
};

export const LoadingListItem: FC = () => {
  return (
    <ListItem>
      <ListItem.Content>
        <ListItem.Title>{"Loading..."}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  marginBottom: {
    paddingTop: 8,
  },
  cardText: {
    marginBottom: 10,
    textAlign: "center",
  },
});
