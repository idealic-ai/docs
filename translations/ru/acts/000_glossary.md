# Глоссарий терминов

В этом глоссарии определены ключевые понятия, используемые в протоколе Idea и связанных с ним системах.

- :dfn[Советник]{canonical="Advisor" href="./017_agent_advisor.md"}: Специализированное контекстное сообщение, которое определяет персону или аналитическую модель. Оно предписывает :term[агенту]{canonical="Agent"} сформировать структурированное «мнение» или оценку уверенности _перед_ выбором :term[Инструмента]{canonical="Tool"} или созданием :term[Вывода]{canonical="Output"}.

  > Sidenote:
  > - [017: Агент/Советник](./017_agent_advisor.md)

- :dfn[Идея]{canonical="Idea" href="./101_concept_idea.md"}: Автономный, сохраняющий :term[состояние]{canonical="State"} набор :term[данных]{canonical="Data"} (`schema`, `solution`, `context`), представляющий собой единицу знания. Это постоянный вычислительный примитив, а не эфемерный промпт.

  > Sidenote:
  > - [101: Концепция/Идея](./101_concept_idea.md)

- :dfn[Идеатор]{canonical="Ideator" href="./103_concept_ideator.md"}: :term[Идея]{canonical="Idea"}, которая принимает входные :term[данные]{canonical="Data"}, что обозначается контекстным сообщением с `type: "input"`. Она действует как функция, преобразуя вход в выход.

  > Sidenote:
  > - [103: Концепция/Идеатор](./103_concept_ideator.md)

- :dfn[Трансформатор Идей]{canonical="Idea Transformer" href="./103_concept_ideator.md"}: Специализированный :term[Идеатор]{canonical="Ideator"}, который принимает другую :term[Идею]{canonical="Idea"} в качестве входных :term[данных]{canonical="Data"}.

  > Sidenote:
  > - [103: Концепция/Идеатор](./103_concept_ideator.md)

- :dfn[Входное Сообщение]{canonical="Input Message" href="./006_agent_input.md"}: Специализированное :term[Сообщение с Данными]{canonical="Data Message"} (с `kind: "input"`), содержащее `schema` и входные `input` :term[данные]{canonical="Data"}. Оно определяет ожидаемые входные :term[данные]{canonical="Data"} для :term[Запроса]{canonical="Request"}, превращая его в компонент многоразового использования, подобный функции.

  > Sidenote:
  > - [006: Агент/Ввод](./006_agent_input.md)

- :dfn[Инструмент]{canonical="Tool" href="./002_agent_tool.md"}: Схема, определяющая возможность, которую может использовать :term[агент]{canonical="Agent"}. Она представляется LLM как часть :term[запроса]{canonical="Request"}, выступая в роли структурированного интерфейса для потенциального :term[действия]{canonical="Action"}. LLM активирует :term[инструмент]{canonical="Tool"}, генерируя :term[Вызов]{canonical="Call"} с конкретными параметрами, который затем исполняется либо в скрытом виде самой LLM, либо явно зарегистрированной функцией кода (:term[Активностью]{canonical="Activity"}).

  > Sidenote:
  > - [002: Агент/Инструмент](./002_agent_tool.md)

- :dfn[Активность]{canonical="Activity" href="./003_agent_activity.md"}: Явная, детерминированная функция кода, которая реализует логику для :term[Инструмента]{canonical="Tool"}. Это механизм для выполнения :term[действий]{canonical="Action"}, требующих внешних вызовов API, операций с базами :term[данных]{canonical="Data"} или любых задач, которые не могут быть выполнены в скрытом пространстве LLM.

  > Sidenote:
  > - [003: Агент/Активность](./003_agent_activity.md)

- :dfn[ИИ-центричность]{canonical="AI-Native" href="./105_concept_ai_native.md"}: Архитектурная парадигма, в которой ИИ является основным двигателем всего жизненного цикла системы, включая её проектирование, исполнение, эволюцию и постоянное совершенствование. Она рассматривает ИИ не как интегрированный :term[инструмент]{canonical="Tool"}, а как фундаментальную среду, в которой работает система.

  > Sidenote:
  > - [105: Концепция/ИИ-центричность](./105_concept_ai_native.md)

- :dfn[Агентность]{canonical="Agency" href="./111_concept_life.md"}: Способность к субъективному опыту, целенаправленности и :term[действию]{canonical="Action"}. Это качество быть :term[агентом]{canonical="Agent"}, который воспринимает, обрабатывает информацию и взаимодействует со своей средой для внесения изменений.

  > Sidenote:
  > - [111: Концепция/Жизнь](./111_concept_life.md)

- :dfn[Границы]{canonical="Boundaries" href="./111_concept_life.md"}: Свойство обладать чёткой, невзаимозаменяемой идентичностью, будь то физической или концептуальной. Эта целостность означает, что сущность является самодостаточной единицей. Для человека это его тело и непрерывное сознание. Для :term[Идеи]{canonical="Idea"} это её конкретное определение — измените :term[Идею]{canonical="Idea"}, и она станет новой.

  > Sidenote:
  > - [111: Концепция/Жизнь](./111_concept_life.md)

- :dfn[Жизнь]{canonical="Life" href="./111_concept_life.md"}: Состояние существования, определяемое триадой ключевых свойств: :term[Агентность]{canonical="Agency"}, :term[Границы]{canonical="Boundaries"} и :term[Масштабируемость]{canonical="Scalability"}.

  > Sidenote:
  > - [111: Концепция/Жизнь](./111_concept_life.md)

- :dfn[Масштабируемость]{canonical="Scalability" href="./111_concept_life.md"}: Способность быть идеально воспроизведённой, распределённой и существовать вне ограничений единой линейной временной шкалы. Она представляет собой форму цифрового или концептуального бессмертия и вездесущности, позволяя информации копироваться без потерь.

  > Sidenote:
  > - [111: Концепция/Жизнь](./111_concept_life.md)

- :dfn[Ветвь]{canonical="Branch" href="./108_concept_visibility.md#branches-publication-and-partitioning"}: Именованная метка, которая разделяет пространство видимости, создавая параллельную, изолированную среду для разработки и экспериментов. Связывание :term[Идеи]{canonical="Idea"} с :term[ветвью]{canonical="Branch"} является актом публикации.

  > Sidenote:
  > - [108: Концепция/Видимость](./108_concept_visibility.md)

- :dfn[Вызов]{canonical="Call" href="./004_agent_call.md"}: Конкретный, исполняемый :term[экземпляр]{canonical="Instance"} :term[Инструмента]{canonical="Tool"} с конкретными значениями для его `params`. Это ориентированный на исполнение :term[запрос]{canonical="Request"} о том, что \_должно быть сделано\_.

  > Sidenote:
  > - [004: Агент/Вызов](./004_agent_call.md)

- :dfn[Время Отсечения]{canonical="Cutoff Time" href="./108_concept_visibility.md#the-cutoff-time-temporal-retrieval"}: Временная метка, сопровождающая :term[запрос]{canonical="Request"} на разрешение, которая предписывает резолверу найти версию :term[Идеи]{canonical="Idea"}, считавшуюся последней на тот конкретный момент времени.

  > Sidenote:
  > - [108: Концепция/Видимость](./108_concept_visibility.md)

- :dfn[Метод]{canonical="Method" href="./004_agent_call.md"}: Механизм исполнения :term[Вызова]{canonical="Call"}.
  - :dfn[Явное Исполнение]{canonical="Explicit Execution" href="./003_agent_activity.md"}: Вывод :term[Вызова]{canonical="Call"} генерируется детерминированным кодом (:term[Активностью]{canonical="Activity"}). LLM.

    > Sidenote:
    > - [003: Агент/Активность](./003_agent_activity.md)

  - :dfn[Скрытое Исполнение]{canonical="Latent Execution" href="./104_concept_latent.md"}: Вывод :term[Вызова]{canonical="Call"} генерируется LLM.

    > Sidenote:
    > - [104: Концепция/Скрытое](./104_concept_latent.md)

- :dfn[Делегат]{canonical="Delegate" href="./014_agent_delegate.md"}: Протокол для изоляции контекста исполнения. Вызываемый свойством `_delegate` в :term[Вызове]{canonical="Call"}, он исполняет :term[Активность]{canonical="Activity"} или новый :term[Запрос]{canonical="Request"} в среде «чистой комнаты», причём свойство `_scopes` предоставляет контролируемый доступ к родительскому контексту.

  > Sidenote:
  > - [014: Агент/Делегат](./014_agent_delegate.md)

- :dfn[Область Видимости]{canonical="Scope" href="./015_agent_scopes.md"}: Ключ, который идентифицирует часть контекста из родительской среды, чтобы сделать её доступной (`scoped`) для исполнения. Он может использоваться для фокусировки внимания LLM при **Скрытом Встроенном** исполнении или для построения всего контекста для исполнения в **Области Видимости Делегата**. Контролируется свойством `_scopes`.

  > Sidenote:
  > - [015: Агент/Области видимости](./015_agent_scopes.md)

- :dfn[Цикл]{canonical="Loop" href="./010_agent_loop.md"}: Итеративный процесс, в котором :term[агент]{canonical="Agent"} выполняет последовательность :term[Запросов]{canonical="Request"} для достижения цели. Процесс продолжается до тех пор, пока LLM считает, что требуется больше информации, что обозначается возвратом списка :term[Вызовов]{canonical="Call"} вместо :term[Финального Вывода]{canonical="Final Output"}.

  > Sidenote:
  > - [010: Агент/Цикл](./010_agent_loop.md)

- :dfn[Путь Вывода]{canonical="Output Path" href="./008_agent_output.md"}: Мета-свойство `_outputPath` в :term[Вызове]{canonical="Call"}, которое указывает, где сохранить результат :term[инструмента]{canonical="Tool"}. Это строка, которая сообщает движку исполнения, куда поместить результат, делая его доступным для последующих шагов.

  > Sidenote:
  > - [008: Агент/Вывод](./008_agent_output.md)

- :dfn[Финальный Вывод]{canonical="Final Output" href="./008_agent_output.md"}: Конечное поле `output` в объекте :term[Решения]{canonical="Solution"}, которое соответствует целевой схеме :term[Запроса]{canonical="Request"}. Оно генерируется только тогда, когда :term[агент]{canonical="Agent"} определяет, что его задача выполнена, завершая итеративный процесс.

  > Sidenote:
  > - [008: Агент/Вывод](./008_agent_output.md)

- :dfn[Мета-сообщение]{canonical="Meta Message" href="./016_agent_meta.md"}: Контекстное сообщение, которое предоставляет LLM явную идентичность :term[Идеи]{canonical="Idea"} (:term[Мета-свойства]{canonical="Meta Properties"}).

  > Sidenote:
  > - [016: Агент/Мета](./016_agent_meta.md)

- :dfn[Мета-свойства]{canonical="Meta Properties" href="./016_agent_meta.md"}: Структурированный объект внутри :term[Идеи]{canonical="Idea"}, который содержит её явную идентичность, включая имя, пространство имён и версию.

  > Sidenote:
  > - [016: Агент/Мета](./016_agent_meta.md)

- :dfn[HITL (Человек-в-цикле)]{canonical="HITL (Human-in-the-Loop)" href="./010_agent_loop.md#human-in-the-loop-hitl"}: Практика включения человека в автоматизированный процесс для контроля. В контексте итеративного процесса :term[агента]{canonical="Agent"} это относится к возможности пользователя одобрить, отклонить или изменить предложенные :term[Вызовы]{canonical="Call"} перед их исполнением.

  > Sidenote:
  > - [010: Агент/Цикл#human-in-the-loop-hitl](./010_agent_loop.md#human-in-the-loop-hitl)

- :dfn[Иерархическое Версионирование]{canonical="Hierarchical Versioning" href="./108_concept_visibility.md#versioning-creating-the-states-to-be-seen"}: Схема версионирования, где версии являются идентификаторами, разделёнными точками (например, `1.2.feature-x.3`), которая объединяет концепции линейных релизов, :term[ветвей]{canonical="Branch"} и черновиков в единую иерархическую структуру.

  > Sidenote:
  > - [108: Концепция/Видимость](./108_concept_visibility.md)

- :dfn[Эволюция]{canonical="Evolution" href="./106_concept_evolution.md"}: Процесс, посредством которого :term[ИИ-центричная]{canonical="AI-Native"} система автономно или полуавтономно адаптируется, улучшается и изменяет свою собственную структуру, логику и возможности с течением времени в ответ на новые :term[данные]{canonical="Data"}, обратную связь или меняющиеся цели.

  > Sidenote:
  > - [106: Концепция/Эволюция](./106_concept_evolution.md)

- :dfn[Эмерджентная Идентичность]{canonical="Emergent Identity" href="./107_concept_identity.md"}: Распознаваемый паттерн, возникающий из сети взаимосвязей, соединяющих совокупность :term[Идей]{canonical="Idea"}. Идентичность не является внутренним свойством отдельной :term[Идеи]{canonical="Idea"}, а качеством, которое возникает из её контекста.

  > Sidenote:
  > - [107: Концепция/Идентичность](./107_concept_identity.md)

- :dfn[idea:]{canonical="idea:" href="./110_concept_addressing.md"}: Схема URI для навигации по версионированной, разветвлённой реальности экосистемы :term[Идей]{canonical="Idea"}. Она предоставляет синтаксис как для простых, динамических :term[запросов]{canonical="Request"}, так и для полностью разрешённых, постоянных ссылок.

  > Sidenote:
  > - [110: Концепция/Адресация](./110_concept_addressing.md)

- :dfn[Отношения Идентичности]{canonical="Identity Relationships" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: Набор связей, которые приводят к возникновению :term[Эмерджентной Идентичности]{canonical="Emergent Identity"}.
  - :dfn[Происхождение]{canonical="Lineage" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: Историческая цепочка версий, которая связывает :term[Идею]{canonical="Idea"} с её прошлыми и будущими итерациями.
  - :dfn[Причинность]{canonical="Causality" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: Отношение, при котором одна :term[Идея]{canonical="Idea"} напрямую вызывает или инициирует создание другой.
  - :dfn[Группировка]{canonical="Grouping" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: Механизм для объединения нескольких связанных :term[Идей]{canonical="Idea"} в одну управляемую единицу.

  > Sidenote:
  > - [107: Концепция/Идентичность](./107_concept_identity.md)

- :dfn[Сообщение о Состоянии]{canonical="State Message" href="./009_agent_state.md"}: Контекстное сообщение, содержащее объект `state` и необязательную `schema`. Оно представляет собой постоянное :term[состояние]{canonical="State"}, сохраняемое между шагами итеративного процесса :term[агента]{canonical="Agent"}.

  > Sidenote:
  > - [009: Агент/Состояние](./009_agent_state.md)

- :dfn[Сообщение с Данными]{canonical="Data Message" href="./005_agent_data.md"}: Постоянное контекстное сообщение, содержащее значение `data` и необязательную `schema`. Оно сохраняется на всех этапах процесса :term[агента]{canonical="Agent"} для обеспечения стабильного, структурированного контекста.

  > Sidenote:
  > - [005: Агент/Данные](./005_agent_data.md)

- :dfn[План]{canonical="Plan" href="./012_agent_plan.md"}: Контекстное сообщение, содержащее граф потока :term[данных]{canonical="Data"} из :term[Вызовов Инструментов]{canonical="Tool Call"}, который представляет стратегию :term[агента]{canonical="Agent"}. Он передаётся между шагами для обеспечения итеративного исполнения и адаптации.

  > Sidenote:
  > - [012: Агент/План](./012_agent_plan.md)

- :dfn[Процессная Идея]{canonical="Process Idea" href="./012_agent_plan.md"}: Автономная [Идея](./101_concept_idea.md), которая фиксирует стратегический [План](./012_agent_plan.md) и его текущее :term[состояние]{canonical="State"} исполнения. Её `schema` — это библиотека [Инструментов](./002_agent_tool.md), её `solution` — это новый `План` для текущего такта, а её `context` содержит `Input`, `State` и предыдущий `План`.

  > Sidenote:
  > - [012: Агент/План](./012_agent_plan.md)

- :dfn[Идея-Носитель]{canonical="Vessel Idea" href="./202_idea_vessel.md"}: Автономная `Idea`, которая является одновременно определением реактивной способности и записью её выбранной реакции. Её `schema` определяет всю вселенную возможных `Инструментов`, а её `solution` фиксирует конкретные `Вызовы` (экземпляры этих `Инструментов`), которые были выбраны в ответ на стимул.

  > Sidenote:
  > - [202: Идея/Носитель](./202_idea_vessel.md)

- :dfn[Экземплирование]{canonical="Instancing" href="./013_agent_instancing.md"}: Процесс обработки множественных, независимых :term[Экземпляров]{canonical="Instance"} (каждый со своим уникальным идентификатором и соответствующим :term[сообщением о Состоянии]{canonical="State Message"}) в рамках одного :term[запроса]{canonical="Request"} :term[агента]{canonical="Agent"}.

  > Sidenote:
  > - [013: Агент/Экземплирование](./013_agent_instancing.md)

- :dfn[Запрос]{canonical="Request" href="./001_agent_request.md"}: Единичный, самодостаточный вызов LLM, который принимает `context` и `schema` и производит `solution`.

  > Sidenote:
  > - [001: Агент/Запрос](./001_agent_request.md)

- :dfn[Экземпляр]{canonical="Instance" href="./013_agent_instancing.md"}: Единый, уникально идентифицированный объект :term[состояния]{canonical="State"} и связанный с ним контекст, обрабатываемый как один из многих в операции :term[Экземплирования]{canonical="Instancing"}.

  > Sidenote:
  > - [013: Агент/Экземплирование](./013_agent_instancing.md)

- :dfn[Реактор]{canonical="Reactor" href="./303_ideator_reactor.md"}: Особый :term[Трансформатор Идей]{canonical="Idea Transformer"}, разработанный как универсальная среда выполнения для пошаговых взаимодействий :term[агентов]{canonical="Agent"} с сохранением :term[состояния]{canonical="State"}. Он принимает :term[состояние]{canonical="State"} игры/процесса (:term[Идею]{canonical="Idea"}) и производит следующее :term[состояние]{canonical="State"} (:term[Идею]{canonical="Idea"}).

  > Sidenote:
  > - [303: Идеатор/Реактор](./303_ideator_reactor.md)

- :dfn[Ссылка на Переменную]{canonical="Variable Reference" href="./007_agent_variables.md"}: Строка со специальным синтаксисом (`†<kind>.<path>`), используемая в параметрах :term[Вызова Инструмента]{canonical="Call"} для динамической ссылки на значение из контекста :term[агента]{canonical="Agent"}.

  > Sidenote:
  > - [007: Агент/Переменные](./007_agent_variables.md)
