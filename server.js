const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const root = __dirname; // repo kökü (index.html burada)

app.use(compression());

// Statik dosyalar (css, js, images, .html)
app.use(express.static(root, {
    extensions: ['html'], // /about -> about.html çalışsın
    maxAge: '30d',
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        } else {
            res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
        }
    }
}));

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(root, 'index.html'));
});

// 404 fallback (opsiyonel 404.html’in varsa kullanır)
app.use((req, res) => {
    res.status(404).sendFile(path.join(root, '404.html'), (err) => {
        if (err) res.status(404).send('404 Not Found');
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server ready on ${port}`));