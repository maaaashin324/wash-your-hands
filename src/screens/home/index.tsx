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
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import TRANSLATIONS from '@constants/translations';
import { WashHandsTimeType } from 'types/washHandsTime';
import { getNecessaryPermissions } from '@utils/permissions';
import startLocationUpdates from '@utils/startLocationUpdates';

i18n.translations = TRANSLATIONS;
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginTop: 10,
  },
  timesText: {
    alignSelf: 'center',
    fontSize: 500,
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
      <Text style={styles.timesText}>{calculateWashHandsTime()}</Text>
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
