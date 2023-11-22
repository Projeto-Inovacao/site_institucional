// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example    
// var ctx = document.getElementById("myAreaChartSetorRAM");

// window.onload = obterDadosCPU(idMaquina);

function obterDadosRAM(idMaquina) {
  console.log("RAM")
  // if (proximaAtualizacao != undefined) 
  
  // }

<<<<<<< HEAD
    fetch(`/setor/ultimasSetorRAM/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos DE RAM: ${JSON.stringify(resposta)}`);
                resposta.reverse();
=======
  fetch(`/setor/ultimasSetorRAM/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (resposta) {
              console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
              resposta.reverse();
>>>>>>> fd2261a43874ea620bc418c8a4748c7e84db8c4f

              plotarGraficoRAM(resposta, idMaquina);

          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function plotarGraficoRAM(resposta) {

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
<<<<<<< HEAD
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.datasets[0].data.push(registro.media_ram);
        // dados.datasets[1].data.push(registro.livre);
        labels.push(registro.linha);

         // Definindo a cor com base nas condições
      if (registro.media_ram <= 80) {
        dados.datasets[0].backgroundColor.push('#00FF00');
        // dados.datasets[0].borderColor.push('#00FF00');
      } else if (registro.media_ram <= 90) {
=======
    for (i = resposta.length - 1; i >= 0; i--) {
      var registro = resposta[i];
      dados.datasets[0].data.push(registro.media_ram);
      labels.push(registro.data_hora);
  
      // Definindo a cor com base nas condições
      if (registro.media_ram <= 15) {
        dados.datasets[0].backgroundColor.push('#00FF00');
        // dados.datasets[0].borderColor.push('#00FF00');
      } else if (registro.media_ram<= 30) {
>>>>>>> fd2261a43874ea620bc418c8a4748c7e84db8c4f
        dados.datasets[0].backgroundColor.push('#f6ff00');
        // dados.datasets[0].borderColor.push('#f6ff00');
      } else {
        dados.datasets[0].backgroundColor.push('#FF0000');
        // dados.datasets[0].borderColor.push('#FF0000');
      }
    }
<<<<<<< HEAD
=======
  
>>>>>>> fd2261a43874ea620bc418c8a4748c7e84db8c4f
    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')
  
    // Criando estrutura para plotar gráfico - config
    const config = {
<<<<<<< HEAD
        type: 'line',
        data: dados,
        fill: true
=======
      type: 'bar',
      data: dados,
      fill: false,
>>>>>>> fd2261a43874ea620bc418c8a4748c7e84db8c4f
    }
  
    // Adicionando gráfico criado em div na tela
    let chartRAM = new Chart(
      document.getElementById(`myAreaChartSetorRAM`),
      config
    );
<<<<<<< HEAD

   // setTimeout(() => atualizarGraficoRAM(idMaquina, dados, chartRAM), 5000);
}
=======
  
    setTimeout(() => atualizarGraficoRAM( dados, chartRAM), 5000);
  }
  
  
>>>>>>> fd2261a43874ea620bc418c8a4748c7e84db8c4f

function atualizarGraficoRAM(idMaquina, dados, chartRAM) {

    fetch(`/setor/tempo-realRAM/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // obterDadosCPU(idMaquina);
                // // alertar(novoRegistro, idMaquina);
                // console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                // console.log(`Dados atuais do gráfico:`);
                // console.log(dados);

                if (novoRegistro[0].data_hora == dados.datasets[0].data.data_hora) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].data_hora)
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].data_hora); // incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeira medida
                    dados.datasets[0].data.push(novoRegistro[0].dado_coletado); // incluir uma nova medida

                    chartRAM.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoRAM( dados, chartRAM), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoRAM(dados, chartram), 5000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function limparRAM(){
    let chartRAM = new Chart(
        document.getElementById(`myAreaChartSetorRAM`),
    );

    chartRAM.clear()
}