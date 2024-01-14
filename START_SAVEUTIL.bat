@echo off
echo Opening...
cd settings_backups
cd menu
start "CMD" yarn start
:: start "Logs" py -m /settings_backup/script
goto :eof