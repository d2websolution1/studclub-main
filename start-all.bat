@echo off
title StuddClub Launcher
echo ========================================================
echo   STUDDCLUB Full Stack System - Starting...
echo ========================================================

echo [1/3] Clearing previous processes on ports 5000, 3001, 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5000 :3001 :3000" ^| findstr "LISTENING"') do (
    taskkill /f /pid %%a >nul 2>&1
)

cd /d "%~dp0studclub-main"

echo [2/3] Cleaning stale Next.js cache...
if exist "studclub-main\.next" rd /s /q "studclub-main\.next" >nul 2>&1
if exist "studclub-admin\.next" rd /s /q "studclub-admin\.next" >nul 2>&1

echo [3/3] Launching 3 services...
start "StuddClub Backend (Port 5000)" cmd /k "title StuddClub Backend && cd studclub-backend && npm run dev"
start "StuddClub Admin (Port 3001)" cmd /k "title StuddClub Admin && cd studclub-admin && npm run dev"
start "StuddClub Frontend (Port 3000)" cmd /k "title StuddClub Frontend && cd studclub-main && npm run dev"

echo.
echo ========================================================
echo   ALL 3 SERVICES ARE RUNNING!
echo   ----------------------------------------------------
echo   Client Website : http://localhost:3000
echo   Admin Panel    : http://localhost:3001
echo   Backend API    : http://localhost:5000/api/health
echo ========================================================
echo.
echo Tip: Double-click stop-all.bat anytime to close all 3 servers.
ping 127.0.0.1 -n 4 >nul
