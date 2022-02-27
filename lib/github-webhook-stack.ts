import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class GithubWebhookStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const GITHUB_TOKEN_PATH = 'githubtoken';
    const GITHUB_ORG_NAME = 'quindici-tre';
    // The code that defines your stack goes here
    const github_token = ssm.StringParameter.fromSecureStringParameterAttributes(this, 'WebhookGithubToken', {
      parameterName: GITHUB_TOKEN_PATH,
      version: 0,
    });
    const webhook_fn = new lambda.Function(this, "GitHubWebHook", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'webhook.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambdas/githubwebhook-handler')),
      environment: {
        GITHUB_ORG_NAME,
        GITHUB_TOKEN_PATH,
      }
    });
    github_token.grantRead(webhook_fn);

    const webhookApi = new apigateway.LambdaRestApi(this, 'webhooks-api', {
      handler: webhook_fn,
    });
  }
}
