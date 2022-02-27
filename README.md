# Welcome to GitHub WebHook Reference Architecture

The following repo will configure an Amazon API Gateway with AWS Lambda and Amazon SSM Parameter Store Secure String
to support Webhook requests from Github.

When a repository is created and a branch with the name main has code pushed to it, a request will be sent
to the API Gateway.

The AWS Lambda will respond by sending API requests to GitHub to add branch protection to the main branch.

# Manual Steps


1. Once your organization has been created. Navigate to the Settings for the organization.
    [GitHub Webhook Documentation](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks)
2. Select Webhooks from the menu on the left hand side of the Settings interface.
3. Click Add Webhook.
    The URL for the Amazon API Gateway will be created after it is deployed. It will used in the field Payload URL.
4. Run `cdk deploy` from a machine configured to work with the desired AWS Account
    To find that URL navigate to the CloudFormation section of the AWS Console, navigate to the stack named GithubWebhookStack and select Outputs.
    or from the command line:
    `aws cloudformation describe-stacks --stack-name GithubWebhookStack --query "Stacks[0].Outputs[*].OutputValue" --output text`



# AWS Based Webhook

AWS CDK was used to create the Infrastructure as Code.

The AWS Lambda is written in Javascript.

# Information regarding AWS CDK

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

Learn more about [AWS CDK](https://github.com/aws/aws-cdk).
