import tl = require('azure-pipelines-task-lib/task')
import tr = require('azure-pipelines-task-lib/toolrunner')
import rpn = require('request-promise-native')

// ------------------------------------ prerequisites ------------------------------------
if (process.env.SYSTEM_ACCESSTOKEN == null) {
    tl.setResult(tl.TaskResult.Failed, "No access to SYSTEM_ACCESSTOKEN. You must provide access to System.AccessToken. See how: https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml#systemaccesstoken")
    process.exit(-1)
}

let supportedProviders = ["TfsGit", "Git", "GitHub"]
if (!supportedProviders.includes(<string>process.env.BUILD_REPOSITORY_PROVIDER)) {
    tl.setResult(tl.TaskResult.Failed, `This task only supports git based version control systems like: ${supportedProviders.join(', ')}. '${process.env.BUILD_REPOSITORY_PROVIDER}' is not supported.`)
    process.exit(-1)
}

// ------------------------------------ functions ------------------------------------
async function getActiveSprintName(): Promise<string> {
    console.debug("Calculate active sprint")
    console.debug(`Get commit time of ${process.env.BUILD_SOURCEVERSION}`)
    let gitResponse: tr.IExecSyncResult = tl.execSync("git", `show -s --format=%ci ${process.env.BUILD_SOURCEVERSION}`)
    let commitTime: Date = new Date(`${gitResponse.stdout}`)
    console.log(`Time of commit: ${commitTime}`)

    console.debug("Get all sprints")
    let escapedTeamProject = encodeURI(<string>process.env.SYSTEM_TEAMPROJECT) // todo get this into the string variable
    var options = {
        uri: `${process.env.SYSTEM_COLLECTIONURI}${escapedTeamProject}/_apis/work/teamsettings/iterations?api-version=5.1`,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.SYSTEM_ACCESSTOKEN}`
        },
        json: true // Automatically parses the JSON string in the response
    };
    let webResponse = await rpn.get(options);
    let allSprints: Array<any> = webResponse.value
    console.log(`All sprints: `) // todo must be debug
    allSprints.forEach(function (sprint) { console.log(` -  ${sprint.name}: ${sprint.attributes.startDate} -> ${sprint.attributes.finishDate}`) }) // todo must be debug

    console.log(`Get active sprints at time of commit`)
    let activeSprints: Array<any> = allSprints.filter(sprint => commitTime >= sprint.attributes.startDate && commitTime < sprint.attributes.finishDate)
    console.log(`Active sprints: `) // todo must be debug
    activeSprints.forEach(function (sprint) { console.log(` -  ${sprint.name}: ${sprint.attributes.startDate} -> ${sprint.attributes.finishDate}`) }) // todo must be debug

    return "testValue"
}

async function run() {
    try {
        let extraVariables: { [variable: string]: string } = {}
        extraVariables["EXTRAVARIABLES_ACTIVESPRINT"] = await getActiveSprintName()

        console.log("Variables calculated:")
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


// todo
//  - check if process.exit(-1) is necessary running this script inside a task