FROM node:20.10.0-slim

WORKDIR /emulators

RUN apt-get update && apt-get install -y curl \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN npm install -g firebase-tools

COPY . .

# Firebase Emulator UI
EXPOSE 4000
# Firebase Emulator Auth
EXPOSE 9099

CMD ["npm", "run", "emulators"]
