# Welcome to GitHub WebHook Reference Architecture

The following repo will configure an AWS API Gateway with AWS Lambda and Amazon SSM Parameter Store Secure String
to support Webhook requests from Github.

When a repository is created and a branch with the name main has code pushed to it, a request will be sent
to the API Gateway.

The AWS Lambda will respond by sending API requests to GitHub to add branch protection to the main branch.


AWS CDK was used to create the Infrastructure as Code.

The AWS Lambda is written in Javascript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
