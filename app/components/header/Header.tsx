import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

export function Header() {
  const chat = useStore(chatStore);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const savedApiKey = Cookies.get('openrouter-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const onAPIKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
    Cookies.set('openrouter-api-key', newApiKey, { expires: 365 }); // Cookie expires in 1 year
  };

  return (
    <header
      className={classNames(
        'flex items-center bg-bolt-elements-background-depth-1 p-5 border-b h-[var(--header-height)]',
        {
          'border-transparent': !chat.started,
          'border-bolt-elements-borderColor': chat.started,
        },
      )}
    >
      <div className="flex flex-1 items-center gap-2 z-logo text-bolt-elements-textPrimary cursor-pointer">
        <div className="i-ph:sidebar-simple-duotone text-xl" />
        <a href="/" className="text-2xl font-semibold text-accent flex items-center">
          <span className="i-bolt:logo-text?mask w-[46px] inline-block" />
        </a>
        <span className="ml-16">API Key</span>
        <input
          onChange={onAPIKeyChange}
          value={apiKey}
          className="shadow-sm border border-bolt-elements-borderColor bg-bolt-elements-prompt-background backdrop-filter backdrop-blur-[8px] rounded-lg overflow-hidden focus:outline-none resize-none text-md text-bolt-elements-textPrimary placeholder-bolt-elements-textTertiary bg-transparent"
          style={{
            fontFamily: 'text-security-disc',
            '-webkit-text-security': 'disc',
          }}
          type="text"
          placeholder="Set your Open Router API Key here..."
        />
        <span>
          <a href="https://openrouter.ai/settings/keys">Get Key Here</a>
        </span>
      </div>
      <span className="flex-1 px-4 truncate text-center text-bolt-elements-textPrimary">
        <ClientOnly>{() => <ChatDescription />}</ClientOnly>
      </span>
      {chat.started && (
        <ClientOnly>
          {() => (
            <div className="mr-1">
              <HeaderActionButtons />
            </div>
          )}
        </ClientOnly>
      )}
    </header>
  );
}
