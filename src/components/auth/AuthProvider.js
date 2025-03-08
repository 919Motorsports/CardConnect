import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { setUser } from '../../store/authSlice';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '../../styles/theme';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [initializing, setInitializing] = React.useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }));
      } else {
        dispatch(setUser(null));
      }
      
      if (initializing) {
        setInitializing(false);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [dispatch, initializing]);

  if (initializing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});

export default AuthProvider; 