
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'commandes.json');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({ error: 'Erreur lecture fichier' });
    }
  } else if (req.method === 'POST') {
    try {
      const body = req.body;
      fs.writeFileSync(filePath, JSON.stringify(body));
      res.status(200).send({ success: true });
    } catch (error) {
      res.status(500).send({ error: 'Erreur écriture fichier' });
    }
  } else {
    res.status(405).send({ error: 'Méthode non autorisée' });
  }
};
