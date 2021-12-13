$sonarHost=$args[0]
write-host "Parametros defaults, Sintaxe customizada: run-sonar-report.ps1 localhost" 
write-host "Parametros defaults, default: run-sonar-report.ps1 localhost" 

if ($sonarHost -eq $null) {
    $sonarHost = "localhost"
}

dotnet sonarscanner begin /k:"poc-asp-net-core-metamask-login" `
	/o:"Estudos" `
	/d:sonar.host.url="http://"$sonarHost":9000/" `
	/d:sonar.scm.disabled=true `
	/d:sonar.log.level="TRACE" `
	/d:sonar.verbose=false `
	/d:sonar.buildbreaker.skip=true `
	/d:sonar.cs.roslyn.ignoreIssues=true `
	/d:sonar.analysis.mode=publish `
	/d:sonar.sourceEncoding=UTF-8 `
	/d:sonar.exclusions="**/bin/**/*,**/obj/**/*" `
	/d:sonar.coverageReportPaths=".\SonarTestResult\SonarQube.xml"
dotnet build SampleProject.sln --configuration Release
dotnet test SampleProject.sln --no-build -c release --collect:"XPlat Code Coverage"
reportgenerator "-reports:*\TestResults\*\coverage.cobertura.xml" "-targetdir:SonarTestResult" "-reporttypes:SonarQube"
dotnet sonarscanner end