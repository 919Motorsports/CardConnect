import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title, Surface, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../../store/authSlice';
import { colors } from '../../styles/theme';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
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

  const validateForm = () => {
    // Reset password error
    setPasswordError('');
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return false;
    }
    
    // Check password length
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    
    // All validations passed
    return true;
  };

  const handleSignup = async () => {
    // Basic validation
    if (!name || !email || !password || !confirmPassword) return;
    
    // Password validation
    if (!validateForm()) return;
    
    // Dispatch register action
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Surface style={styles.surface}>
          <Title style={styles.title}>Create Account</Title>
          
          <View style={styles.form}>
            <TextInput
              label="Full Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
            />
            
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
              error={!!passwordError || (error && error.includes('password'))}
            />
            
            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              error={!!passwordError}
            />
            
            {(passwordError || error) && (
              <HelperText type="error" visible={!!(passwordError || error)}>
                {passwordError || error}
              </HelperText>
            )}
            
            <Button 
              mode="contained" 
              onPress={handleSignup}
              loading={loading}
              disabled={loading}
              style={styles.button}
            >
              Sign Up
            </Button>
            
            <Button 
              mode="text" 
              onPress={() => navigation.navigate('Login')}
              style={styles.link}
            >
              Already have an account? Log In
            </Button>
          </View>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  surface: {
    flex: 1,
    padding: 20,
    margin: 16,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: colors.primary,
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
  link: {
    marginTop: 16,
  },
});

export default SignupScreen; 
