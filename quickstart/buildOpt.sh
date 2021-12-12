echo "Ready ........................."
echo "adb port clear ...."
adb reverse --remove-all
echo "adb port 8081 to 8081 ...."
adb reverse tcp:8081 tcp:8081
echo "Start react-native Metro ......."
npm start
# npm start -- --reset-cache
