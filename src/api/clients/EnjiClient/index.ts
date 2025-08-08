import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import { PlayerClient } from "../PlayerClient";
import { ResponsibleGamingClient } from "../ResponsibleGamingClient";
import { BonusClient } from "../BonusClient";
import { CasinoClient } from "../CasinoClient";
import { CasinoTournamentClient } from "../CasinoTournamentClient";
import { ContentClient } from "../ContentClient";
import { CurrenciesClient } from "../CurrenciesClient";
import { EventFeedClient } from "../EventFeedClient";
import { ExchangeRatesClient } from "../ExchangeRatesClient";
import { InternalMessagingClient } from "../InternalMessagingClient";
import { KycClient } from "../KycClient";
import { PlayerGroupsClient } from "../PlayerGroupsClient";
import { PlayerPropertiesClient } from "../PlayerPropertiesClient";
import { ResponsibleGamingLimitClient } from "../ResponsibleGamingLimitClient";
import { SportsbookClient } from "../SportsbookClient";
import { TransactionClient } from "../TransactionClient";
import { WalletClient } from "../WalletClient";

export class EnjiClient extends BaseClient {
  private _player: PlayerClient;
  private _responsibleGaming: ResponsibleGamingClient;
  private _bonus: BonusClient;
  private _casino: CasinoClient;
  private _casinoTournament: CasinoTournamentClient;
  private _content: ContentClient;
  private _currencies: CurrenciesClient;
  private _eventFeed: EventFeedClient;
  private _exchangeRates: ExchangeRatesClient;
  private _internalMessaging: InternalMessagingClient;
  private _kyc: KycClient;
  private _playerGroups: PlayerGroupsClient;
  private _playerProperties: PlayerPropertiesClient;
  private _responsibleGamingLimit: ResponsibleGamingLimitClient;
  private _sportsbook: SportsbookClient;
  private _transaction: TransactionClient;
  private _wallet: WalletClient;

  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
    this._player = new PlayerClient(http, sessionId);
    this._responsibleGaming = new ResponsibleGamingClient(http, sessionId);
    this._bonus = new BonusClient(http, sessionId);
    this._casino = new CasinoClient(http, sessionId);
    this._casinoTournament = new CasinoTournamentClient(http, sessionId);
    this._content = new ContentClient(http, sessionId);
    this._currencies = new CurrenciesClient(http, sessionId);
    this._eventFeed = new EventFeedClient(http, sessionId);
    this._exchangeRates = new ExchangeRatesClient(http, sessionId);
    this._internalMessaging = new InternalMessagingClient(http, sessionId);
    this._kyc = new KycClient(http, sessionId);
    this._playerGroups = new PlayerGroupsClient(http, sessionId);
    this._playerProperties = new PlayerPropertiesClient(http, sessionId);
    this._responsibleGamingLimit = new ResponsibleGamingLimitClient(
      http,
      sessionId
    );
    this._sportsbook = new SportsbookClient(http, sessionId);
    this._transaction = new TransactionClient(http, sessionId);
    this._wallet = new WalletClient(http, sessionId);
  }

  get player() {
    return this._player;
  }

  get responsibleGaming() {
    return this._responsibleGaming;
  }

  get bonus() {
    return this._bonus;
  }

  get casino() {
    return this._casino;
  }

  get casinoTournament() {
    return this._casinoTournament;
  }

  get content() {
    return this._content;
  }

  get currencies() {
    return this._currencies;
  }

  get eventFeed() {
    return this._eventFeed;
  }

  get exchangeRates() {
    return this._exchangeRates;
  }

  get internalMessaging() {
    return this._internalMessaging;
  }

  get kyc() {
    return this._kyc;
  }

  get playerGroups() {
    return this._playerGroups;
  }

  get playerProperties() {
    return this._playerProperties;
  }

  get responsibleGamingLimit() {
    return this._responsibleGamingLimit;
  }

  get sportsbook() {
    return this._sportsbook;
  }

  get transaction() {
    return this._transaction;
  }

  get wallet() {
    return this._wallet;
  }
}
