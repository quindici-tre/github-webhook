import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class GithubWebhookStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const webhook_fn = new lambda.Function(this, "GitHubWebHook", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'webhook.handler',
      code: lambda.Code.fromAsset('githubwebhook-handler')
    });

    const webhookApi = new apigateway.LambdaRestApi(this, 'webhooks-api', {
      handler: webhook_fn,
    });
  }
}
