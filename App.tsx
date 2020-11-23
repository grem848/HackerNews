import React, { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import { StoryListItem, LoadingListItem } from "./components/ListItems";
import { HackerNewsAPI, Title } from "./constants";
import IStory from "./interfaces/IStory";
import { fetchItem } from "./services/FetchService";
import { getRandomItemsFromArray } from "./utils/utils";

const App: FC = () => {
  const [topTenStories, setTopTenStories] = useState<IStory[]>([]);

  // componentdidmount
  useEffect(() => {
    getTopTenStoriesRandomized();

    // fetchItem<IStory>(`${HackerNewsAPI}/user/20.json`)
    //   .then((item) => {
    //     console.log(item);
    //   })
    //   .catch((error) => {
    //     /* show error message */
    //     console.error(error);
    //   });
  }, []);

  const getTopTenStoriesRandomized = async () => {
    // get the ids of 10 random topstories
    const randomizedIDs: void | number[] = await fetchItem<number[]>(
      `${HackerNewsAPI}/topstories.json`
    )
      .then((topTenStoriesIDsList) => {
        return getRandomItemsFromArray(topTenStoriesIDsList, 10);
      })
      .catch((error) => {
        /* show error message */
        return Promise.reject(error);
      });

    // check if the randomizedIDs exists and isnt empty
    if (randomizedIDs !== undefined && randomizedIDs.length > 0) {
      let topTenStoriesList: IStory[] = [];

      // loop through the ids and get their full stories and user info
      for (const storyID of randomizedIDs) {
        const story = await getStory(storyID);
        console.log(story);
        if (story) topTenStoriesList.push(story);
      }
      setTopTenStories(topTenStoriesList);
    }
  };

  // get a story using the story id
  const getStory = async (storyID: number) => {
    return fetchItem<IStory>(`${HackerNewsAPI}/item/${storyID}.json`)
      .then((item) => {
        return item as IStory;
      })
      .catch((error) => {
        /* show error message */
        return Promise.reject(error);
      });
  };

  return (
    // console.log("topTenStories", topTenStories),
    <View style={styles.container}>
      <Header title={Title} />
      {topTenStories.length > 0 ? (
        <FlatList
          data={topTenStories}
          keyExtractor={(item, index) => item.title + index}
          renderItem={(story) => <StoryListItem story={story.item} />}
        />
      ) : (
        <LoadingListItem />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
});

export default App;
