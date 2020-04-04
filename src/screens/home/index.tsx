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
import { AlertFrequencyType, WashFrequencyType } from 'types';
import { calcFrequency } from '@utils/calcFrequency';
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
  const [alertFrequency, setAlertFrequency] = useState<AlertFrequencyType>(
    null
  );
  const [washFrequency, setWashFrequency] = useState<WashFrequencyType>(null);

  const hideDialog = (): void => {
    setDialogOpen(false);
  };

  const judgePermissionWhenRendered = async (): Promise<void> => {
    const result = await getNecessaryPermissions();
    if (!result.granted) {
      setDialogOpen(true);
    }
  };

  const getAlertFrequency = async (): Promise<void> => {
    const result = await AsyncStorage.getItem('washTimes');
    if (!result) {
      return;
    }
    setAlertFrequency(JSON.parse(result));
  };

  useEffect(() => {
    judgePermissionWhenRendered();
    startLocationUpdates();
    getAlertFrequency();
    // eslint-disable-next-line
  }, []);

  return (
    <View style={styles.container}>
      <Title>{i18n.t('home.title')}</Title>
      <View style={styles.frequencyContainer}>
        <View style={styles.frequencyView}>
          <Text style={styles.frequencyText}>
            {calcFrequency(alertFrequency)}
          </Text>
          <Text style={styles.frequencyDescription}>Warning times</Text>
        </View>
        <View style={styles.frequencyContainer}>
          <Text style={styles.frequencyText}>0</Text>
          <Text style={styles.frequencyDescription}>
            {calcFrequency(washFrequency)}
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
