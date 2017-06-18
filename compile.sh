#!/usr/bin/env bash

# Mac OS X
if [ "$(uname)" == "Darwin" ]; then
  cd ./src/mac;
  make;
  mv globalkeypress ../../bin/globalkeypress;
  make clean;
  cd ../..;

# GNU/Linux
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
  cd ./src/linux;
  make;
  mv globalkeypress ../../bin/globalkeypress;
  make clean;
  cd ../..;

# 32 bits Windows NT
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
  echo 'no support for win32';
# 64 bits Windows NT platform
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
  echo 'no support for win64';
fi
