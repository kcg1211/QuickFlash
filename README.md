# Application overview
QuickFlash is an app for you to study from flashcards on the fly. View, add, edit and delete your flashcards in just a flick.

# List of features
- Flashcards - View your flashcards in the 'Card' tab - Shuffle the existing cards to increase the difficulty - Expand your card library by entering a new card question and answer in the 'Add cards' tab

- Account management - Log in to export the flashcards. (Coming soon)

# List of dependencies
"@react-native-async-storage/async-storage": "^1.23.1", "@react-navigation/bottom-tabs": "^6.5.20", "@react-navigation/native": "^6.1.17", "axios": "^1.7.2", "babel-plugin-module-resolver": "^5.0.2", "expo": "~50.0.17", "expo-linking": "~6.2.2", "expo-splash-screen": "~0.26.5", "expo-status-bar": "~1.11.1", "react": "18.2.0", "react-native": "0.73.6", "react-native-dotenv": "^3.4.11", "react-native-gesture-handler": "~2.14.0", "react-native-reanimated": "~3.6.2", "react-native-safe-area-context": "4.8.2", "react-native-screens": "~3.29.0"

Install the above required dependencies by npm install in the console. expo based. Type npx expo start in the terminal. Scan the QR code to open app.

# Applications architecture
This app is built in expo framework. A total of five tabs are rendered by react-navigation. Different screens in the screen folder interact with their corresponding components that are being storedin the components folder. context are provided for applying styles globally in the app. Media contents like splash screen and profile pictures are located in assets.

# How to contribute?
Please email me through ko4059496@gmail.com for suggestions and bug reports. You can also make fixes by cloning the repo. Pull requests will be merged once checked and approved.

# How to report issues?
Feel free to drop me an email at ko4059496@gmail.com.
