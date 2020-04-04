import React, { useEffect, useState } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Title,
  Text,
  FAB,
} from 'react-native-paper';
import i18n from 'i18n-js';
import { AlertFrequencyType, WashFrequencyType } from 'types';
import { calcFrequency, setFrequency } from '@utils/frequency';
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
  let alertFrequency: AlertFrequencyType | null = null;
  let todayAlertTimes = 0;
  let washFrequency: WashFrequencyType | null = null;

  const [todayWashTimes, setTodayWashTimes] = useState<number>(0);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const editWashFrequency = async (type: string): Promise<void> => {
    let dataTobeSet = todayWashTimes;
    if (type === 'plus') {
      dataTobeSet = todayWashTimes + 1;
    } else {
      dataTobeSet = todayWashTimes - 1;
    }
    setTodayWashTimes(dataTobeSet);
    await setFrequency({ frequency: washFrequency, dataTobeSet, type });
  };

  const hideDialog = (): void => {
    setDialogOpen(false);
  };

  const judgePermissionWhenRendered = async (): Promise<void> => {
    const result = await getNecessaryPermissions();
    if (!result.granted) {
      setDialogOpen(true);
    }
  };

  const getFrequency = async (): Promise<void> => {
    const alertFrequencyJSON = await AsyncStorage.getItem('alert');
    const washFrequencyJSON = await AsyncStorage.getItem('wash');
    if (alertFrequencyJSON) {
      alertFrequency = JSON.parse(alertFrequencyJSON);
      todayAlertTimes = calcFrequency(alertFrequency);
    }
    if (washFrequencyJSON) {
      washFrequency = JSON.parse(washFrequencyJSON);
      setTodayWashTimes(calcFrequency(washFrequency));
    }
  };

  useEffect(() => {
    judgePermissionWhenRendered();
    startLocationUpdates();
    getFrequency();
    // eslint-disable-next-line
  }, []);

  return (
    <View style={styles.container}>
      <Title>{i18n.t('home.title')}</Title>
      <View style={styles.frequencyContainer}>
        <View style={styles.frequencyView}>
          <Text style={styles.frequencyText}>{todayAlertTimes}</Text>
          <Text style={styles.frequencyDescription}>Warning times</Text>
        </View>
        <View style={styles.frequencyContainer}>
          <View>
            <Text style={styles.frequencyText}>{todayWashTimes}</Text>
            <Text style={styles.frequencyDescription}>
              Times you wash your hands
            </Text>
          </View>
          <View>
            <FAB
              small
              icon="minus"
              // eslint-disable-next-line
              onPress={(): any => {
                editWashFrequency('minus');
              }}
            />
            <FAB
              small
              icon="plus"
              // eslint-disable-next-line
              onPress={(): any => {
                editWashFrequency('plus');
              }}
            />
          </View>
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
