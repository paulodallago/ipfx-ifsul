export interface Noticia {
  id: string;
  titulo: string;
  sumario: string;
  texto: string;
  data: string;
  imagem: string;
}

export interface Link {
  id: string;
  nome: string;
  url: string;
  imagem: string;
}

export interface Evento {
  id: string;
  marcador: string;
  nome: string;
  data: string;
  qtd_participantes: number;
  imagens: string[];
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
  data: string;
  imagens: string[];
}

export interface Contato {
  id: string;
  ordem: number;
  icone: string;
  texto: string;
  url: string;
  convite: boolean;
}

export interface Apoiador {
  id: string;
  nome: string;
  url: string;
  logo: string;
}

export interface Texto {
  id: string;
  identificador: string;
  titulo: string;
  texto: string;
}
