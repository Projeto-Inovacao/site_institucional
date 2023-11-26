var database = require("../database/config");

function buscarUltimasMedidasDisco(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_DISCO_CHART
        where id_maquina = ${idMaquina}
       limit ${limite_linhas}`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_DISCO_CHART
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRede(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_DISCO_CHART
        where id_maquina = ${idMaquina}
       limit ${limite_linhas}`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_DISCO_CHART
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasCPU(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `  select * from VW_CPU_CHART
        where id_maquina = ${idMaquina}
       limit ${limite_linhas}`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `  select * from VW_CPU_CHART
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMediasCPU(idLinha, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ` SELECT
        AVG(dado_coletado) AS media_uso_cpu,
        data_hora
    FROM
        VW_CPU_CHART
    WHERE
        id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha}
        )group by data_hora ORDER BY
        data_hora DESC
       limit ${limite_linhas}`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` SELECT
        AVG(dado_coletado) AS media_uso_cpu,
        data_hora
    FROM
        VW_CPU_CHART
    WHERE
        id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha}
        )group by data_hora ORDER BY
        data_hora DESC
         limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRAM(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `  select * from VW_RAM_CHART
        where id_maquina = ${idMaquina}
       limit ${limite_linhas}`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `  select * from VW_RAM_CHART
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMediasRAM(idLinha, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `  SELECT
        AVG(usado) AS media_uso_ram,
        data_hora 
    FROM
        VW_RAM_CHART
    WHERE
        id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha}
        ) group by data_hora
       limit ${limite_linhas}`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `  SELECT
        AVG(usado) AS media_uso_ram,
        data_hora 
    FROM
        VW_RAM_CHART
    WHERE
        id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha}
        ) group by data_hora
       limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarUltimasMedidasTemp(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `  select * from VW_TEMP_CHART
        where id_maquina = ${idMaquina}
       limit ${limite_linhas}`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `  select * from VW_TEMP_CHART
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealTemp(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_TEMP_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_TEMP_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRede(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_REDE_CHART
        where id_maquina = ${idMaquina}
       limit ${limite_linhas}`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_REDE_CHART
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasDesempenho(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_DESEMPENHO_CHART
        where id_maquina = ${idMaquina}
       limit ${limite_linhas}`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_DESEMPENHO_CHART
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasDesempenhoTemp(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_DESEMPENHO_CHART_TEMP
        where id_maquina = ${idMaquina}
       limit ${limite_linhas}`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_DESEMPENHO_CHART_TEMP
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasDesempenhoMedia(idLinha, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
        RAM.media_uso_ram,
        CPU.media_uso_cpu,
        RAM.data_hora
    FROM
        (
            SELECT
                AVG(usado) AS media_uso_ram,
                data_hora,
                id_maquina
            FROM
                VW_RAM_CHART
            WHERE
                id_maquina IN (
                    SELECT id_maquina
                    FROM maquina
                    WHERE fk_linhaM = ${idLinha}
                )
            GROUP BY
                data_hora, id_maquina
        ) AS RAM
    JOIN
        (
            SELECT
                AVG(dado_coletado) AS media_uso_cpu,
                data_hora,
                id_maquina
            FROM
                VW_CPU_CHART
            WHERE
                id_maquina IN (
                    SELECT id_maquina
                    FROM maquina
                    WHERE fk_linhaM = ${idLinha}
                )
            GROUP BY
                data_hora, id_maquina
        ) AS CPU
    ON RAM.data_hora = CPU.data_hora
    ORDER BY
        RAM.data_hora DESC limit ${limite_linhas};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_DESEMPENHO_CHART_TEMP
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}SELECT
                   RAM.media_uso_ram,
                   CPU.media_uso_cpu,
                   RAM.data_hora
               FROM
                   (
                       SELECT
                           AVG(usado) AS media_uso_ram,
                           data_hora,
                           id_maquina
                       FROM
                           VW_RAM_CHART
                       WHERE
                           id_maquina IN (
                               SELECT id_maquina
                               FROM maquina
                               WHERE fk_linhaM = ${idLinha}
                           )
                       GROUP BY
                           data_hora, id_maquina
                   ) AS RAM
               JOIN
                   (
                       SELECT
                           AVG(dado_coletado) AS media_uso_cpu,
                           data_hora,
                           id_maquina
                       FROM
                           VW_CPU_CHART
                       WHERE
                           id_maquina IN (
                               SELECT id_maquina
                               FROM maquina
                               WHERE fk_linhaM = ${idLinha}
                           )
                       GROUP BY
                           data_hora, id_maquina
                   ) AS CPU
               ON RAM.data_hora = CPU.data_hora
               ORDER BY
                   RAM.data_hora DESC limit ${limite_linhas};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealDesempenhoTemp(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_DESEMPENHO_CHART_TEMP
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 3`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_DESEMPENHO_CHART_TEMP
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 3`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function buscarUltimasJanelas(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_JANELAS_CHART
        where fk_maquinaJ = ${idMaquina};`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_JANELAS_CHART
                    where fk_maquinaJ = ${idMaquina};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealCPU(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_CPU_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_CPU_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMediaEmTempoCPU(idLinha) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
        AVG(dado_coletado) AS media_uso_cpu,
        data_hora
    FROM
        VW_CPU_CHART
    WHERE
        id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha}
        )group by data_hora ORDER BY
        data_hora DESC;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        AVG(dado_coletado) AS media_uso_cpu,
        data_hora
    FROM
        VW_CPU_CHART
    WHERE
        id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha}
        )group by data_hora ORDER BY
        data_hora DESC;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMediaEmTempoRAM(idLinha) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ` SELECT
        AVG(usado) AS media_uso_ram,
        data_hora 
    FROM
        VW_RAM_CHART
    WHERE
        id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha}
        ) group by data_hora;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ` SELECT
        AVG(usado) AS media_uso_ram,
        data_hora 
    FROM
        VW_RAM_CHART
    WHERE
        id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idLinha}
        ) group by data_hora;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRAM(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_RAM_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_RAM_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealDesempenho(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_DESEMPENHO_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 3`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_DESEMPENHO_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 3`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMediasEmTempoRealDesempenho(idLinha) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
        RAM.media_uso_ram,
        CPU.media_uso_cpu,
        RAM.data_hora
    FROM
        (
            SELECT
                AVG(usado) AS media_uso_ram,
                data_hora,
                id_maquina
            FROM
                VW_RAM_CHART
            WHERE
                id_maquina IN (
                    SELECT id_maquina
                    FROM maquina
                    WHERE fk_linhaM = ${idLinha}
                )
            GROUP BY
                data_hora, id_maquina
        ) AS RAM
    JOIN
        (
            SELECT
                AVG(dado_coletado) AS media_uso_cpu,
                data_hora,
                id_maquina
            FROM
                VW_CPU_CHART
            WHERE
                id_maquina IN (
                    SELECT id_maquina
                    FROM maquina
                    WHERE fk_linhaM = ${idLinha}
                )
            GROUP BY
                data_hora, id_maquina
        ) AS CPU
    ON RAM.data_hora = CPU.data_hora
    ORDER BY
        RAM.data_hora DESC limit 1;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        RAM.media_uso_ram,
        CPU.media_uso_cpu,
        RAM.data_hora
    FROM
        (
            SELECT
                AVG(usado) AS media_uso_ram,
                data_hora,
                id_maquina
            FROM
                VW_RAM_CHART
            WHERE
                id_maquina IN (
                    SELECT id_maquina
                    FROM maquina
                    WHERE fk_linhaM = ${idLinha}
                )
            GROUP BY
                data_hora, id_maquina
        ) AS RAM
    JOIN
        (
            SELECT
                AVG(dado_coletado) AS media_uso_cpu,
                data_hora,
                id_maquina
            FROM
                VW_CPU_CHART
            WHERE
                id_maquina IN (
                    SELECT id_maquina
                    FROM maquina
                    WHERE fk_linhaM = ${idLinha}
                )
            GROUP BY
                data_hora, id_maquina
        ) AS CPU
    ON RAM.data_hora = CPU.data_hora
    ORDER BY
        RAM.data_hora DESC limit 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMedidasEmTempoRealRede(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_REDE_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_REDE_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealDisco(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_DISCO_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_DISCO_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function buscarUltimasMedidasTempXCpu(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_CPU_KOTLIN_CHART
        where id_maquina = ${idMaquina}
       limit ${limite_linhas}`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_CPU_KOTLIN_CHART
                    where id_maquina = ${idMaquina}
                   limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMedidasEmTempoRealTempXCpu(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from VW_CPU_KOTLIN_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select * from VW_CPU_KOTLIN_CHART
        where id_maquina = ${idMaquina}
        ORDER BY data_hora DESC limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarMedidasEmTempoRealCPU,
    buscarMedidasEmTempoRealRAM,
    buscarMedidasEmTempoRealDesempenho,
    buscarMedidasEmTempoRealDisco,
    buscarMedidasEmTempoRealRede,
    buscarUltimasMedidasCPU,
    buscarUltimasMedidasRAM,
    buscarUltimasMedidasDisco,
    buscarUltimasMedidasRede,
    buscarUltimasMedidasDesempenho,
    buscarUltimasJanelas, 
    buscarUltimasMedidasTemp, 
    buscarMedidasEmTempoRealTemp, 
    buscarUltimasMedidasTempXCpu, 
    buscarMedidasEmTempoRealTempXCpu, 
    buscarUltimasMedidasDesempenhoTemp, 
    buscarMedidasEmTempoRealDesempenhoTemp,
    buscarMediaEmTempoCPU,
    buscarMediaEmTempoRAM,
    buscarMediasEmTempoRealDesempenho,
    buscarUltimasMediasRAM,
    buscarUltimasMediasCPU,
    buscarUltimasMedidasDesempenhoMedia,
}
