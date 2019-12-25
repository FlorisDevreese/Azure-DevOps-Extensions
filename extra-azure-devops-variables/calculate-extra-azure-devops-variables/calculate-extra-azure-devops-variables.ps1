#region ------------------------------------ prerequisites ------------------------------------
$ErrorActionPreference = "Stop"

if ($null -eq $env:SYSTEM_ACCESSTOKEN) {
    Write-Host "##vso[task.logissue type=error]No access to SYSTEM_ACCESSTOKEN. You must provide access to System.AccessToken in order for this task to work."
    exit 1
}

$supportedProviders = @("TfsGit", "Git", "GitHub")
if ($env:BUILD_REPOSITORY_PROVIDER -notin $supportedProviders) {
    Write-Host "##vso[task.logissue type=error]This task only supports git based version control systems like: $($supportedProviders -join ", "). '$BUILD_REPOSITORY_PROVIDER' is not supported."
    exit 1
}
#endregion

#region ------------------------------------ functions ------------------------------------
function Get-ActiveSprintName() {
    Write-Verbose "`nCalculate active sprint"
    Write-Verbose "Get commit time"
    $dateTimeString = git show -s --format=%ci $env:BUILD_SOURCEVERSION
    $commitTime = Get-Date $dateTimeString
    Write-Verbose "Time of commit '$env:BUILD_SOURCEVERSION': $commitTime"

    Write-Verbose "Get all sprints"
    $escapedTeamProject = [uri]::EscapeDataString($env:SYSTEM_TEAMPROJECT)
    $uri = "$env:SYSTEM_COLLECTIONURI$escapedTeamProject/_apis/work/teamsettings/iterations?api-version=5.1"
    $headers = @{ Authorization = "Bearer $env:SYSTEM_ACCESSTOKEN" }
    $response = Invoke-WebRequest -Uri $uri -Method Get -Headers $headers -ContentType 'application/json' | ConvertFrom-Json
    $allSprints = $response.value
    Write-Verbose "All sprints:`n`t- $($allSprints.name -join "`n`t- ")"

    Write-Verbose "Get active sprints at time of commit"
    $activeSprints = [array]($allSprints | Where-Object { $commitTime -ge $_.attributes.startDate -and $commitTime -lt $_.attributes.finishDate })
    Write-Verbose "Active sprints:`n`t- $($activeSprints.name -join "`n`t- ")"

    if ($activeSprints.Count -eq 0) {   
        Write-Verbose "No active sprints at time of commit."
        return $null
    }

    if ($activeSprints.Count -eq 1) {
        Write-Verbose "Sprint '$($activeSprints[0].name)' was active at time of commit"
        return $activeSprints[0].name
    }

    if ($activeSprints.Count -gt 1) {
        Write-Verbose "Multiple active sprints at time of commit. Can't select one"
        return $null
    }
}
#endregion

$extraVariables = @{
    EXTRAVARIABLES_ACTIVESPRINT = Get-ActiveSprintName
}
$extraVariables

foreach($key in $extraVariables.Keys) {
    $value = $extraVariables.$key
    Write-Host "##vso[task.setvariable variable=$key;]$value"
}