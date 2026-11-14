@echo off
title Stop StuddClub
echo ========================================================
echo   Stopping all StuddClub services (Ports 5000, 3000, 3001)...
echo ========================================================

for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5000 :3000 :3001" ^| findstr "LISTENING"') do (
    taskkill /f /pid %%a >nul 2>&1
)

echo Done! All servers have been stopped.
ping 127.0.0.1 -n 3 >nul
