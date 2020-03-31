import React, { useEffect, useState } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Title,
  Subheading,
  Divider,
  List,
} from 'react-native-paper';
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
      <Title>Wash your hands</Title>
      <Subheading>
        Why not wash your hands to guard you from COVID19?
      </Subheading>
      <Divider />
      <List.Section>
        <List.Subheader>When to wash</List.Subheader>
        {washHandsTimeSet.map((eachTime) => (
          <List.Item title={eachTime} />
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
