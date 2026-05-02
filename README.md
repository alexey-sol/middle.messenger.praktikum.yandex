# middle.messenger.praktikum.yandex

Мессенджер. Стек: Vite, TypeScript, Handlebars.

## Инструкция по установке

1) Склонировать репозиторий
2) Установить зависимости: `npm install`
3) Запустить для локальной разработки: `npm start`

## Требования и демо

- Макет (дизайн по умолчанию): https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0-1
- Демо: TODO

Страницы:
- `/src/chat/views/chat` (или рут, без пути) - мессенджер
- `/src/profile/views/profile-main` - профиль
- `/src/profile/views/profile-edit` - изменение профиля
- `/src/profile/views/password-edit` - изменение пароля
- `/src/auth/views/sign-in` - логин
- `/src/error/views/404` - ошибка 404
- `/src/error/views/500` - ошибка 500

## Скрипты

### `npm start`

Запустить приложение на локальном dev-сервере.

### `npm run build`

Собрать статику приложения.

### `npm run preview`

Запустить собранную статику на локальном dev-сервере.

### `npm run lint`
### `npm run lint:fix`

Команды eslint.

### `npm run stylelint`
### `npm run stylelint:fix`

Команды stylelint.
