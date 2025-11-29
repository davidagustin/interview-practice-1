# Dev Container Setup

This directory contains the configuration for developing this project in a containerized environment using VS Code Dev Containers or GitHub Codespaces.

## What's Included

- **Node.js 22** - Latest LTS version
- **Git** - Version control
- **GitHub CLI** - For GitHub operations
- **Pre-configured VS Code extensions**:
  - ESLint
  - Prettier
  - TypeScript
  - Vitest Explorer
  - Tailwind CSS IntelliSense

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed and running
- [VS Code](https://code.visualstudio.com/) or [Cursor](https://cursor.sh/) with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Opening in a Dev Container

1. Open the project in VS Code/Cursor
2. Press `F1` or `Cmd+Shift+P` (Mac) / `Ctrl+Shift+P` (Windows/Linux)
3. Select **"Dev Containers: Reopen in Container"**
4. Wait for the container to build and start
5. Dependencies will be automatically installed via `postCreateCommand`

### Port Forwarding

The following ports are automatically forwarded:
- **5173** - Vite development server
- **4173** - Vite preview server

### Using the Dev Container

Once the container is running:

```bash
# Start the development server
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Build for production
npm run build
```

### Customization

To customize the container, you can:

1. **Modify `devcontainer.json`** - Change Node.js version, add features, or configure extensions
2. **Use the Dockerfile** - Uncomment the `build` section in `devcontainer.json` and customize `Dockerfile` for more control
3. **Add features** - See available features at https://containers.dev/features

### Troubleshooting

- **Container won't start**: Ensure Docker is running
- **Port conflicts**: Modify `forwardPorts` in `devcontainer.json`
- **Extensions not working**: Check that extensions are listed in `devcontainer.json`
- **Dependencies not installing**: Check the `postCreateCommand` in `devcontainer.json`

