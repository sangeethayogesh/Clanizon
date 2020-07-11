import S3 from 'react-aws-s3'

const config = {
  bucketName: 'plot-crm',
  dirName: 'media' /* optional */,
  region: 'ap-south-1',
  accessKeyId: 'AKIA26O2SOMH6ERMM445',
  secretAccessKey: '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'
}

export const s3 = new S3(config)
