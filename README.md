# Тестовое здание
## Архитектура 
  [/src](./src/) - Основная папка проекта, в которой хранятся модули.

  [/config](./src/config/) - Папка с конфигурациями для базы данных и свагера.

  [/entities](./src/entities/) - Место храниения сущьностей баз данных.

  [/categories](./src/categories/) - Основной модуль проекта. 

  [.env.example]() - Файл с примером конфигурационных переменных

## Модуль категорий 
### Архитектура 
  [categories.controller](./src/categories/categories.controller.ts) - Файл в котором описана маршрутизация

  [categories.service](./src/categories/categories.service.ts) - Файл с описанием основной логики проекта

  [categories.repository](./src/categories/categories.repository.ts) - Файл в котором описаны все действия с базой данных. Решение создать отдельный файл для репозитория было продиктовано опытом. Например когда требовалось получить ответ findOne без эксепшена, но метод в сервисе всегда кидал эксепшен при не нахождении записи в базе и на этом было завязано много уже написанной логики, в следствие чего приходилось писать почти точно такой же метод в сервисе, чтобы получать запись или null. Репозиторий решает эту проблему, передавая логику отдачи эксепшенов на сторону сервисов и конкретных реализаций.

  [/dto](./src/categories/dto/) - Папка с ДТО для контроллеров 

  [/interfaces](./src/categories/interfaces/) - Папка с интерфейсами для сервисов и репозиториев

  [/utils](./src/categories/utils/) - Вспомогательные функции. В данном случае используется для очитски метода получения всех записей категорий. Вынесения грамоздкой логики в отдельные функции для большей чистоты кода.

### Запросы

  POST categories - Метод для создания категории

  PUT categories - Метод для обновления конкретной категории. Поиск выполняется по полям id или slug. По этой причине в этом, И остальных методах(кроме удаления) не используются параметры. Оба поля для поиска передаются с телом запроса.

  GET categories - Получение конкретной категории

  POST categories/all - Получение всех категорий 

  DELETE categories/:id -Удаление категории

### Сыылка на сваггер - /docs

### Доступ к adminer при запуске проекта через докер

После выполнения docker compose up

[localhost:8082]()

Сервер, имя, пароль, база данных - postgres

Движок - PostgresQL