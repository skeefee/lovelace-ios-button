/**
 * Configuration schema for Home Assistant Lovelace Visual Editor
 * This schema defines the structure of configuration options visible in the UI
 */

export const getConfigSchema = () => {
  return [
    {
      type: 'grid',
      schema: [
        {
          name: 'entity',
          selector: {
            entity: {}
          }
        }
      ]
    },
    {
      type: 'grid',
      schema: [
        {
          name: 'title',
          selector: {
            text: {}
          }
        },
        {
          name: 'icon',
          selector: {
            icon: {}
          }
        }
      ]
    },
    {
      type: 'grid',
      schema: [
        {
          name: 'icon_color',
          selector: {
            text: {
              placeholder: 'var(--primary-text-color)'
            }
          }
        },
        {
          name: 'active_icon_color',
          selector: {
            text: {
              placeholder: 'var(--accent-color)'
            }
          }
        }
      ]
    },
    {
      type: 'grid',
      schema: [
        {
          name: 'show_icon',
          selector: {
            boolean: {}
          }
        },
        {
          name: 'show_name',
          selector: {
            boolean: {}
          }
        }
      ]
    },
    {
      type: 'expandable',
      title: 'Interactions',
      schema: [
        {
          type: 'grid',
          schema: [
            {
              name: 'tap_action',
              selector: {
                ui_action: {}
              }
            },
            {
              name: 'hold_action',
              selector: {
                ui_action: {}
              }
            }
          ]
        },
        {
          type: 'grid',
          schema: [
            {
              name: 'double_tap_action',
              selector: {
                ui_action: {}
              }
            }
          ]
        }
      ]
    }
  ];
};
