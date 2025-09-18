export interface Drawing {
  id: number;
  user_id: number;
  dados: any; // JSON data para armazenar os dados do desenho
  cor?: string; // Nova coluna para armazenar a cor do desenho
  created_at: Date;
  updated_at: Date;
}

export interface CreateDrawingInput {
  dados: any;
  cor?: string; // Cor é opcional na criação (user_id será automático)
}

export interface UpdateDrawingInput {
  dados?: any;
  cor?: string; // Cor é opcional na atualização
}
