#!/bin/bash

max_retries=10
retry_count=0

while true; do
  if curl --silent --head http://localhost:4000 | grep "200 OK" > /dev/null; then
    echo "Firebase Auth Emulator is running at http://localhost:4000"
    break
  else
    retry_count=$((retry_count + 1))
    echo "Waiting for Firebase Auth Emulator to start at http://localhost:4000... (Attempt $retry_count/$max_retries)"

    if [ "$retry_count" -ge "$max_retries" ]; then
      echo "Failed to detect Firebase Auth Emulator after $max_retries attempts. Exiting."
      exit 1
    fi

    sleep 5
  fi
done

while true; do
  export_dir="./export"

  firebase emulators:export $export_dir --only auth --force

  echo "Firebase Auth Emulator data exported to $export_dir"

  sleep 10
done
