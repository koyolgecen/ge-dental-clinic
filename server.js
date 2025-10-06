const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Heroku proxy
app.set('trust proxy', 1);

// HTTP -> HTTPS yönlendirme
app.use((req, res, next) => {
    if (req.secure || req.headers['x-forwarded-proto'] === 'https') return next();
    return res.redirect(301, 'https://' + req.headers.host + req.originalUrl);
});

// Güvenlik header’ları
app.use(helmet({
    contentSecurityPolicy: false, // (animasyon/plugin’leriniz sorun çıkarmasın diye)
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Sıkıştırma
app.use(compression());

// Statik dosyalar (cache stratejisi)
const staticOpts = {
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
        const ext = path.extname(filePath).toLowerCase();

        // HTML: cache kısa
        if (ext === '.html') {
            res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 saat
        } else if (['.css','.js','.jpg','.jpeg','.png','.webp','.avif','.svg','.ico','.gif','.woff','.woff2'].includes(ext)) {
            res.setHeader('Cache-Control', 'public, max-age=604800'); // 7 gün
        } else {
            res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 gün
        }

        // HSTS (sadece HTTPS üzerinde etkili)
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }
};

app.use(express.static(path.join(__dirname), staticOpts));

// Root
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// 404 (opsiyonel özel sayfa)
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT, () => {
    console.log(`G&E Dental running on ${PORT}`);
});