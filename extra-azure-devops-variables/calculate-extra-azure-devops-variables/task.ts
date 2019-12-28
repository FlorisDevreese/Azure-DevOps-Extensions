import tl = require('azure-pipelines-task-lib/task')

console.log("all environment variables:")
for (let key in process.env) {
    let value = process.env[key]
    console.log(` - ${key}: ${value}`)
}

console.log("print dictonary")
console.log(process.env)

try {
    // ------------------------------------ prerequisites ------------------------------------
    if (process.env.SYSTEM_ACCESSTOKEN == null) {
        tl.setResult(tl.TaskResult.Failed, "No access to SYSTEM_ACCESSTOKEN. You must provide access to System.AccessToken. See how: https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml#systemaccesstoken")
        process.exit(-1)
    }

    // let supportedProviders = ["TfsGit", "Git", "GitHub"]
    let supportedProviders = ["TfsGit", "Git", "testje"]
    console.log(`build_repository_provider: ${process.env.BUILD_REPOSITORY_PROVIDER}`)
    if (supportedProviders.includes(<string> process.env.BUILD_REPOSITORY_PROVIDER)) {
        tl.setResult(tl.TaskResult.Failed, `This task only supports git based version control systems like: ${supportedProviders.join(', ')}. '${process.env.BUILD_REPOSITORY_PROVIDER}' is not supported.`)
        process.exit(-1)
    }
    // ------------------------------------ functions ------------------------------------

    // ------------------------------------ program flow ------------------------------------

    let variabele = process.env.path


    console.log(`path variable: ${variabele}`)


    // const inputString: string | undefined = tl.getInput('samplestring', true)
    // if (inputString == 'bad') {
    //     tl.setResult(tl.TaskResult.Failed, 'Bad input was given')
    //     return
    // }
    // console.log('Hello', inputString)
}
catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message)
}