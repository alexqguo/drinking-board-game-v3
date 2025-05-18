/* eslint-disable react/prop-types */
import { useAppActionsRegistryInstance } from '@repo/react-ui/context/AppActionsContext.jsx';
import { UIEnvironment, UISize } from '@repo/react-ui/context/UIEnvironmentContext.jsx';
import { CSSProperties, ReactNode, createRef, useCallback, useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { UIModule } from '../providers/WebappUIProvider';

// Utility to convert UISize to pixel values
const spacingPixels: Record<UISize, string> = {
  [UISize.xs]: '4px',
  [UISize.s]: '8px',
  [UISize.m]: '16px',
  [UISize.l]: '24px',
  [UISize.xl]: '32px',
};

const fontSizePixels: Record<UISize, string> = {
  [UISize.xs]: '12px',
  [UISize.s]: '14px',
  [UISize.m]: '16px',
  [UISize.l]: '20px',
  [UISize.xl]: '24px',
};

// Default vanilla CSS styles that will be included
const injectGlobalStyles = (): void => {
  if (document.getElementById('vanilla-ui-styles')) return;

  const style = document.createElement('style');
  style.id = 'vanilla-ui-styles';
  style.innerHTML = `
    :root {
      --color-primary: #6774e7;
      --color-secondary: #f0f0f0;
      --color-tertiary: transparent;
      --color-text: #333333;
      --color-border: #000000;
      --color-background: #ffffff;
      --font-family: "Jersey 25", system-ui, sans-serif;
      --border-radius: 4px;
      --box-shadow: 4px 4px 0px #000000;
    }

    .vanilla-button {
      font-family: var(--font-family);
      padding: 8px 16px;
      border: 2px solid var(--color-border);
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      position: relative;
      box-shadow: var(--box-shadow);
      font-weight: bold;
    }

    .vanilla-button:hover {
      transform: translateY(-2px);
      box-shadow: 6px 6px 0px #000000;
    }

    .vanilla-button:active {
      transform: translateY(2px);
      box-shadow: 0 0 0 #000000;
    }

    .vanilla-button--primary {
      background-color: var(--color-primary);
      color: white;
    }

    .vanilla-button--secondary {
      background-color: var(--color-secondary);
      color: var(--color-text);
    }

    .vanilla-button--tertiary {
      background-color: var(--color-tertiary);
      color: var(--color-text);
    }

    .vanilla-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .vanilla-flex {
      display: flex;
    }

    .vanilla-text {
      font-family: var(--font-family);
      color: var(--color-text);
    }

    .vanilla-separator {
      width: 100%;
      height: 1px;
      background-color: #e0e0e0;
      margin: 16px 0;
    }

    .vanilla-input {
      font-family: var(--font-family);
      padding: 8px;
      border: 2px solid var(--color-border);
      border-radius: var(--border-radius);
      width: 100%;
    }

    .vanilla-field {
      margin-bottom: 16px;
    }

    .vanilla-field-label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }

    .vanilla-radio-group {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .vanilla-radio-item {
      display: flex;
      align-items: center;
      padding: 8px;
      border: 2px solid var(--color-border);
      border-radius: var(--border-radius);
      cursor: pointer;
    }

    .vanilla-radio-item input {
      margin-right: 8px;
    }

    .vanilla-radio-item--selected {
      background-color: var(--color-secondary);
    }

    .vanilla-radio-card {
      padding: 16px;
      border: 2px solid var(--color-border);
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: background-color 0.2s;
      width: 100%;
    }

    .vanilla-radio-card:hover:not(.vanilla-radio-card--disabled) {
      background-color: #f5f5f5;
    }

    .vanilla-radio-card--selected {
      background-color: var(--color-secondary);
    }

    .vanilla-radio-card--disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .vanilla-radio-card-title {
      font-weight: bold;
      margin-bottom: 4px;
    }

    .vanilla-radio-card-description {
      font-size: 14px;
      color: #666;
    }

    .vanilla-spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid var(--color-primary);
      border-radius: 50%;
      animation: vanilla-spin 1s linear infinite;
    }

    @keyframes vanilla-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .vanilla-modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .vanilla-modal {
      background-color: white;
      border-radius: var(--border-radius);
      border: 2px solid var(--color-border);
      box-shadow: var(--box-shadow);
      max-width: 90%;
      max-height: 90%;
      overflow: auto;
    }

    .vanilla-modal-full {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      border-radius: 0;
    }

    .vanilla-modal-header {
      padding: 16px;
      border-bottom: 1px solid #e0e0e0;
      font-weight: bold;
    }

    .vanilla-modal-body {
      padding: 16px;
    }

    .vanilla-modal-footer {
      padding: 16px;
      border-top: 1px solid #e0e0e0;
      display: flex;
      justify-content: flex-end;
    }

    .vanilla-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      border-radius: 50%;
      border: 2px solid var(--color-border);
      color: white;
    }

    .vanilla-chip {
      display: inline-flex;
      padding: 4px 8px;
      border-radius: 16px;
      font-size: 12px;
      background-color: var(--color-secondary);
    }

    .vanilla-alert {
      padding: 16px;
      border-radius: var(--border-radius);
      background-color: #e8f4fd;
      border-left: 4px solid #1a73e8;
      margin-bottom: 16px;
    }

    .vanilla-alert-title {
      font-weight: bold;
      margin-bottom: 4px;
    }

    .vanilla-portal {
      position: fixed;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      z-index: 1000;
    }

    .vanilla-popover {
      position: relative;
      display: inline-block;
    }

    .vanilla-popover-content {
      position: absolute;
      z-index: 1001;
      background-color: white;
      border: 2px solid var(--color-border);
      border-radius: var(--border-radius);
      padding: 8px;
      box-shadow: var(--box-shadow);
    }
  `;
  document.head.appendChild(style);
};

// Vanilla components provider
const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const appActionsRegistry = useAppActionsRegistryInstance();

  // Function to update theme color
  const updateUIThemeColor = useCallback((color: string) => {
    // Update CSS variables
    if (document.documentElement) {
      document.documentElement.style.setProperty('--color-primary', color);
    }
  }, []);

  useEffect(() => {
    injectGlobalStyles();

    // Register the theme update action
    appActionsRegistry.register('updateUITheme', updateUIThemeColor);

    // Cleanup on unmount
    return () => appActionsRegistry.unregister('updateUITheme');
  }, [appActionsRegistry, updateUIThemeColor]);

  return <>{children}</>;
};

// Helper function for common flex properties
const getFlexStyles = (props: Record<string, unknown>): CSSProperties => {
  return {
    display: 'flex',
    gap: props.gap !== undefined ? spacingPixels[props.gap as UISize] : undefined,
    padding: props.padding !== undefined ? spacingPixels[props.padding as UISize] : undefined,
    margin: props.margin !== undefined ? spacingPixels[props.margin as UISize] : undefined,
    marginTop: props.marginTop !== undefined ? spacingPixels[props.marginTop as UISize] : undefined,
    marginBottom:
      props.marginBottom !== undefined ? spacingPixels[props.marginBottom as UISize] : undefined,
    marginLeft:
      props.marginLeft !== undefined ? spacingPixels[props.marginLeft as UISize] : undefined,
    marginRight:
      props.marginRight !== undefined ? spacingPixels[props.marginRight as UISize] : undefined,
    flexWrap: props.wrap as CSSProperties['flexWrap'],
    flexDirection: props.direction as CSSProperties['flexDirection'],
    flex: props.flex as CSSProperties['flex'],
    justifyContent: props.justifyContent as CSSProperties['justifyContent'],
    alignItems: props.alignItems as CSSProperties['alignItems'],
    height: props.height as CSSProperties['height'],
    ...((props.style as CSSProperties) || {}),
  };
};

// Avatar background colors based on name
const getAvatarColor = (name: string): string => {
  const colors = [
    '#ff5252', // red
    '#5677fc', // blue
    '#4caf50', // green
    '#ffeb3b', // yellow
    '#9c27b0', // purple
    '#ff9800', // orange
    '#00bcd4', // cyan
  ];

  const index = name.charCodeAt(0) % colors.length;
  return colors[index]!;
};

// Get initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Implementation of all UI components using vanilla HTML/CSS
const components: UIEnvironment = {
  // Basic Elements
  Button: ({ variant = 'primary', size = UISize.m, disabled, type, children, onClick }) => {
    const variantClass = `vanilla-button--${variant}`;
    const fontSize = fontSizePixels[size];

    return (
      <button
        className={`vanilla-button ${variantClass}`}
        disabled={disabled}
        type={type}
        onClick={onClick}
        style={{ fontSize }}
      >
        {children}
      </button>
    );
  },

  Card: (props) => {
    return <div>{props.children}</div>;
  },

  Text: ({ color, fontSize = UISize.m, children }) => {
    return (
      <span
        className="vanilla-text"
        style={{
          color,
          fontSize: fontSizePixels[fontSize],
        }}
      >
        {children}
      </span>
    );
  },

  Popover: ({ popoverTrigger, popoverBody }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = createRef<HTMLDivElement>();

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [popoverRef]);

    return (
      <div className="vanilla-popover" ref={popoverRef}>
        <div onClick={() => setIsOpen(!isOpen)}>{popoverTrigger}</div>
        {isOpen && <div className="vanilla-popover-content">{popoverBody}</div>}
      </div>
    );
  },

  // Layout Components
  PageContainer: ({ children }) => {
    return <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}>{children}</div>;
  },

  Flex: (props) => {
    return (
      <div className="vanilla-flex" style={getFlexStyles(props as Record<string, unknown>)}>
        {props.children}
      </div>
    );
  },

  Row: (props) => {
    return (
      <div
        className="vanilla-flex"
        style={{
          ...getFlexStyles(props as Record<string, unknown>),
          flexDirection: 'row',
        }}
      >
        {props.children}
      </div>
    );
  },

  Col: (props) => {
    return (
      <div
        className="vanilla-flex"
        style={{
          ...getFlexStyles(props as Record<string, unknown>),
          flexDirection: 'column',
        }}
      >
        {props.children}
      </div>
    );
  },

  Separator: ({ label }) => {
    if (label) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0' }}>
          <span style={{ marginRight: '8px' }}>{label}</span>
          <div style={{ flex: 1 }} className="vanilla-separator"></div>
        </div>
      );
    }

    return <div className="vanilla-separator"></div>;
  },

  // Form Elements
  Input: ({ name, placeholder, ...rest }) => {
    return <input className="vanilla-input" name={name} placeholder={placeholder} {...rest} />;
  },

  Field: ({ label, children }) => {
    return (
      <div className="vanilla-field">
        <label className="vanilla-field-label">{label}</label>
        {children}
      </div>
    );
  },

  RadioField: ({ label, children }) => {
    return (
      <div className="vanilla-field">
        <label className="vanilla-field-label">{label}</label>
        <div>{children}</div>
      </div>
    );
  },

  RadioCard: ({ name, value, title, description, disabled }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsSelected(e.target.checked);
    };

    const className = `vanilla-radio-card ${isSelected ? 'vanilla-radio-card--selected' : ''} ${disabled ? 'vanilla-radio-card--disabled' : ''}`;

    return (
      <label className={className}>
        <input
          type="radio"
          name={name}
          value={value}
          disabled={disabled}
          style={{ display: 'none' }}
          onChange={handleChange}
        />
        <div className="vanilla-radio-card-title">{title}</div>
        {description && <div className="vanilla-radio-card-description">{description}</div>}
      </label>
    );
  },

  RadioGroup: ({ options, value, disabled, onChange }) => {
    return (
      <div className="vanilla-radio-group">
        {options.map((option) => (
          <label
            key={option.value}
            className={`vanilla-radio-item ${value === option.value ? 'vanilla-radio-item--selected' : ''}`}
          >
            <input
              type="radio"
              name="radio-group"
              value={option.value}
              checked={value === option.value}
              disabled={disabled}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    );
  },

  // Feedback & Overlay
  Spinner: ({ size }) => {
    const dimension = {
      [UISize.xs]: '16px',
      [UISize.s]: '24px',
      [UISize.m]: '32px',
      [UISize.l]: '48px',
      [UISize.xl]: '64px',
    }[size];

    return <div className="vanilla-spinner" style={{ width: dimension, height: dimension }}></div>;
  },

  Modal: ({ isOpen, headerText, children, footerContent, isFullScreen }) => {
    if (!isOpen) return null;

    const modalClass = `vanilla-modal ${isFullScreen ? 'vanilla-modal-full' : ''}`;

    return (
      <div className="vanilla-modal-backdrop">
        <div className={modalClass}>
          {headerText && <div className="vanilla-modal-header">{headerText}</div>}
          <div className="vanilla-modal-body">{children}</div>
          <div className="vanilla-modal-footer">{footerContent}</div>
        </div>
      </div>
    );
  },

  Avatar: ({ name, width, height }) => {
    const initials = getInitials(name);
    const backgroundColor = getAvatarColor(name);

    return (
      <div
        className="vanilla-avatar"
        style={{
          width,
          height,
          backgroundColor,
          fontSize: `calc(${height} / 2)`,
        }}
      >
        {initials}
      </div>
    );
  },

  Chip: ({ color, children }) => {
    return (
      <div className="vanilla-chip" style={{ backgroundColor: color || undefined }}>
        {children}
      </div>
    );
  },

  Alert: ({ title }) => {
    return (
      <div className="vanilla-alert">
        <div className="vanilla-alert-title">{title}</div>
      </div>
    );
  },

  Portal: ({ children }) => {
    const [portalContainer] = useState(() => {
      if (typeof document !== 'undefined') {
        const div = document.createElement('div');
        div.className = 'vanilla-portal';
        return div;
      }
      return null;
    });

    useEffect(() => {
      if (portalContainer) {
        document.body.appendChild(portalContainer);
        return () => {
          document.body.removeChild(portalContainer);
        };
      }
    }, [portalContainer]);

    if (!portalContainer) return null;

    return ReactDOM.createPortal(children, portalContainer);
  },
};

const uiModule: UIModule = {
  Provider,
  environmentComponents: components,
};

export default uiModule;
