## Database

    -- Open Xampp and run Apache, Mysql
    -- Open phpmyadmin and create database name `sound-friend`

## Installation

    -- Create `.emv` file then copy content form `.env.example` to `.env`
    -- Run `npm install` to install dependencies
    -- Run `npm run dev` to start dev mode
    -- Or run `npm run start` to start production mode

## Docker
    - run `docker-compose up db adminer` to up docker service
    - run `docker-compose down` to down all docker services
    - connect to admier
    - defaule username: `root`, password `example`

## Structure

| Name         | Description                               |
| ------------ | ----------------------------------------- |
| config       | define config of project                  |
| data.example | examples data                             |
| models       | define models                             |
| public/file  | store file uploaded                       |
| routes       | define route of project                   |
| services     | define service to trigger                 |
| types        | define typings (error / success) response |
| utils        | define common utils                       |
