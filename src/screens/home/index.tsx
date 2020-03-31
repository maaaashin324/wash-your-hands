import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { enableLocationPermission } from '@utils/askPermitLocation';
import { askPermitNotifications } from '@utils/askPermitNotifications';
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

  const hideDialog = (): void => {
    setDialogOpen(false);
  };

  const changePermissionFromDialog = async (): Promise<void> => {
    await enableLocationPermission(true);
    setDialogOpen(false);
  };

  const judgeLocationPermissionWhenRendered = async (): Promise<void> => {
    const result = await enableLocationPermission(true);
    if (!result) {
      setDialogOpen(result);
    }
  };

  useEffect(() => {
    askPermitNotifications(true);
    judgeLocationPermissionWhenRendered();
    startLocationUpdates();
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
      </Portal>
    </View>
  );
};

export default HomeScreen;
