@echo off
title AI IP Operator EXE Build

echo ============================================
echo   AI IP Operator - Windows EXE Build
echo ============================================
echo.

echo [1/2] Building Next.js frontend...
call npx next build
if %errorlevel% neq 0 (
    echo ERROR: Frontend build failed
    pause
    exit /b 1
)
echo OK
echo.

echo [2/2] Packaging Windows EXE...
call npx electron-builder --win --x64
if %errorlevel% neq 0 (
    echo.
    echo NOTE: If download fails, try mirror:
    echo   set ELECTRON_MIRROR=https://registry.npmmirror.com/-/binary/electron/
    echo   npx electron-builder --win --x64
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================
echo   BUILD SUCCESSFUL!
echo ============================================
echo.
echo Installer: %CD%\release\AI-IP-Operator-1.0.0-setup.exe
echo.
pause
