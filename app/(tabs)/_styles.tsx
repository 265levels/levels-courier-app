import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#09090b',
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ef4444',
    letterSpacing: 2,
  },
  tagline: {
    color: '#71717a',
    fontSize: 10,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#18181b',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  input: {
    backgroundColor: '#09090b',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#3f3f46',
  },
  button: {
    backgroundColor: '#ef4444',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  // Slideshow specific styles
  slideshowContainer: {
    position: 'relative',
    width: '100%',
    height: 280,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  nextBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  infoSection: {
    marginTop: 15,
  },
  destText: {
    color: '#ef4444',
    fontWeight: 'bold',
    fontSize: 11,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  titleText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descText: {
    color: '#a1a1aa',
    fontSize: 14,
    lineHeight: 20,
  },
  confirmButton: {
    backgroundColor: '#22c55e',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  }
});