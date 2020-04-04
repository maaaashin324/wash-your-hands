import React, { useEffect, useState } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Title,
  Text,
} from 'react-native-paper';
import i18n from 'i18n-js';
import { WashHandsTimeType } from 'types/washHandsTime';
import { getNecessaryPermissions } from '@utils/permissions';
import startLocationUpdates from '@utils/startLocationUpdates';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginTop: 10,
  },
  frequencyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  frequencyView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  frequencyText: {
    alignSelf: 'center',
    fontSize: 200,
  },
  frequencyDescription: {
    alignSelf: 'center',
    fontSize: 100,
  },
});

const HomeScreen: React.FC<{}> = () => {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [washHandsTimeSet, setWashHandsTimeSet] = useState<WashHandsTimeType>(
    null
  );

  const hideDialog = (): void => {
    setDialogOpen(false);
  };

  const judgePermissionWhenRendered = async (): Promise<void> => {
    const result = await getNecessaryPermissions();
    if (!result.granted) {
      setDialogOpen(true);
    }
  };

  const getWashHandsTime = async (): Promise<void> => {
    const result = await AsyncStorage.getItem('washTimes');
    if (!result) {
      return;
    }
    setWashHandsTimeSet(JSON.parse(result));
  };

  const calculateWashHandsTime = (): number => {
    const now = new Date();
    if (!washHandsTimeSet) {
      return 0;
    }
    const currentYearSet = washHandsTimeSet[now.getFullYear()];
    if (!currentYearSet) {
      return 0;
    }
    const currentMonthSet = washHandsTimeSet[now.getFullYear()][now.getMonth()];
    if (!currentMonthSet) {
      return 0;
    }
    const currentDateSet =
      washHandsTimeSet[now.getFullYear()][now.getMonth()][now.getDate()];
    if (!currentDateSet) {
      return 0;
    }
    return currentDateSet.length;
  };

  useEffect(() => {
    judgePermissionWhenRendered();
    startLocationUpdates();
    getWashHandsTime();
    // eslint-disable-next-line
  }, []);

  return (
    <View style={styles.container}>
      <Title>{i18n.t('home.title')}</Title>
      <View style={styles.frequencyContainer}>
        <View style={styles.frequencyView}>
          <Text style={styles.frequencyText}>{calculateWashHandsTime()}</Text>
          <Text style={styles.frequencyDescription}>Warning times</Text>
        </View>
        <View style={styles.frequencyContainer}>
          <Text style={styles.frequencyText}>0</Text>
          <Text style={styles.frequencyDescription}>
            How many times you wash your hands
          </Text>
        </View>
      </View>
      <Portal>
        <Dialog visible={isDialogOpen} onDismiss={hideDialog}>
          <Dialog.Title>{i18n.t('home.dialogTitle')}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{i18n.t('home.dialogContent')}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default HomeScreen;
