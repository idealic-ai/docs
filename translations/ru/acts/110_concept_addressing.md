# 110: Концепция/Адресация

> [!DEFINITION] :term[idea:]{canonical="idea:"}
> Схема URI для навигации по версионированной и разветвлённой реальности экосистемы :term[Идей]{canonical="Idea"}. Она предоставляет синтаксис как для простых, динамических запросов, так и для полностью разрешённых, постоянных ссылок.

> Sidenote:
> - Требуется:
>   - :term[Видимость]{canonical="Visibility" href="./108_concept_visibility.md"}

Схема URI :term[idea:]{canonical="idea:"} — это язык для навигации по версионированной, разветвлённой реальности, описанной в предыдущем документе. Она предоставляет надёжный синтаксис для запроса :term[Идей]{canonical="Idea" href="./101_concept_idea.md"} и для создания постоянных, воспроизводимых ссылок на конкретные, разрешённые версии.

> Sidenote:
> - Концепции :term[Веток]{canonical="Branch" href="./108_concept_visibility.md#branches-publication-and-partitioning"} и :term[Пути Поиска]{canonical="Search Path" href="./108_concept_visibility.md#the-search-path-prioritized-retrieval"}, по которым осуществляется навигация с помощью этой схемы URI, подробно описаны в главе :term[Видимость]{canonical="Visibility" href="./108_concept_visibility.md"}.

## Анатомия ссылки `idea:`

Ссылка :term[idea:]{canonical="idea:"} может включать несколько компонентов:

- **Схема**: :term[idea:]{canonical="idea:"}
- **Домен**: Необязательное суверенное пространство имён, с префиксом `//` (например, `//my-project.com`). Если опущено, путь считается относительным к текущему пространству имён.
- **Указатель ветки**: Необязательная, явная :term[ветка]{canonical="Branch"} (например, `~main/`). Начальный символ `/` является сокращением для `~main/`.
- **Путь**: Текстовый идентификатор :term[Идеи]{canonical="Idea" href="./101_concept_idea.md"} (например, `schemas/UserProfile`).
- **Префикс версии**: Необязательное ограничение версии (например, `?1.2`).
- **Разрешённая версия**: В разрешённой ссылке — точная найденная версия (например, `:1.2.3`).
- **Фрагмент**: Указатель на определённую часть :term[Идеи]{canonical="Idea" href="./101_concept_idea.md"} (например, `#schema`).

## Состояния ссылок

Ссылка :term[idea:]{canonical="idea:"} может находиться в нескольких состояниях:

1.  **Относительный :term[Запрос]{canonical="Request"} («Просьба»):** `idea:schemas/UserProfile?1.2`
    - Этот :term[запрос]{canonical="Request"} ищет последнюю версию `UserProfile`, совместимую с префиксом `1.2`, разрешаемую с помощью :term[Пути Поиска]{canonical="Search Path" href="./108_concept_visibility.md#the-search-path-prioritized-retrieval"} в **текущем суверенном пространстве имён**.

2.  **Абсолютный :term[Запрос]{canonical="Request"}:** `idea://my-project.com/schemas/UserProfile?1.2`
    - Это полностью определённый :term[запрос]{canonical="Request"}, который нацелен на конкретный домен, игнорируя текущее пространство имён.

3.  **:term[Запрос]{canonical="Request"} с явным указанием ветки:** `idea:~main/schemas/UserProfile` (или `idea:/schemas/UserProfile`)
    - Префикс `~` указывает на явный :term[запрос]{canonical="Request"} к :term[Ветке]{canonical="Branch"}. Это игнорирует :term[Путь Поиска]{canonical="Search Path" href="./108_concept_visibility.md#the-search-path-prioritized-retrieval"} и напрямую обращается к :term[ветке]{canonical="Branch"} `main` в текущем (или указанном) пространстве имён.

4.  **Разрешённая ссылка («Ответ»):** `idea://my-project.com/:staging/schemas/UserProfile?1.2:1.2.staging.4`
    - Это постоянная, однозначная запись о разрешении. Она показывает, что :term[запрос]{canonical="Request"} был разрешён в домене `my-project.com`, в :term[ветке]{canonical="Branch"} `staging`, и была найдена точная версия `1.2.staging.4`.

## Полный цикл разработки

Эти концепции обеспечивают безопасный и эффективный рабочий процесс для параллельной разработки.

1.  **Создание ветки**: Разработчик начинает с создания новой :term[ветки]{canonical="Branch"}, `feature/user-onboarding-v2`. Его :term[Путь Поиска]{canonical="Search Path" href="./108_concept_visibility.md#the-search-path-prioritized-retrieval"} устанавливается в `['feature/user-onboarding-v2', 'main']`.

2.  **Разработка процесса**: Разработчик создаёт новую :term[Идею]{canonical="Idea" href="./101_concept_idea.md"} типа `Process`, `idea:processes/onboarding`. Поскольку он находится в :term[ветке]{canonical="Branch"} `feature/user-onboarding-v2`, эта новая :term[Идея]{canonical="Idea" href="./101_concept_idea.md"} и все её последующие версии автоматически связываются с этой :term[веткой]{canonical="Branch"}. Он может свободно дорабатывать и тестировать процесс, создавая по мере необходимости :term[Идеи]{canonical="Idea" href="./101_concept_idea.md"} типа `Instruction` и `Record`.

3.  **Использование существующих компонентов**: Новому процессу `onboarding` требуется стандартная `Instruction` «Отправить письмо». Разработчик ссылается на неё как на `idea:activities/send-email`. Система разрешения сначала проверяет :term[ветку]{canonical="Branch"} `feature/user-onboarding-v2`. Так как в этой ветке она отсутствует, система обращается к :term[ветке]{canonical="Branch"} `main` и находит там стабильную версию.

4.  **Переопределение компонента**: Разработчик понимает, что ему нужен собственный шаблон «Приветственное письмо». Он создаёт новую версию `idea:records/email-templates/welcome` и сохраняет её. Эта новая версия сохраняется в :term[ветку]{canonical="Branch"} `feature/user-onboarding-v2`. Теперь, когда его процесс ссылается на эту :term[Идею]{canonical="Idea" href="./101_concept_idea.md"}, система разрешения сначала находит его новую версию и использует её, оставляя исходную версию в :term[ветке]{canonical="Branch"} `main` нетронутой.

5.  **Продвижение**: По завершении разработчик «продвигает» свою работу. :term[Идея]{canonical="Idea" href="./101_concept_idea.md"} версии `1.3.new-login.2` копируется, её версия «очищается» до `1.4`, и теперь она также публикуется в :term[ветке]{canonical="Branch"} `main`. Она становится новой стабильной версией для всех.

6.  **Контролируемый волновой эффект**: Другой процесс ссылался на `idea:processes/onboarding?1`. Поскольку новая версия `1.4` совместима с префиксом `?1`, при следующем разрешении этого процесса он автоматически и безопасно подхватит новую версию `1.4`. Чтобы предотвратить это и обеспечить стабильность, процесс может «закрепить» свою зависимость, запросив более конкретную версию, например, `?1.3`.