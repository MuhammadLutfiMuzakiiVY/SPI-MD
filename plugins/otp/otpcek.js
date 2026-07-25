import * as otpPoller from '../../src/lib/spi-otp-poller.js'
import * as jasaotp from '../../src/lib/spi-otp-service.js'
import config from '../../config.js'
import fs from 'fs'
import path from 'path'
const pluginConfig = {
    name: 'otpcek',
    alias: ['otpcheck', 'otpstatus', 'cekOtp'],
    category: 'otp',
    description: 'Cek status pesanan OTP',
    usage: '.otpcek <order_id>',
    example: '.otpcek OTP1A2B3C',
    isOwner: false,
    isPremium: false,
    isGroup: true,
    isPrivate: false,
    cooldown: 3,
    energi: 0,
    isEnabled: true
}

const STATUS_LABELS = {
    pending_payment: '🕕 Menunggu Pembayaran',
    creating_otp: '⚙️ Memproses Pesanan',
    waiting_otp: '📱 Menunggu Kode OTP',
    completed: '✅ Selesai',
    failed: '❌ Gagal',
    timeout: '⏰ Timeout',
    cancelled: '🚫 Dibatalkan',
    refunded: '💰 Direfund',
    expired: '⏰ Kedaluarsa'
}

async function handler(m, { sock }) {
    const { getDatabase } = await import('../../src/lib/spi-database.js')
    const db = getDatabase()
    const groupData = db.getGroup(m.chat) || {}

    if (groupData.botMode !== 'otp') {
        return m.reply(`⚠️ Mode OTP tidak aktif! Admin ketik: \`${m.prefix}botmode otp\``)
    }

    const orderId = m.text?.trim().toUpperCase()

    if (!orderId) {
        return m.reply(
            `⚠️ *ᴄᴀʀᴀ ᴘᴀᴋᴀɪ*\n\n` +
            `> Kamu perlu memasukkan Order ID.\n\n` +
            `*ᴄᴏɴᴛᴏʜ:*\n` +
            `> \`${m.prefix}otpcek OTP1A2B3C\`\n\n` +
            `> 💡 Lihat semua order: \`${m.prefix}myotp\``
        )
    }

    const order = otpPoller.getOtpOrder(orderId)

    if (!order) {
        return m.reply(
            `❌ *ᴏʀᴅᴇʀ ᴛɪᴅᴀᴋ ᴅɪᴛᴇᴍᴜᴋᴀɴ*\n\n` +
            `> Order ID \`${orderId}\` tidak ditemukan.\n\n` +
            `> 💡 Pastikan Order ID benar.\n` +
            `> Lihat order kamu: \`${m.prefix}myotp\``
        )
    }

    if (order.chatId !== m.chat && order.buyerJid !== m.sender && !m.isOwner) {
        return m.reply(`❌ Kamu tidak memiliki akses ke order ini.`)
    }

    let txt = `📊 *sᴛᴀᴛᴜs ᴘᴇsᴀɴᴀɴ ᴏᴛᴘ*\n\n`
    txt += `╭┈┈⬡「 📋 *ᴅᴇᴛᴀɪʟ* 」\n`
    txt += `┃ 🆔 Order: \`${orderId}\`\n`
    txt += `┃ 👤 Pembeli: @${order.buyerJid?.split('@')[0] || '-'}\n`
    txt += `┃ 🌍 Negara: *${order.countryName || '-'}*\n`
    txt += `┃ 📱 Layanan: *${order.serviceName || '-'}*\n`
    txt += `┃ 📡 Operator: *${capitalize(order.operator || '-')}*\n`
    txt += `┃ 💰 Total: *Rp ${jasaotp.formatPrice(order.totalPayment || 0)}*\n`
    txt += `┃ 📊 Status: *${STATUS_LABELS[order.status] || order.status}*\n`

    if (order.phoneNumber) {
        txt += `┃ 📞 Nomor: \`${order.phoneNumber}\`\n`
    }

    if (order.otpCode) {
        txt += `┃ 🔑 Kode OTP: \`${order.otpCode}\`\n`
    }

    if (order.status === 'waiting_otp' && order.otpStartedAt) {
        const elapsed = Math.floor((Date.now() - new Date(order.otpStartedAt).getTime()) / 1000)
        const remaining = Math.max(0, jasaotp.getTimeout() - elapsed)
        txt += `┃ ⏱️ Sisa waktu: *${Math.ceil(remaining / 60)} menit*\n`
    }

    txt += `┃ 📅 Dibuat: ${formatDate(order.createdAt)}\n`
    txt += `╰┈┈⬡`

    if (order.status === 'completed') {
        txt += `\n\n> ✅ OTP sudah diterima! Segera gunakan sebelum expired.`
    } else if (order.status === 'waiting_otp') {
        txt += `\n\n> 🕕 Bot sedang menunggu kode OTP masuk...\n> Gunakan nomor di atas untuk verifikasi, OTP akan otomatis dikirim ke sini.`
    } else if (order.status === 'pending_payment') {
        txt += `\n\n> 💳 Silakan selesaikan pembayaran.\n> Metode: *${order.paymentMethod?.toUpperCase() || 'QRIS'}*`
    } else if (['failed', 'timeout', 'refunded'].includes(order.status)) {
        txt += `\n\n> ❌ Pesanan ini sudah tidak aktif.\n> Buat pesanan baru: \`${m.prefix}otp\``
    }

    const buttons = []

    if (order.status === 'waiting_otp' || order.status === 'pending_payment') {
        buttons.push({
            name: 'quick_reply',
            buttonParamsJson: JSON.stringify({
                display_text: '❌ ʙᴀᴛᴀʟᴋᴀɴ',
                id: `${m.prefix}otpcancel ${orderId}`
            })
        })
    }

    buttons.push({
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
            display_text: '📱 ᴏʀᴅᴇʀ ʙᴀʀᴜ',
            id: `${m.prefix}otp`
        })
    })

    const otpImage = path.join(process.cwd(), 'assets', 'images', 'spi-otp.jpg')
    let imageBuffer = null
    if (fs.existsSync(otpImage)) imageBuffer = fs.readFileSync(otpImage)

    await sock.sendMessage(m.chat, {
        ...(imageBuffer ? { image: imageBuffer, caption: txt } : { text: txt }),
        mentions: [order.buyerJid],
        footer: `© ${config.bot?.name || 'Si Paling Informasi'} | OTP Service`,
        interactiveButtons: buttons
    }, { quoted: m })
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

function formatDate(dateStr) {
    if (!dateStr) return '-'
    try {
        return new Date(dateStr).toLocaleString('id-ID', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        })
    } catch { return dateStr }
}

export { pluginConfig as config, handler }