import React, { FC } from "react";
import { Text, View } from "react-native";
import IStory from "../interfaces/IStory";

interface Props {
  story: IStory;
}

export const StoryListItem: FC<Props> = (props) => {
  return (
    <View>
      <Text>{props.story.title}</Text>
      <Text>{props.story.score}</Text>
      <Text>{props.story.time}</Text>
      <Text>{props.story.url}</Text>
    </View>
  );
};
