# Contributing Guidelines

## Branching

> - Create a new branch for your work
> - Do **NOT** commit directly to the `main` branch

### Use the following format for naming branches:

- feature/ui
- feature/network
- feature/capture
- feature/core

## Commit Message Format

Use the following format:

```
type: Message
```

Types:

- feat: for new features
- ui: for UI changes
- dev: for development setup
- fix: for bug fixes
- refactor: for code improvements
- docs: for documentation

Example:

- feat: Add mirror screen functionality
- ui: Add home page layout
- dev: Add electron auto-reloader

## Workflow

1. Create a new branch:

   ```
   git checkout -b feature/your-feature
   ```

2. Work on your feature
3. Commit small working changes

   ```
   git add .
   git commit -m "type: Message"
   ```

4. Push your branch

   ```
   git push origin feature/your-feature
   ```

5. Create a Pull Request
6. Merge only after testing
