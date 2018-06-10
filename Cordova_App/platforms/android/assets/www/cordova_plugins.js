cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-ionic-keyboard.keyboard",
    "file": "plugins/cordova-plugin-ionic-keyboard/www/android/keyboard.js",
    "pluginId": "cordova-plugin-ionic-keyboard",
    "clobbers": [
      "window.Keyboard"
    ]
  },
  {
    "id": "cordova-plugin-speechrecognition.SpeechRecognition",
    "file": "plugins/cordova-plugin-speechrecognition/www/speechRecognition.js",
    "pluginId": "cordova-plugin-speechrecognition",
    "merges": [
      "window.plugins.speechRecognition"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "cordova-plugin-tts.tts",
    "file": "plugins/cordova-plugin-tts/www/tts.js",
    "pluginId": "cordova-plugin-tts",
    "clobbers": [
      "TTS"
    ]
  },
  {
    "id": "cordova-sqlite-storage.SQLitePlugin",
    "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
    "pluginId": "cordova-sqlite-storage",
    "clobbers": [
      "SQLitePlugin"
    ]
  },
  {
    "id": "cordovanetworkmanager.cordovaNetworkManager",
    "file": "plugins/cordovanetworkmanager/www/cordovaNetworkManager.js",
    "pluginId": "cordovanetworkmanager",
    "clobbers": [
      "window.cordovaNetworkManager"
    ]
  },
  {
    "id": "fr.drangies.cordova.serial.Serial",
    "file": "plugins/fr.drangies.cordova.serial/www/serial.js",
    "pluginId": "fr.drangies.cordova.serial",
    "clobbers": [
      "window.serial"
    ]
  },
  {
    "id": "com.pylonproducts.wifiwizard.WifiWizard",
    "file": "plugins/com.pylonproducts.wifiwizard/www/WifiWizard.js",
    "pluginId": "com.pylonproducts.wifiwizard",
    "clobbers": [
      "window.WifiWizard"
    ]
  },
  {
    "id": "cordova-plugin-hotspot.HotSpotPlugin",
    "file": "plugins/cordova-plugin-hotspot/www/HotSpotPlugin.js",
    "pluginId": "cordova-plugin-hotspot",
    "clobbers": [
      "cordova.plugins.hotspot"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-device": "2.0.2",
  "cordova-plugin-ionic-keyboard": "2.0.5",
  "cordova-plugin-ionic-webview": "1.1.19",
  "cordova-plugin-speechrecognition": "1.1.2",
  "cordova-plugin-splashscreen": "5.0.2",
  "cordova-plugin-tts": "0.2.3",
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-sqlite-storage": "2.3.2",
  "cordovanetworkmanager": "2.4.0",
  "fr.drangies.cordova.serial": "0.0.7",
  "com.pylonproducts.wifiwizard": "0.2.11",
  "cordova-plugin-hotspot": "1.2.10"
};
// BOTTOM OF METADATA
});