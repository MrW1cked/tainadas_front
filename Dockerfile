# Use the official Nginx image to serve static files
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static site files to nginx public folder
COPY . /usr/share/nginx/html

# Expose the desired port
EXPOSE 9079

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

