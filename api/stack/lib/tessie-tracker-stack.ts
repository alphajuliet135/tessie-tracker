import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';

export class TessieTrackerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'StackQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const apiLambda = new lambda.Function(this, 'tessie-tracker-api', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('../.'),
      handler: 'handler.handler',
    });
  }
}
