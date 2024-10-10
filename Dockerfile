# This Dockerfile is used to build a production image for deployment purposes
# Commands without docker-compose:
# Command to build the image: docker build -t (image name:tag) .
# Command to run the image: docker run -p 3000:3000 --env-file (env file name) (image name:tag)

# Use the official Node.js image as the base image
FROM node:18-alpine AS base

# Declare build arguments and set environment variables
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ARG NEXT_PUBLIC_GOOGLE_MAPS_ID

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ENV NEXT_PUBLIC_GOOGLE_MAPS_ID=$NEXT_PUBLIC_GOOGLE_MAPS_ID

# Set the working directory
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build the application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Setup production image
FROM base AS runner
ENV NODE_ENV=production

# Install only necessary system dependencies
RUN apk add --no-cache libc6-compat

# Copy necessary files
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Ensure node user has the right permissions
RUN chown -R node:node .

# Switch to non-root user for security
USER node

# Expose the port the app runs on
EXPOSE 3000

# Ensure node user has the right permissions
RUN chown -R node:node .

# Switch to non-root user for security
USER node

# Set the command to run the app
CMD ["node", "server.js"]