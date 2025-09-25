-- Estrutura das tabelas para Supabase
-- Execute estes comandos no SQL Editor do Supabase

-- Criar tabela de usuários
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de desenhos
CREATE TABLE drawings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    dados JSONB NOT NULL, -- JSON data para armazenar os dados do desenho
    cor VARCHAR(50) DEFAULT '#000000', -- Cor do desenho
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhorar performance
CREATE INDEX idx_drawings_user_id ON drawings(user_id);
CREATE INDEX idx_drawings_created_at ON drawings(created_at);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_drawings_updated_at 
    BEFORE UPDATE ON drawings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS) se necessário
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE drawings ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso (descomente se usar RLS)
-- CREATE POLICY "Usuários podem visualizar todos os usuários" ON users FOR SELECT USING (true);
-- CREATE POLICY "Usuários podem criar usuários" ON users FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Usuários podem visualizar todos os desenhos" ON drawings FOR SELECT USING (true);
-- CREATE POLICY "Usuários podem criar desenhos" ON drawings FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Usuários podem atualizar seus próprios desenhos" ON drawings FOR UPDATE USING (auth.uid()::text = user_id::text);
-- CREATE POLICY "Usuários podem deletar seus próprios desenhos" ON drawings FOR DELETE USING (auth.uid()::text = user_id::text);
