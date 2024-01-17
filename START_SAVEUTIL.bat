@title saveutil
@echo off
/saveutil/nircmd.exe win hide ititle "saveutil"
echo Opening...
cd saveutil
powershell -windowstyle hidden -command yarn start
goto :eof