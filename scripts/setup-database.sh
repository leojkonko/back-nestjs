#!/bin/bash

# Script para inicialização completa do banco de dados
# Execute este script após configurar as variáveis de ambiente

echo "🚀 Iniciando setup do banco de dados..."

# Verificar se o arquivo .env existe
if [ ! -f .env ]; then
    echo "❌ Arquivo .env não encontrado!"
    echo "📝 Copie o .env.example e configure suas variáveis de ambiente"
    exit 1
fi

# Carregar variáveis de ambiente
source .env

echo "📊 Verificando conexão com o banco..."

# Gerar cliente Prisma
echo "🔄 Gerando cliente Prisma..."
npx prisma generate

# Executar migrações
echo "🔧 Executando migrações..."
npx prisma migrate deploy

# Popular banco com dados de exemplo (opcional)
echo "🌱 Populando banco com dados de exemplo..."
npm run db:seed

echo "✅ Setup do banco concluído com sucesso!"
echo "🎯 Execute 'npm run start:dev' para iniciar a aplicação"