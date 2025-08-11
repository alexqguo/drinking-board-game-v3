/* eslint-disable react/prop-types */
// FYI this is a vibe file
import { useAppActionsRegistryInstance } from '@repo/react-ui/context/AppActionsContext.jsx';
import { UIEnvironment, UISize } from '@repo/react-ui/context/UIEnvironmentContext.jsx';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { getMappedProperty } from '../providers/WebappUIProvider';
import './tailwind.css';

const fontSizeMap = {
  [UISize.xs]: 'text-xs',
  [UISize.s]: 'text-sm',
  [UISize.m]: 'text-base',
  [UISize.l]: 'text-3xl',
  [UISize.xl]: 'text-7xl',
} as const;

const spacingMap = {
  [UISize.xs]: 'gap-1 p-1 m-1',
  [UISize.s]: 'gap-2 p-2 m-2',
  [UISize.m]: 'gap-3 p-3 m-3',
  [UISize.l]: 'gap-4 p-4 m-4',
  [UISize.xl]: 'gap-5 p-5 m-5',
} as const;

const paddingMap = {
  [UISize.xs]: 'p-1',
  [UISize.s]: 'p-2',
  [UISize.m]: 'p-3',
  [UISize.l]: 'p-4',
  [UISize.xl]: 'p-5',
} as const;

const marginMap = {
  [UISize.xs]: 'm-1',
  [UISize.s]: 'm-2',
  [UISize.m]: 'm-3',
  [UISize.l]: 'm-4',
  [UISize.xl]: 'm-5',
} as const;

const marginTopMap = {
  [UISize.xs]: 'mt-1',
  [UISize.s]: 'mt-2',
  [UISize.m]: 'mt-3',
  [UISize.l]: 'mt-4',
  [UISize.xl]: 'mt-5',
} as const;

const marginBottomMap = {
  [UISize.xs]: 'mb-1',
  [UISize.s]: 'mb-2',
  [UISize.m]: 'mb-3',
  [UISize.l]: 'mb-4',
  [UISize.xl]: 'mb-5',
} as const;

const marginLeftMap = {
  [UISize.xs]: 'ml-1',
  [UISize.s]: 'ml-2',
  [UISize.m]: 'ml-3',
  [UISize.l]: 'ml-4',
  [UISize.xl]: 'ml-5',
} as const;

const marginRightMap = {
  [UISize.xs]: 'mr-1',
  [UISize.s]: 'mr-2',
  [UISize.m]: 'mr-3',
  [UISize.l]: 'mr-4',
  [UISize.xl]: 'mr-5',
} as const;

const gapMap = {
  [UISize.xs]: 'gap-1',
  [UISize.s]: 'gap-2',
  [UISize.m]: 'gap-3',
  [UISize.l]: 'gap-4',
  [UISize.xl]: 'gap-5',
} as const;

const buttonSizeMap = {
  [UISize.xs]: 'px-2 py-1 text-xs',
  [UISize.s]: 'px-3 py-2 text-sm',
  [UISize.m]: 'px-4 py-2 text-base',
  [UISize.l]: 'px-6 py-3 text-lg',
  [UISize.xl]: 'px-8 py-4 text-xl',
} as const;

const buttonVariantMap = {
  primary: 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600',
  secondary: 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200',
  tertiary: 'bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50',
} as const;

const spinnerSizeMap = {
  [UISize.xs]: 'w-4 h-4',
  [UISize.s]: 'w-6 h-6',
  [UISize.m]: 'w-8 h-8',
  [UISize.l]: 'w-10 h-10',
  [UISize.xl]: 'w-12 h-12',
} as const;

const chipSizeMap = {
  [UISize.xs]: 'px-1 py-0.5 text-xs',
  [UISize.s]: 'px-1.5 py-0.5 text-xs',
  [UISize.m]: 'px-2 py-0.5 text-xs',
  [UISize.l]: 'px-2 py-1 text-xs',
  [UISize.xl]: 'px-3 py-1 text-sm',
} as const;

const colorPalette = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'cyan'];

const pickPalette = (name: string) => {
  const index = name.charCodeAt(0) % colorPalette.length;
  return colorPalette[index];
};

const getColorClasses = (color: string) => {
  const colorMap: Record<string, string> = {
    red: 'bg-red-500 text-white',
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    yellow: 'bg-yellow-500 text-black',
    purple: 'bg-purple-500 text-white',
    orange: 'bg-orange-500 text-white',
    cyan: 'bg-cyan-500 text-white',
  };
  return colorMap[color] || 'bg-gray-500 text-white';
};

const Provider = ({ children }: { children: ReactNode }) => {
  const [themeColor, setThemeColor] = useState('');
  const appActionsRegistry = useAppActionsRegistryInstance();
  const updateUIThemeColor = useCallback((color: string) => {
    setThemeColor(color);
    console.log('asdf updating tailwind theme');
  }, []);

  useEffect(() => {
    appActionsRegistry.register('updateUITheme', updateUIThemeColor);
    return () => appActionsRegistry.unregister('updateUITheme');
  }, [appActionsRegistry, updateUIThemeColor]);

  const getThemeClasses = () => {
    if (!themeColor) return 'bg-white';

    const colorMap: Record<string, string> = {
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      cyan: 'bg-cyan-500',
    };
    return colorMap[themeColor] || 'bg-white';
  };

  const getMainThemeClasses = () => {
    if (!themeColor) return 'bg-white';

    const colorMap: Record<string, string> = {
      red: 'bg-red-100',
      blue: 'bg-blue-100',
      green: 'bg-green-100',
      yellow: 'bg-yellow-100',
      purple: 'bg-purple-100',
      orange: 'bg-orange-100',
      cyan: 'bg-cyan-100',
    };
    return colorMap[themeColor] || 'bg-white';
  };

  return (
    <div
      className={`min-h-screen font-['Tomorrow'] font-medium transition-colors duration-500 ${getThemeClasses()}`}
    >
      <main className={getMainThemeClasses()}>{children}</main>
    </div>
  );
};

const components: UIEnvironment = {
  // Basic Elements
  Button: (props) => (
    <button
      {...props}
      className={`
        ${getMappedProperty(props.size, buttonSizeMap) || buttonSizeMap[UISize.m]}
        ${getMappedProperty(props.variant, buttonVariantMap) || buttonVariantMap.primary}
        border-2 border-black font-medium rounded-md cursor-pointer
        transform transition-all duration-150
        shadow-[4px_4px_0px_#000000]
        hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000]
        active:translate-y-[2px] active:shadow-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${props.disabled ? 'pointer-events-none' : ''}
      `}
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  ),

  Text: (props) => (
    <span
      className={`
        ${getMappedProperty(props.fontSize, fontSizeMap) || 'text-base'}
      `}
      style={{ color: props.color }}
    >
      {props.children}
    </span>
  ),

  Card: (props) => (
    <div className="bg-white border-2 border-black shadow-lg p-2 rounded-md">{props.children}</div>
  ),

  Popover: (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="relative inline-block">
        <div onClick={() => setIsOpen(!isOpen)}>{props.popoverTrigger}</div>
        {isOpen && (
          <div className="absolute z-50 mt-2 bg-white border-2 border-black shadow-lg p-3 rounded-md min-w-[200px]">
            <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-l-2 border-t-2 border-black transform rotate-45"></div>
            {props.popoverBody}
          </div>
        )}
      </div>
    );
  },

  // Layout Components
  PageContainer: (props) => <div className="max-w-3xl mx-auto px-4">{props.children}</div>,

  Flex: (props) => (
    <div
      className={`
        flex
        ${getMappedProperty(props.gap, gapMap) || ''}
        ${getMappedProperty(props.padding, paddingMap) || ''}
        ${getMappedProperty(props.margin, marginMap) || ''}
        ${getMappedProperty(props.marginTop, marginTopMap) || ''}
        ${getMappedProperty(props.marginBottom, marginBottomMap) || ''}
        ${getMappedProperty(props.marginLeft, marginLeftMap) || ''}
        ${getMappedProperty(props.marginRight, marginRightMap) || ''}
      `}
      style={{
        flexDirection: props.direction,
        flexWrap: props.wrap,
        justifyContent: props.justifyContent,
        alignItems: props.alignItems,
        alignSelf: props.alignSelf,
        flex: props.flex,
        flexGrow: props.flexGrow,
        height: props.height,
        width: props.width,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  ),

  Row: (props) => (
    <div
      className={`
        flex flex-row
        ${getMappedProperty(props.gap, gapMap) || ''}
        ${getMappedProperty(props.padding, paddingMap) || ''}
        ${getMappedProperty(props.margin, marginMap) || ''}
        ${getMappedProperty(props.marginTop, marginTopMap) || ''}
        ${getMappedProperty(props.marginBottom, marginBottomMap) || ''}
        ${getMappedProperty(props.marginLeft, marginLeftMap) || ''}
        ${getMappedProperty(props.marginRight, marginRightMap) || ''}
      `}
      style={{
        flexWrap: props.wrap,
        justifyContent: props.justifyContent,
        alignItems: props.alignItems,
        alignSelf: props.alignSelf,
        flex: props.flex,
        flexGrow: props.flexGrow,
        height: props.height,
        width: props.width,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  ),

  Col: (props) => (
    <div
      className={`
        flex flex-col
        ${getMappedProperty(props.gap, gapMap) || ''}
        ${getMappedProperty(props.padding, paddingMap) || ''}
        ${getMappedProperty(props.margin, marginMap) || ''}
        ${getMappedProperty(props.marginTop, marginTopMap) || ''}
        ${getMappedProperty(props.marginBottom, marginBottomMap) || ''}
        ${getMappedProperty(props.marginLeft, marginLeftMap) || ''}
        ${getMappedProperty(props.marginRight, marginRightMap) || ''}
      `}
      style={{
        flexWrap: props.wrap,
        justifyContent: props.justifyContent,
        alignItems: props.alignItems,
        alignSelf: props.alignSelf,
        height: props.height,
        width: props.width,
        ...props.style,
        ...(props.flex && { flex: props.flex }),
        ...(props.flexGrow && { flexGrow: props.flexGrow }),
      }}
    >
      {props.children}
    </div>
  ),

  Separator: (props) =>
    props.label ? (
      <div className="flex items-center gap-4">
        <span className="flex-shrink-0">{props.label}</span>
        <hr className="flex-1 border-t-2 border-black" />
      </div>
    ) : (
      <hr className="border-t-2 border-black" />
    ),

  // Form Elements
  Input: (props) => (
    <input
      {...props}
      className="w-full px-3 py-2 bg-gray-50 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  ),

  Field: (props) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{props.label}</label>
      {props.children}
    </div>
  ),

  RadioField: (props) => (
    <div className="w-full">
      <div className="mb-2 font-medium">{props.label}</div>
      <div className="flex flex-wrap gap-4">
        {React.Children.map(props.children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, {
                name: 'radio-field',
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  props.onValueChange?.(e.target.value);
                },
                checked: props.value === (child.props as any).value,
              })
            : child,
        )}
      </div>
    </div>
  ),

  RadioCard: (props: any) => (
    <label
      className={`
      block p-4 bg-gray-50 border-2 border-black cursor-pointer rounded-md
      hover:bg-gray-100 transition-colors
      ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
    >
      <input
        type="radio"
        name={props.name || 'radio-field'}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
        disabled={props.disabled}
        className="sr-only peer"
      />
      <div className="peer-checked:bg-blue-100 peer-checked:border-blue-500 -m-4 p-4 border-2 border-transparent rounded-md">
        <div className="font-medium">{props.title}</div>
        {props.description && <div className="text-sm text-gray-600 mt-1">{props.description}</div>}
      </div>
    </label>
  ),

  RadioGroup: (props) => (
    <div className="flex flex-wrap gap-4">
      {props.options.map((option) => (
        <label
          key={option.value}
          className={`
          flex items-center cursor-pointer
          ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        >
          <input
            type="radio"
            name="radio-group"
            value={option.value}
            checked={props.value === option.value}
            onChange={() => props.onChange(option.value)}
            disabled={props.disabled}
            className="mr-2"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  ),

  // Feedback & Overlay
  Spinner: ({ size }) => (
    <div
      className={`
      ${getMappedProperty(size, spinnerSizeMap) || 'w-8 h-8'}
      animate-spin rounded-full border-4 border-gray-300 border-t-blue-500
    `}
    />
  ),

  // Game prompt
  Modal: ({ isOpen, children, headerText, footerContent, isFullScreen }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50" />
        <div
          className={`
          relative bg-white border-2 border-black shadow-xl rounded-md
          ${isFullScreen ? 'w-screen h-screen' : 'max-w-lg w-full mx-4'}
        `}
        >
          {headerText && (
            <div className="px-6 py-4 border-b-2 border-black bg-white rounded-t-md">
              <h2 className="text-lg font-bold">{headerText}</h2>
            </div>
          )}
          <div className="px-6 py-4 bg-white">{children}</div>
          {footerContent && (
            <div className="px-6 py-4 border-t-2 border-black bg-white rounded-b-md">
              {footerContent}
            </div>
          )}
        </div>
      </div>
    );
  },

  Avatar: (props) => {
    const palette = pickPalette(props.name);
    const colorClasses = getColorClasses(palette!);
    const initials = props.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

    return (
      <div
        className={`
          ${colorClasses}
          border-2 border-black rounded-full
          flex items-center justify-center font-bold
        `}
        style={{ width: props.width, height: props.height }}
      >
        {initials}
      </div>
    );
  },

  Chip: (props) => (
    <span
      className={`
      ${getMappedProperty(props.size, chipSizeMap) || chipSizeMap[UISize.m]}
      ${props.color ? getColorClasses(props.color) : 'bg-gray-200 text-gray-800'}
      border border-black rounded-full
      inline-flex items-center justify-center
    `}
    >
      {props.children}
      {props.isCloseable && (
        <button
          onClick={props.onClose}
          className="ml-1 hover:bg-black hover:opacity-20 rounded-full p-0.5"
        >
          ×
        </button>
      )}
    </span>
  ),

  Alert: (props) => (
    <div className="bg-blue-50 border-2 border-blue-500 p-4 flex items-start rounded-md">
      <div className="w-5 h-5 mr-3 mt-0.5 bg-blue-500 rounded-full flex items-center justify-center">
        <span className="text-white text-xs">i</span>
      </div>
      <div className="font-medium">{props.title}</div>
    </div>
  ),

  HoverTooltip: (props) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
      <div className="relative inline-block">
        <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
          {props.children}
        </div>
        {isVisible && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
            <div className="bg-black text-white px-2 py-1 rounded-md text-sm whitespace-nowrap">
              {props.content}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
          </div>
        )}
      </div>
    );
  },

  Drawer: (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <div onClick={() => setIsOpen(true)}>{props.children}</div>
        {isOpen && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 top-0 h-full w-80 bg-white border-l-2 border-black rounded-l-md">
              <div className="p-4 border-b-2 border-black bg-white">
                <h2 className="text-lg font-bold">{props.title}</h2>
              </div>
              <div className="p-4 bg-white">{props.content}</div>
            </div>
          </div>
        )}
      </div>
    );
  },

  Portal: (props) => {
    // For Tailwind implementation, we'll use a simple div since we don't have React Portal setup
    return <div className="portal-content">{props.children}</div>;
  },
};

export default {
  Provider,
  environmentComponents: components,
};
