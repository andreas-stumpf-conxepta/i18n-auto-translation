import { AzureOpenAI } from 'openai';
import fs from 'fs';
import { decode, encode } from 'html-entities';
import { argv } from '../cli.js';
import { Translate } from '../translate.js';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions/completions.js';

export class AzureOpenAiAPI extends Translate {
  client: AzureOpenAI | undefined;
  history: ChatCompletionMessageParam[];
  customInstruction: string | undefined;

  constructor() {
    super();

    this.customInstruction = argv.instruction;

    if (!this.customInstruction && argv.instructionPath) {
      if (!fs.existsSync(argv.instructionPath)) {
        throw new Error(`Instruction file not found: ${argv.instructionPath}`);
      }
      this.customInstruction = fs.readFileSync(argv.instructionPath, 'utf-8');
    }

    if (argv.deployment && argv.endpoint && argv.key) {
      this.client = new AzureOpenAI({
        endpoint: argv.endpoint,
        apiKey: argv.key,
        apiVersion: '2024-10-21',
      });
    }

    this.history = [];
  }

  protected callTranslateAPI = async (valuesForTranslation: string[]): Promise<string> => {
    if (!this.client) {
      throw new Error(
        'Azure OpenAI client is not initialized. Please provide the necessary parameters (endpoint, key, and deployment).',
      );
    }

    // Batch processing is quite dangerous with Azure OpenAI, so we should send each value separately.
    const translations: string[] = [];
    for (const value of valuesForTranslation) {
      this.addToHistory(encode(value), 'user');

      const response = await this.client.chat.completions.create({
        model: argv.deployment!,
        messages: [
          {
            role: 'system',
            content: this.getInstruction(),
          },
          ...this.history,
        ],
      });

      const translation = response.choices[0].message.content?.trim() ?? '';
      this.addToHistory(translation, 'assistant');
      translations.push(decode(translation));
    }

    return translations.join(Translate.sentenceDelimiter);
  };

  protected addToHistory = (message: string, role: 'user' | 'assistant'): void => {
    if (this.history.length > argv.historySize) {
      this.history = this.history.slice(this.history.length - argv.historySize);
    }

    this.history.push({
      role,
      content: message,
    });
  };

  protected getInstruction = (): string => {
    return (
      `You are a professional translator.\n\n` +
      `Translate the following text from ${argv.from} to ${argv.to}.\n\n` +
      `Preserve the original HTML structure exactly as it is. Do not modify, remove, or add any HTML tags.\n\n` +
      `Do not translate or alter any placeholders or parameters enclosed in curly braces (e.g., {param}). Leave them unchanged in the output.\n\n` +
      `Return the translation with the same text formatting and case sensitivity.\n\n` +
      `Output only the translated text.\n\n` +
      `${this.customInstruction ? this.customInstruction : ''}`
    );
  };
}
