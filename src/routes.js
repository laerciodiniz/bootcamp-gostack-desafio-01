const { Router } = require('express');

const routes = Router();

const projects = [];
var x = 1

/*########## INICIO MIDDLEWARES ############*/
//Exibe a quantidade de requisicoes realizadas
routes.use((req, res, next) => {
  
  console.log(`Request: ${x++}`);

  next(); 

});

//Verifica se o projeto existe
function checkProjectInArray(req, res, next) {
  const { id } = req.params;

  //Pesquisa o conteudo do array onde o objeto id = ao parametro id da rota  
  const project = projects.find(project => project.id === id);

  if (!project) {
    return res.status(400).json({ error: 'Project does not exists' })
  }

  return next();
}
/*########## FIM MIDDLEWARES ############*/

//Cadastrar Novo Projeto
routes.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };
  
  projects.push(project);

  return res.json(projects);

});

//Listar projetos
routes.get('/projects', (req, res) => {
  return res.json(projects);
});

//Alterar titulo do projeto
routes.put('/projects/:id', checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  //Pesquisa o conteudo do array onde o objeto id = ao parametro id da rota  
  const project = projects.find(project => project.id === id);

  project.title = title;

  return res.json(projects);
});

//Deletar projeto
routes.delete('/projects/:id', checkProjectInArray, (req, res) => {
  const { id } = req.params;

  //Retorna o indice do array onde o objeto id = parametro id
  const index = projects.findIndex(project => project.id === id);

  projects.splice(index, 1);

  return res.json(projects);
});

//Criar nova tarefa dentro do projeto
routes.post('/projects/:id/tasks', checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  //Pesquisa o conteudo do array onde o objeto id = ao parametro id da rota 
  const project = projects.find(project => project.id === id);

  //Envia a tarefa (tasks) que vem no body da requisicao
  project.tasks.push(title);

  return res.json(projects);

});

module.exports = routes;