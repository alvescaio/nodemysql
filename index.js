const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrao
const mysql = require('mysql');

//Configurando o body-parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Rota raiz (imprime mensagem)
const router = express.Router();
router.get('/', (req, res) => res.json({
	message: 'Funcionando!'
}));
app.use('/', router);

//Rota para listar clientes
router.get('/clientes', (req, res) => {
	execSQLQuery('SELECT * FROM clientes', res);
});

//Rota para listar cliente por ID
router.get('/clientes/:id?', (req, res) =>{
	let filter = '';
	if(req.params.id) filter = ' WHERE id=' + parseInt(req.params.id);
	execSQLQuery('SELECT * FROM clientes' + filter, res);
});

//Rota para excluir um cliente
router.delete('/clientes/:id', (req, res) =>{
    execSQLQuery('DELETE FROM clientes WHERE id=' + parseInt(req.params.id), res);
});

//Rota para add cliente
router.post('/clientes', (req, res) => {
	const nome = req.body.nome.substring(0, 150);
	const cpf = req.body.cpf.substring(0, 11);
	execSQLQuery('INSERT INTO clientes(Nome, CPF) VALUES(`${nome}`,`${cpf}`)', res);
});

//inicia o servidor
app.listen(port);
console.log('API Funcionando!');

function execSQLQuery(sqlQry, res){
	const connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '',
		database : 'nodemysql'
	});

	connection.query(sqlQry, function(error, results, fields){
		if(error)
			res.json(error);
		else
			res.json(results);
		connection.end();
		console.log('executou!');
	});
}