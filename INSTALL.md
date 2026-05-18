# Installation Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [HACS Installation](#hacs-installation)
3. [Manual Installation](#manual-installation)
4. [Verification](#verification)
5. [Troubleshooting](#troubleshooting)

## Prerequisites

- Home Assistant 2021.12 or newer
- Access to your Home Assistant configuration
- Basic knowledge of YAML configuration
- LitElement 2.x support (included in modern Home Assistant)

## HACS Installation

**HACS** is the recommended installation method for most users.

### Step 1: Ensure HACS is Installed
If you haven't installed HACS yet:
1. Visit [HACS website](https://hacs.xyz/)
2. Follow the installation instructions
3. Restart Home Assistant

### Step 2: Install the Card
1. Open Home Assistant
2. Click on HACS in the sidebar
3. Click on "Frontend"
4. Click "Explore & Download Repositories"
5. Search for "iOS Button Card"
6. Click the card when found
7. Click "Download"
8. Restart Home Assistant

### Step 3: Add to Lovelace
No additional configuration needed! HACS automatically registers the card.

---

## Manual Installation

For manual installation or development purposes:

### Step 1: Download Files
Clone the repository or download the files:
```bash
cd /path/to/home-assistant
git clone https://github.com/skeefee/lovelace-ios-button.git www/ios-button-card
```

Or download and extract to: `www/ios-button-card/`

### Step 2: Update Lovelace Configuration
Add the following to your `ui-lovelace.yaml`:

```yaml
resources:
  - url: /local/ios-button-card/custom-button-card.js
    type: module
  - url: /local/ios-button-card/custom-button-card-editor.js
    type: module
```

### Step 3: Restart Home Assistant
1. Go to Settings → Developer Tools
2. Click "YAML" tab
3. Click "Restart Home Assistant" or restart manually

---

## Verification

### Method 1: Using the UI
1. Open your dashboard in edit mode (pencil icon)
2. Click "Add Card"
3. Scroll down to find "iOS Button Card"
4. If visible, installation was successful ✓

### Method 2: Checking Browser Console
1. Open browser developer tools (F12)
2. Go to Console tab
3. You should NOT see JavaScript errors related to the card
4. Look for the custom card registration message

### Method 3: Testing the Card
1. Create a new card with the custom button card type
2. Select an entity (e.g., `light.living_room`)
3. Click "Save"
4. The button should appear and be interactive

---

## Troubleshooting

### Card Not Appearing in Card Type List

**Issue**: iOS Button Card doesn't show up when adding cards

**Solutions**:
1. **Clear browser cache**
   - Ctrl+Shift+Delete (Windows/Linux)
   - Cmd+Shift+Delete (Mac)
   - Select "Cached images and files"

2. **Verify file paths**
   - Check that files exist in `www/ios-button-card/`
   - Verify resources in `ui-lovelace.yaml` point to correct paths

3. **Check browser console** (F12)
   - Look for 404 errors (file not found)
   - Look for JavaScript syntax errors
   - Copy error messages for debugging

4. **Restart Home Assistant**
   - Settings → Developer Tools
   - Click "Restart Home Assistant"
   - If using YAML mode, check syntax

### Card Appears but Won't Load

**Issue**: Card type is recognized but doesn't render

**Solutions**:
1. **Check entity exists**
   ```yaml
   # Open Developer Tools > States
   # Search for your entity (e.g., light.living_room)
   ```

2. **Check for JavaScript errors**
   - Open browser console (F12)
   - Look for errors in red
   - Check Sources tab for syntax errors

3. **Verify LitElement support**
   - Home Assistant 2021.12+
   - Modern browser (Chrome 80+, Firefox 75+, Safari 13+)

### Actions Not Working

**Issue**: Buttons don't toggle entities

**Solutions**:
1. **Verify entity is not unavailable**
   ```yaml
   # Check Developer Tools > States
   # Entity should show "on" or "off" state
   ```

2. **Check entity domain**
   - Card works best with: light, switch, cover, fan, lock
   - Some domains may have limited support

3. **Review interaction settings**
   ```yaml
   interactions:
     tap_behaviour: toggle  # Should not be empty
     hold_behaviour: ""     # Can be empty
   ```

4. **Check permissions**
   - User must have access to control the entity
   - Check Home Assistant user settings

### Colors Not Applying

**Issue**: Icon colors show wrong color

**Solutions**:
1. **Use valid CSS colors**
   - Hex: `#FF0000`
   - RGB: `rgb(255, 0, 0)`
   - Variables: `var(--primary-text-color)`

2. **Avoid spaces in values**
   ```yaml
   # ✓ Correct
   icon_color: var(--primary-text-color)
   
   # ✗ Wrong
   icon_color: var( --primary-text-color )
   ```

3. **Check theme variables**
   - Variables must exist in your Home Assistant theme
   - Common variables: `--primary-text-color`, `--accent-color`

### HACS Installation Issues

**Issue**: HACS doesn't find the card

**Solutions**:
1. **Update HACS**
   - HACS → Menu → Settings
   - Check for updates

2. **Clear HACS cache**
   - HACS → Menu → Settings
   - Click "Clear cache"
   - Reload page

3. **Check internet connection**
   - HACS needs to download from GitHub
   - Check firewall/proxy settings

### Development Environment Issues

**Issue**: `develop.html` won't load files

**Solutions**:
1. **Run a local server**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Then visit: http://localhost:8000/develop.html
   ```

2. **Use VS Code Live Server**
   - Install "Live Server" extension
   - Right-click develop.html
   - "Open with Live Server"

3. **Check file permissions**
   - Ensure `.js` files are readable
   - Check CORS headers if needed

---

## Getting Help

If you're still having issues:

1. **Check the README.md** - Common configurations and examples
2. **Review browser console** - Copy full error messages
3. **Check Home Assistant logs**
   ```yaml
   Settings → Developer Tools → Logs
   ```
4. **Open an issue on GitHub** with:
   - Your card configuration (YAML)
   - Browser console errors (F12 console)
   - Home Assistant version
   - Card version
   - Steps to reproduce

---

## Advanced Configuration

### Using Custom CSS Variables

Define custom CSS in your Home Assistant theme:

```yaml
# In your theme YAML
my-custom-theme:
  ios-button-card:
    --custom-button-background: '#2a2a2a'
    --custom-button-text-color: '#ffffff'
    --custom-button-icon-active-color: '#ff6b6b'
```

### Masonry Layout

Combine with Home Assistant's built-in grid:

```yaml
- type: grid
  columns: 4
  cards:
    - type: ios-button-card
      entity: light.kitchen
      # ... more configuration
```

---

## Next Steps

After successful installation:
1. Read [README.md](README.md) for full configuration options
2. Check [example-config.yaml](example-config.yaml) for usage examples
3. Use the Lovelace visual editor for easier configuration

Welcome to iOS Button Card! 🎉
