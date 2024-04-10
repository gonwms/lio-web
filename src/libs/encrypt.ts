import crypto from 'crypto'

// ---- ENCRYPT

const ENCRYPT_KEY = '01234567890123456789012345678901'

export const encrypt = (text: string, key: string = ENCRYPT_KEY) => {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(key, 'hex'), iv)
  let encrypted = cipher.update(text, 'utf-8', 'hex')
  encrypted += cipher.final('hex')
  return `${iv.toString('hex')}:${encrypted}`
}

export const decrypt = (text: string, key: string = ENCRYPT_KEY) => {
  const [iv, encrypted] = text.split(':')
  const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'))
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8')
  decrypted += decipher.final('utf-8')
  return decrypted
}

/* ---------- HOW TO USE --------------

const key = '01234567890123456789012345678901' // 32 bytes for aes-128-cbc
const originalData = 'wascaman'

const encryptedData = encrypt(originalData, ENCRYPT_KEY)
console.log('Encrypted:', encryptedData)

const decryptedData = decrypt(encryptedData, ENCRYPT_KEY)
console.log('Decrypted:', decryptedData)

*/
