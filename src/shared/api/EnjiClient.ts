import { BaseClient } from "./BaseClient";
import { Http } from "./Http";
import { PlayerClient } from "./PlayerClient";
import { ResponsibleGamingClient } from "./ResponsibleGamingClient";

export class EnjiClient extends BaseClient {
  private _player: PlayerClient;
  private _responsibleGaming: ResponsibleGamingClient;

  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
    this._player = new PlayerClient(http, sessionId);
    this._responsibleGaming = new ResponsibleGamingClient(http, sessionId);
  }

  get player() {
    return this._player;
  }

  get responsibleGaming() {
    return this._responsibleGaming;
  }
}
