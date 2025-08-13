<h1 align="center">
  <br>
  i18n-auto-translation
  <br>
</h1>

<h4 align="center">Auto translate i18n JSON file(s) to desired language(s). Extended with Azure OpenAI provider.</h4>

### Obtaining keys

- **Google**
  - Goto https://console.cloud.google.com/ and create a new project.
  - In the search bar find "Cloud Translation API" and enable it.
  - Click on credentials -> Create credentials -> API key.
  - Copy the key and use it.
  
- **Azure**
  - Follow the instructions [here](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/quickstart-translator?tabs=nodejs#prerequisites).
  
- **Azure OpenAI** ⭐
  1. **Create Azure OpenAI Resource**:
     - Go to [Azure Portal](https://portal.azure.com/)
     - Create a new "Azure OpenAI" resource
     - Choose your subscription, resource group, and region
  2. **Deploy a Model**:
     - Navigate to Azure OpenAI Studio
     - Go to "Deployments" and create a new deployment
     - Choose a model (e.g., `gpt-4`, `gpt-35-turbo`)
     - Note your deployment name
  3. **Get Credentials**:
     - In Azure Portal, go to your OpenAI resource
     - Copy the **Endpoint** and **API Key** from "Keys and Endpoint"
  4. **Usage**:
     ```bash
     --apiProvider azure-openai \
     --key YOUR_API_KEY \
     --endpoint https://your-resource.openai.azure.com/ \
     --deployment your-deployment-name
     ```
     
- **RapidAPI**
  - For all RapidAPI providers, create an account [here](https://rapidapi.com/).
  - Go to desired API and switch to the pricing section. There you will find instructions on how to subscribe to the API.
  - Now you can use your key provided from RapidAPI.="center">
  <a href="#description">Description</a> •
  <a href="#usage">Usage</a> •
  <a href="#azure-openai-features">Azure OpenAI Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#known-issue">Known issue</a> •
  <a href="#translate-providers">Translate Providers</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <a href="https://github.com/andreas-stumpf-conxepta/i18n-auto-translation/actions/workflows/build.yml" alt="Build">
    <img src="https://github.com/andreas-stumpf-conxepta/i18n-auto-translation/actions/workflows/build.yml/badge.svg" />
  </a>
  <a href="https://www.npmjs.com/package/i18n-auto-translation" alt="NPM Version">
    <img src="https://img.shields.io/badge/npm-v2.2.1-blue" />
  </a>
  <a href="LICENSE" alt="License">
    <img src="https://img.shields.io/github/license/andreas-stumpf-conxepta/i18n-auto-translation" />
  </a>
</p>
  
## Description

**Fork Notice**: This is a fork of the original [i18n-auto-translation](https://github.com/while1618/i18n-auto-translation) project, extended with Azure OpenAI provider support for enhanced translation capabilities using Large Language Models.

i18n-auto-translation helps you translate your i18n JSON files. You need to pick one of the translation API providers that are supported, pass the subscription key, language to which you want to translate, path to the file or directory, and you are good to go.

### ✨ New: Azure OpenAI Integration

This fork adds Azure OpenAI as a translation provider, leveraging Large Language Models (LLMs) like GPT-4 for more contextual and natural translations. Perfect for applications requiring higher translation quality and context awareness.

### How It Works?

- If there is no translation for the file you provided, the complete file will be translated, and the new file will be created with the same structure as the original file, keeping the keys in the original language, and translating only values.
- You can pass a file with the nested JSON objects, and everything will be translated as you expect.
- The newly created file will be named [to].json. (e.g. de.json)
- If the translation for the file already exists, only newly added lines will be translated (API will be called only for those lines), and lines that are no longer in the original file will be deleted.
- Translate APIs are not ideal, and that's why you will need from time to time to override some translations manually. When you manually translate some value, it will remain like that, and it will not be overridden again, unless you use `override` flag.
- If you pass a directory instead of a single file, the library will recursively find all the files named [from].json (e.g. en.json), and the translations will be saved in the same directories as the original file.
- Words that are wrapped in `{{}}`, `{}`, `<>`, `</>` won't be translated. e.g. `{{skip}} {skip} <strong> </strong> <br />`.

## Usage

```bash
$ npx i18n-auto-translation -k SUBSCRIPTION_KEY -d PROJECT_DIR -t DESIRED_LANGUAGE
```

### Azure OpenAI Usage

```bash
$ npx i18n-auto-translation \
  --apiProvider azure-openai \
  --key YOUR_AZURE_OPENAI_KEY \
  --endpoint https://your-resource.openai.azure.com/ \
  --deployment your-deployment-name \
  --dirPath ./your-i18n-folder \
  --from en \
  --to de \
  --instruction "Use formal German with technical terminology"
```

### Options

| Key                                       | Alias | Description                                                                                               | Default         | Azure OpenAI |
| ----------------------------------------- | ----- | --------------------------------------------------------------------------------------------------------- | --------------- | ------------ |
| --help                                    | /     | All available options.                                                                                    | /               | /            |
| --version                                 | /     | Current version.                                                                                          | /               | /            |
| --apiProvider                             | -a    | API Provider.                                                                                             | google-official | ✅            |
| --key [required]                          | -k    | Subscription key for the API provider.                                                                    | /               | ✅            |
| --region                                  | -r    | Key region. Used only by the Official Azure API.                                                          | global          | /            |
| --endpoint                                | /     | Azure OpenAI endpoint URL. **Required for azure-openai provider.**                                       | /               | ✅            |
| --deployment                              | /     | Azure OpenAI deployment name. **Required for azure-openai provider.**                                    | /               | ✅            |
| --filePath [filePath or dirPath required] | -p    | Path to a single JSON file.                                                                               | /               | ✅            |
| --dirPath [filePath or dirPath required]  | -d    | Path to a directory in which you will recursively find all JSON files named [from].json (e.g. en.json)    | /               | ✅            |
| --from                                    | -f    | From which language you want to translate.                                                                | en              | ✅            |
| --to [required]                           | -t    | To which language you want to translate.                                                                  | /               | ✅            |
| --override                                | -o    | Override existing translation(s).                                                                         | false           | ✅            |
| --certificatePath                         | -c    | Path to a custom certificate.                                                                             | /               | /            |
| --spaces                                  | -s    | Number of spaces to use when generating output JSON files.                                                | 2               | ✅            |
| --maxLinesPerRequest                      | -l    | Maximum number of lines per request. For every `x` number of lines, separated request is sent to the api. | 50              | ✅            |
| --context                                 | -x    | Context for the translation. Used only by the DeepL API.                                                  | /               | /            |
| --formality                               | -m    | Formality for the translation. Used only by the DeepL API.                                                | default         | /            |
| --trim                                    | -i    | Trim string after translation.                                                                            | true            | ✅            |
| --delay                                   | -e    | Delay between every request made to the translate api.                                                    | 250             | ✅            |
| --saveTo                                  | -v    | Override where translated file should be saved. (use only with `--filePath` option)                       | /               | ✅            |
| --glossary                                | -g    | Specify the glossary to use for the translation. Used only by the DeepL API.                              | /               | /            |
| --instruction                             | /     | Custom instruction message for enhanced translation context. **Azure OpenAI only.**                       | /               | ✅            |
| --instructionPath                         | /     | Path to file containing custom instruction message. **Azure OpenAI only.**                                | /               | ✅            |
| --historySize                            | -h    | Size of conversation history passed to LLM for context. **Azure OpenAI only.**                            | 2               | ✅            |

## Azure OpenAI Features

This fork introduces Azure OpenAI as a translation provider, offering several advantages over traditional translation APIs:

### 🚀 Enhanced Translation Quality
- **Context-Aware Translations**: Leverages Large Language Models for better understanding of context and nuances
- **Custom Instructions**: Provide specific guidance for translation style, formality, or domain expertise
- **Conversation History**: Maintains context across multiple translation requests for consistency

### 🎯 Advanced Configuration Options

#### Custom Instructions
Provide specific translation guidelines:

```bash
--instruction "Use technical German terminology for software development terms"
--instruction "Translate in a casual, friendly tone suitable for mobile apps"
--instruction "Use formal business language appropriate for legal documents"
```

#### Instruction Files
Store complex instructions in files:

```bash
--instructionPath "./translation-guidelines.txt"
```

Example instruction file content:
```text
Translate to German using:
- Formal language (Sie instead of du)
- Technical terminology for software terms
- Bavarian regional expressions where appropriate
- Maintain brand names in English
```

#### Conversation History
Control how much context the AI remembers:

```bash
--historySize 4  # Remember last 4 translation exchanges for better consistency
```

### 🔧 Setup Requirements

1. **Azure OpenAI Resource**: Create an Azure OpenAI resource in Azure Portal
2. **Model Deployment**: Deploy a model (e.g., GPT-4, GPT-3.5-turbo)
3. **API Key**: Obtain your API key from the Azure Portal
4. **Endpoint URL**: Get your resource endpoint URL

### 💡 Best Practices

- **Use Custom Instructions**: Provide context about your application domain for better translations
- **Adjust History Size**: Increase for complex projects requiring consistency, decrease for simple translations
- **Test with Small Files**: Start with single files to test your configuration before processing directories
- **Monitor Costs**: Azure OpenAI charges per token, so consider your usage patterns

## Demo

https://user-images.githubusercontent.com/49982438/158603886-23c9978b-56e0-4f50-a1ce-afdb03ef1291.mp4

## Known issue

In some cases, you might face problem with google translate api. When you try to translate a lot of text, the response might be wrong, and it will change the structure of the translated json file.

Two issues were opened related to this problem, you can read more about it here. [#12](https://github.com/while1618/i18n-auto-translation/issues/12) [#46](https://github.com/while1618/i18n-auto-translation/issues/46)

If you face this problem, try to change `maxLinesPerRequest`. The default value is `50`, and that means if your file is larger than 50 lines, multiple request will be sent to the api. For every 50 lines, one request will be sent. Try to reduce this number in order to fix the issue.

In my testing, only google had this problem, but you can try the same approach if it happens with other provides. Feel free to open the issue if you have any problems.

## Translate Providers

| Provider                                                                                                                          | CLI usage              | Features                    |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | --------------------------- |
| [Google Translate Official](https://cloud.google.com/translate/)                                                                  | google-official        | Fast, reliable              |
| [Azure Translator Official](https://azure.microsoft.com/en-us/services/cognitive-services/translator/)                            | azure-official         | Enterprise-grade            |
| **[Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service/) (New!)** | **azure-openai**       | **🤖 AI-powered, contextual** |
| [Azure Translator RapidAPI](https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-translator-text/) | azure-rapid            | API marketplace             |
| [Deep Translate RapidAPI](https://rapidapi.com/gatzuma/api/deep-translate1/)                                                      | deep-rapid             | Simple integration          |
| [Lecto Translation RapidAPI](https://rapidapi.com/lecto-lecto-default/api/lecto-translation/)                                     | lecto-rapid            | Multiple languages          |
| [Lingvanex Translate RapidAPI](https://rapidapi.com/Lingvanex/api/lingvanex-translate/)                                           | lingvanex-rapid        | Wide language support       |
| [NLP Translation RapidAPI](https://rapidapi.com/gofitech/api/nlp-translation/)                                                    | nlp-rapid              | NLP-focused                 |
| [Deepl](https://www.deepl.com/pro-api?cta=header-pro-api)                                                                         | deepl-pro / deepl-free | High quality translations   |

### Obtaining keys

- Google
  - Goto https://console.cloud.google.com/ and create a new project.
  - In the search bar find “Cloud Translation API” and enable it.
  - Click on credentials -> Create credentials -> API key.
  - Copy the key and use it.
- Azure
  - Follow the instructions [here](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/quickstart-translator?tabs=nodejs#prerequisites).
- RapidAPI
  - For all RapidAPI providers, create an account [here](https://rapidapi.com/).
  - Go to desired API and switch to the pricing section. There you will find instructions on how to subscribe to the API.
  - Now you can use your key provided from RapidAPI.

### Adding Provider

You don't like supported API providers? You can easily add yours. Go to src/translate/providers, create class for your provider, extend 'Translate' class, and implement 'callTranslateAPI' method. You can check in other providers for examples on how to implement this method. After you added your provider, you just need to register it in 'translate-supplier.ts' and in 'cli.ts' and you are good to go.

## Credits

This software uses the following open source packages:

- [yargs](https://github.com/yargs/yargs)
- [deep-object-diff](https://github.com/mattphillips/deep-object-diff)
- [just-extend](https://github.com/angus-c/just)
- [glob](https://github.com/isaacs/node-glob)
- [axios](https://github.com/axios/axios)
- [@google-cloud/translate](https://github.com/googleapis/nodejs-translate)
- [html-entities](https://github.com/mdevils/html-entities)
- [yocto-spinner](https://github.com/sindresorhus/yocto-spinner)
- [openai](https://github.com/openai/openai-node) - For Azure OpenAI integration
- [@azure/openai](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai) - Azure OpenAI SDK

### Original Project

This is a fork of the original [i18n-auto-translation](https://github.com/while1618/i18n-auto-translation) by [while1618](https://github.com/while1618). All credit for the core functionality goes to the original author and contributors.

## License

- [MIT](LICENSE)
