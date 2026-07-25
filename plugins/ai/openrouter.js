import axios from 'axios'
import config from '../../config.js'
import te from '../../src/lib/ourin-error.js'

const pluginConfig = {
    name: 'openrouter',
    alias: [
        'or',
        'hermes',
        'nemotronsafety',
        'nemotronultra',
        'nemotronreasoning',
        'nemotronsuper',
        'nemotronvl',
        'lagunaxs',
        'lagunam',
        'kimi',
        'gemma26',
        'gemma31',
        'qwennext',
        'gptoss120',
        'gptoss20',
        'glm',
        'qwencoder',
        'llama33',
        'cohere'
    ],
    category: 'ai',
    description: 'Chat dengan berbagai model AI di OpenRouter (Hermes, Nemotron, Laguna, Kimi, Gemma, Qwen, GPT-OSS, GLM, Llama 3.3)',
    usage: '.openrouter <pertanyaan> atau .<alias_model> <pertanyaan>',
    example: '.hermes jelaskan tentang AI',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 1,
    isEnabled: true
}

const commandToModel = {
    hermes: 'nousresearch/hermes-3-llama-3.1-405b:free',
    nemotronsafety: 'nvidia/nemotron-3.5-content-safety:free',
    nemotronultra: 'nvidia/nemotron-3-ultra-550b-a55b:free',
    nemotronreasoning: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
    nemotronsuper: 'nvidia/nemotron-3-super-120b-a12b:free',
    nemotronvl: 'nvidia/llama-nemotron-embed-vl-1b-v2:free',
    lagunaxs: 'poolside/laguna-xs.2:free',
    lagunam: 'poolside/laguna-m.1:free',
    kimi: 'moonshotai/kimi-k2.6:free',
    gemma26: 'google/gemma-4-26b-a4b-it:free',
    gemma31: 'google/gemma-4-31b-it:free',
    qwennext: 'qwen/qwen3-next-80b-a3b-instruct:free',
    gptoss120: 'openai/gpt-oss-120b:free',
    gptoss20: 'openai/gpt-oss-20b:free',
    glm: 'z-ai/glm-4.5-air:free',
    qwencoder: 'qwen/qwen3-coder:free',
    llama33: 'meta-llama/llama-3.3-70b-instruct:free',
    cohere: 'cohere/north-mini-code:free',
    openrouter: 'meta-llama/llama-3.3-70b-instruct:free',
    or: 'meta-llama/llama-3.3-70b-instruct:free'
}

const modelDisplayNames = {
    'nousresearch/hermes-3-llama-3.1-405b:free': 'Hermes 3 Llama 3.1 405B',
    'nvidia/nemotron-3.5-content-safety:free': 'Nemotron 3.5 Content Safety',
    'nvidia/nemotron-3-ultra-550b-a55b:free': 'Nemotron 3 Ultra 550B',
    'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free': 'Nemotron 3 Nano Omni 30B Reasoning',
    'nvidia/nemotron-3-super-120b-a12b:free': 'Nemotron 3 Super 120B',
    'nvidia/llama-nemotron-embed-vl-1b-v2:free': 'Llama Nemotron Embed VL 1B',
    'poolside/laguna-xs.2:free': 'Laguna XS 2',
    'poolside/laguna-m.1:free': 'Laguna M 1',
    'moonshotai/kimi-k2.6:free': 'Kimi K2.6',
    'google/gemma-4-26b-a4b-it:free': 'Gemma 4 26B IT',
    'google/gemma-4-31b-it:free': 'Gemma 4 31B IT',
    'qwen/qwen3-next-80b-a3b-instruct:free': 'Qwen 3 Next 80B Instruct',
    'openai/gpt-oss-120b:free': 'GPT OSS 120B',
    'openai/gpt-oss-20b:free': 'GPT OSS 20B',
    'z-ai/glm-4.5-air:free': 'GLM 4.5 Air',
    'qwen/qwen3-coder:free': 'Qwen 3 Coder',
    'meta-llama/llama-3.3-70b-instruct:free': 'Llama 3.3 70B Instruct',
    'cohere/north-mini-code:free': 'Cohere North Mini Code'
}

async function handler(m) {
    const text = m.args.join(' ')
    const command = m.command.toLowerCase()
    
    if (!text) {
        return m.reply(
            `🤖 *ʟᴀʏᴀɴᴀɴ ᴏᴛᴏᴍᴀᴛɪs sᴘɪ - ᴏᴘᴇɴʀᴏᴜᴛᴇʀ ᴀɪ*\n\n` +
            `Gunakan perintah di bawah ini untuk berinteraksi dengan model AI pilihan Anda:\n\n` +
            `╭┈┈⬡「 📋 *ᴅᴀғᴛᴀʀ ᴍᴏᴅᴇʟ ᴀɪ* 」\n` +
            `┃ • \`hermes\` - Hermes 3 Llama 3.1 405B\n` +
            `┃ • \`kimi\` - Kimi K2.6\n` +
            `┃ • \`glm\` - GLM 4.5 Air\n` +
            `┃ • \`llama33\` - Llama 3.3 70B Instruct\n` +
            `┃ • \`qwencoder\` - Qwen 3 Coder\n` +
            `┃ • \`qwennext\` - Qwen 3 Next 80B Instruct\n` +
            `┃ • \`gemma31\` - Gemma 4 31B IT\n` +
            `┃ • \`gemma26\` - Gemma 4 26B IT\n` +
            `┃ • \`gptoss120\` - GPT OSS 120B\n` +
            `┃ • \`gptoss20\` - GPT OSS 20B\n` +
            `┃ • \`lagunam\` - Laguna M 1\n` +
            `┃ • \`lagunaxs\` - Laguna XS 2\n` +
            `┃ • \`cohere\` - Cohere North Mini Code\n` +
            `┃ • \`nemotronsuper\` - Nemotron 3 Super 120B\n` +
            `┃ • \`nemotronultra\` - Nemotron 3 Ultra 550B\n` +
            `┃ • \`nemotronreasoning\` - Nemotron 3 Nano Omni\n` +
            `┃ • \`nemotronsafety\` - Nemotron 3.5 Content Safety\n` +
            `┃ • \`nemotronvl\` - Llama Nemotron Embed VL\n` +
            `╰┈┈┈┈┈┈┈┈⬡\n\n` +
            `> *Contoh:* \`${m.prefix}hermes apa itu AI?\``
        )
    }

    const model = commandToModel[command] || 'meta-llama/llama-3.3-70b-instruct:free'
    const modelName = modelDisplayNames[model] || 'OpenRouter AI'
    
    // Get the key corresponding to this model. Fallback to first available key.
    const keys = config.APIkey?.openrouter || {}
    let apiKey = keys[model]
    if (!apiKey) {
        // Find any non-empty key from the map
        const availableKeys = Object.values(keys).filter(k => typeof k === 'string' && k.startsWith('sk-or-'))
        if (availableKeys.length > 0) {
            apiKey = availableKeys[0]
        }
    }

    if (!apiKey) {
        return m.reply(`❌ API key untuk OpenRouter belum dikonfigurasi di config.js!`)
    }

    await m.react('🕕')

    try {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: model,
            messages: [
                { role: 'user', content: text }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://sipalinginformasi.id',
                'X-Title': 'Layanan Otomatis SPI'
            },
            timeout: 60000 // 60 seconds timeout
        })

        const result = response.data?.choices?.[0]?.message?.content
        if (!result) {
            throw new Error('Respons kosong dari API OpenRouter.')
        }

        await m.react('✅')
        await m.reply(`🧠 *${modelName}*\n\n${result.trim()}`)
    } catch (error) {
        console.error(`[OpenRouter] Error:`, error.response?.data || error.message)
        await m.react('☢')
        await m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }
