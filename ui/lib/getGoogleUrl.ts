export default function getGoogleOAuth2Url() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const urlOptions = {
    redirect_uri: process.env.NEXT_PUBLIC_OAUTH2_REDIRECT_URL as string,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const queryString = new URLSearchParams(urlOptions);

  return `${rootUrl}?${queryString.toString()}`;
}
