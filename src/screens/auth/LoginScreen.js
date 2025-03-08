import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Title, Text, Surface, HelperText, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError, resetPassword } from '../../store/authSlice';
import { colors } from '../../styles/theme';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    // Redirect if authenticated
    if (isAuthenticated) {
      navigation.replace('Home');
    }
  }, [isAuthenticated, navigation]);

  const handleLogin = async () => {
    if (!email || !password) return;
    dispatch(loginUser({ email, password }));
  };

  const handlePasswordReset = async () => {
    if (!email) {
      // Show error if email is empty
      return;
    }

    try {
      await dispatch(resetPassword(email)).unwrap();
      setResetEmailSent(true);
    } catch (error) {
      // Error is handled in the slice
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.surface}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/logo-placeholder.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Title style={styles.title}>CardConnect</Title>
          <Text style={styles.subtitle}>Your professional network, beautifully organized</Text>
        </View>
        
        <View style={styles.form}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            error={error && error.includes('email')}
          />
          
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            error={error && error.includes('password')}
          />
          
          {error && (
            <HelperText type="error" visible={!!error}>
              {error}
            </HelperText>
          )}
          
          <Button 
            mode="contained" 
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Log In
          </Button>
          
          <TouchableOpacity onPress={handlePasswordReset}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          
          <Button 
            mode="text" 
            onPress={() => navigation.navigate('Signup')}
            style={styles.link}
          >
            Don't have an account? Sign Up
          </Button>
        </View>
      </Surface>
      
      <Snackbar
        visible={resetEmailSent}
        onDismiss={() => setResetEmailSent(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => setResetEmailSent(false),
        }}
      >
        Password reset email sent. Please check your inbox.
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  surface: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subtitle: {
    color: colors.text,
    textAlign: 'center',
    marginTop: 8,
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    padding: 6,
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: 16,
    color: colors.primary,
  },
  link: {
    marginTop: 16,
  },
});

export default LoginScreen; 
