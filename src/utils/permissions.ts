import * as Permissions from 'expo-permissions';

export interface GetNecessaryPermission {
  granted: boolean;
  detail: {
    [key: string]: boolean;
  };
}

// eslint-disable-next-line
export const getNecessaryPermissions = async (): Promise<
  GetNecessaryPermission
> => {
  const { granted, permissions } = await Permissions.getAsync(
    Permissions.LOCATION,
    Permissions.NOTIFICATIONS
  );
  return {
    granted,
    detail: {
      [Permissions.LOCATION]: permissions[Permissions.LOCATION].granted,
      [Permissions.NOTIFICATIONS]:
        permissions[Permissions.NOTIFICATIONS].granted,
    },
  };
};
