export enum SocialProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
}

export type SocialProviderValues = typeof SocialProvider[keyof typeof SocialProvider];

export enum SocialProviderUrl {
  GOOGLE_AUTH = 'https://oauth2.googleapis.com',
  GOOGLE_API = 'https://www.googleapis.com',
}
