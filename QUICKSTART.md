# Quick Start Guide

## 📋 Your iOS Button Card is Ready!

Thank you for using iOS Button Card. Here's a quick overview of what you have:

## 🚀 Getting Started (5 Minutes)

### 1. Installation
Choose your installation method:

**Option A: HACS (Recommended)**
- See [INSTALL.md](INSTALL.md) for step-by-step instructions

**Option B: Manual Installation**
- Copy `custom-button-card.js` and `custom-button-card-editor.js` to Home Assistant's `www/` directory
- Add resources to your Lovelace configuration
- Restart Home Assistant

### 2. First Card
Add to your Lovelace dashboard:

```yaml
type: ios-button-card
entity: light.living_room
title: Living Room
show_icon: true
show_name: true
```

### 3. Test in Development
- Open `develop.html` in a browser
- Add/update entities using the form
- Test interactions with preview cards
- Modify configuration JSON and apply

## 📁 What's Included

| File | Purpose |
|------|---------|
| `custom-button-card.js` | Main card component (Web Component) |
| `custom-button-card-editor.js` | Visual editor for Lovelace |
| `schema.js` | Configuration schema for the editor |
| `develop.html` | Local development and testing environment |
| `README.md` | Full documentation and feature guide |
| `INSTALL.md` | Detailed installation instructions |
| `CONTRIBUTING.md` | Contributing guidelines for developers |
| `example-config.yaml` | 14+ configuration examples |
| `manifest.json` | Card metadata for Home Assistant |
| `package.json` | NPM dependencies and scripts |
| `.babelrc` | Babel transpiler configuration |
| `webpack.config.js` | Build configuration |

## ✨ Key Features

✅ **Full Customization**
- Custom titles and icons
- Configurable colors for active/inactive states
- Show/hide icon and name independently

🎯 **Advanced Interactions**
- Tap: Configure action for single click
- Hold: 500ms press for long-press action
- Double Tap: Rapid click detection

🎨 **Visual Editor Integration**
- Point-and-click configuration
- Entity picker with autocomplete
- No manual YAML needed

📱 **Responsive & Mobile-Friendly**
- Works on desktop and mobile
- Touch event support
- Smooth animations

## 🔧 Configuration Options

```yaml
type: ios-button-card
entity: light.living_room        # Required: Entity ID
title: Living Room               # Display title
icon: mdi:lightbulb             # Icon name (MDI)
icon_color: var(--primary-text-color)        # Inactive color
active_icon_color: var(--accent-color)       # Active color
show_icon: true                 # Show/hide icon
show_name: true                 # Show/hide title
tap_action:
  action: toggle
hold_action:
  action: more-info
double_tap_action:
  action: more-info
```

**Behavior Options:** `toggle`, `more-info`, `call-service`, `none`

## 🌐 Common Entity Types

| Entity | Icon Example | Use Case |
|--------|--------------|----------|
| `light.*` | `mdi:lightbulb` | Lights and lamps |
| `switch.*` | `mdi:toggle-switch` | Switches and appliances |
| `fan.*` | `mdi:fan` | Fans and ventilation |
| `cover.*` | `mdi:window-closed` | Blinds and doors |
| `lock.*` | `mdi:lock` | Locks and gates |
| `climate.*` | `mdi:thermostat` | AC and heaters |

Browse all icons at [materialdesignicons.com](https://materialdesignicons.com/)

## 📚 Documentation

- **[README.md](README.md)** - Complete feature documentation
- **[INSTALL.md](INSTALL.md)** - Installation and troubleshooting
- **[example-config.yaml](example-config.yaml)** - 14+ real-world examples
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development guide

## 🧪 Development

### Using develop.html
1. Open `develop.html` in your browser
2. Mock Home Assistant entities appear on the left
3. Configure cards in the center section
4. See previews on the right
5. Check console for debugging output

### Building from Source
```bash
npm install          # Install dependencies
npm run build        # Build for production
npm run watch        # Watch mode for development
npm run dev          # Start dev server
```

### Project Structure for Developers
```
lovelace-ios-button/
├── custom-button-card.js          # Main card (LitElement)
├── custom-button-card-editor.js   # Editor component
├── schema.js                      # UI schema
├── develop.html                   # Dev environment
└── tests/                         # Add unit tests here
```

## ❓ FAQ

**Q: Does it work with all entities?**
A: Works best with light, switch, fan, cover, lock, and climate. Other domains may have limited functionality.

**Q: Can I use RGB colors?**
A: Yes! Use `rgb(255, 0, 0)` or hex `#FF0000` or CSS variables.

**Q: How do I use the visual editor?**
A: Add the card in Lovelace edit mode, all options are available in the UI without YAML.

**Q: Can I change the button size?**
A: Currently fixed at 3x3 grid size. Use CSS custom properties to adjust.

**Q: How do I report bugs?**
A: Open an issue on GitHub with your configuration and browser console errors.

## 🎯 Next Steps

1. **Copy files to Home Assistant** (`www/ios-button-card/`)
2. **Add resource to your Lovelace** (see INSTALL.md)
3. **Create your first card** (see examples below)
4. **Customize with your colors and icons**

## 📝 Quick Example

```yaml
- type: ios-button-card
  entity: light.bedroom
  title: Bedroom Light
  icon: mdi:lamp
  icon_color: '#FFD700'
  active_icon_color: '#FF6B6B'
  show_name: true
  show_icon: true
  tap_action:
    action: toggle
  hold_action:
    action: more-info
  double_tap_action:
    action: none
```

## 📞 Support

- 📖 Check [README.md](README.md) for comprehensive docs
- 🔧 See [INSTALL.md](INSTALL.md) for troubleshooting
- 💬 Home Assistant Community Forum
- 🐛 GitHub Issues for bug reports

---

**Happy automating!** 🏠✨

For full documentation, see [README.md](README.md)
