import yargs from 'yargs';

interface Arguments {
  [x: string]: unknown;
  apiProvider: string;
  key: string;
  region: string;
  endpoint?: string;
  deployment?: string;
  filePath?: string;
  dirPath?: string;
  from: string;
  to: string;
  override: boolean;
  certificatePath?: string;
  spaces: number;
  maxLinesPerRequest: number;
  context?: string;
  formality: string;
  trim: boolean;
  delay: number;
  saveTo?: string;
  glossary?: string;
  instruction?: string;
  instructionPath?: string;
  historySize: number;
}

export const argv: Arguments = yargs(process.argv.slice(2))
  .options({
    apiProvider: {
      type: 'string',
      alias: 'a',
      description: 'API Provider.',
      choices: [
        'google-official',
        'azure-official',
        'azure-openai',
        'azure-rapid',
        'deep-rapid',
        'lecto-rapid',
        'lingvanex-rapid',
        'nlp-rapid',
        'deepl-free',
        'deepl-pro',
      ],
      default: 'google-official',
    },
    key: {
      type: 'string',
      alias: 'k',
      demandOption: true,
      description: 'Subscription key for the API provider.',
    },
    region: {
      type: 'string',
      alias: 'r',
      description: 'Key region. Used only by the Official Azure API.',
      default: 'global',
    },
    endpoint: {
      type: 'string',
      description: 'Endpoint address of an Azure OpenAI resource. Only used by the Azure OpenAI API.',
    },
    deployment: {
      type: 'string',
      description: 'Deployment name in Azure OpenAI. Only used by the Azure OpenAI API.',
    },
    filePath: {
      type: 'string',
      alias: 'p',
      description: 'Path to a single JSON file.',
    },
    dirPath: {
      type: 'string',
      alias: 'd',
      description:
        'Path to a directory in which you will recursively find all JSON files named [from].json (e.g. en.json)',
    },
    from: {
      type: 'string',
      alias: 'f',
      description: 'From which language you want to translate.',
      default: 'en',
    },
    to: {
      type: 'string',
      alias: 't',
      demandOption: true,
      description: 'To which language you want to translate.',
    },
    override: {
      type: 'boolean',
      alias: 'o',
      description: 'Override existing translation(s)',
      default: false,
    },
    certificatePath: {
      type: 'string',
      alias: 'c',
      description: 'Path to a custom certificate.',
    },
    spaces: {
      type: 'number',
      alias: 's',
      description: 'Number of spaces to use when generating output JSON files.',
      default: 2,
    },
    maxLinesPerRequest: {
      type: 'number',
      alias: 'l',
      description:
        'Maximum number of lines per request. For every `x` number of lines, separated request is sent to the api.',
      default: 50,
    },
    context: {
      type: 'string',
      alias: 'x',
      description: 'Context for the translation. Used only by the DeepL API.',
    },
    formality: {
      type: 'string',
      alias: 'm',
      description: 'Formality for the translation. Used only by the DeepL API.',
      choices: ['default', 'more', 'less', 'prefer_more', 'prefer_less'],
      default: 'default',
    },
    trim: {
      type: 'boolean',
      alias: 'i',
      description: 'Trim string after translation.',
      default: true,
    },
    delay: {
      type: 'number',
      alias: 'e',
      description: 'Delay between every request made to the translate api.',
      default: 250,
    },
    saveTo: {
      type: 'string',
      alias: 'v',
      description:
        'Override where translated file should be saved. (use only with `--filePath` option)',
    },
    glossary: {
      type: 'string',
      alias: 'g',
      description: 'Specify the glossary to use for the translation. Used only by the DeepL API.',
    },
    instruction: {
      type: 'string',
      description: 'Custom instruction message for the translation. Used only by the Azure OpenAI API.',
    },
    instructionPath: {
      type: 'string',
      description: 'Path to a file containing a custom instruction message for the translation. Used only by the Azure OpenAI API.',
    },
    historySize: {
      type: 'number',
      alias: 'h',
      description: 'Size of the conversation history passed to the LLM. Used only by the Azure OpenAI API.',
      default: 2,
    }
  })
  .parseSync();
