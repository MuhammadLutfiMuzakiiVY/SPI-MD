import fs from 'fs'
import path from 'path'
import te from '../../src/lib/spi-error.js'
const pluginConfig = {
    name: 'ganti-spi-v11.jpg',
    alias: ['gantiourinv11', 'setourinv11'],
    category: 'owner',
    description: 'Ganti gambar spi-v11.jpg',
    usage: '.ganti-spi-v11.jpg (reply/kirim gambar)',
    example: '.ganti-spi-v11.jpg',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const isImage = m.isImage || (m.quoted && m.quoted.type === 'imageMessage')
    if (!isImage) return m.reply(`🖼️ *ɢᴀɴᴛɪ SPI-V11.JPG*\n\n> Kirim/reply gambar untuk mengganti\n> File: assets/images/spi-v11.jpg`)
    try {
        let buffer = m.quoted && m.quoted.isMedia ? await m.quoted.download() : await m.download()
        if (!buffer) return m.reply('❌ Gagal mendownload gambar')
        const targetPath = path.join(process.cwd(), 'assets', 'images', 'spi-v11.jpg')
        fs.writeFileSync(targetPath, buffer)
        m.reply(`✅ *ʙᴇʀʜᴀsɪʟ*\n\n> Gambar spi-v11.jpg telah diganti`)
    } catch (error) {
        m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }