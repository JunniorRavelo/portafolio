# Next.js Project

This project is built with Next.js and comes preconfigured with a Dockerfile and a GitHub Actions workflow for CI/CD.

## Project Contents

- **Dockerfile**: Included for building a production-ready Docker image.
- **.env.example**: Provided as a template. Copy it to create your own `.env.local` file and configure your environment variables.
- **GitHub Actions Workflow**: A workflow YAML file is already set up under `.github/workflows/ci.yml` to automate testing and building on pushes and pull requests.

## Setup

1. Copy the `.env.example` file to `.env.local` and fill in your environment-specific variables.
2. Install the project dependencies and start the development server using the standard Next.js commands.
3. If using Docker, build the image and run the container as outlined in the Dockerfile.
4. The GitHub Actions workflow will automatically run on pushes and pull requests to the main branch.

## Requirements

- Docker (if you plan to use containerization)
- Node.js
- A GitHub account for utilizing GitHub Actions

## Notes

- Do not commit your `.env.local` file to version control.
- Customize the configurations as needed to suit your project's requirements.
