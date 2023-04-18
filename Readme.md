# SPA реестр фейковых квартир на продажу

## Стек:
- .NET Core 3.1
- EF 5
- react
- react-redux
- redux-thunk
- Ant Design


## Локаольно применяем миграции через команды:
```powershell
dotnet ef migrations add имя_миграции -c RealtyContext --project ..\RealtyCourse.DAL
dotnet ef database update -c RealtyContext --project ..\RealtyCourse.DAL
```