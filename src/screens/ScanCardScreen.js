import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, ActivityIndicator, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/theme';

const ScanCardScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Request camera permissions
  useEffect(() => {
    // Simulate permission request
    setTimeout(() => {
      setHasPermission(true);
    }, 1000);
  }, []);

  const handleCapture = async () => {
    // Simulate capturing and processing a business card
    setScanning(false);
    setProcessing(true);
    
    setTimeout(() => {
      setProcessing(false);
      // Simulate successful scanning
      navigation.navigate('CardDetails', { 
        newCard: {
          name: 'Alex Rivera',
          company: 'Digital Solutions Ltd',
          title: 'UX Designer',
          email: 'alex@digitalsolutions.com',
          phone: '+1 (555) 234-5678',
        } 
      });
    }, 2000);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No access to camera</Text>
        <Button 
          mode="contained" 
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Go Back
        </Button>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {processing ? (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.processingText}>Processing card...</Text>
        </View>
      ) : (
        <>
          <View style={styles.cameraContainer}>
            {/* Camera placeholder */}
            <View style={styles.camera}>
              <Text style={styles.cameraText}>Camera Preview</Text>
              {scanning && (
                <View style={styles.scanOverlay}>
                  <Text style={styles.scanText}>Position the card in frame</Text>
                </View>
              )}
            </View>
          </View>
          
          <Surface style={styles.controls}>
            <Text style={styles.instructions}>
              Position the business card within the frame and take a photo
            </Text>
            
            <View style={styles.buttonContainer}>
              <Button 
                mode="contained" 
                icon="camera"
                onPress={() => setScanning(true)}
                style={styles.button}
                disabled={scanning}
              >
                Start Scanning
              </Button>
              
              {scanning && (
                <Button 
                  mode="contained" 
                  icon="check"
                  onPress={handleCapture}
                  style={[styles.button, styles.captureButton]}
                >
                  Capture
                </Button>
              )}
              
              <Button 
                mode="outlined" 
                onPress={() => navigation.goBack()}
                style={styles.button}
              >
                Cancel
              </Button>
            </View>
          </Surface>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '90%',
    height: '70%',
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cameraText: {
    color: 'white',
    fontSize: 18,
  },
  scanOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'flex-end',
    padding: 16,
  },
  scanText: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
    borderRadius: 4,
    textAlign: 'center',
  },
  controls: {
    backgroundColor: colors.background,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 10,
  },
  button: {
    marginVertical: 5,
  },
  captureButton: {
    backgroundColor: colors.secondary,
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  processingText: {
    marginTop: 20,
    fontSize: 18,
  },
  errorText: {
    color: colors.error,
    marginBottom: 20,
  },
  text: {
    marginTop: 20,
  },
});

export default ScanCardScreen; 