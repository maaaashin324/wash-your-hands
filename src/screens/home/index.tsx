import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { askLocationPermission } from '@utils/permissionLocation';
import { askNotificationPermission } from '@utils/permissionNotification';
import { getNecessaryPermissions } from '@utils/permissions';
import startLocationUpdates from '@utils/startLocationUpdates';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 100,
  },
  sentence: {
    fontSize: 50,
  },
});

const HomeScreen: React.FC<{}> = () => {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isAlertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);

  const hideDialog = (): void => {
    setDialogOpen(false);
  };

  const hideAlertDialog = (): void => {
    setAlertDialogOpen(false);
  };

  const changePermissionFromDialog = async (): Promise<void> => {
    const isLocationPermitted = await askLocationPermission();
    const isNotificationPermitted = await askNotificationPermission();
    if (!isLocationPermitted || !isNotificationPermitted) {
      setAlertDialogOpen(true);
    }
    setDialogOpen(false);
  };

  const judgePermissionWhenRendered = async (): Promise<void> => {
    const result = await getNecessaryPermissions();
    if (!result.granted) {
      setDialogOpen(true);
    }
  };

  useEffect(() => {
    judgePermissionWhenRendered();
    startLocationUpdates();
    // eslint-disable-next-line
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wash your hands</Text>
      <Text style={styles.sentence}>
        Why not wash your hands to guard you from COVID19?
      </Text>
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
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={changePermissionFromDialog}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={isAlertDialogOpen} onDismiss={hideDialog}>
          <Dialog.Title>Permission not granted</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Permission is not enough. Go to settings and change the
              permissions.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideAlertDialog}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default HomeScreen;
