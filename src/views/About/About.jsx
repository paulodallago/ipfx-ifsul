import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Sobre o projeto</h1>
        <div className={styles.text}>
          <p>
            O clube de xadrez do IFSul, câmpus Passo Fundo, nasceu como um
            projeto de ensino no ano de 2022, coordenado pelo professor Daniel
            Delfini Ribeiro e contando com a participação do professor
            substituto Emir da Rosa Caldeira Júnior como colaborador. Nessa
            época, o clube realizou suas atividades de forma exclusivamente
            online. Com a saída do professor Emir da instituição no final
            daquele ano, o projeto encerrou temporariamente suas atividades.
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
          <p className={styles.center}>
            O ano de 2027 promete novidades! Junte-se ao IPFX!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
