import React, { useEffect, useState } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Button, Paragraph, Dialog, Portal, List } from 'react-native-paper';
import * as TaskManager from 'expo-task-manager';
import { getNecessaryPermissions } from '@utils/permissions';
import startLocationUpdates from '@utils/startLocationUpdates';
import { makeNotifications } from '@utils/task';
import { GET_LOCATION_TASK } from '@constants/task';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginTop: 10,
  },
});

const HomeScreen: React.FC<{}> = () => {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [washHandsTimeSet, setWashHandsTimeSet] = useState<number[]>([]);

  const hideDialog = (): void => {
    setDialogOpen(false);
  };

  const judgePermissionWhenRendered = async (): Promise<void> => {
    const result = await getNecessaryPermissions();
    if (!result.granted) {
      setDialogOpen(true);
    }
  };

  const getWashYourHandsTime = async (): Promise<void> => {
    const result = await AsyncStorage.getItem('washTimes');
    if (!result) {
      return;
    }
    setWashHandsTimeSet(JSON.parse(result));
  };

  useEffect(() => {
    judgePermissionWhenRendered();
    startLocationUpdates();
    getWashYourHandsTime();
    // eslint-disable-next-line
  }, []);

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>When to wash</List.Subheader>
        {!washHandsTimeSet.length ? (
          <Paragraph>You don&apos;t need to wash your hands now!</Paragraph>
        ) : null}
        {washHandsTimeSet.map((eachTime) => (
          <List.Item key={eachTime} title={eachTime} />
        ))}
      </List.Section>
      <Portal>
        <Dialog visible={isDialogOpen} onDismiss={hideDialog}>
          <Dialog.Title>Permission not granted</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Please let this app use notification and location to have you wash
              your hands
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

TaskManager.defineTask(GET_LOCATION_TASK, makeNotifications);

export default HomeScreen;
