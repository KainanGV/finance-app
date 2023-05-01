#!/usr/bin/env bash

SDK_LINUX=https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip
SDK_MAC=https://dl.google.com/android/repository/sdk-tools-darwin-4333796.zip

if [ -z ${JAVA_HOME+x} ]; then
	echo "\$JAVA_HOME environmental variable is not set."
	echo "Find the location of your Java directory, and then put it in your"
	echo "~/.bash_profile (or any other shell equivalent)"
	exit 0
fi

if [ "$(uname)" == "Darwin" ]; then
    curl "$SDK_MAC" -o ~/androidsdk.zip     
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    wget -O ~/androidsdk.zip "$SDK_LINUX"
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
    echo "Unsupported OS"
    exit 0
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
    echo "Unsupported OS"
    exit 0
fi

unzip -d ~/android-sdk androidsdk.zip

cd ~/android-sdk/tools/bin

./sdkmanager --update
./sdkmanager "platform-tools" "tools" "platforms;android-26" "add-ons;addon-google_apis-google-24" "build-tools;26.0.3" "patcher;v4"

cd ~

if [ -f ~/.zshrc ]; then
	grep "ANDROID_HOME" ~/.zshrc
	if [ $? -ne 0 ]; then
		echo "" >> ~/.zshrc
		echo "" >> ~/.zshrc
		echo "export ANDROID_HOME=$(pwd)/android-sdk" >> ~/.zshrc
		echo "export PATH=\$PATH:\$ANDROID_HOME/platform-tools:\$ANDROID_HOME/tools/bin" >> ~/.zshrc
	fi
else
	if [ ! -f ~/.bash_profile ]; then
		touch ~/.bash_profile
	fi
	grep "ANDROID_HOME" ~/.bash_profile
	if [ $? -ne 0 ]; then
		echo "" >> ~/.bash_profile
		echo "" >> ~/.bash_profile
		echo "export ANDROID_HOME=$(pwd)/android-sdk" >> ~/.bash_profile
		echo "export PATH=\$PATH:\$ANDROID_HOME/platform-tools:\$ANDROID_HOME/tools/bin" >> ~/.bash_profile
	fi
fi

echo "Android SDK Setup complete."
echo ""
echo "Use sdkmanager to install new Android tooling or let other tools"
echo "do it for you (Android Studio/react native)"
echo ""
echo "Restart the terminal to finish setup (no need to logout)"