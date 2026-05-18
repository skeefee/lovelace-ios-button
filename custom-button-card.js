import { LitElement, html, css } from 'lit-element';

class CustomButtonCard extends LitElement {
  static get properties() {
    return {
      config: { type: Object },
      hass: { type: Object },
      _inputLabel: { type: String },
      isActive: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      :host {
        /*--custom-button-background: var(--ha-card-background, var(--card-background-color, white));*/
        --custom-button-background: rgba(0,0,0,0.3);
        --custom-button-border-color: #fff; /*var(--divider-color, #e0e0e0);*/
        --custom-button-text-color: #fff;
        --custom-button-active-text-color: #000;
        --custom-button-icon-color: #fff;
        --custom-button-icon-active-color: #ffb300;
        --custom-button-active-background: rgba(255,255,255,1);
      }
      * {
        box-sizing: border-box;
      }

      .button-card {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 16px;
        border-radius: 24px;
        background-color: var(--custom-button-background);
        cursor: pointer;
        user-select: none;
        transition: all 0.2s ease;
        gap: 16px;
      }

      .button-card:active {
        transition: all 0.1s ease;
      }

      .button-card.active {
        background-color: var(--custom-button-active-background);
        border-color: var(--custom-button-icon-active-color);
      }

      .button-icon {
        font-size: 32px;
        color: var(--custom-button-icon-color);
        transition: color 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
      }
      .button-icon ha-icon, .button-icon i {
        color: var(--custom-button-icon-color);
      }

      .button-icon.active {
        color: var(--custom-button-icon-active-color);
      }

      .button-icon.active ha-icon, .button-icon.active i {
        color: var(--custom-button-icon-active-color);
      }

      .button-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
        text-transform: capitalize;
        
      }

      .button-label {
        font-size: 14px;
        font-weight: 500;
        color: var(--custom-button-text-color);
        word-break: break-word;
      }
      .button-card.active .button-label {
        color: var(--custom-button-active-text-color);
      }

      .button-state {
        font-size: 13px;
        opacity: 0.75;
        color: #f1f1f1;
        word-break: break-word;
      }
      .button-card.active .button-state {
        color: #666;
      }

      .hidden {
        display: none;
      }

      ha-icon {
        width: 48px;
        height: 48px;
      }
    `;
  }

  constructor() {
    super();
    this.config = {};
    this.isActive = false;
    this._pressTimer = null;
    this._tapCount = 0;
    this._tapTimer = null;
  }

  setConfig(config) {
    if (!config || !config.entity) {
      throw new Error('You must define an entity');
    }
    this.config = {
      show_name: true,
      show_icon: true,
      show_state: true,
      ...config
    };

    // Set CSS variables
    if (this.config.icon_color) {
      this.style.setProperty('--custom-button-icon-color', this.config.icon_color || 'var(--custom-button-icon-color)');
    }
    if (this.config.active_icon_color) {
      this.style.setProperty('--custom-button-icon-active-color', this.config.active_icon_color || 'var(--custom-button-icon-active-color)');
    }
  }

  render() {
    if (!this.hass || !this.config) {
      return html`<div>Loading...</div>`;
    }

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) {
      return html`<div>Entity not found: ${this.config.entity}</div>`;
    }

    this.isActive = stateObj.state === 'on';

    const showIcon = this.config.show_icon !== false;
    const showName = this.config.show_name !== false;
    const showState = this.config.show_state !== false;
    const title = this.config.title || this.getEntityFriendlyName(stateObj);
    const icon = this.config.icon || this.getEntityIcon(stateObj);
    const stateText = typeof this.config.show_state === 'string'
      ? this.config.show_state
      : stateObj.state;

    return html`
      ${customElements.get('ha-icon') ? '' : html`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css">`}
      <div
        class="button-card ${this.isActive ? 'active' : ''}"
        @mousedown="${this._handleMouseDown}"
        @mouseup="${this._handleMouseUp}"
        @mouseleave="${this._handleMouseLeave}"
        @click="${this._handleClick}"
        @dblclick="${this._handleDoubleClick}"
        @touchstart="${this._handleTouchStart}"
        @touchend="${this._handleTouchEnd}"
      >
        ${showIcon
          ? html`
              <div class="button-icon ${this.isActive ? 'active' : ''}">
                ${this._renderIcon(icon)}
              </div>
            `
          : ''}
        ${showName || showState
          ? html`
              <div class="button-text">
                ${showName ? html`<div class="button-label">${title}</div>` : ''}
                ${showState ? html`<div class="button-state">${stateText}</div>` : ''}
              </div>
            `
          : ''}
      </div>
    `;
  }

  _renderIcon(icon) {
    // Try to use ha-icon if available (in Home Assistant)
    if (customElements.get('ha-icon')) {
      return html`<ha-icon icon="${icon}"></ha-icon>`;
    }
    
    // Use MDI CSS classes (format: "mdi:lightbulb" -> "mdi mdi-lightbulb")
    const mdiClass = icon.replace(':', '-');
    return html`<i class="mdi ${mdiClass}"></i>`;
  }

  _handleMouseDown() {
    this._pressTimer = setTimeout(() => {
      if (this.config.interactions?.hold_behaviour) {
        this._executeAction(this.config.interactions.hold_behaviour);
      }
    }, 500);
  }

  _handleMouseUp() {
    if (this._pressTimer) {
      clearTimeout(this._pressTimer);
      this._pressTimer = null;
    }
  }

  _handleMouseLeave() {
    if (this._pressTimer) {
      clearTimeout(this._pressTimer);
      this._pressTimer = null;
    }
  }

  _handleClick(e) {
    if (this._pressTimer) {
      clearTimeout(this._pressTimer);
      this._pressTimer = null;
    }

    this._tapCount++;

    if (this._tapTimer) {
      clearTimeout(this._tapTimer);
    }

    this._tapTimer = setTimeout(() => {
      if (this._tapCount === 1) {
        if (this.config.interactions?.tap_behaviour) {
          this._executeAction(this.config.interactions.tap_behaviour);
        } else {
          this._toggleEntity();
        }
      } else if (this._tapCount === 2) {
        if (this.config.interactions?.double_tap_behaviour) {
          this._executeAction(this.config.interactions.double_tap_behaviour);
        }
      }
      this._tapCount = 0;
    }, 300);

    e.stopPropagation();
  }

  _handleDoubleClick(e) {
    if (this._tapTimer) {
      clearTimeout(this._tapTimer);
      this._tapTimer = null;
    }
    e.stopPropagation();
  }

  _handleTouchStart() {
    this._pressTimer = setTimeout(() => {
      if (this.config.interactions?.hold_behaviour) {
        this._executeAction(this.config.interactions.hold_behaviour);
      }
    }, 500);
  }

  _handleTouchEnd() {
    if (this._pressTimer) {
      clearTimeout(this._pressTimer);
      this._pressTimer = null;
    }
  }

  _toggleEntity() {
    const action = this.isActive ? 'turn_off' : 'turn_on';
    this.hass.callService('homeassistant', 'turn_on', {
      entity_id: this.config.entity
    });
  }

  _executeAction(action) {
    if (typeof action === 'string') {
      if (action === 'toggle') {
        this._toggleEntity();
      } else if (action === 'turn_on') {
        this.hass.callService('homeassistant', 'turn_on', {
          entity_id: this.config.entity
        });
      } else if (action === 'turn_off') {
        this.hass.callService('homeassistant', 'turn_off', {
          entity_id: this.config.entity
        });
      }
    } else if (typeof action === 'object' && action.action) {
      this.hass.callService(action.service, action.action, action.data || {});
    }
  }

  getEntityIcon(stateObj) {
    const domain = stateObj.entity_id.split('.')[0];
    const iconMap = {
      light: 'mdi:lightbulb',
      switch: 'mdi:toggle-switch',
      cover: 'mdi:window-closed',
      climate: 'mdi:thermostat',
      fan: 'mdi:fan',
      lock: 'mdi:lock',
      camera: 'mdi:camera',
      sensor: 'mdi:gauge',
      binary_sensor: 'mdi:motion-sensor'
    };
    return iconMap[domain] || 'mdi:help-circle';
  }

  getEntityFriendlyName(stateObj) {
    return stateObj.attributes.friendly_name || stateObj.entity_id;
  }

  getCardSize() {
    return 3;
  }

  static getConfigElement() {
    return document.createElement('ios-button-card-editor');
  }

  static getStubConfig() {
    return {
      entity: 'light.living_room',
      title: 'Button',
      show_name: true,
      show_icon: true,
      interactions: {
        tap_behaviour: 'toggle',
        hold_behaviour: 'turn_off',
        double_tap_behaviour: 'turn_on'
      }
    };
  }
}

customElements.define('ios-button-card', CustomButtonCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'ios-button-card',
  name: 'iOS Button Card',
  description: 'A customizable button card with advanced interactions',
  preview: true,
  documentationURL: 'https://github.com/skeefee/lovelace-ios-button'
});
