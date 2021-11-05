import * as AWS from 'aws-sdk';

type S3Response = {
  Etag: string;
  Location: string;
  Key: string;
  Bucket: string;
};

export const S3Singleton = (function () {
  const s3 = new AWS.S3({
    region: 'ap-northeast-2',
  });

  return {
    upload: async function (key: string, file: Buffer) {
      const params = {
        Bucket: '',
        Key: key,
        Body: file,
      };
      const resp = await s3.upload(params).promise();

      return resp;
    },
  };
})();
