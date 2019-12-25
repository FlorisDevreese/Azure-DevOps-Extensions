# Azure DevOps Extensions
This repo contains the source code for these Azure DevOps Extensions
- [Extra Azure DevOps variables](#Extra-Azure-DevOps-variables)
- [Artifact Labeling](#Artifact-Labeling-Extension)

## Extra Azure DevOps variables
This extension contains one task that sets some extra Azure DevOps related environment variables:
- `EXTRAVARIABLES_ACTIVESPRINT`: Contains the name of the sprint that was active at the time of commit.
    - **Note:** Value will be `null` when there's no sprint active, or when multiple sprints are active at the time of commit.

**Note:** For now there is only one variable calculated in the task. Extra variables can be implemented when needed.

## Artifact Labeling Extension
**todo**