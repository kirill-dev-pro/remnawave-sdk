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

/**
 * Error class for API responses with detailed error information
 * from the Remnawave API server.
 */
export { ApiError };

/**
 * RemnawaveSDK - Main client for interacting with the Remnawave API
 * Provides access to all available API endpoints through controller instances
 */
export class RemnawaveSDK {
  private client: AxiosInstance;
  /** Controller for user management operations */
  public users: UsersController;
  /** Controller for authentication operations */
  public auth: AuthController;
  /** Controller for node management operations */
  public nodes: NodesController;
  /** Controller for subscription operations */
  public subscription: SubscriptionController;
  /** Controller for system-level operations */
  public system: SystemController;
  /** Controller for host management operations */
  public hosts: HostsController;
  /** Controller for bulk operations on users */
  public users_bulk_actions: UsersBulkActionsController;
  /** Controller for user statistics operations */
  public users_stats: UsersStatsController;
  /** Controller for bandwidth statistics operations */
  public bandwidthstats: BandwidthStatsController;
  /** Controller for inbound connection operations */
  public inbounds: InboundsController;
  /** Controller for subscription settings operations */
  public subscriptions_settings: SubscriptionsSettingsController;
  /** Controller for subscription template operations */
  public subscriptions_template: SubscriptionsTemplateController;
  /** Controller for key generation operations */
  public keygen: KeygenController;

  /**
   * Creates a new RemnawaveSDK instance
   * @param baseUrl - Base URL of the Remnawave API server
   * @param token - Authentication token for API requests
   * @throws Error if baseUrl or token is not provided
   */
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

  /**
   * Prepares the base URL for API requests
   * @param url - Raw URL provided during initialization
   * @returns Properly formatted URL with /api suffix
   */
  private prepareUrl(url: string): string {
    // Remove trailing slash if exists
    let preparedUrl = url.endsWith("/") ? url.slice(0, -1) : url;

    // Add /api suffix if not present
    if (!preparedUrl.endsWith("/api")) {
      preparedUrl += "/api";
    }

    return preparedUrl;
  }

  /**
   * Prepares the authentication token for API requests
   * @param token - Raw token provided during initialization
   * @returns Properly formatted token with Bearer prefix
   */
  private prepareToken(token: string): string {
    // Add Bearer prefix if not present
    if (!token.startsWith("Bearer ")) {
      return `Bearer ${token}`;
    }
    return token;
  }
}
