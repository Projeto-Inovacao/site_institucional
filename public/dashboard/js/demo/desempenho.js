// VAR PARA KPI
var KPI_CPU = document.getElementById("uso_cpu_kpi");
var KPI_MEDIA_CPU = document.getElementById("uso_cpu_media_kpi");
var KPI_RAM = document.getElementById("ram_kpi");
var KPI_MEDIA_RAM = document.getElementById("ram_media_kpi");
var KPI_DISCO = document.getElementById("disco_kpi");
var KPI_TEMP = document.getElementById("temp_kpi");


// VAR PARA MUDAR O VALOR DO DESEMPENHO
var CPU = document.getElementById("porcentagem_cpu");
var RAM = document.getElementById("uso_memoria_ram");
var DISCO = document.getElementById("disco_rigido");
var TEMP = document.getElementById("temp_cpu");

// VAR PARA MUDAR O TAMANHO DA BARRA DE PROGUESSO
var CPU_bar = document.getElementById("bar_porcentagem_cpu");
var RAM_bar = document.getElementById("bar_uso_memoria_ram");
var disco_bar = document.getElementById("bar_disco_rigido");
var temp_bar = document.getElementById("bar_temp");



// window.onload = obterDadosDesempenho(idMaquina);

function obterDadosDesempenho(idMaquina) {
    console.log("Desempenho")
    // if (proximaAtualizacao != undefined) {
    //     clearTimeout(proximaAtualizacao);
    // }

    valores = [DISCO, RAM, CPU]
    valores_kpi_desempenho = [KPI_DISCO, KPI_RAM, KPI_CPU]
    valores_Bar = [disco_bar, RAM_bar, CPU_bar]

    fetch(`/medidas/ultimasDesempenho/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos DE RAM: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoDesempenho(resposta, idMaquina);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoDesempenho(resposta, idMaquina) {
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        if (registro.recurso === "DISCO") {
            valores[0].innerHTML = (registro.uso) + "%";
            valores_Bar[0].style.width = (registro.uso) + "%";
            valores_kpi_desempenho[0].innerHTML = (registro.uso) + "%";
        }
        if (registro.recurso === "RAM") {
            valores[1].innerHTML = (registro.uso) + "%";
            valores_Bar[1].style.width = (registro.uso) + "%";
            valores_kpi_desempenho[1].innerHTML = (registro.uso) + "%";
        }
        if (registro.recurso === "CPU") {
            valores[2].innerHTML = (registro.uso) + "%";
            valores_Bar[2].style.width = (registro.uso) + "%";
            valores_kpi_desempenho[2].innerHTML = (registro.uso) + "%";
        }

    }

    // BOLINHA METRICA DENTRO DA KPI DISCO
    var discoKpi = parseFloat(document.getElementById('disco_kpi').innerText.trim());
    var metricaDisco = document.getElementById('metrica_disco');

    if (discoKpi < 50) {
        metricaDisco.style.color = '#00FF00';
    } else if (discoKpi >= 50 && discoKpi < 80) {
        metricaDisco.style.color = '#f6ff00';
    } else {
        metricaDisco.style.color = '#FF0000';
    }

    // BOLINHA METRICA DENTRO DA KPI RAM
    var ramKpi = parseFloat(document.getElementById('ram_kpi').innerText.trim());
    var metricaRam= document.getElementById('metrica_ram');

    if (ramKpi < 80) {
        metricaRam.style.color = '#00FF00';
    } else if (ramKpi >= 80 && ramKpi < 90) {
        metricaRam.style.color = '#f6ff00';
    } else {
        metricaRam.style.color = '#FF0000';
    }

    // BOLINHA METRICA DENTRO DA KPI CPU
    var cpuKpi = parseFloat(document.getElementById('uso_cpu_kpi').innerText.trim());
    var metricaCpu= document.getElementById('metrica_cpu');

    if (cpuKpi < 15) {
        metricaCpu.style.color = '#00FF00';
    } else if (cpuKpi >= 15 && cpuKpi < 30) {
        metricaCpu.style.color = '#f6ff00';
    } else {
        metricaCpu.style.color = '#FF0000';
    }

    setTimeout(() => atualizarGraficoDesempenho(idMaquina), 2000);
}

function atualizarGraficoDesempenho(idMaquina) {

    fetch(`/medidas/tempo-realDesempenho/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                valores_kpi_desempenho = [KPI_DISCO, KPI_RAM, KPI_CPU]
                valores_Bar = [disco_bar, RAM_bar, CPU_bar]

                for (i = 0; i < novoRegistro.length; i++) {
                    var dados = novoRegistro[i];
                    if (dados.recurso === "DISCO") {
                        valores[0].innerHTML = (dados.uso) + "%";
                        valores_Bar[0].style.width = (novoRegistro.uso) + "%";
                        valores_kpi_desempenho[0].innerHTML = (dados.uso) + "%";
                    }
                    if (dados.recurso === "RAM") {
                        valores[1].innerHTML = (dados.uso) +  "%";
                        valores_Bar[1].style.width = (novoRegistro.uso) +  "%";
                        valores_kpi_desempenho[1].innerHTML = (dados.uso) +  "%";
                    }
                    if (dados.recurso === "CPU") {
                        valores[2].innerHTML = (dados.uso) +  "%";
                        valores_Bar[2].style.width = (novoRegistro.uso) +  "%";
                        valores_kpi_desempenho[2].innerHTML = (dados.uso) +  "%";
                    }

                }
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacaoDesempenho = setTimeout(() => atualizarGraficoDesempenho(idMaquina), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacaoDesempenho = setTimeout(() => atualizarGraficoDesempenho(idMaquina), 5000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

        

}

function limparDesempenho() {
    for (i = 0; i <= valores.length; i++) {
        valores[i].innerHTML = "";
        valores_Bar[i].style.width = "";
        valores_kpi_desempenho[i].innerHTML = "";
    }
}


function obterDadosDesempenhoTemp(idMaquina) {

    valores = [TEMP, CPU, RAM]
    valores_kpi_desempenho = [KPI_TEMP, KPI_CPU, KPI_RAM]
    valores_Bar = [temp_bar, CPU_bar, RAM_bar]

    console.log("Desempenho")
    // if (proximaAtualizacao != undefined) {
    //     clearTimeout(proximaAtualizacao);
    // }

    fetch(`/medidas/ultimasDesempenhoTEMP/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos DE RAM: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoDesempenhoTemp(resposta, idMaquina);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoDesempenhoTemp(resposta, idMaquina) {
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        if (registro.recurso === "TEMPERATURA") {
            valores[0].innerHTML = (registro.uso) + "°C";
            valores_Bar[0].style.width = (registro.uso) + "°C";
            valores_kpi_desempenho[0].innerHTML = (registro.uso) + "°C";
        }
        if (registro.recurso === "CPU") {
            valores[1].innerHTML = (registro.uso) + "%";
            valores_Bar[1].style.width = (registro.uso) + "%";
            valores_kpi_desempenho[1].innerHTML = (registro.uso) + "%";
        }
        if (registro.recurso === "RAM") {
            valores[2].innerHTML = (registro.uso) + "%";
            valores_Bar[2].style.width = (registro.uso) + "%";
            valores_kpi_desempenho[2].innerHTML = (registro.uso) + "%";
        }
        
    }
    
    setTimeout(() => atualizarGraficoDesempenhoTemp(idMaquina), 2000);
}

function atualizarGraficoDesempenhoTemp(idMaquina) {

    fetch(`/medidas/tempo-realDesempenhoTEMP/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                valores = [TEMP, CPU, RAM]
                valores_kpi_desempenho = [KPI_TEMP, KPI_CPU, KPI_RAM]
                valores_Bar = [temp_bar, CPU_bar, RAM_bar]

                for (i = 0; i < novoRegistro.length; i++) {
                    var dados = novoRegistro[i];
                    if (dados.recurso === "TEMPERATURA") {
                        valores[0].innerHTML = (dados.uso) + "°C";
                        valores_Bar[0].style.width = (dados.uso) + "°C";
                        valores_kpi_desempenho[0].innerHTML = (dados.uso) + "°C";
                    }
                    if (dados.recurso === "CPU") {
                        valores[1].innerHTML = (dados.uso) +  "%";
                        valores_Bar[1].style.width = (dados.uso) +  "%";
                        valores_kpi_desempenho[1].innerHTML = (dados.uso) +  "%";
                    }
                    if (dados.recurso === "RAM") {
                        valores[2].innerHTML = (dados.uso) +  "%";
                        valores_Bar[2].style.width = (dados.uso) +  "%";
                        valores_kpi_desempenho[2].innerHTML = (dados.uso) +  "%";
                    }

                    // ... outras condições para CPU e RAM
                }
                
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacaoDesempenho = setTimeout(() => atualizarGraficoDesempenhoTemp(idMaquina), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacaoDesempenho = setTimeout(() => atualizarGraficoDesempenhoTemp(idMaquina), 5000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function limparDesempenhoTemp() {
    for (i = 0; i <= valores.length; i++) {
        valores[i].innerHTML = "";
        valores_Bar[i].style.width = "";
        valores_kpi_desempenho[i].innerHTML = "";
    }
}


function obterDadosDesempenhoMedia(idLinha) {

    valores_kpi_desempenho = [KPI_MEDIA_CPU, KPI_MEDIA_RAM]

    console.log("Desempenho")
    // if (proximaAtualizacao != undefined) {
    //     clearTimeout(proximaAtualizacao);
    // }

    fetch(`/medidas/ultimasDesempenhoMedia/${idLinha}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos DE RAM: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoDesempenhoMedia(resposta, idLinha);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoDesempenhoMedia(resposta, idLinha) {
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        if (registro.recurso === "CPU") {
            valores_kpi_desempenho[1].innerHTML = (registro.media_uso_cpu) + "%";
        }
        if (registro.recurso === "RAM") {
            valores_kpi_desempenho[2].innerHTML = (registro.media_uso_ram) + "%";
        }
        
    }
    
    setTimeout(() => atualizarGraficoDesempenhoMedia(idLinha), 2000);
}

function atualizarGraficoDesempenhoMedia(idLinha) {

    fetch(`/medidas/tempo-realDesempenhoMedia/${idLinha}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                valores_kpi_desempenho = [KPI_MEDIA_CPU, KPI_MEDIA_RAM]

                for (i = 0; i < novoRegistro.length; i++) {
                    var dados = novoRegistro[i];
                    if (dados.recurso === "CPU") {
                        valores_kpi_desempenho[1].innerHTML = (dados.media_uso_cpu) +  "%";
                    }
                    if (dados.recurso === "RAM") {
                        valores_kpi_desempenho[2].innerHTML = (dados.media_uso_ram) +  "%";
                    }

                    // ... outras condições para CPU e RAM
                }
                
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacaoDesempenho = setTimeout(() => atualizarGraficoDesempenhoMedia(idLinha), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacaoDesempenho = setTimeout(() => atualizarGraficoDesempenhoMedia(idLinha), 5000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function limparDesempenhoMedia() {
    for (i = 0; i <= valores.length; i++) {
        valores_kpi_desempenho[i].innerHTML = "";
    }
}