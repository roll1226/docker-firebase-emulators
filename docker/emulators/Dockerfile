FROM node:20.10.0-slim

WORKDIR /emulators

RUN npm install -g firebase-tools

COPY . .

# Firebase Emulator UI
EXPOSE 4000
# Firebase Emulator Auth
EXPOSE 9099

CMD ["npx", "firebase", "emulators:start"]
