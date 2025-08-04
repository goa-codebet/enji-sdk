import { BaseClient } from "./BaseClient";
import { Http } from "./Http";

export class PlayerClient extends BaseClient {
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }

  async signIn(
    userData: { username: string; password: string },
    config: { device: string; operatingSystem: string; browser: string },
    attributes?: Record<string, unknown>
  ) {
    const data = await this.http.post("/player/signin/v2", {
      Username: userData.username,
      Password: userData.password,
      Platform: config.device,
      OperatingSystem: config.operatingSystem,
      Browser: config.browser,
      ...(attributes ? attributes : {}),
    });

    console.log("signin data: ", data);
    return data;
  }

  async test() {
    console.log("running test method");
  }
}
