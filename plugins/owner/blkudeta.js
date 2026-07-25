import config from '../../config.js'
import path from 'path'
import fs from 'fs'
const pluginConfig = {
    name: 'blkudeta',
    alias: ['kudetawl', 'kudetawhitelist', 'wlkudeta'],
    category: 'owner',
    description: 'Whitelist nomor dari kudeta',
    usage: '.blkudeta @tag / list / del @tag',
    example: '.blkudeta @628xxx',
    isOwner: true,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

if (!global.kudetaWhitelist) global.kudetaWhitelist = {}

let thumbOwner = null
try {
    const thumbPath = path.join(process.cwd(), 'assets', 'images', 'spi-owner.jpg')
    if (fs.existsSync(thumbPath)) thumbOwner = fs.readFileSync(thumbPath)
} catch (e) {}

async function getContextInfo(title = '🛡️ *ᴡʜɪᴛᴇʟɪsᴛ*', body = 'Kudeta Protection') {
    const saluranId = config.saluran?.id || '120363208449943317@newsletter'
    const saluranName = config.saluran?.name || config.bot?.name || 'Si Paling Informasi'
    
    const contextInfo = {
        forwardingScore: 9999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: saluranId,
            newsletterName: saluranName,
            serverMessageId: 127
        }
    }
    
    if (thumbOwner) {
        contextInfo.externalAdReply = {
            title: title,
            body: body,
            thumbnail: thumbOwner,
            mediaType: 1,
            renderLargerThumbnail: true,
            sourceUrl: config.saluran?.link || ''
        }
    }
    
    return contextInfo
}

async function handler(m, { sock }) {
    const args = m.args || []
    const groupId = m.chat
    
    if (!global.kudetaWhitelist[groupId]) {
        global.kudetaWhitelist[groupId] = []
    }
    
    const action = args[0]?.toLowerCase()
    
    if (action === 'list') {
        const whitelist = global.kudetaWhitelist[groupId] || []
        
        if (whitelist.length === 0) {
            return m.reply(
                `🛡️ *ᴡʜɪᴛᴇʟɪsᴛ ᴋᴜᴅᴇᴛᴀ*\n\n` +
                `> Belum ada nomor yang di-whitelist\n\n` +
                `> Gunakan: \`${m.prefix}blkudeta @tag\``
            )
        }
        
        let text = `🛡️ *ᴡʜɪᴛᴇʟɪsᴛ ᴋᴜᴅᴇᴛᴀ*\n\n`
        text += `╭┈┈⬡「 📋 *ᴅᴀꜰᴛᴀʀ* 」\n`
        whitelist.forEach((jid, i) => {
            text += `┃ ${i + 1}. @${jid.split('@')[0]}\n`
        })
        text += `╰┈┈┈┈┈┈┈┈⬡\n\n`
        text += `> Total: *${whitelist.length}* nomor\n`
        text += `> Hapus: \`${m.prefix}blkudeta del @tag\``
        
        return sock.sendMessage(m.chat, {
            text,
            mentions: whitelist,
            contextInfo: getContextInfo('🛡️ WHITELIST', `${whitelist.length} protected`)
        }, { quoted: m })
    }
    
    if (action === 'del' || action === 'delete' || action === 'rm' || action === 'remove') {
        let targetJid = null
        
        if (m.quoted) {
            targetJid = m.quoted.sender
        } else if (m.mentionedJid?.[0]) {
            targetJid = m.mentionedJid[0]
        } else if (args[1]) {
            let num = args[1].replace(/[^0-9]/g, '')
            if (num.length > 5 && num.length < 20) {
                targetJid = num + '@s.whatsapp.net'
            }
        }
        
        if (!targetJid) {
            return m.reply(
                `⚠️ *ᴄᴀʀᴀ ᴘᴀᴋᴀɪ*\n\n` +
                `> \`${m.prefix}blkudeta del @tag\`\n` +
                `> Reply pesan + \`${m.prefix}blkudeta del\``
            )
        }
        
        const idx = global.kudetaWhitelist[groupId].findIndex(jid => {
            const num1 = jid.replace(/[^0-9]/g, '')
            const num2 = targetJid.replace(/[^0-9]/g, '')
            return num1 === num2
        })
        
        if (idx === -1) {
            return m.reply(
                `❌ *ᴛɪᴅᴀᴋ ᴅɪᴛᴇᴍᴜᴋᴀɴ*\n\n` +
                `> @${targetJid.split('@')[0]} tidak ada di whitelist`,
                { mentions: [targetJid] }
            )
        }
        
        global.kudetaWhitelist[groupId].splice(idx, 1)
        
        return m.reply(
            `✅ *ᴅɪʜᴀᴘᴜs*\n\n` +
            `> @${targetJid.split('@')[0]} dihapus dari whitelist`,
            { mentions: [targetJid] }
        )
    }
    
    let targetJid = null
    
    if (m.quoted) {
        targetJid = m.quoted.sender
    } else if (m.mentionedJid?.[0]) {
        targetJid = m.mentionedJid[0]
    } else if (args[0]) {
        let num = args[0].replace(/[^0-9]/g, '')
        if (num.length > 5 && num.length < 20) {
            targetJid = num + '@s.whatsapp.net'
        }
    }
    
    if (!targetJid) {
        return m.reply(
            `🛡️ *ᴡʜɪᴛᴇʟɪsᴛ ᴋᴜᴅᴇᴛᴀ*\n\n` +
            `> Proteksi nomor dari kudeta\n\n` +
            `╭┈┈⬡「 📋 *ᴄᴀʀᴀ ᴘᴀᴋᴀɪ* 」\n` +
            `┃ • \`${m.prefix}blkudeta @tag\` → Tambah\n` +
            `┃ • \`${m.prefix}blkudeta list\` → Lihat\n` +
            `┃ • \`${m.prefix}blkudeta del @tag\` → Hapus\n` +
            `╰┈┈┈┈┈┈┈┈⬡`
        )
    }
    
    const exists = global.kudetaWhitelist[groupId].some(jid => {
        const num1 = jid.replace(/[^0-9]/g, '')
        const num2 = targetJid.replace(/[^0-9]/g, '')
        return num1 === num2
    })
    
    if (exists) {
        return m.reply(
            `⚠️ *sᴜᴅᴀʜ ᴀᴅᴀ*\n\n` +
            `> @${targetJid.split('@')[0]} sudah di whitelist`,
            { mentions: [targetJid] }
        )
    }
    
    global.kudetaWhitelist[groupId].push(targetJid)
    
    await m.react('🛡️')
    return sock.sendMessage(m.chat, {
        text: `🛡️ *ᴅɪᴛᴀᴍʙᴀʜᴋᴀɴ*\n\n` +
            `> @${targetJid.split('@')[0]} ditambahkan ke whitelist\n` +
            `> Nomor ini akan dilindungi dari kudeta\n\n` +
            `> Total whitelist: *${global.kudetaWhitelist[groupId].length}*`,
        mentions: [targetJid],
        contextInfo: getContextInfo('🛡️ PROTECTED', 'Whitelist added')
    }, { quoted: m })
}

export { pluginConfig as config, handler }