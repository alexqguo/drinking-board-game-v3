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
    <ui.Drawer
      title={getMessage('webapp_messages')}
      content={
        <ui.Col>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>
                <ui.Text color={message.isNew ? undefined : 'gray'} fontSize={UISize.xs}>
                  {message.msg}
                </ui.Text>
              </li>
            ))}
            <div ref={messagesEndRef} />
          </ul>
        </ui.Col>
      }
    >
      <ui.Button variant="secondary" size={UISize.xs}>
        {getMessage('webapp_log')}
      </ui.Button>
    </ui.Drawer>
  );
};
