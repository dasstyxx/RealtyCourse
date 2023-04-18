# Реестр фейковых квартир на продажу

## Стек:
- .Net Core 3.1
- ASP MVC
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