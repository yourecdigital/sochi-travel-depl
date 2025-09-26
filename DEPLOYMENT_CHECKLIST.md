# 🚀 Sochi Travel - Deployment Checklist

## ✅ **Проект готов к деплою!**

Все файлы закоммичены и запушены на GitHub. Теперь нужно настроить только переменные окружения и секреты.

## 🔧 **Что нужно настроить перед деплоем:**

### **1. Переменные окружения (env.production)**

Создайте файл `env.production` на сервере с вашими данными:

```bash
# ===========================================
# DATABASE CONFIGURATION
# ===========================================
DB_HOST=mariadb
DB_PORT=3306
DB_NAME=sochi_travel
DB_USER=sochi_user
DB_PASSWORD=YOUR_STRONG_DB_PASSWORD_HERE
DB_ROOT_PASSWORD=YOUR_STRONG_ROOT_PASSWORD_HERE

# ===========================================
# REDIS CONFIGURATION
# ===========================================
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=YOUR_STRONG_REDIS_PASSWORD_HERE

# ===========================================
# JWT CONFIGURATION
# ===========================================
JWT_SECRET=YOUR_VERY_LONG_JWT_SECRET_KEY_HERE
REFRESH_SECRET=YOUR_VERY_LONG_REFRESH_SECRET_KEY_HERE

# ===========================================
# MINIO/S3 CONFIGURATION
# ===========================================
MINIO_ROOT_USER=YOUR_MINIO_USER
MINIO_ROOT_PASSWORD=YOUR_STRONG_MINIO_PASSWORD_HERE
MINIO_BROWSER_REDIRECT_URL=https://yourdomain.com:9001
S3_BUCKET=sochi-travel-uploads

# ===========================================
# APPLICATION CONFIGURATION
# ===========================================
NODE_ENV=production
API_PORT=4000
VITE_API_BASE_URL=https://yourdomain.com
VITE_APP_VERSION=1.0.0
VITE_BUILD_TIME=2024-01-01T00:00:00Z

# ===========================================
# DOMAIN CONFIGURATION
# ===========================================
DOMAIN=yourdomain.com
EMAIL=your-email@example.com
PUBLIC_URL=https://yourdomain.com

# ===========================================
# MONITORING CONFIGURATION
# ===========================================
GRAFANA_PASSWORD=YOUR_STRONG_GRAFANA_PASSWORD_HERE
PROMETHEUS_RETENTION=15d

# ===========================================
# TELEGRAM NOTIFICATIONS
# ===========================================
TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID=YOUR_TELEGRAM_CHAT_ID

# ===========================================
# SENTRY CONFIGURATION
# ===========================================
SENTRY_DSN=YOUR_SENTRY_DSN_HERE
SENTRY_ORG=YOUR_SENTRY_ORG
SENTRY_PROJECT=YOUR_SENTRY_PROJECT
SENTRY_AUTH_TOKEN=YOUR_SENTRY_AUTH_TOKEN

# ===========================================
# BUILD CONFIGURATION
# ===========================================
API_VERSION=1.0.0
BUILD_TIME=2024-01-01T00:00:00Z
VITE_BUILD_TIME=2024-01-01T00:00:00Z
```

### **2. Секреты для Docker Compose**

Создайте директорию для секретов:
```bash
mkdir -p secrets
```

Создайте файлы секретов:
```bash
# JWT секреты
echo "YOUR_VERY_LONG_JWT_SECRET_KEY_HERE" > secrets/jwt_secret.txt
echo "YOUR_VERY_LONG_REFRESH_SECRET_KEY_HERE" > secrets/refresh_secret.txt

# Пароль БД
echo "YOUR_STRONG_DB_PASSWORD_HERE" > secrets/db_password.txt
```

### **3. SSL сертификаты (если используете HTTPS)**

```bash
# Установите certbot
sudo apt install certbot

# Получите SSL сертификат
sudo certbot certonly --standalone -d yourdomain.com
```

### **4. Настройка GitHub Actions (если используете)**

В настройках репозитория GitHub добавьте секреты:

- `DEPLOY_HOST` - IP адрес вашего сервера
- `DEPLOY_USER` - пользователь для SSH (обычно `deploy`)
- `DEPLOY_SSH_KEY` - приватный SSH ключ
- `DEPLOY_PORT` - порт SSH (обычно 22)
- `GHCR_TOKEN` - токен GitHub Container Registry
- `TELEGRAM_BOT_TOKEN` - токен Telegram бота
- `TELEGRAM_CHAT_ID` - ID чата Telegram
- `PUBLIC_URL` - публичный URL приложения

## 🚀 **Процесс деплоя:**

### **1. На сервере Ubuntu 22.04:**

```bash
# Клонируйте репозиторий
git clone https://github.com/yourusername/sochi-travel-depl.git
cd sochi-travel-depl

# Сделайте скрипты исполняемыми
chmod +x scripts/*.sh
chmod +x diagnostics/*.sh
chmod +x security/*.sh
chmod +x monitoring/*.sh

# Настройте сервер
sudo ./scripts/init-server.sh

# Создайте env.production с вашими данными
cp env.example env.production
nano env.production  # Отредактируйте под свои данные

# Создайте секреты
mkdir -p secrets
echo "YOUR_JWT_SECRET" > secrets/jwt_secret.txt
echo "YOUR_REFRESH_SECRET" > secrets/refresh_secret.txt
echo "YOUR_DB_PASSWORD" > secrets/db_password.txt

# Запустите деплой
./scripts/deploy.sh
```

### **2. Проверка деплоя:**

```bash
# Проверьте статус сервисов
docker-compose -f docker-compose.prod.yml ps

# Проверьте логи
docker-compose -f docker-compose.prod.yml logs

# Запустите диагностику
./diagnostics/docker-diagnostics.sh
./diagnostics/network-diagnostics.sh
./diagnostics/database-diagnostics.sh
```

## 🔐 **Безопасность:**

### **Обязательно измените:**

1. **Пароли БД** - используйте сильные пароли
2. **JWT секреты** - минимум 32 символа
3. **Redis пароль** - используйте сильный пароль
4. **MinIO пароли** - используйте сильные пароли
5. **Grafana пароль** - используйте сильный пароль

### **Рекомендуемые пароли:**

```bash
# Генерация сильных паролей
openssl rand -base64 32  # Для JWT секретов
openssl rand -base64 16  # Для паролей БД
```

## 📊 **Мониторинг:**

После деплоя настройте мониторинг:

```bash
# Запустите мониторинг
./monitoring/setup-monitoring.sh

# Проверьте Grafana
# Откройте http://yourdomain.com:3000
# Логин: admin
# Пароль: ваш GRAFANA_PASSWORD
```

## 🚨 **Экстренные процедуры:**

```bash
# Перезапуск всех сервисов
./diagnostics/emergency-procedures.sh --action=restart

# Откат при проблемах
./diagnostics/emergency-procedures.sh --action=rollback

# Быстрое исправление проблем
./diagnostics/quick-fix.sh --issue=all
```

## 📞 **Поддержка:**

Если возникнут проблемы:

1. Проверьте логи: `./diagnostics/logs-debug.sh --follow`
2. Запустите диагностику: `./diagnostics/docker-diagnostics.sh --verbose`
3. Используйте экстренные процедуры: `./diagnostics/emergency-procedures.sh`

---

**Проект полностью готов к деплою! 🎉**

Нужно только настроить переменные окружения и секреты под ваши данные.
