export interface Noticia {
  id: string;
  titulo: string;
  sumario: string;
  texto: string;
  data: Date;
  imagem: any;
}

export interface Link {
  id: string;
  nome: string;
  url: string;
  imagem: any;
}

export interface Evento {
  id: string;
  marcador: string;
  nome: string;
  data: Date;
  qtd_participantes: number;
  imagens: any[];
  modalidades: Modalidade[];
}

export interface Modalidade {
  categoria: string;
  podio: Podio[];
}

export interface Podio {
  jogador: string;
  posicao: string;
}

export interface Galeria {
  id: string;
  nome: string;
  descricao: string;
  data: Date;
  imagens: any[];
}

export interface Contato {
  id: string;
  icone: string;
  texto: string;
  url: string;
}

export interface Apoiador {
  id: string;
  alt: string;
  url: string;
  logo: any;
}

export interface Texto {
  id: string;
  identificador: string;
  titulo: string;
  texto: string;
}
