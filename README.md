# Azure DevOps Extensions
This repo contains the source code for these Azure DevOps Extensions:
1. [Extra Azure DevOps variables](#Extra-Azure-DevOps-variables)

## 1. Extra Azure DevOps variables
[![Build Status](https://dev.azure.com/florisdevreese/Azure%20Devops%20Extensions/_apis/build/status/FlorisDevreese.Azure-DevOps-Extensions?branchName=master)](https://dev.azure.com/florisdevreese/Azure%20Devops%20Extensions/_build/latest?definitionId=2&branchName=master)

Contains the `Calculate extra Azure Devops variables` pipeline task that calculates extra Azure DevOps related environment variables:

| Environment Variable | Meaning |
|-|-|
| `EXTRAVARIABLES_ACTIVESPRINT` | Name of the sprint active at time of commit.<br> - **Note:** `null` when no active sprint, or when multiple active sprints|


Use these variables in the same way as you use the [Azure DevOps predefined variables](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables)