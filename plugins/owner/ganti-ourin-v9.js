import fs from 'fs'
import path from 'path'
import te from '../../src/lib/spi-error.js'
const pluginConfig = {
    name: 'ganti-spi-v9.jpg',
    alias: ['gantiourinv9', 'setourinv9'],
    category: 'owner',
    description: 'Ganti gambar spi-v9.jpg (thumbnail welcome)',
    usage: '.ganti-spi-v9.jpg (reply/kirim gambar)',
    example: '.ganti-spi-welcome.jpg',
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
    
    if (!isImage) {
        return m.reply(`🖼️ *ɢᴀɴᴛɪ ᴏᴜʀɪɴ-ᴠ9.ᴊᴘɢ*\n\n> Kirim/reply gambar untuk mengganti\n> File: assets/images/spi-v9.jpg`)
    }
    
    try {
        let buffer
        if (m.quoted && m.quoted.isMedia) {
            buffer = await m.quoted.download()
        } else if (m.isMedia) {
            buffer = await m.download()
        }
        
        if (!buffer) {
            return m.reply(`❌ Gagal mendownload gambar`)
        }
        
        const targetPath = path.join(process.cwd(), 'assets', 'images', 'spi-v9.jpg')
        
        const dir = path.dirname(targetPath)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        
        fs.writeFileSync(targetPath, buffer)
        
        m.reply(`✅ *ʙᴇʀʜᴀsɪʟ*\n\n> Gambar spi-v9.jpg telah diganti`)
        
    } catch (error) {
        m.reply(te(m.prefix, m.command, m.pushName))
    }
}

export { pluginConfig as config, handler }