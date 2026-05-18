import { LitElement, html, css } from 'lit-element';

class CustomButtonCardEditor extends LitElement {
  static get properties() {
    return {
      config: { type: Object },
      hass: { type: Object }
    };
  }

  static get styles() {
    return css`
      .editor-wrapper {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .editor-row {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .editor-label {
        font-weight: 500;
        font-size: 14px;
        color: var(--primary-text-color);
      }

      .editor-input {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        font-size: 14px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
      }

      .editor-checkbox {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .editor-section {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid var(--divider-color);
      }

      .editor-section-title {
        font-weight: 600;
        font-size: 14px;
        color: var(--primary-text-color);
        margin-bottom: 12px;
      }

      .nested-row {
        margin-left: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .color-input {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .color-picker {
        width: 50px;
        height: 40px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        cursor: pointer;
      }

      ha-entity-picker {
        width: 100%;
      }
    `;
  }

  render() {
    if (!this.hass || !this.config) {
      return html`<div>Loading...</div>`;
    }

    return html`
      <div class="editor-wrapper">
        <!-- Entity Selection -->
        <div class="editor-row">
          <label class="editor-label">Entity</label>
          <ha-entity-picker
            .hass="${this.hass}"
            .value="${this.config.entity || ''}"
            @value-changed="${this._handleEntityChange}"
            allow-custom-entity
          ></ha-entity-picker>
        </div>

        <!-- Title -->
        <div class="editor-row">
          <label class="editor-label">Title</label>
          <input
            type="text"
            class="editor-input"
            .value="${this.config.title || ''}"
            @change="${this._handleTitleChange}"
            placeholder="Button title (optional)"
          />
        </div>

        <!-- Custom Icon -->
        <div class="editor-row">
          <label class="editor-label">Icon (MDI)</label>
          <input
            type="text"
            class="editor-input"
            .value="${this.config.icon || ''}"
            @change="${this._handleIconChange}"
            placeholder="e.g., mdi:lightbulb"
          />
        </div>

        <!-- Icon Color -->
        <div class="editor-row">
          <label class="editor-label">Icon Color (Inactive)</label>
          <div class="color-input">
            <input
              type="color"
              class="color-picker"
              .value="${this._getColorValue(this.config.icon_color)}"
              @change="${this._handleIconColorChange}"
            />
            <input
              type="text"
              class="editor-input"
              .value="${this.config.icon_color || 'var(--primary-text-color)'}"
              @change="${this._handleIconColorChange}"
              placeholder="CSS color or variable"
            />
          </div>
        </div>

        <!-- Active Icon Color -->
        <div class="editor-row">
          <label class="editor-label">Icon Color (Active)</label>
          <div class="color-input">
            <input
              type="color"
              class="color-picker"
              .value="${this._getColorValue(this.config.active_icon_color)}"
              @change="${this._handleActiveIconColorChange}"
            />
            <input
              type="text"
              class="editor-input"
              .value="${this.config.active_icon_color || 'var(--accent-color)'}"
              @change="${this._handleActiveIconColorChange}"
              placeholder="CSS color or variable"
            />
          </div>
        </div>

        <!-- Visibility Options -->
        <div class="editor-section">
          <div class="editor-section-title">Visibility</div>
          <div class="nested-row">
            <div class="editor-checkbox">
              <input
                type="checkbox"
                id="show-icon"
                .checked="${this.config.show_icon !== false}"
                @change="${this._handleShowIconChange}"
              />
              <label for="show-icon">Show Icon</label>
            </div>
            <div class="editor-checkbox">
              <input
                type="checkbox"
                id="show-name"
                .checked="${this.config.show_name !== false}"
                @change="${this._handleShowNameChange}"
              />
              <label for="show-name">Show Name</label>
            </div>
          </div>
        </div>

        <!-- Interactions -->
        <div class="editor-section">
          <div class="editor-section-title">Interactions</div>
          <div class="nested-row">
            <!-- Tap Behaviour -->
            <div class="editor-row">
              <label class="editor-label">Tap Action</label>
              <select
                class="editor-input"
                .value="${(this.config.interactions?.tap_behaviour) || 'toggle'}"
                @change="${this._handleTapBehaviourChange}"
              >
                <option value="toggle">Toggle</option>
                <option value="turn_on">Turn On</option>
                <option value="turn_off">Turn Off</option>
              </select>
            </div>

            <!-- Hold Behaviour -->
            <div class="editor-row">
              <label class="editor-label">Hold Action</label>
              <select
                class="editor-input"
                .value="${(this.config.interactions?.hold_behaviour) || 'turn_off'}"
                @change="${this._handleHoldBehaviourChange}"
              >
                <option value="">None</option>
                <option value="toggle">Toggle</option>
                <option value="turn_on">Turn On</option>
                <option value="turn_off">Turn Off</option>
              </select>
            </div>

            <!-- Double Tap Behaviour -->
            <div class="editor-row">
              <label class="editor-label">Double Tap Action</label>
              <select
                class="editor-input"
                .value="${(this.config.interactions?.double_tap_behaviour) || 'turn_on'}"
                @change="${this._handleDoubleTapBehaviourChange}"
              >
                <option value="">None</option>
                <option value="toggle">Toggle</option>
                <option value="turn_on">Turn On</option>
                <option value="turn_off">Turn Off</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _handleEntityChange(e) {
    this.config = {
      ...this.config,
      entity: e.detail.value
    };
    this._fireConfigChange();
  }

  _handleTitleChange(e) {
    this.config = {
      ...this.config,
      title: e.target.value
    };
    this._fireConfigChange();
  }

  _handleIconChange(e) {
    this.config = {
      ...this.config,
      icon: e.target.value
    };
    this._fireConfigChange();
  }

  _handleIconColorChange(e) {
    this.config = {
      ...this.config,
      icon_color: e.target.value
    };
    this._fireConfigChange();
  }

  _handleActiveIconColorChange(e) {
    this.config = {
      ...this.config,
      active_icon_color: e.target.value
    };
    this._fireConfigChange();
  }

  _handleShowIconChange(e) {
    this.config = {
      ...this.config,
      show_icon: e.target.checked
    };
    this._fireConfigChange();
  }

  _handleShowNameChange(e) {
    this.config = {
      ...this.config,
      show_name: e.target.checked
    };
    this._fireConfigChange();
  }

  _handleTapBehaviourChange(e) {
    this.config = {
      ...this.config,
      interactions: {
        ...this.config.interactions,
        tap_behaviour: e.target.value
      }
    };
    this._fireConfigChange();
  }

  _handleHoldBehaviourChange(e) {
    this.config = {
      ...this.config,
      interactions: {
        ...this.config.interactions,
        hold_behaviour: e.target.value
      }
    };
    this._fireConfigChange();
  }

  _handleDoubleTapBehaviourChange(e) {
    this.config = {
      ...this.config,
      interactions: {
        ...this.config.interactions,
        double_tap_behaviour: e.target.value
      }
    };
    this._fireConfigChange();
  }

  _fireConfigChange() {
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: this.config },
        bubbles: true,
        composed: true
      })
    );
  }

  _getColorValue(color) {
    if (!color) return '#000000';
    if (color.startsWith('#')) return color;
    if (color.startsWith('rgb')) {
      // Simple conversion for rgb
      return '#000000';
    }
    return '#000000';
  }

  setConfig(config) {
    this.config = config;
  }
}

customElements.define('ios-button-card-editor', CustomButtonCardEditor);
