@echo off
echo ========================================
echo         DEPLOY PARA FIREBASE
echo ========================================
echo.

REM Verificar se esta logado
echo Verificando autenticacao...
"C:\Users\Lucas Duarte\AppData\Local\nvm\v22.17.1\firebase.cmd" projects:list >nul 2>&1

if %errorlevel% neq 0 (
    echo ERRO: Voce nao esta logado no Firebase!
    echo Execute primeiro: login-firebase.bat
    echo.
    pause
    exit /b 1
)

echo Usuario autenticado!
echo.

echo Definindo projeto Firebase...
"C:\Users\Lucas Duarte\AppData\Local\nvm\v22.17.1\firebase.cmd" use personmanager-f47d5

echo.
echo Fazendo deploy para Firebase Hosting...
"C:\Users\Lucas Duarte\AppData\Local\nvm\v22.17.1\firebase.cmd" deploy --only hosting

echo.
echo ========================================
echo        DEPLOY CONCLUIDO!
echo ========================================
echo.
echo Sua aplicacao esta disponivel em:
echo https://personmanager-f47d5.web.app
echo https://personmanager-f47d5.firebaseapp.com
echo.
pause
