import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import i18n from 'i18n-js';
import MyCard from '@components/myCard';
import { videoListsWithYoutubeURL } from './utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myCard: {
    marginBottom: 20,
  },
});

const HowToWashScreen: React.FC<{ navigation }> = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <FlatList
      data={videoListsWithYoutubeURL}
      keyExtractor={(item): string => item.title}
      renderItem={({ item }): React.ReactElement => (
        <MyCard
          key={item.title}
          title={item.title}
          content={item.subTitle}
          thumbnail={item.thumbnailURL}
          buttonTitle={i18n.t('howToWash.watchButton')}
          callback={(): void => {
            navigation.navigate('YouTube', {
              uri: item.youtubeURL,
            });
          }}
          style={styles.myCard}
        />
      )}
    />
  </SafeAreaView>
);

export default HowToWashScreen;
