import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Sobre o clube</h1>
        <div className={styles.text}>
          <p>
            O Clube de Xadrez do IFSul, câmpus Passo Fundo, surgiu em 2022 como
            um projeto de ensino coordenado pelos professores Daniel Delfini
            Ribeiro e Emir da Rosa Caldeira Júnior. Naquele período, as
            atividades do clube ocorreram exclusivamente de forma on-line. Com o
            encerramento do projeto, ao final daquele ano, os encontros virtuais
            também chegaram ao fim.
          </p>

          <p>
            No ano de 2025, os professores Daniel Delfini Ribeiro e Fabio Telles
            firmaram parceria para reativar o clube, dessa vez com o intuito de
            promover encontros presenciais. Cadastrado novamente como um projeto
            de ensino, o clube recebeu nome e sigla atuais: Clube IFSul Passo
            Fundo de Xadrez - IPFX. Embora ainda sem realizar atividades, o ano
            foi importante para definir e alinhar o projeto às expectativas dos
            participantes e para a compra dos primeiros materiais de xadrez.
          </p>
          <p>
            O ano de 2026 foi o marco inicial das atividades presenciais do
            clube, com divulgação junto à comunidade acadêmica e encontros sendo
            promovidos no campus Passo Fundo. Os primeiros campeonatos
            presenciais de xadrez com a participação direta ou indireta do clube
            foram organizados no mesmo ano, em parceria com a OSCIP Inovadores
            do Xadrez. Ainda nesse ano, o acesso ao clube foi ampliado com a
            presença de pessoas da comunidade externa ao IFSul, o que aumentou a
            participação e expandiu o alcance do clube junto à comunidade.
          </p>
          <p className={styles.center}>Junte-se ao IPFX!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
