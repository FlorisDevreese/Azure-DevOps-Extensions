# Azure DevOps Extensions
This repo contains the source code for these Azure DevOps Extensions
- [Extra variables](#Extra-Variables)
- [Artifact Labeling](#Artifact-Labeling-Extension)

## Extra variables
This extension contains one pipeline task that sets the following environment variables:
- `EXTRAVARIABLES_ACTIVESPRINT`: Contains the name of the sprint that was active at the time of commit.
    - **Note:** Value will be `null` when there's no sprint active, or when there are multiple sprints active at the time of commit.

**Note:** For now there is only one variable calculated in the task. Extra variables can be implemented when needed.

## Artifact Labeling Extension
**todo**