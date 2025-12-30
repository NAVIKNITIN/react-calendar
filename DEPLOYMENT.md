# 🚀 Deployment Guide - Publish to npm

## ✅ Prerequisites Completed

- ✅ npm account created
- ✅ Package configured with your details
- ✅ Build optimized with default export
- ✅ All files ready

## 📋 Step-by-Step Deployment

### Step 1: Verify You're Logged In

```bash
npm whoami
```

If not logged in, run:

```bash
npm login
```

Enter your:

- Username: `codewithnitin`
- Password: (your npm password)
- Email: (your npm email)

### Step 2: Verify Package Configuration

Check your package.json one more time:

```bash
cat package.json | grep -A 5 '"name"'
```

Should show: `"name": "react-smart-calendar"`

### Step 3: Build the Package

```bash
npm run build
```

This will:

- ✅ Compile TypeScript
- ✅ Generate type definitions (`.d.ts` files)
- ✅ Bundle JavaScript
- ✅ Bundle CSS
- ✅ Create source maps

Expected output:

```
✓ built in ~500ms
dist/
  ├── index.js
  ├── index.d.ts
  ├── index.js.map
  └── style.css
```

### Step 4: Test What Will Be Published (Dry Run)

```bash
npm pack --dry-run
```

This shows exactly what files will be included in the package.

### Step 5: Verify Package Contents

```bash
npm pack
```

This creates a `.tgz` file. You can inspect it:

```bash
tar -tzf codewithnitin-react-calendar-1.0.0.tgz
```

### Step 6: Publish to npm

**Important**: Since you're using a scoped package (`@codewithnitin/...`), you need the `--access public` flag:

```bash
npm publish --access public
```

### Step 7: Verify Publication

1. Check on npm website:

   ```
   https://www.npmjs.com/package/react-smart-calendar
   ```

2. Test installation in a new project:
   ```bash
   mkdir test-install
   cd test-install
   npm init -y
   npm install react-smart-calendar
   ```

## 🎯 Quick Command Summary

```bash
# 1. Login (if not already)
npm login

# 2. Build
npm run build

# 3. Publish
npm publish --access public
```

## 📦 What Gets Published

Your package will include:

- ✅ `dist/index.js` - Compiled JavaScript
- ✅ `dist/index.d.ts` - TypeScript definitions
- ✅ `dist/style.css` - Styles
- ✅ `README.md` - Documentation
- ✅ `package.json` - Package metadata

**Excluded** (via `.npmignore`):

- ❌ Source files (`src/`)
- ❌ Development files
- ❌ Test files
- ❌ Config files

## 🔄 Updating the Package

When you make changes:

1. **Update version** in `package.json`:

   ```json
   "version": "1.0.1"  // patch
   "version": "1.1.0"  // minor
   "version": "2.0.0"  // major
   ```

   Or use npm version:

   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   npm version minor  # 1.0.0 -> 1.1.0
   npm version major  # 1.0.0 -> 2.0.0
   ```

2. **Build and publish**:
   ```bash
   npm run build
   npm publish --access public
   ```

## ⚠️ Common Issues & Solutions

### Issue: "Package name already exists"

**Solution**: You're using `react-smart-calendar` which is scoped to your account, so this shouldn't happen.

### Issue: "You must verify your email"

**Solution**:

1. Check your email for verification link from npm
2. Click the verification link
3. Try publishing again

### Issue: "403 Forbidden"

**Solution**:

- Make sure you're logged in: `npm whoami`
- Check you own the scope: `npm view react-smart-calendar`
- Use `--access public` for scoped packages

### Issue: Build errors

**Solution**:

```bash
# Clean and rebuild
rm -rf dist node_modules/.vite
npm install
npm run build
```

## ✅ Post-Publication Checklist

- [ ] Package is visible on npmjs.com
- [ ] README displays correctly
- [ ] Installation works: `npm install react-smart-calendar`
- [ ] Import works in a test project
- [ ] CSS imports correctly
- [ ] TypeScript types work

## 🎉 Success!

Once published, users can install and use your package:

```bash
npm install react-smart-calendar
```

```tsx
import Calendar from "react-smart-calendar";
import "react-smart-calendar/style.css";
```
