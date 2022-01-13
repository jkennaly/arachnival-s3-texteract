console.log('Loading function');

const aws = require('aws-sdk');

const textract = new aws.Textract();


exports.handler = async (event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    // Get the object from the event and show its content type
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    var params = {
        DocumentLocation: {
          S3Object: {
            Bucket: bucket,
            Name: key,
          },
        },
        FeatureTypes: ['FORMS'],
        OutputConfig: {
            S3Bucket: bucket,
            S3Prefix: 'textractedLineups',
        },
        JobTag: key
    }
    console.log('startDocumentAnalysis params', params)
    const job = await textract.startDocumentAnalysis(params).promise()
    console.log('startDocumentAnalysis result', job)
    return job
};
