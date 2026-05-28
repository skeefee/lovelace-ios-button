import { LitElement, html } from 'lit-element';

const SCHEMA = [
  {
    name: 'entity',
    required: true,
    selector: { entity: {} },
  },
  {
    type: 'grid',
    name: '',
    schema: [
      {
        name: 'title',
        selector: { text: {} },
      },
      {
        name: 'remove_text',
        selector: { text: {} },
      },
    ],
  },
  {
    type: 'grid',
    name: '',
    schema: [
      {
        name: 'icon',
        selector: { icon: {} },
      },
      {
        name: 'icon_color',
        selector: { ui_color: {} },
      },
    ],
  },
  {
    type: 'grid',
    name: '',
    schema: [
      { name: 'show_icon', selector: { boolean: {} } },
      { name: 'show_name', selector: { boolean: {} } },
      { name: 'show_state', selector: { boolean: {} } },
    ],
  },
  { name: 'tap_action', selector: { ui_action: {} } },
  { name: 'hold_action', selector: { ui_action: {} } },
  { name: 'double_tap_action', selector: { ui_action: {} } },
];

const LABELS = {
  entity: 'Entity',
  title: 'Title',
  remove_text: 'Remove Text',
  icon: 'Icon',
  icon_color: 'Icon Color',
  show_icon: 'Show Icon',
  show_name: 'Show Name',
  show_state: 'Show State',
  tap_action: 'Tap Action',
  hold_action: 'Hold Action',
  double_tap_action: 'Double Tap Action',
};

class IosButtonCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
    };
  }

  setConfig(config) {
    this._config = config;
  }

  render() {
    if (!this.hass || !this._config) return html``;

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${(s) => LABELS[s.name] ?? s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  _valueChanged(ev) {
    ev.stopPropagation();
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: ev.detail.value },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('ios-button-card-editor', IosButtonCardEditor);
