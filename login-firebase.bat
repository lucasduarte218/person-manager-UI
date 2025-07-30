@echo off
echo ========================================
echo          LOGIN NO FIREBASE
echo ========================================
echo.
echo Executando login no Firebase...
echo Uma pagina web sera aberta para autenticacao.
echo.

"C:\Users\Lucas Duarte\AppData\Local\nvm\v22.17.1\firebase.cmd" login --no-localhost

echo.
echo Login concluido!
echo.
echo Agora execute: deploy.bat
echo.
pause
