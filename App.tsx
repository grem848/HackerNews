import React, { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-elements";
import Header from "./components/Header";
import { StoryListItem, LoadingIcon } from "./components/ListItems";
import { HackerNewsAPI, Title } from "./constants";
import IStory from "./interfaces/IStory";
import IUser from "./interfaces/IUser";
import { fetchItem } from "./services/FetchService";
import { getRandomItemsFromArray } from "./utils/utils";

const App: FC = () => {
  const [topTenStories, setTopTenStories] = useState<IStory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // componentdidmount
  useEffect(() => {
    getTopTenStoriesRandomized();
  }, []);

  const getTopTenStoriesRandomized = async () => {
    setLoading(true);
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
        const story: IStory = await getStory(storyID);
        const user: IUser = await getUser(story.by);

        // check if story is defined
        if (story) {
          // check if user is defined, and add id and karma to story
          if (user) {
            story.authorKarma = user.karma;
          }
          topTenStoriesList.push(story);
        }
      }
      // sort top ten stories ascending
      topTenStoriesList.sort((a, b) => a.score - b.score);

      setTopTenStories(topTenStoriesList);
      setLoading(false);
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

  // get a user using the user id
  const getUser = async (userID: string) => {
    return fetchItem<IUser>(`${HackerNewsAPI}/user/${userID}.json`)
      .then((item) => {
        return item as IUser;
      })
      .catch((error) => {
        /* show error message */
        return Promise.reject(error);
      });
  };

  return (
    <View style={styles.container}>
      <Header title={Title} reloadFunc={getTopTenStoriesRandomized} />
      {loading ? (
        <LoadingIcon />
      ) : (
        <FlatList
          data={topTenStories}
          keyExtractor={(item, index) => item.title + index}
          renderItem={(story) => <StoryListItem story={story.item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
});

export default App;
