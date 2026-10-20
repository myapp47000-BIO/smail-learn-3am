@echo off
chcp 65001 >nul
echo ============================================
echo   متفوّق 3 متوسط - تشغيل التطبيق محلياً
echo ============================================
echo.
echo افتح المتصفح على: http://localhost:8080
echo (اضغط Ctrl+C للإيقاف)
echo.
python -m http.server 8080
if errorlevel 1 (
    echo.
    echo تعذّر تشغيل Python. جرّب Node:
    npx serve -p 8080 .
)
pause
