# Script PowerShell para inicialização completa do banco de dados
# Execute este script após configurar as variáveis de ambiente

Write-Host "🚀 Iniciando setup do banco de dados..." -ForegroundColor Green

# Verificar se o arquivo .env existe
if (!(Test-Path ".env")) {
    Write-Host "❌ Arquivo .env não encontrado!" -ForegroundColor Red
    Write-Host "📝 Copie o .env.example e configure suas variáveis de ambiente" -ForegroundColor Yellow
    exit 1
}

Write-Host "📊 Verificando conexão com o banco..." -ForegroundColor Blue

# Gerar cliente Prisma
Write-Host "🔄 Gerando cliente Prisma..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao gerar cliente Prisma" -ForegroundColor Red
    exit 1
}

# Executar migrações
Write-Host "🔧 Executando migrações..." -ForegroundColor Yellow
npx prisma migrate deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao executar migrações" -ForegroundColor Red
    exit 1
}

# Popular banco com dados de exemplo (opcional)
Write-Host "🌱 Populando banco com dados de exemplo..." -ForegroundColor Yellow
npm run db:seed

Write-Host "✅ Setup do banco concluído com sucesso!" -ForegroundColor Green
Write-Host "🎯 Execute 'npm run start:dev' para iniciar a aplicação" -ForegroundColor Cyan