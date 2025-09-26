# 🔍 Depcheck Configuration Guide для Monorepo

**Дата создания**: 27 января 2025  
**Версия**: 1.0.0  

---

## 📋 Обзор

Создана полная конфигурация depcheck для монорепозитория Sochi Travel с учетом структуры:
- `apps/api/` (backend)
- `apps/web/` (frontend) 
- `packages/` (общие утилиты)
- `scripts/` (миграции и утилиты)

---

## 📁 Созданные файлы

### 🎯 Основные конфигурации:
1. **`.depcheckrc.json`** - Главная конфигурация для корня проекта
2. **`apps/web/.depcheckrc.json`** - Конфигурация для frontend
3. **`apps/api/.depcheckrc.json`** - Конфигурация для backend
4. **`packages/.depcheckrc.json`** - Конфигурация для общих пакетов
5. **`scripts/.depcheckrc.json`** - Конфигурация для скриптов

### 🛠️ Скрипты для удобства:
6. **`scripts/depcheck-all.sh`** - Проверка всех частей проекта
7. **`scripts/depcheck-frontend.sh`** - Проверка только frontend
8. **`scripts/depcheck-backend.sh`** - Проверка только backend

---

## ⚙️ Особенности конфигурации

### 🔧 Игнорирование файлов и папок:
```json
{
  "ignorePatterns": [
    "*.test.ts", "*.test.tsx", "*.test.js", "*.test.jsx",
    "*.spec.ts", "*.spec.tsx", "*.spec.js", "*.spec.jsx",
    "**/*.d.ts", "**/test/**", "**/tests/**", "**/__tests__/**",
    "**/coverage/**", "**/dist/**", "**/build/**", "**/node_modules/**"
  ]
}
```

### 📦 Игнорирование типов пакетов:
```json
{
  "ignoreMatches": [
    "@types/*", "@typescript-eslint/*", "eslint*", "prettier*",
    "typescript", "ts-node", "tsx", "vitest", "jest",
    "@testing-library/*", "webpack*", "vite*", "@vitejs/*"
  ]
}
```

### 🎯 Специфичные настройки для частей проекта:

#### Frontend (apps/web):
- Игнорирует React, Vite, styled-components
- Игнорирует ассеты (CSS, изображения, шрифты)
- Игнорирует конфигурационные файлы

#### Backend (apps/api):
- Игнорирует Express, Prisma, security пакеты
- Игнорирует базы данных и миграции
- Игнорирует Docker файлы

#### Packages:
- Игнорирует общие утилиты (lodash, date-fns, uuid)
- Игнорирует TypeScript и build tools

#### Scripts:
- Игнорирует shell скрипты и SQL файлы
- Игнорирует конфигурационные файлы
- Игнорирует миграционные утилиты

---

## 🚀 Использование

### 1. Проверка всего проекта:
```bash
# Через скрипт (рекомендуется)
./scripts/depcheck-all.sh

# Или напрямую
npx depcheck
```

### 2. Проверка только frontend:
```bash
# Через скрипт
./scripts/depcheck-frontend.sh

# Или напрямую
cd apps/web && npx depcheck
```

### 3. Проверка только backend:
```bash
# Через скрипт
./scripts/depcheck-backend.sh

# Или напрямую
cd apps/api && npx depcheck
```

### 4. Проверка конкретной части:
```bash
# Проверка packages
cd packages && npx depcheck

# Проверка scripts
cd scripts && npx depcheck
```

---

## 📊 Ожидаемые результаты

### ✅ Нормальные результаты:
- **Unused devDependencies**: Тестовые и build пакеты
- **Missing dependencies**: Пакеты, используемые в runtime

### ⚠️ Требуют внимания:
- **Unused dependencies**: Пакеты, которые действительно не используются
- **Missing dependencies**: Критически важные пакеты

---

## 🔧 Настройка для TypeScript

### Поддержка TypeScript импортов:
```json
{
  "parsers": {
    "*.ts": "typescript",
    "*.tsx": "typescript",
    "*.js": "es6",
    "*.jsx": "es6"
  },
  "detectors": [
    "typescriptImportEqualsDeclaration",
    "typescriptImportType",
    "typescriptExportAssignment",
    "typescriptModuleReference"
  ]
}
```

### Игнорирование TypeScript файлов:
```json
{
  "ignorePatterns": ["**/*.d.ts"],
  "ignoreMatches": ["@types/*", "typescript"]
}
```

---

## 🏗️ Настройка для Monorepo

### Игнорирование общих пакетов:
```json
{
  "package": {
    "ignoreMatches": [
      "react", "react-dom", "styled-components",
      "express", "cors", "helmet", "prisma"
    ]
  }
}
```

### Игнорирование путей:
```json
{
  "ignorePaths": [
    "apps/web/public/**",
    "apps/api/dist/**",
    "scripts/**/*.sql",
    "scripts/**/*.sh"
  ]
}
```

---

## 🛡️ Безопасность и качество

### Игнорирование security пакетов:
```json
{
  "ignoreMatches": [
    "helmet", "express-rate-limit", "cors",
    "bcryptjs", "jsonwebtoken", "argon2"
  ]
}
```

### Игнорирование build tools:
```json
{
  "ignoreMatches": [
    "vite*", "@vitejs/*", "webpack*", "rollup*",
    "esbuild", "swc*", "@swc/*"
  ]
}
```

---

## 📝 Рекомендации

### 1. Регулярные проверки:
```bash
# Еженедельно
./scripts/depcheck-all.sh

# При изменении зависимостей
npm install && ./scripts/depcheck-all.sh
```

### 2. Интеграция в CI/CD:
```yaml
# .github/workflows/depcheck.yml
- name: Check dependencies
  run: ./scripts/depcheck-all.sh
```

### 3. Автоматизация:
```json
// package.json
{
  "scripts": {
    "depcheck": "./scripts/depcheck-all.sh",
    "depcheck:frontend": "./scripts/depcheck-frontend.sh",
    "depcheck:backend": "./scripts/depcheck-backend.sh"
  }
}
```

---

## 🔍 Troubleshooting

### Проблема: Много false positives
**Решение**: Добавьте пакеты в `ignoreMatches` или `ignorePackages`

### Проблема: Пропущенные зависимости
**Решение**: Проверьте `ignorePatterns` и `ignorePaths`

### Проблема: TypeScript импорты не распознаются
**Решение**: Убедитесь, что `parsers` содержит `"*.ts": "typescript"`

---

## 📞 Поддержка

При возникновении проблем:
1. Проверьте конфигурационные файлы
2. Убедитесь, что depcheck установлен глобально
3. Проверьте права доступа к скриптам
4. Обратитесь к документации depcheck

---

**Статус конфигурации**: 🟢 **ГОТОВА К ИСПОЛЬЗОВАНИЮ**

*Конфигурация создана 27 января 2025*

