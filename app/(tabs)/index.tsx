import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged, 
  User,
  signOut 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '../../firebaseConfig';
import SellerPortal from './SellerPortal';

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("🔥 Auth state changed - User:", currentUser?.email || "null");
      setUser(currentUser);
      setLoading(false);        // ← This is the key fix
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);                    // Show loading while signing in
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');

      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      console.log("✅ Google Sign-In successful, saving to Firestore...");

      await setDoc(doc(db, "users", firebaseUser.uid), {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        role: 'courier',
        lastLogin: new Date().toISOString(),
      }, { merge: true });

      console.log("✅ User data saved to Firestore!");
    } catch (error: any) {
      console.error("❌ Google Sign In Error:", error);
      Alert.alert("Login Failed", error.message || "Could not sign in");
      setLoading(false);
    }
  };

  // If user is logged in → Show SellerPortal
  if (user) {
    console.log("👤 Rendering SellerPortal for user:", user.email);
    return <SellerPortal product={null} onBack={() => signOut(auth)} />;
  }

  // Loading State
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ef4444" />
        <Text style={{ marginTop: 12, color: '#666' }}>Signing you in...</Text>
      </View>
    );
  }

  // Login Screen
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Levels Courier App</Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Login with Google" 
          onPress={signInWithGoogle}
        />
      </View>

      <Text style={styles.note}>
        Using Firebase Google Sign-In (Web)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '85%',
    marginBottom: 30,
  },
  note: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});