import tl = require('azure-pipelines-task-lib/task');

try {
    // ------------------------------------ prerequisites ------------------------------------
    if (process.env.SYSTEM_ACCESSTOKEN == null) {
        tl.setResult(tl.TaskResult.Failed, "No access to SYSTEM_ACCESSTOKEN. You must provide access to System.AccessToken in order for this task to work.");
    }

    // ------------------------------------ functions ------------------------------------

    // ------------------------------------ program flow ------------------------------------

    let variabele = process.env.path;


    console.log(`path variable: ${variabele}`);


    // const inputString: string | undefined = tl.getInput('samplestring', true);
    // if (inputString == 'bad') {
    //     tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
    //     return;
    // }
    // console.log('Hello', inputString);
}
catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
}