import * as Keychain from 'react-native-keychain';

export const setBiometricAuth = async (mnemonic) => {
  await Keychain.setGenericPassword('wallet', mnemonic, {
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
  });
};