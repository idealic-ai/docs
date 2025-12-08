# Evolution Draft: 2025-12-01

> Status: Draft
> Source: https://github.com/idealic-ai/platform/pull/65

## Обзор (Summary)

Ревью процесс был сосредоточен на уточнении архитектурного видения системы деплоя (Blue-Green).

1.  **Чего хотел ревьюер:**
    - Четкого разделения понятий "Runner-driven Execution" (сервер не открывает порты, раннер сам тянет задачи).
    - Исправления понимания работы Docker Compose `project_name`: он добавляет **префикс**, а не суффикс.
    - Унификации именования стеков: `app-blue` / `app-green` (вместо `idealic-blue`).
    - Изоляции сетей между стеками и предложения переключать трафик через разные порты (mapping ports) вместо переконфигурации upstream хостов, чтобы упростить Nginx reload.
    - Явного упоминания роли Docker Registry и тестирования как гарантов неизменности (Immutability).

2.  **С чем согласился автор:**
    - Полностью переписал введение и философию.
    - Детализировал структуру команд деплоя (наслаивание файлов, передача ENV).
    - Разделил сервисы на Edge (Recreate, downtime) и App (Blue-Green, zero downtime).

3.  **Общий контекст:**
    - Подтверждено: Секреты никогда не хранятся в файлах (`.env`), только в памяти/ENV процесса.
    - Подтверждено: Edge обновляется редко и отдельно.

4.  **Открытые вопросы / Предложения:**
    - Inviz предложил схему переключения через порты (`server:$IP:$PORT`) вместо симлинков конфигов, чтобы избежать проблем с DNS/Reload. В текущем диффе реализованы симлинки, предложение про порты — вектор на улучшение.

## Список Намерений (Intent List)

### 1. Философия Runner-driven и Immutability

- **Намерение:** Четко описать, как обеспечивается безопасность и надежность поставки.
- **Действие:** Добавлено описание того, что сервер управляется изнутри (Runner), а не снаружи (SSH). Добавлены этапы тестирования и Registry.
- **Статус:** Согласовано.
- **Результат:** Видение уточнено.
- **Контекст:**
  > [Inviz](https://github.com/idealic-ai/platform/pull/65#discussion_r2586973615): "Сервер не открывает входящие порты... GitHub Runner... сам опрашивает GitHub"
  >
  > [Inviz](https://github.com/idealic-ai/platform/pull/65#discussion_r2586968186): "неплохо добавить что образы хранятся в регистри... откуда скачивает их ранер"

### 2. Разделение жизненных циклов (Edge vs App)

- **Намерение:** Зафиксировать, что Zero Downtime возможен только для App. Edge обновляется с простоем.
- **Действие:** Явное разделение в документации на "Infrastructure Services (Edge)" и "Application Services (App)".
- **Статус:** Согласовано.
- **Результат:** Зафиксирован компромисс (Edge downtime допустим).
- **Контекст:**
  > [Inviz](https://github.com/idealic-ai/platform/pull/65#discussion_r2586978345): "надо подписать что это временная ситуация... Это компромисс"

### 3. Стандартизация именования и изоляции (Prefixes)

- **Намерение:** Исправить техническую ошибку в документации касательно работы `project_name` и утвердить схему именования.
- **Действие:** Заменить упоминания суффиксов на префиксы. Использовать имена проектов `app-green` / `app-blue`.
- **Статус:** Требует правки (в доке были суффиксы).
- **Результат:** Исправлено понимание работы Compose.
- **Контекст:**
  > [Inviz](https://github.com/idealic-ai/platform/pull/65#discussion_r2586976595): "Project name задает префиксы автоматически так что суффикс будет `app-green-nginx-app`"
  >
  > [Inviz](https://github.com/idealic-ai/platform/pull/65#discussion_r2586988838): "давай везде наведи порядок... везде юзать префиксы... app-green, app-blue"

### 4. Управление секретами (Memory Only)

- **Намерение:** Жесткий запрет на `.env` файлы в продакшене.
- **Действие:** Описана механика инъекции секретов через GitHub Actions прямо в процесс.
- **Статус:** Согласовано.
- **Контекст:**
  > [Inviz](https://github.com/idealic-ai/platform/pull/65#discussion_r2583360243): "НИКОГДА ни ПРИ КАКИХ ОБСТОЯТЕЛЬСТВАХ мы не должны требовать юзера делать `ACME_DISABLED=1 docker compose ...`"

### 5. Механизм переключения (Ports vs Symlinks)

- **Намерение:** Оптимизировать переключение трафика.
- **Действие:** Текущая реализация — симлинки. Предложение ревьюера — переключение по портам.
- **Статус:** Предложение улучшения (Vision Impact).
- **Контекст:**
  > [Inviz](https://github.com/idealic-ai/platform/pull/65#discussion_r2586999729): "Я бы предложил... блю-грин переключался бы по порту... (app-blue: 81, app-green: 82). Тогда еботы с днсом тоже не будет"

---

## Отчет о валидации (Validation Report)

| Comment ID                                                                          | Intent # | Status                    |
| ----------------------------------------------------------------------------------- | -------- | ------------------------- |
| [2583307920](https://github.com/idealic-ai/platform/pull/65#discussion_r2583307920) | 1        | Included                  |
| [2583299281](https://github.com/idealic-ai/platform/pull/65#discussion_r2583299281) | 1        | Included                  |
| [2577964666](https://github.com/idealic-ai/platform/pull/65#discussion_r2577964666) | 2        | Included                  |
| [2579434378](https://github.com/idealic-ai/platform/pull/65#discussion_r2579434378) | 2        | Included                  |
| [2579441820](https://github.com/idealic-ai/platform/pull/65#discussion_r2579441820) | -        | Skipped (Status update)   |
| [2579446463](https://github.com/idealic-ai/platform/pull/65#discussion_r2579446463) | 6        | Included (File structure) |
| [2581222265](https://github.com/idealic-ai/platform/pull/65#discussion_r2581222265) | 6        | Included (Merged)         |
| [2581223702](https://github.com/idealic-ai/platform/pull/65#discussion_r2581223702) | 6        | Included (Commands)       |
| [2583355952](https://github.com/idealic-ai/platform/pull/65#discussion_r2583355952) | 4        | Included                  |
| [2583253010](https://github.com/idealic-ai/platform/pull/65#discussion_r2583253010) | 4        | Included                  |
| [2583360243](https://github.com/idealic-ai/platform/pull/65#discussion_r2583360243) | 4        | Included                  |
| [2583262180](https://github.com/idealic-ai/platform/pull/65#discussion_r2583262180) | 4        | Included                  |
| [2583323449](https://github.com/idealic-ai/platform/pull/65#discussion_r2583323449) | 1        | Included                  |
| [2586965160](https://github.com/idealic-ai/platform/pull/65#discussion_r2586965160) | 1        | Included                  |
| [2586968186](https://github.com/idealic-ai/platform/pull/65#discussion_r2586968186) | 1        | Included                  |
| [2589827054](https://github.com/idealic-ai/platform/pull/65#discussion_r2589827054) | 1        | Included                  |
| [2586973615](https://github.com/idealic-ai/platform/pull/65#discussion_r2586973615) | 1        | Included                  |
| [2586976595](https://github.com/idealic-ai/platform/pull/65#discussion_r2586976595) | 3        | Included                  |
| [2586978345](https://github.com/idealic-ai/platform/pull/65#discussion_r2586978345) | 2        | Included                  |
| [2586979900](https://github.com/idealic-ai/platform/pull/65#discussion_r2586979900) | 3        | Included                  |
| [2586980570](https://github.com/idealic-ai/platform/pull/65#discussion_r2586980570) | 3        | Included                  |
| [2586981544](https://github.com/idealic-ai/platform/pull/65#discussion_r2586981544) | 5        | Included                  |
| [2586999729](https://github.com/idealic-ai/platform/pull/65#discussion_r2586999729) | 5        | Included                  |
| [2586982000](https://github.com/idealic-ai/platform/pull/65#discussion_r2586982000) | -        | Skipped (Correction)      |
| [2586984019](https://github.com/idealic-ai/platform/pull/65#discussion_r2586984019) | 3        | Included                  |
| [2586988838](https://github.com/idealic-ai/platform/pull/65#discussion_r2586988838) | 3        | Included                  |
| [2586994891](https://github.com/idealic-ai/platform/pull/65#discussion_r2586994891) | 3        | Included                  |
| [2586996786](https://github.com/idealic-ai/platform/pull/65#discussion_r2586996786) | 3        | Included                  |
| [2587001257](https://github.com/idealic-ai/platform/pull/65#discussion_r2587001257) | 5        | Included                  |
| [2587003644](https://github.com/idealic-ai/platform/pull/65#discussion_r2587003644) | 1        | Included                  |
