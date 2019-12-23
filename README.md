# Azure DevOps Extensions
This repo contains the source code for these Azure DevOps Extensions
- [Pipeline Naming](#Pipeline-Naming-Extension)
- [Artifact Labeling](#Artifact-Labeling-Extension)

## Pipeline Naming Extension
This extension contains one pipeline task that overwrites the pipeline name.

### Pipeline Naming Task
Overrides the name of the pipline using:
- [Azure DevOps predefined variables](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables)
- runtime variables:
    - `%IterationName%`:  The name of the iteration that was active on the date of the commit

Example format for pipeline name: `1.%IterationName%.$(Build.BuildId)`

## Artifact Labeling Extension
**todo**