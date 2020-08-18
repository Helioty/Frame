# Frame

# Add Platforms
npx cap add ios
npx cap add android
npx cap add electron

# Open IDE to build, run, and deploy
npx cap open ios
npx cap open android
npx cap open electron

# Syncing your app with Capacitor
### Every time you perform a build (e.g. ionic build) that changes your web directory (default: www), you'll need to copy those changes down to your native projects:
npx cap copy

# Complete tutorial
https://capacitorjs.com/docs/getting-started/with-ionic