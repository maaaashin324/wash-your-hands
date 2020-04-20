import React from 'react';
import { Portal, Dialog, Paragraph, Button } from 'react-native-paper';

type MyPortalProps = {
  title: string;
  content: string;
  isDialogOpen: boolean;
  hideDialog: () => void;
};

const MyPortal: React.FC<MyPortalProps> = ({
  title,
  content,
  isDialogOpen,
  hideDialog,
}) => {
  return (
    <Portal>
      <Dialog visible={isDialogOpen} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{content}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default MyPortal;
