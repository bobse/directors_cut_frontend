import { React } from 'react';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

export const Alerts = props => {
  if (props.alertErrors) {
    return props.alertErrors.map((error, idx) => {
      if (error.msg && error.msg.length > 0) {
        return (
          <Alert key={idx} status={error?.status}>
            <AlertIcon />
            <AlertDescription>{error?.msg}</AlertDescription>
          </Alert>
        );
      }
      return null;
    });
  }
};
