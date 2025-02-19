FROM node:20-alpine

WORKDIR /backend

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . ./

# Build TypeScript
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]