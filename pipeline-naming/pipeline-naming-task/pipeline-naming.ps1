[cmdletbinding()]
param(
    [string] $format
)

$ErrorActionPreference = "Stop"

if ($format -contains '%IterationName%') {
    Write-Debug "Use of variable '%IterationName%' detected"

    Write-Debug "Validate if Accesstoken is present"
    # todo

    Write-Debug "Get all iterations"
    $alliterations
    # todo

    Write-Debug "Get date of commit"
    $dateOfCommit
    # todo

    Write-Debug "Get iteration active on commit date"
    $iterationOnCommitDate
    # todo

    if ($null -eq $iterationOnCommitDate) {
        Write-Warning "There was no iteration active on the date of commit (todo). Will use the iteration that is nearest by"

    }

    if ($iterationOnCommitDate.Count -gt 1) {
        Write-Debug
    }
}

# set pipeline name
# todo