#!/usr/bin/env bash

# Mac OS X
if [ "$(uname)" == "Darwin" ]; then
  gcc -Wall -o ./bin/globalkeypress-daemon ./src/mac/globalkeypress.c -framework ApplicationServices;

# GNU/Linux
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
  cd ./src/linux;
  make;
  mv skeylogger ../../bin/globalkeypress-daemon;
  cd ../..;

# 32 bits Windows NT
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
  echo 'no support for win32';
# 64 bits Windows NT platform
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
  echo 'no support for win64';
fi
