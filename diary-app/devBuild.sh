echo "### 안드로이드 ADB 리셋 ...."
adb reverse --remove-all
echo "## 안드로이드 ADB reverse tcp port ...."
adb reverse tcp:8081 tcp:8081
echo "# 시작 Metro Server ...."
# npm start -- --reset-cache
npm start
