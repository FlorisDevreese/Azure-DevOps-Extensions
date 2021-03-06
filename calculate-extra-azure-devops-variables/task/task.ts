import tl = require('azure-pipelines-task-lib/task')
import tr = require('azure-pipelines-task-lib/toolrunner')
import rpn = require('request-promise-native')

// ------------------------------------ prerequisites ------------------------------------
if (process.env.SYSTEM_ACCESSTOKEN == null) {
    tl.setResult(tl.TaskResult.Failed, "No access to SYSTEM_ACCESSTOKEN. You must provide access to System.AccessToken. See how: https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml#systemaccesstoken")
}

// ------------------------------------ functions ------------------------------------
async function getActiveSprintName(): Promise<string> {
    console.log("Calculate active sprint")

    // todo if it's an release, then get the current time
    let compareTime: Date = new Date()
    if (process.env.BUILD_SOURCEVERSION != null) {
        tl.debug(`Check if a Git based version control system is used.`)
        let supportedProviders = ["TfsGit", "Git", "GitHub"]
        if (!supportedProviders.includes(<string>process.env.BUILD_REPOSITORY_PROVIDER)) {
            tl.setResult(tl.TaskResult.Failed, `This task only supports git based version control systems like: ${supportedProviders.join(', ')}. '${process.env.BUILD_REPOSITORY_PROVIDER}' is not supported.`)
        }

        tl.debug(`Get commit time of ${process.env.BUILD_SOURCEVERSION}`)
        let gitResponse: tr.IExecSyncResult = tl.execSync("git", `show -s --format=%ci ${process.env.BUILD_SOURCEVERSION}`)
        if (!Date.parse(gitResponse.stdout)) {
            tl.warning(`Cannot calculate the active sprint because it could not get the commit time of commit '${process.env.BUILD_SOURCEVERSION}'. This can be the result of the "Don't sync sources" option that is enabled.`)
            return ""
        }
        compareTime = new Date(`${gitResponse.stdout}`)
        tl.debug(`Time of commit: ${compareTime}`)
    }
    else {
        tl.debug(`No BUILD_SOURCEVERSION available. Will use the current time current time for calculating the active sprint.`)
        compareTime = new Date()
    }

    let compareDay = new Date(Date.UTC(compareTime.getFullYear(), compareTime.getMonth(), compareTime.getDate()))
    tl.debug(`Start of the day in UTC (used for comparing dates): ${compareDay}`)

    tl.debug("Get all sprints")
    var options = {
        uri: `${process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI}${encodeURI(<string>process.env.SYSTEM_TEAMPROJECT)}/_apis/work/teamsettings/iterations?api-version=5.1`,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.SYSTEM_ACCESSTOKEN}`
        },
        json: true
    };
    let webResponse = await rpn.get(options);
    let allSprints: Array<any> = webResponse.value
    tl.debug(`All sprints: `)
    allSprints.forEach(function (sprint) { tl.debug(` -  ${sprint.name}: ${sprint.attributes.startDate} -> ${sprint.attributes.finishDate}`) })

    tl.debug(`Get active sprints at time of commit`)
    let activeSprints: Array<any> = allSprints.filter(sprint => compareDay >= new Date(sprint.attributes.startDate) && compareDay < new Date(sprint.attributes.finishDate))
    tl.debug(`Active sprints: `)
    activeSprints.forEach(function (sprint) { tl.debug(` -  ${sprint.name}: ${sprint.attributes.startDate} -> ${sprint.attributes.finishDate}`) })

    if (activeSprints.length == 0) {
        console.log(`No active sprints at time of commit.`)
        return ""
    }
    else if (activeSprints.length == 1) {
        console.log(`Sprint '${activeSprints[0].name}' was active at time of commit`)
        return activeSprints[0].name
    }
    else {
        console.log(`Multiple active sprints at time of commit. Can't select one`)
        return ""
    }
}

async function run() {
    try {
        let extraVariables: { [variable: string]: string } = {}
        extraVariables["EXTRAVARIABLES_ACTIVESPRINT"] = await getActiveSprintName()

        console.log("Calculated extra variables:")
        console.log(extraVariables)

        for (let variable in extraVariables) {
            tl.setVariable(variable, extraVariables[variable])
        }
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message)
    }
}

run()