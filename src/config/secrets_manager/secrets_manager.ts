import * as AWS from 'aws-sdk';

type SecretsManagerResponse = {
  ARN: string;
  Name: string;
  VersionId: string;
  SecretString: string;
  VersionStaged: string[];
  CreatedDate: Date;
};

export const SecretsManagerSingleton = (function () {
  // use 'AWS_PROFILE=<Your Profile>' for configure credentials
  const client = new AWS.SecretsManager({
    region: 'ap-northeast-2',
  });

  let secrets = {};

  function callback(err, data: SecretsManagerResponse) {
    if (err) throw err;
    else {
      const secret = JSON.parse(data.SecretString);
      secrets = { ...secrets, ...secret };
    }
  }

  return {
    prepare: async function (SecretIds: string[]) {
      await Promise.all(
        SecretIds.map(async (SecretId) => {
          await client.getSecretValue({ SecretId }, callback).promise();
        }),
      );
    },
    getValue: function (SecretString: string) {
      return secrets[SecretString];
    },
  };
})();
