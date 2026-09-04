@echo off
title Push to GitHub
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\mingw64\bin;%PATH%"
cd /d "C:\Users\abhir\OneDrive\Documents\portfolio"

echo =======================================================
echo   Pushing updates to GitHub via SSH...
echo   Repository: git@github.com:abhiramabhi338-coder/abhi-reels-creater.git
echo =======================================================
echo.

git push origin main

echo.
echo =======================================================
echo   Finished! Press any key to close this window.
echo =======================================================
pause
