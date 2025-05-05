import axios, { AxiosInstance } from "axios";
import { UsersController } from "./controllers/users";
import { AuthController } from "./controllers/auth";
import { NodesController } from "./controllers/nodes";
import { SubscriptionController } from "./controllers/subscription";
import { SystemController } from "./controllers/system";
import { HostsController } from "./controllers/hosts";
import { UsersBulkActionsController } from "./controllers/users-bulk-actions";
import { UsersStatsController } from "./controllers/users-stats";
import { BandwidthStatsController } from "./controllers/bandwidth-stats";
import { InboundsController } from "./controllers/inbounds";
import { SubscriptionsSettingsController } from "./controllers/subscriptions-settings";
import { SubscriptionsTemplateController } from "./controllers/subscriptions-template";
import { KeygenController } from "./controllers/keygen";
import { ApiError } from "./controllers/base";

export { ApiError };

export class RemnawaveSDK {
  private client: AxiosInstance;
  public users: UsersController;
  public auth: AuthController;
  public nodes: NodesController;
  public subscription: SubscriptionController;
  public system: SystemController;
  public hosts: HostsController;
  public users_bulk_actions: UsersBulkActionsController;
  public users_stats: UsersStatsController;
  public bandwidthstats: BandwidthStatsController;
  public inbounds: InboundsController;
  public subscriptions_settings: SubscriptionsSettingsController;
  public subscriptions_template: SubscriptionsTemplateController;
  public keygen: KeygenController;

  constructor(baseUrl: string, token: string) {
    if (!baseUrl || !token) {
      throw new Error("baseUrl and token are required");
    }

    // Prepare URL properly
    const preparedUrl = this.prepareUrl(baseUrl);
    const preparedToken = this.prepareToken(token);

    this.client = axios.create({
      baseURL: preparedUrl,
      headers: {
        Authorization: preparedToken,
        "Content-Type": "application/json",
      },
    });

    // Initialize controllers
    this.users = new UsersController(this.client);
    this.auth = new AuthController(this.client);
    this.nodes = new NodesController(this.client);
    this.subscription = new SubscriptionController(this.client);
    this.system = new SystemController(this.client);
    this.hosts = new HostsController(this.client);
    this.users_bulk_actions = new UsersBulkActionsController(this.client);
    this.users_stats = new UsersStatsController(this.client);
    this.bandwidthstats = new BandwidthStatsController(this.client);
    this.inbounds = new InboundsController(this.client);
    this.subscriptions_settings = new SubscriptionsSettingsController(
      this.client
    );
    this.subscriptions_template = new SubscriptionsTemplateController(
      this.client
    );
    this.keygen = new KeygenController(this.client);
  }

  private prepareUrl(url: string): string {
    // Remove trailing slash if exists
    let preparedUrl = url.endsWith("/") ? url.slice(0, -1) : url;

    // Add /api suffix if not present
    if (!preparedUrl.endsWith("/api")) {
      preparedUrl += "/api";
    }

    return preparedUrl;
  }

  private prepareToken(token: string): string {
    // Add Bearer prefix if not present
    if (!token.startsWith("Bearer ")) {
      return `Bearer ${token}`;
    }
    return token;
  }
}
