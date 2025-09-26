# Sochi Travel - Monitoring & Alerting Setup

Полная система мониторинга и алертинга для проекта Sochi Travel с Prometheus, Grafana, Sentry и uptime monitoring.

## 📊 Компоненты мониторинга

### 1. **Prometheus** - Сбор метрик
- Системные метрики (CPU, RAM, диск, сеть)
- Метрики приложения (API, Web, БД, Redis, MinIO)
- Метрики контейнеров (Docker, cAdvisor)
- Uptime monitoring (Blackbox Exporter)

### 2. **Grafana** - Визуализация
- Дашборды для всех компонентов системы
- Настроенные алерты и уведомления
- Исторические данные и тренды
- Кастомные метрики и KPI

### 3. **Alertmanager** - Обработка алертов
- Telegram уведомления
- Email уведомления
- Группировка и подавление алертов
- Эскалация критических алертов

### 4. **Sentry** - Отслеживание ошибок
- JavaScript ошибки в React
- Node.js ошибки в API
- Performance monitoring
- Release tracking

### 5. **Uptime Monitoring** - Мониторинг доступности
- HTTP health checks
- Response time monitoring
- Service availability tracking
- Automated alerts

## 🚀 Быстрый старт

### 1. Настройка мониторинга
```bash
# Запуск автоматической настройки
./monitoring/setup-monitoring.sh
```

### 2. Ручная настройка
```bash
# Копирование конфигураций
cp -r monitoring/* /opt/sochi-travel/monitoring/

# Запуск мониторинг стека
docker-compose -f monitoring/docker-compose.monitoring.yml up -d

# Настройка uptime monitoring
sudo systemctl enable sochi-travel-uptime.timer
sudo systemctl start sochi-travel-uptime.timer
```

## 📋 Конфигурационные файлы

### Prometheus
- `monitoring/prometheus/prometheus.yml` - Основная конфигурация
- `monitoring/prometheus/rules/alerts.yml` - Правила алертов

### Grafana
- `monitoring/grafana/dashboards/` - Дашборды
- `monitoring/grafana/datasources/` - Источники данных

### Alertmanager
- `monitoring/alertmanager/alertmanager.yml` - Конфигурация алертов

### Sentry
- `monitoring/sentry/sentry.conf.py` - Конфигурация для API
- `monitoring/sentry/sentry.client.js` - Конфигурация для Web

## 🔧 Настройка переменных окружения

Добавьте в `.env` файл:

```bash
# Monitoring Configuration
GRAFANA_PASSWORD=SochiTravel2025!GrafanaSecure
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id

# Sentry Configuration
SENTRY_DSN=your_sentry_dsn
VITE_SENTRY_DSN=your_sentry_dsn
```

## 📊 Доступ к интерфейсам

### Prometheus
- URL: http://localhost:9090
- Метрики: http://localhost:9090/metrics
- Targets: http://localhost:9090/targets
- Alerts: http://localhost:9090/alerts

### Grafana
- URL: http://localhost:3000
- Логин: admin
- Пароль: SochiTravel2025!GrafanaSecure

### Alertmanager
- URL: http://localhost:9093
- Alerts: http://localhost:9093/#/alerts
- Silences: http://localhost:9093/#/silences

## 🚨 Настроенные алерты

### Критические алерты
- **ServiceDown** - Сервис недоступен
- **HighDiskUsage** - Высокое использование диска (>90%)
- **DatabaseConnectionIssues** - Проблемы с БД
- **APIHighErrorRate** - Высокий процент ошибок API (>5%)

### Предупреждения
- **HighCPUUsage** - Высокое использование CPU (>80%)
- **HighMemoryUsage** - Высокое использование памяти (>85%)
- **APIHighResponseTime** - Медленный ответ API (>2s)
- **ContainerHighCPUUsage** - Высокое использование CPU контейнером

### Uptime мониторинг
- **WebsiteDown** - Сайт недоступен
- **APIHealthCheckFailed** - API health check не прошел
- **HighResponseTime** - Медленный ответ (>5s)

## 📈 Дашборды Grafana

### 1. **Sochi Travel Overview**
- Общий обзор системы
- Системные ресурсы
- Статус сервисов
- Производительность API

### 2. **API Monitoring**
- Метрики Node.js приложения
- Время ответа и throughput
- Ошибки и исключения
- Производительность endpoints

### 3. **Database Monitoring**
- Метрики MariaDB
- Метрики Redis
- Производительность запросов
- Использование ресурсов

## 🔍 Мониторинг производительности

### Node.js метрики
- Heap usage
- Event loop lag
- Active handles/requests
- Garbage collection

### Database метрики
- Connection pool
- Query performance
- Lock contention
- Buffer pool hit rate

### Redis метрики
- Memory usage
- Operations per second
- Hit/miss ratio
- Connected clients

## 📱 Уведомления

### Telegram
- Критические алерты (немедленно)
- Предупреждения (группировка)
- Еженедельные отчеты
- Статус деплоя

### Email
- Критические алерты
- Еженедельные отчеты
- Системные уведомления

## 🛠️ Полезные команды

### Мониторинг
```bash
# Статус мониторинг стека
docker-compose -f monitoring/docker-compose.monitoring.yml ps

# Логи Prometheus
docker-compose -f monitoring/docker-compose.monitoring.yml logs prometheus

# Логи Grafana
docker-compose -f monitoring/docker-compose.monitoring.yml logs grafana

# Логи Alertmanager
docker-compose -f monitoring/docker-compose.monitoring.yml logs alertmanager
```

### Uptime мониторинг
```bash
# Ручная проверка
./monitoring/uptime/uptime-monitor.sh

# Статус uptime monitoring
systemctl status sochi-travel-uptime.timer

# Логи uptime monitoring
journalctl -u sochi-travel-uptime -f
```

### Проверка здоровья
```bash
# Prometheus
curl http://localhost:9090/-/healthy

# Grafana
curl http://localhost:3000/api/health

# Alertmanager
curl http://localhost:9093/-/healthy

# API
curl http://localhost:4000/health

# Web
curl http://localhost/health
```

## 🔧 Настройка Sentry

### 1. Создание проекта в Sentry
1. Зайдите на https://sentry.io
2. Создайте новый проект
3. Получите DSN

### 2. Настройка переменных
```bash
# Добавьте в .env
SENTRY_DSN=https://your-dsn@sentry.io/project-id
VITE_SENTRY_DSN=https://your-dsn@sentry.io/project-id
```

### 3. Интеграция в код
```javascript
// API (Node.js)
import * as Sentry from '@sentry/node';
Sentry.init({ dsn: process.env.SENTRY_DSN });

// Web (React)
import * as Sentry from '@sentry/react';
Sentry.init({ dsn: process.env.VITE_SENTRY_DSN });
```

## 📊 Метрики и KPI

### Системные метрики
- CPU usage < 80%
- Memory usage < 85%
- Disk usage < 90%
- Load average < 2x CPU cores

### API метрики
- Response time 95th percentile < 2s
- Error rate < 5%
- Throughput > 100 req/s
- Uptime > 99.9%

### Database метрики
- Connection pool usage < 80%
- Query response time < 100ms
- Buffer pool hit rate > 95%
- Lock wait time < 1s

## 🚨 Troubleshooting

### Проблемы с Prometheus
```bash
# Проверка конфигурации
docker exec sochi-travel-prometheus promtool check config /etc/prometheus/prometheus.yml

# Проверка targets
curl http://localhost:9090/api/v1/targets
```

### Проблемы с Grafana
```bash
# Проверка подключения к Prometheus
curl http://localhost:9090/api/v1/query?query=up

# Проверка дашбордов
curl http://localhost:3000/api/dashboards
```

### Проблемы с алертами
```bash
# Проверка правил
docker exec sochi-travel-prometheus promtool check rules /etc/prometheus/rules/alerts.yml

# Проверка Alertmanager
curl http://localhost:9093/api/v1/alerts
```

## 📚 Дополнительные ресурсы

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [Sentry Documentation](https://docs.sentry.io/)
- [Alertmanager Documentation](https://prometheus.io/docs/alerting/latest/alertmanager/)

## 🔄 Обновление мониторинга

```bash
# Обновление конфигураций
git pull origin main

# Перезапуск мониторинг стека
docker-compose -f monitoring/docker-compose.monitoring.yml down
docker-compose -f monitoring/docker-compose.monitoring.yml up -d

# Обновление uptime monitoring
sudo systemctl restart sochi-travel-uptime.timer
```

---

**Мониторинг настроен и готов к работе! 🚀**
