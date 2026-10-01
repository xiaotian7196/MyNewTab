const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const root = process.cwd();
const temp = path.join(process.env.TEMP || root, 'homepage-crx-build');
const zip = path.join(temp, 'Homepage.zip');
const crx = path.join(root, 'Homepage.crx');

fs.rmSync(temp, { recursive: true, force: true });
fs.mkdirSync(path.join(temp, 'icons'), { recursive: true });
for (const file of ['manifest.json', 'index.html', 'styles.css', 'app.js', 'preload.js', 'liquid-glass.js']) {
  fs.copyFileSync(path.join(root, file), path.join(temp, file));
}
for (const file of ['icon16.png', 'icon32.png', 'icon48.png', 'icon128.png']) {
  fs.copyFileSync(path.join(root, 'icons', file), path.join(temp, 'icons', file));
}

cp.execFileSync('7z.exe', ['a', '-tzip', '-mx=9', zip, 'manifest.json', 'index.html', 'styles.css', 'app.js', 'preload.js', 'liquid-glass.js', 'icons'], { cwd: temp, stdio: 'ignore' });
const zipBytes = fs.readFileSync(zip);
const keys = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
const publicKey = keys.publicKey.export({ type: 'spki', format: 'der' });
const privateKey = keys.privateKey.export({ type: 'pkcs8', format: 'pem' });
const publicHash = crypto.createHash('sha256').update(publicKey).digest();
const crxId = publicHash.subarray(0, 16);

function varint(value) {
  const out = [];
  while (value > 127) { out.push((value & 127) | 128); value >>>= 7; }
  out.push(value);
  return Buffer.from(out);
}

function field(number, value) {
  return Buffer.concat([varint((number << 3) | 2), varint(value.length), value]);
}

const signedHeaderData = field(1, crxId);
const signature = crypto.sign('sha256', Buffer.concat([Buffer.from('CRX3 SignedData\0', 'binary'), signedHeaderData, zipBytes]), {
  key: privateKey,
  padding: crypto.constants.RSA_PKCS1_PADDING
});
const proof = Buffer.concat([field(1, publicKey), field(2, signature)]);
const crxHeader = Buffer.concat([field(2, proof), field(100, signedHeaderData)]);
const prefix = Buffer.alloc(12);
prefix.write('Cr24', 0, 'ascii');
prefix.writeUInt32LE(3, 4);
prefix.writeUInt32LE(crxHeader.length, 8);
fs.writeFileSync(crx, Buffer.concat([prefix, crxHeader, zipBytes]));
console.log(`${crx} ${fs.statSync(crx).size} bytes`);
