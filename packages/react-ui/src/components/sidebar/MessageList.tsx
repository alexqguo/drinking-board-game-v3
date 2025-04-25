import { useEffect, useRef } from 'react';
import { useI18n } from '../../context/LocalizationContext.js';
import { useMessages } from '../../context/MessagesContext.jsx';
import { UISize, useUI } from '../../context/UIEnvironmentContext.jsx';

export const MessageList = () => {
  const ui = useUI();
  const { getMessage } = useI18n();
  const { messages, isLoading, error } = useMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isLoading) return <ui.Spinner size={UISize.s} />;
  if (error) return null;

  if (!messages || messages.length === 0) {
    return null;
  }

  return (
    <ui.Col style={{ height: '100%' }}>
      <ui.Text>{getMessage('webapp_messages')}</ui.Text>

      <ui.Row
        style={{
          overflow: 'auto',
          height: 0,
          flexGrow: 1,
          scrollbarWidth: 'none',
        }}
      >
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <ui.Text fontSize={UISize.xs}>{message.msg}</ui.Text>
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>
      </ui.Row>
    </ui.Col>
  );
};
