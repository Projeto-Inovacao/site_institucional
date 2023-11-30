// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example    
// var ctx = document.getElementById("myAreaChartSetorRAM");

// window.onload = obterDadosCPU(idEmpresa);

function obterDadosRAM(idEmpresa) {
  console.log("RAM")
  console.log(idEmpresa)
  // if (proximaAtualizacao != undefined) 
  
  // }

    fetch(`/setor/ultimasSetorRAM/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos DE RAM: ${JSON.stringify(resposta)}`);
                resposta.reverse();

              plotarGraficoRAM(resposta, idEmpresa);

          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function plotarGraficoRAM(resposta, idEmpresa) {

    console.log('iniciando plotagem do gráfico...');
  
    // Criando estrutura para plotar gráfico - labels
    let labels = [];
  
    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Usada',
            data: [],
            backgroundColor: [],
            borderColor: ['#393d42'],
            tension: 0.3,
            fill: false, 
            pointRadius: 6
        }]
    };
  
    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)
    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.datasets[0].data.push(registro.media_ram);
        // dados.datasets[1].data.push(registro.livre);
        labels.push(registro.nome_linha);

        console.log("MEDIA ------------------------- ", registro.media_ram);

        document.getElementById("ram_kpi_setor").innerHTML = registro.media_ram.toFixed(2) + "%"

         // Definindo a cor com base nas condições
      if (registro.media_ram <= 80) {
        dados.datasets[0].backgroundColor.push('#00FF00');
        // dados.datasets[0].borderColor.push('#00FF00');
      } else if (registro.media_ram <= 90) {
        dados.datasets[0].backgroundColor.push('#f6ff00');
        // dados.datasets[0].borderColor.push('#f6ff00');
      } else {
        dados.datasets[0].backgroundColor.push('#FF0000');
        // dados.datasets[0].borderColor.push('#FF0000');
      }
    }
    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')
  
    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: dados,
        fill: true
    }
  
    // Adicionando gráfico criado em div na tela
    let chartRAM = new Chart(
      document.getElementById(`myAreaChartSetorRAM`),
      config
    );

    proximaAtualizacao = setTimeout(() => atualizarGraficoRAM(idEmpresa, dados, chartRAM), 20000);
}

function atualizarGraficoRAM(idEmpresa, dados, chartRAM) {

    fetch(`/setor/tempo-realRAM/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                obterDadosRAM(idEmpresa);
                // // alertar(novoRegistro, idEmpresa);
                // console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                // console.log(`Dados atuais do gráfico:`);
                console.log("RAAAAAAM --------------------- ", dados);

                if (novoRegistro[0].media_ram == dados.datasets[0].data.media_ram) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].media_ram)
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    

                    dados.datasets[0].data.pop();  // apagar o primeira medida
                    dados.datasets[0].data.push(novoRegistro[0].dado_coletado); // incluir uma nova medida

                    chartRAM.update();
                }


          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(() => atualizarGraficoRAM(idEmpresa, dados, chartRAM), 20000);
      });
  } else {
      console.error('Nenhum dado encontrado ou erro na API');
      // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      proximaAtualizacao = setTimeout(() => atualizarGraficoRAM(idEmpresa, dados, chartRAM), 20000);
  }
})
  .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
  });

}


function limparRAM(){
  let chartRAM = new Chart(
      document.getElementById(`myAreachartSetorRAM`),
  );

  chartRAM.clear()
}