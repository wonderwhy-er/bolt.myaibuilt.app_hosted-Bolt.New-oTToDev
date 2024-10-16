import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

function getFreeModels(models) {
  return models.filter(m => Number(m.pricing.prompt) + Number(m.pricing.completion) === 0);
}

export function Header() {
  const chat = useStore(chatStore);
  const [apiKey, setApiKey] = useState('');
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(Cookies.get('openrouter-model'));

  useEffect(() => {
    const savedApiKey = Cookies.get('openrouter-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);

    }
    fetchModels(savedApiKey);
  }, []);

  useEffect(() => {
    Cookies.set('openrouter-model', selectedModel, { expires: 365 });
  }, [selectedModel]);

  const onAPIKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
    Cookies.set('openrouter-api-key', newApiKey, { expires: 365 });
    fetchModels(newApiKey);
  };

  const fetchModels = async (apiKey: string) => {
    try {
      const response = await fetch('/api/openrouter-models');
      const data = await response.json();
      if (data.models) {
        setModels(data.models);
        const models = apiKey ? data.models : getFreeModels(data.models);
        if (!models.find(m => m.id === selectedModel)) {
          setSelectedModel(models[0]?.id || '');
        }
      }
    } catch (error) {
      console.error('Error fetching models:', error);
    }
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
      <div style={{minWidth: "55rem"}} className="flex flex-1 items-center gap-2 z-logo text-bolt-elements-textPrimary cursor-pointer">
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
            'WebkitTextSecurity': 'disc'
          }}
          type="text"
          placeholder="Set your Open Router API Key here..."
        />
        <span>
          <a href="https://openrouter.ai/settings/keys">Get Key Here</a>
        </span>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="ml-4 p-2 border rounded min-w-[10rem] max-w-[20rem] bg-bolt-elements-background-depth-1 text-bolt-elements-textPrimary dark:bg-bolt-elements-background-depth-2 dark:text-bolt-elements-textPrimary border-bolt-elements-borderColor"
        >
          {(apiKey ? models : getFreeModels(models))
            .sort((a, b) => a.name.localeCompare(b.name)).map((model) => (
            <option key={model.id} value={model.id}>
              {`${model.name} - in:$${(model.pricing.prompt * 1_000_000).toFixed(
                2)} out:$${(model.pricing.completion * 1_000_000).toFixed(2)} - context ${Math.floor(
                model.context_length / 1000)}k`}
            </option>
          ))}
        </select>
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
