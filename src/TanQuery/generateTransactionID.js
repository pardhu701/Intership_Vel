export default function generateTransactionID(userID) {
    const now = new Date();

    const date = String(now.getDate()).padStart(2,'0') +
                 String(now.getMonth()+1).padStart(2,'0') +
                 now.getFullYear();

    const time = String(now.getHours()).padStart(2,'0') +
                 String(now.getMinutes()).padStart(2,'0') +
                 String(now.getSeconds()).padStart(2,'0');

    // Take last 4 characters of userID (if shorter, pad with 0)
    const userPart = userID.slice(-4).padStart(4,'0');

    // Add 4 random hex characters for unpredictability
    const randomBytes = new Uint8Array(2); // 2 bytes = 4 hex chars
    window.crypto.getRandomValues(randomBytes);
    const randomPart = Array.from(randomBytes).map(b => b.toString(16).padStart(2,'0')).join('');

    return `TXNO${date}${time}${userPart}${randomPart}`;
}

