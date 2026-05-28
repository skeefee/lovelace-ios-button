# iOS Button Card for Home Assistant 🎨

A fully configurable, feature-rich custom button card for Home Assistant Lovelace with advanced interaction support.

## Features

✨ **Fully Customizable**
- Custom titles and icons (MDI icon support)
- Configurable colors for inactive and active states
- Toggle icon and name visibility

🎯 **Advanced Interactions**
- Single tap actions
- Long hold actions (500ms+)
- Double-tap actions
- Support for toggle, turn on, and turn off actions

🎨 **Visual Polish**
- Smooth transitions and animations
- Active state styling
- Responsive design
- Custom CSS variables for theming

📝 **Visual Editor Support**
- Full Lovelace visual editor integration
- Point-and-click configuration
- Entity picker with autocomplete

## Installation

### Method 1: HACS (Home Assistant Community Store)

1. Open HACS in your Home Assistant instance
2. Click "Explore & Download Repositories"
3. Search for "iOS Button Card"
4. Click "Download"
5. Restart Home Assistant

### Method 2: Manual Installation

1. Create a directory: `custom_components/ios-button-card/`
2. Copy all files to this directory
3. Add to your Lovelace configuration:

```yaml
resources:
  - url: /local/custom-button-card.js
    type: module
```

## Configuration

### Basic Configuration

```yaml
type: ios-button-card
entity: light.living_room
title: Living Room
```

### Full Configuration

```yaml
type: ios-button-card
entity: light.living_room
title: Living Room Light
icon: mdi:lightbulb
icon_color: var(--primary-text-color)
active_icon_color: var(--accent-color)
show_name: true
show_icon: true
tap_action:
  action: more-info
hold_action:
  action: more-info
double_tap_action:
  action: more-info
```

**Note:** The `title` field supports Jinja2 templates. You can use `this.entity_id` as a placeholder for the entity ID:

```yaml
title: "{{ states['this.entity_id'].attributes.friendly_name | replace(' TV', '') }}"
```

### Configuration Options

#### Basic Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | `string` | **required** | Home Assistant entity ID |
| `title` | `string` | Entity friendly name | Display title for the button |
| `remove_text` | `string` or `array` | - | Text to remove from the title (e.g., `" TV"` or `[" Light", " Switch"]`) |
| `icon` | `string` | Auto-detected | MDI icon name (e.g., `mdi:lightbulb`) |

#### Styling Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `icon_color` | `string` | `var(--primary-text-color)` | Icon color when inactive (CSS color or variable) |
| `active_icon_color` | `string` | `var(--accent-color)` | Icon color when active (CSS color or variable) |
| `show_name` | `boolean` | `true` | Show or hide the title label |
| `show_icon` | `boolean` | `true` | Show or hide the icon |

#### Interaction Options

| Option | Type | Values | Description |
|--------|------|--------|-------------|
| `tap_action.action` | `string` | `toggle`, `more-info`, `call-service`, `none` | Action when tapped |
| `hold_action.action` | `string` | `toggle`, `more-info`, `call-service`, `none` | Action when held (500ms+) |
| `double_tap_action.action` | `string` | `toggle`, `more-info`, `call-service`, `none` | Action when double-tapped |

## Usage Examples

### Simple Light Control

```yaml
type: ios-button-card
entity: light.bedroom
title: Bedroom Lamp
icon: mdi:lamp
show_name: true
show_icon: true
tap_action:
  action: toggle
hold_action:
  action: more-info
double_tap_action:
  action: none
```

### Switch Control

```yaml
type: ios-button-card
entity: switch.coffee_machine
title: Coffee Maker
icon: mdi:coffee
icon_color: "#8B4513"
active_icon_color: "#FFD700"
```

### Climate Control

```yaml
type: ios-button-card
entity: climate.living_room
title: AC Unit
icon: mdi:thermostat
tap_action:
  action: toggle
hold_action:
  action: more-info
double_tap_action:
  action: none
```

### Fan Control

```yaml
type: ios-button-card
entity: fan.ceiling_fan
title: Ceiling Fan
icon: mdi:fan
show_name: true
show_icon: true
```

### Media Player with Text Removal

```yaml
type: ios-button-card
entity: media_player.living_room_tv
remove_text: " TV"
icon: mdi:television
tap_action:
  action: toggle
hold_action:
  action: more-info
```

## CSS Customization

The card uses CSS custom properties that can be overridden:

```css
ios-button-card {
  --custom-button-background: var(--card-background-color);
  --custom-button-border-color: var(--divider-color);
  --custom-button-text-color: var(--primary-text-color);
  --custom-button-icon-color: var(--primary-text-color);
  --custom-button-icon-active-color: var(--accent-color);
  --custom-button-active-background: rgba(3, 169, 244, 0.1);
}
```

### Theme Integration

To customize colors globally, add to your theme:

```yaml
ios-button-card:
  --custom-button-background: "#1a1a1a"
  --custom-button-text-color: "#ffffff"
  --custom-button-icon-active-color: "#ff6b6b"
```

## Visual Editor (Lovelace UI)

The card fully supports Home Assistant's visual configuration editor:

1. Add a card to your dashboard
2. Select "iOS Button Card" from the card type list
3. Use the visual editor to configure:
   - Entity selection with autocomplete
   - Title and icon inputs
   - Color pickers for inactive and active states
   - Toggle switches for visibility options
   - Dropdown selectors for interaction behaviors

## Development

### Local Development Setup

1. Clone or download this repository
2. Open `develop.html` in a web browser
3. Configure cards and test interactions
4. View console output for debugging

### Development Features

- **Mock Home Assistant**: Built-in mock of the Home Assistant API
- **Real-time Preview**: See changes instantly
- **Console Output**: All service calls and errors logged
- **State Management**: Add/update entities dynamically
- **Config Testing**: Load, modify, and apply configurations

### Project Structure

```
lovelace-ios-button/
├── custom-button-card.js          # Main card component
├── custom-button-card-editor.js   # Visual editor component
├── develop.html                   # Development environment
├── package.json                   # NPM dependencies
├── manifest.json                  # Card metadata
└── README.md                      # This file
```

### Building

To build the project with webpack:

```bash
npm install
npm run build
npm run watch      # Development watch mode
npm run dev        # Start dev server
```

## Interaction Behavior Details

### Tap (Single Click)
- Triggered by single click/tap
- Default: Toggle entity state
- Configurable to turn on/off

### Hold (Long Press)
- Triggered by holding for 500ms+
- Default: Turn off
- Configurable to toggle/on/off or disabled

### Double Tap
- Triggered within 300ms of second tap
- Default: Turn on
- Configurable to toggle/on/off or disabled

## Icon Support

The card uses Material Design Icons (MDI). Browse available icons at:
- [MDI Icon Library](https://materialdesignicons.com/)

Common icon examples:
- **Lights**: `mdi:lightbulb`, `mdi:lamp`, `mdi:light-switch`
- **Switches**: `mdi:toggle-switch`, `mdi:power`, `mdi:power-plug`
- **Climate**: `mdi:thermostat`, `mdi:fan`
- **Media**: `mdi:play`, `mdi:pause`, `mdi:stop`
- **Security**: `mdi:lock`, `mdi:lock-open`, `mdi:key`

## Troubleshooting

### Card not showing up
1. Ensure the script is properly loaded in your Lovelace resources
2. Check browser console for JavaScript errors (F12)
3. Verify the entity exists in Home Assistant

### Actions not working
1. Check that the entity is not unavailable
2. Verify entity permissions in Home Assistant
3. Check browser console for service call errors

### Colors not applying
1. Use valid CSS colors or CSS variables
2. Ensure color format is correct (hex: `#FF0000`, rgb: `rgb(255,0,0)`)
3. CSS variables should reference Home Assistant theme

## Known Limitations

- Requires LitElement 2.x
- Tested on Home Assistant 2022+
- Some custom attributes may not be reflected in preview

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test using `develop.html`
5. Submit a pull request

## License

Apache 2.0

## Support

For issues, feature requests, or questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Use the Home Assistant community forum

## Changelog

### Version 1.0.0
- Initial release
- Basic card functionality
- Visual editor integration
- Interaction support (tap, hold, double-tap)
- Color customization
- MDI icon support

## Credits

Built for Home Assistant with ❤️
