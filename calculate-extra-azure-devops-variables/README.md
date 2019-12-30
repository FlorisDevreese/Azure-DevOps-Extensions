# Calculate extra Azure DevOps variables
[![Build Status](https://dev.azure.com/florisdevreese/Azure%20Devops%20Extensions/_apis/build/status/FlorisDevreese.Azure-DevOps-Extensions?branchName=master)](https://dev.azure.com/florisdevreese/Azure%20Devops%20Extensions/_build/latest?definitionId=2&branchName=master)

Contains the `Calculate extra Azure Devops variables` pipeline task that calculates extra Azure DevOps related environment variables:

| Environment Variable | Meaning |
|-|-|
| `EXTRAVARIABLES_ACTIVESPRINT` | Name of the sprint active at time of commit.<br> - **Note 1:** Is `null` when no active sprint, or when multiple active sprints.<br> - **Note 2:** Sprint dates are in `UTC` time. The commit time is local time. So when looking for tha active sprint it will take time zone difference into account.|


Use these variables in the same way as you use the [Azure DevOps predefined variables](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables)

**Note:** For the moment only one extra variable is calculated. If you have ideas for other variables that could be calculated, just give a shout, or create a pull request. All help is welcome 😎!