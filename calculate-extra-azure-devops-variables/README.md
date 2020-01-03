# Calculate extra Azure DevOps variables
[![Build Status](https://dev.azure.com/florisdevreese/Azure%20Devops%20Extensions/_apis/build/status/FlorisDevreese.Azure-DevOps-Extensions?branchName=master)](https://dev.azure.com/florisdevreese/Azure%20Devops%20Extensions/_build/latest?definitionId=2&branchName=master)

Contains the `Calculate extra Azure Devops variables` pipeline task that calculates extra Azure DevOps related environment variables

## Calculated extra variables
| Environment Variable | Meaning |
|-|-|
| `EXTRAVARIABLES_ACTIVESPRINT` | Name of the sprint active on day of commit.<br>Is `null` when no active, or multiple active sprints.<br>Uses use current time if task runs outside a build.|

## Usage
Add the `Calculate extra Azure Devops variables` task to your pipeline. In the followup pipeline tasks you can use the calculated extra variables in the same way as you use the [Azure DevOps predefined variables](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables).

### yaml pipeline
```yml
steps:
  - task: FlorisDevreese.calculate-extra-azure-devops-variables.task.task@1
    displayName: 'Calculate extra Azure Devops variables'
    env:
      SYSTEM_ACCESSTOKEN: $(System.AccessToken) # must provide access to SYSTEM_ACCESSTOKEN
    
  - pwsh: 'Write-Host "use variable like this: $env:EXTRAVARIABLES_ACTIVESPRINT"'
    displayName: 'or like like this: $(EXTRAVARIABLES_ACTIVESPRINT)'
```

### Classic build
![classic build screenshot](https://github.com/FlorisDevreese/Azure-DevOps-Extensions/raw/master/calculate-extra-azure-devops-variables/images/classic-build-screenshot.png)

## Contribute
For the moment only one extra variable is calculated. If you have ideas for other variables that could be calculated, just give a shout, or create a pull request. All help is welcome 😎!