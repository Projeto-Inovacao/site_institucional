var database = require("../database/config");

function buscarPorId(id) {
  var query = `select * from empresa where id = '${id}'`;

  return database.executar(query);
}

function listar() {
  var query = `select * from empresa`;

  return database.executar(query);
}

function buscarPorCnpj(cnpj) {
  var query = `select * from empresa where cnpj = '${cnpj}'`;

  return database.executar(query);
}

function cadastrar(razaoSocial, cnpj) {
  var query = `insert into empresa (razao_social, cnpj) values ('${razaoSocial}', '${cnpj}')`;

  return database.executar(query);
}

function listarFuncionario(idEmpresa) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
  var instrucao = `select id_colaborador as id, nome, email, status_colaborador, fk_empresa, celular, sigla as setor from colaborador join nivel_acesso on fk_nivel_acesso = id_nivel_acesso where fk_empresa = ${idEmpresa} AND fk_nivel_acesso != 1;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarFuncionarioPorId(idEmpresa, idColaborador) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
  var instrucao = `select id_colaborador as id, nome, email, fk_empresa, celular, sigla as setor, status_colaborador from colaborador join nivel_acesso on fk_nivel_acesso = id_nivel_acesso where fk_empresa = ${idEmpresa} and id_colaborador = ${idColaborador};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarMaquinas(idEmpresa) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
  var instrucao = `select * from VW_ALERTAS_TABLE where fk_empresaM = ${idEmpresa} order by qtd_alerta_maquina desc;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarMaquinasPorId(idEmpresa, idMaquina) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
  var instrucao = `select * from maquina where fk_empresaM = ${idEmpresa} and id_maquina = ${idMaquina}
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarListarPorId(idEmpresa, idLinha) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
  var instrucao = `select * from linha where fk_empresaM = ${idEmpresa} and id_linha = ${idLinha}
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function buscarMaquinasPorEmpresa(id) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
  var instrucao = `select * from VW_ALERTAS_TABLE where fk_empresaM = ${id} order by qtd_alerta_maquina desc
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = { 
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
  listarFuncionario,
  listarFuncionarioPorId,
  listarListarPorId,
  listarMaquinas,
  listarMaquinasPorId,
  buscarMaquinasPorEmpresa
};
