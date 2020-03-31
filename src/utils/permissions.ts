import * as Permissions from 'expo-permissions';

export interface GetNecessaryPermissions {
  granted: boolean;
  detail: {
    [key: string]: boolean;
  };
}

// eslint-disable-next-line
export const getNecessaryPermissions = async (): Promise<
  GetNecessaryPermissions
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
