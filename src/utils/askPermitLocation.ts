import { Alert } from 'react-native';
import * as Permissions from 'expo-permissions';

const askPermitLocation = async (
  canAsk: boolean,
  status?: string
): Promise<void> => {
  let currentStatus = '';
  if (!status) {
    const { status: statusGot } = await Permissions.getAsync(
      Permissions.LOCATION
    );
    currentStatus = statusGot;
  }
  if (currentStatus !== 'granted' && canAsk) {
    const { status: statusGot } = await Permissions.askAsync(
      Permissions.LOCATION
    );
    await askPermitLocation(false, statusGot);
  }
  if (currentStatus !== 'granted' && !canAsk) {
    Alert.alert(
      'Location not granted',
      'Please let this app make a notification to have you wash your hands',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (): Promise<void> => askPermitLocation(true),
        },
      ]
    );
  }
};

export default askPermitLocation;
