const Octokit = require('@octokit/core');
exports.handler = async function(event, context) {

    const ssm = new (require('aws-sdk/clients/ssm'))();
    const ssm_parameters = { Name: process.env.GITHUB_TOKEN_PATH, "WithDecryption": true };
    const ssm_result = await ssm.getParameter(ssm_parameters).promise();
    const oauth_token = ssm_result.Parameter.Value;

    const octokit = new Octokit.Octokit({ auth: oauth_token });

    console.log("An Event Occured:", event);
    const request_details = JSON.parse(event.body);
    const orgname = process.env.GITHUB_ORG_NAME;
    const reponame = request_details.repository.name;

    let headers = { "Content-Type": "text/plain" };
    let statusCode = 500;
    let body = "Server error occured.";

    const protection_added = await addProtection(octokit, orgname, reponame);
    if (protection_added) {
        statusCode = 200;
        body = "Branch Protected";
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

async function notifyProtectionAdded(octokit, orgname, reponame) {
    const parameters = {
        owner: orgname,
        repo: reponame,
        title: "Default branch protection added.",
        body: "@fifteen3 branch protection added"
    };
    try {
        const response = await octokit.request("POST /repos/{owner}/{repo}/issues", parameters);
        handleResponse(response);
        return true;
    } catch (e) {
        handleError(e);
        return false;
    }
};


async function addProtection(octokit, orgname, reponame) {
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
        const response = await octokit.request("PUT /repos/{owner}/{repo}/branches/main/protection", parameters);
        const notify_response = await notifyProtectionAdded(octokit, orgname, reponame);
        handleResponse(response);
        handleResponse(notify_response);
        return true;
    } catch (e) {
        handleError(e);
        return false;
    }
}