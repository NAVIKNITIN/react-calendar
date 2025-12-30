# Publishing to npm - Step by Step Guide

## ✅ Package Name Configured

Your package is configured as: `react-smart-calendar`

This is a scoped package, which means:

- It's associated with your npm account (`codewithnitin`)
- You'll need to use `--access public` when publishing
- Users will install it as: `npm install react-smart-calendar`

## Prerequisites

1. **npm account**: Create an account at [npmjs.com](https://www.npmjs.com/signup)
2. **Login to npm**: Run `npm login` in your terminal
3. **Update package name**: Change the name in `package.json` (see above)

## Before Publishing

### 1. Verify package.json

Your package.json is already configured with:

- `name`: `react-smart-calendar` ✅
- `author`: `Nitin Navik` ✅
- `repository.url`: `https://github.com/codewithnitin/react-calendar.git` ✅

**Note**: If you don't have a GitHub repository yet, you can:

- Create one on GitHub and update the URL
- Or remove the repository field if you don't plan to have one

### 2. Build the Package

```bash
npm run build
```

This will create the `dist/` folder with:

- `index.js` - The compiled JavaScript
- `index.d.ts` - TypeScript type definitions
- `style.css` - The CSS styles

### 3. Test the Build Locally (Optional)

You can test the package locally before publishing:

```bash
npm pack
```

This creates a `.tgz` file. You can install it in another project to test:

```bash
npm install /path/to/react-calendar-1.0.0.tgz
```

## Publishing Steps

### Step 1: Verify Everything is Ready

```bash
# Check what will be published
npm pack --dry-run

# Verify the package.json
npm publish --dry-run
```

### Step 2: Publish to npm

**For a scoped package** (if using `@yourusername/react-calendar`):

```bash
npm publish --access public
```

**For a regular package** (if you chose a different unique name):

```bash
npm publish
```

### Step 3: Verify Publication

Check your package on npm:

```
https://www.npmjs.com/package/react-smart-calendar
```

## Installation After Publishing

Users will install your package like this:

```bash
npm install react-smart-calendar
```

## Updating the Package

When you make changes:

1. Update the version in `package.json`:

   - Patch: `1.0.1` (bug fixes)
   - Minor: `1.1.0` (new features)
   - Major: `2.0.0` (breaking changes)

2. Or use npm version:

   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   npm version minor  # 1.0.0 -> 1.1.0
   npm version major  # 1.0.0 -> 2.0.0
   ```

3. Build and publish:
   ```bash
   npm run build
   npm publish --access public  # For scoped packages
   ```

## Important Notes

- The `prepublishOnly` script in package.json will automatically build before publishing
- Make sure `dist/` folder is included (it's in the `files` array)
- The package uses peer dependencies for React, so users need to install React separately
- CSS must be imported separately: `import 'react-smart-calendar/style.css'`

## Troubleshooting

### "Package name already exists"

- Use a scoped package: `@yourusername/react-calendar`
- Or choose a different unique name

### "You must verify your email"

- Check your npm account email and verify it

### Build errors

- Make sure all dependencies are installed: `npm install`
- Check TypeScript errors: `npm run build`

### Scoped package access

- Scoped packages are private by default
- Use `--access public` flag to make it public
