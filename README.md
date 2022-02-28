# Welcome to GitHub WebHook Reference Architecture

The following repo will configure an Amazon API Gateway with AWS Lambda with a IAM policy to access a Amazon SSM Parameter Store Secure String to support Webhook requests from Github.

When a repository is created and a branch with the name main has code pushed to it, a request will be sent
to the API Gateway.

The AWS Lambda will respond by sending API requests to GitHub to add branch protection to the main branch.

# Dependencies

1. An AWS account
2. A GitHub account
3. An SSM Parameter named `githubtoken` created as a SecureString

# Miro Board for Workshop

[Protecting Developer Productivity](https://miro.com/app/board/uXjVOQr8LDA=/?invite_link_id=208702551612)

# Manual Steps

## GitHub User and Personal Access Token
1. Create a GitHub user. Once the user has been created navigate to User Settings.
1. On the left side menu navigate to Developer Settings
1. Select Personal access token from the left hand side menu.
1. Select Generate Token and complete the form. Ensure you select `admin:org_hook, admin:repo_hook, delete_repo, repo, workflow` from the availble scopes

[GitHub - Creating a personal access token Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

## AWS CDK
1. Go to the AWS Console and access the Systems Manager Paramater store
1. Create a SecureString parameter named `githubtoken` and paste the Personal Access Token that GitHub created.
1. Run `cdk deploy` from a machine configured to work with the desired AWS Account
    To find that URL navigate to the CloudFormation section of the AWS Console, navigate to the stack named GithubWebhookStack and select Outputs.

    or from the command line:

    `aws cloudformation describe-stacks --stack-name GithubWebhookStack --query "Stacks[0].Outputs[*].OutputValue" --output text`

    Keep this value it to paste into the Payloud URL field of the Webhook creation interface.
1. Navigate to the Systems Manager Parameter Store and create a SecureString SSM Parameter with the name `githubtoken`.
    Use the Personal Access Token that you created as the value.

## GitHub Organization and Webhook
1. Once your organization has been created.
1. Navigate to the Settings for the organization.
1. Select Webhooks from the menu on the left hand side of the Settings interface.
1. Click Add Webhook.
    The URL for the Amazon API Gateway will be created after it is deployed. It will used in the field Payload URL.

[GitHub - Webhook Documentation](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks)


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
