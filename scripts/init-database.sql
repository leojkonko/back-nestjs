-- Criação do banco de dados e tabelas para NestJS Users API
-- Execute este script no PostgreSQL para inicializar o banco

-- Criar banco de dados (se necessário)
-- CREATE DATABASE nestjs_users_db;

-- Usar o banco de dados
-- \c nestjs_users_db;

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criar trigger para atualizar updatedAt automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Criar índices para otimização
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users("createdAt");

-- Inserir dados de exemplo (opcional)
INSERT INTO users (email, name, password) VALUES
    ('john.doe@example.com', 'John Doe', 'password123'),
    ('jane.smith@example.com', 'Jane Smith', 'password456'),
    ('bob.johnson@example.com', 'Bob Johnson', 'password789')
ON CONFLICT (email) DO NOTHING;

-- Verificar criação
SELECT COUNT(*) as total_users FROM users;