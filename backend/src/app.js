const express = require('express');
const { setupExpress } = require('./config');
const consultaRoute = require('./routes/consulta');

const app = express();
setupExpress(app);

app.use('/consulta', consultaRoute);
app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
