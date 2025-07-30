@echo off
title PersonCraft - Desenvolvimento Local
color 0A

echo.
echo ========================================
echo    PersonCraft - Sistema de Cadastro
echo ========================================
echo.
echo 🚀 Iniciando servidor de desenvolvimento...
echo 📍 Backend: https://PersonManager.somee.com/api
echo 🌐 Frontend: http://localhost:8080
echo.

REM Configurar Node.js no PATH da sessão atual
set "NODE_PATH=C:\Users\Lucas Duarte\AppData\Local\nvm\v22.17.1"
set "PATH=%NODE_PATH%;%PATH%"

REM Verificar se o Node.js está disponível
echo ⚙️  Verificando Node.js...
"%NODE_PATH%\node.exe" --version
if %ERRORLEVEL% neq 0 (
    echo ❌ Erro: Node.js não encontrado!
    echo Verifique se o NVM está instalado corretamente.
    pause
    exit /b 1
)

echo ✅ Node.js configurado com sucesso!
echo.

REM Verificar se as dependências estão instaladas
if not exist "node_modules" (
    echo 📦 Instalando dependências...
    "%NODE_PATH%\npm.cmd" install
    if %ERRORLEVEL% neq 0 (
        echo ❌ Erro ao instalar dependências!
        pause
        exit /b 1
    )
    echo ✅ Dependências instaladas!
    echo.
)

echo 🔄 Iniciando servidor de desenvolvimento...
echo.
echo ⏹️  Para parar o servidor, pressione Ctrl+C
echo.

REM Executar o servidor de desenvolvimento
"%NODE_PATH%\npm.cmd" run dev

echo.
echo 📱 Servidor finalizado.
pause
