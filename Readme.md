## poc-asp-net-core-metamask-login

### Atalhos 

- [VsCode] Markdown Preview: crtl+shift+v
- Visual Studio menu > Tools > Run Code Coverage
- Visual Studio menu > Extensions > Manage extensions

### Definições
- Domain – This project is meant to hold the domain entities of the application. The classes in this project map to the data tables or records in whatever data store the application is configured to use.
- Application – This project contains the business logic and rules that make the application as a whole run as it’s supposed to. It directly references the Domain project, but no other projects within the solution.
- Infrastructure – This project contains the implementation of any logic that needs to communicate with outside entities, such as a database, the file system, other HTTP API’s, and so forth. It references the Application project to gain access to application contracts that it will then implement for accessing the aforementioned external entities.
- Api – This is the front-end of the application, and provides the start-up code and the API endpoint entry points.

### Dependencias

- asp.net core 3.1
- xUnit Test
- Extension: Run Coverlet Report
- ReportGenerator
```
dotnet tool install --global dotnet-reportgenerator-globaltool
```

### sonar

- [Sonar C#](https://docs.sonarqube.org/latest/analysis/languages/csharp/)
- dotnet tool install --global dotnet-sonarscanner
- powershell: .\run-sonar-report.ps1
