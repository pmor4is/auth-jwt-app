const express = require('express');
const router = express.Router();
const client = require('../database/database');
const jwt = require('jsonwebtoken'); // Adicione a dependência 'jsonwebtoken'
const bcrypt = require('bcrypt'); // Adicione a dependência 'bcrypt'

router.post('/auth', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Verificar se o usuário existe
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const user = result.rows[0];

        // 2. Verificar a senha
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // 3. Gerar o token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Use uma chave secreta segura

        // 4. Enviar o token JWT de volta para o cliente
        res.json({ token });

    } catch (error) {
        console.error('Erro durante o login:', error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

module.exports = router;