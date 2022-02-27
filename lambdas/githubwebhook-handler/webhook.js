const Octokit = require('@octokit/core');
exports.handler = async function(event, context) {
    // PULL THIS FROM SSM NOT USE IT HERE
    const ssm = new (require('aws-sdk/clients/ssm'))();
    const ssm_parameters = { Name: process.env.GITHUB_TOKEN_PATH, "WithDecryption": true };
    const ssm_result = await ssm.getParameter(ssm_parameters).promise();
    const oauth_token = ssm_result.Parameter.Value;
    const octokit = new Octokit.Octokit({ auth: oauth_token });
    const orgname = process.env.GITHUB_ORG_NAME;

    console.log("An Event Occured:", event);
    const request_details = JSON.parse(event.body);
    const reponame = request_details.repository.name;
    let headers = { "Content-Type": "application/json" };
    let statusCode = 500;
    let body = "Server error occured.";
    const parameters = {
        "owner": orgname,
        "repo": reponame,
        "enforce_admins": true,
        "required_status_checks": {
            "strict": true,
            "contexts": [
                  'contexts'
                ],

        },
        "required_pull_request_reviews" : {
            "require_code_owner_reviews": true,
        },
        "restrictions": {
            "users": ["fifteen3"],
            "teams": []
        }
    };
    try {
     //const response = await fetch(github_url, options);
     const response = await octokit.request("PUT /repos/{owner}/{repo}/branches/main/protection", parameters);
     handleResponse(response);
     statusCode = 200;
     body = response;
    } catch (e) {
        handleError(e);
        body = e;
    }

    return {
        statusCode,
        headers,
        body,
    };
};

function handleError(err) {
    console.log ("An Error Occured calling Github", err);
}

function handleResponse(res) {
    console.log("A response from github", res);
}
