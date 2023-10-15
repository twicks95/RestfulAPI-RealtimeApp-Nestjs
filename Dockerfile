# Build stage
# FROM node:18 AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install -g pnpm
# RUN npm cache clean --force
# # RUN export SHELL=/bin/sh
# # RUN pnpm setup
# # RUN pnpm install -g @nestjs/cli
# # ENV PNPM_HOME /usr/local/share/.pnpm-global
# # # PNPM_VERSION=8
# # # RUN pnpm install --global $PNPM_VERSION
# # # RUN npm install -g npm@10.2.0
# RUN pnpm install
# COPY . .
# # # RUN npm prune --production # Remove unnecessary files, such as development dependencies, after building your application. This reduces the image size.
# RUN ls
# RUN echo $PATH 
# RUN pnpm run build

# # # Production stage
# FROM node:18
# # RUN adduser wsuppz \
# #     --ingroup sudo
# # USER wsuppz
# WORKDIR /app
# # COPY --from=builder /app .
# # Copy only the necessary files from the "builder" stage
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/package*.json ./
# ENV NODE_ENV=development
# EXPOSE 3001
# CMD [ "node", "dist/main.js" ]
# # CMD [ "pnpm", "run", "start:dev" ]

# SUCCESS
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN npm cache clean --force
RUN pnpm install
COPY . .
RUN pnpm run build
WORKDIR /app
ENV NODE_ENV=development
EXPOSE 3001
CMD ["pnpm", "run", "start:dev" ]