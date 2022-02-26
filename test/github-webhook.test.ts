import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as GithubWebhook from '../lib/github-webhook-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/github-webhook-stack.ts
test('GithubWebhook Lambda Created', () => {
   const app = new cdk.App();
//     // WHEN
   const stack = new GithubWebhook.GithubWebhookStack(app, 'TestWebhookStack');
//     // THEN
   const template = Template.fromStack(stack);

   template.hasResourceProperties('AWS::Lambda::Function', {
     Handler: 'webhook.handler'
   });
});
