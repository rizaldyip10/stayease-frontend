# Use Node.js as the base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build the app
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Production image
FROM base AS runner
ENV NODE_ENV production

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Add node_modules/.bin to PATH
ENV PATH /app/node_modules/.bin:$PATH

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD ["yarn", "dev"]