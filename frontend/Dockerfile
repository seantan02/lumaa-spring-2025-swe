FROM node:latest as build

WORKDIR /frontend

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . ./

# Build TypeScript
RUN npm run build

# Step 2: Serve the app with a static server (nginx)
FROM nginx:alpine

# Copy the build folder from the previous stage to nginx's html folder
COPY --from=build /frontend/build /usr/share/nginx/html

# Expose port 80 for the app to be accessed
EXPOSE 80

# Start nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]