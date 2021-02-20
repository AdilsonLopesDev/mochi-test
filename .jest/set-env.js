process.browser = true;
process.env.NEXT_PUBLIC_IS_DEVELOPMENT = '1';
process.env.NEXT_PUBLIC_GOOGLE_API_KEY = 'AIzaSyBH20dT6aMpdH7k932v8BrKM0pjjT9dHzo'

Object.defineProperty(window, 'google', {
  value: {
    maps: {},
  },
  writable: true,
});
